import { NextRequest, NextResponse } from 'next/server';
import { createClient, RedisClientType } from 'redis';

// Redis client (will be initialized when needed)
let redis: RedisClientType | null = null;

/**
 * Initialize Redis connection
 */
async function getRedis(): Promise<RedisClientType | null> {
  if (!redis && process.env.REDIS_URL) {
    try {
      redis = createClient({ url: process.env.REDIS_URL });
      return redis;
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      return null;
    }
  }
  return redis;
}

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string; // Custom key generator
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
}

/**
 * Default rate limit configurations
 */
export const RATE_LIMITS = {
  // Authentication endpoints
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5
  },
  
  // General API endpoints
  API: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },
  
  // File upload endpoints
  UPLOAD: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10
  },
  
  // Password reset
  PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3
  },
  
  // 2FA attempts
  TWO_FACTOR: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5
  }
} as const;

/**
 * Generate rate limit key
 */
function generateKey(identifier: string, config: RateLimitConfig): string {
  const window = Math.floor(Date.now() / config.windowMs);
  return `rate_limit:${identifier}:${window}`;
}

/**
 * Get client identifier from request
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get user ID from session if available
  const userId = request.headers.get('x-user-id');
  if (userId) {
    return `user:${userId}`;
  }

  // Fall back to IP address
  const ip = request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';
  
  return `ip:${ip}`;
}

/**
 * Check rate limit
 */
export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}> {
  const redis = await getRedis();
  
  // If Redis is not available, allow the request
  if (!redis) {
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: Date.now() + config.windowMs
    };
  }

  const identifier = config.keyGenerator 
    ? config.keyGenerator(request)
    : getClientIdentifier(request);
  
  const key = generateKey(identifier, config);
  
  try {
    const current = await redis.incr(key);
    
    // Set expiration on first request
    if (current === 1) {
      await redis.expire(key, Math.ceil(config.windowMs / 1000));
    }
    
    const remaining = Math.max(0, config.maxRequests - current);
    const resetTime = Date.now() + config.windowMs;
    
    if (current > config.maxRequests) {
      const retryAfter = Math.ceil(config.windowMs / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetTime,
        retryAfter
      };
    }
    
    return {
      allowed: true,
      remaining,
      resetTime
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // If Redis fails, allow the request
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: Date.now() + config.windowMs
    };
  }
}

/**
 * Rate limit middleware
 */
export function withRateLimit(config: RateLimitConfig) {
  return function rateLimitMiddleware(
    handler: (request: NextRequest, context?: { params: Promise<{ [key: string]: string }> }) => Promise<NextResponse>
  ) {
    return async function(request: NextRequest, context?: { params: Promise<{ [key: string]: string }> }): Promise<NextResponse> {
      const rateLimitResult = await checkRateLimit(request, config);
      
      if (!rateLimitResult.allowed) {
        return NextResponse.json(
          {
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: rateLimitResult.retryAfter
          },
          {
            status: 429,
            headers: {
              'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
            }
          }
        );
      }
      
      // Add rate limit headers to response
      const response = await handler(request, context);
      
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());
      
      return response;
    };
  };
}

/**
 * Rate limit decorator for API routes
 */
export function rateLimit(config: RateLimitConfig) {
  return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(request: NextRequest, ...args: unknown[]) {
      const rateLimitResult = await checkRateLimit(request, config);
      
      if (!rateLimitResult.allowed) {
        return NextResponse.json(
          {
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: rateLimitResult.retryAfter
          },
          {
            status: 429,
            headers: {
              'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
            }
          }
        );
      }
      
      const response = await originalMethod.apply(this, [request, ...args]);
      
      if (response instanceof NextResponse) {
        response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
        response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());
      }
      
      return response;
    };
    
    return descriptor;
  };
}
