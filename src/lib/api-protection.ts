import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { 
  UserRole, 
  hasPermissionWithContext,
  PERMISSIONS 
} from './permissions';

export interface ApiContext {
  userId?: string;
  userRole?: UserRole;
  [key: string]: unknown;
}

export function withApiAuth(
  handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>,
  requiredPermission?: { resource: string; action: string },
  options?: {
    requireAuth?: boolean;
    allowPublic?: boolean;
    rateLimit?: { windowMs: number; maxRequests: number };
  }
) {
  return async (req: NextRequest) => {
    try {
      const session = await getServerSession(authOptions);
      
      // Check if authentication is required
      if (options?.requireAuth !== false && !session?.user) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Authentication required',
            code: 'UNAUTHORIZED'
          },
          { status: 401 }
        );
      }

      const userRole = (session?.user as { role?: UserRole })?.role as UserRole;
      const userId = session?.user?.id;

      const context: ApiContext = {
        userId,
        userRole,
        session,
        request: req
      };

      // Check permission if required
      if (requiredPermission && userRole) {
        if (!hasPermissionWithContext(userRole, requiredPermission, context)) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Insufficient permissions',
              code: 'FORBIDDEN',
              requiredPermission
            },
            { status: 403 }
          );
        }
      }

      // Apply rate limiting if specified
      if (options?.rateLimit && userId) {
        if (!rateLimit(userId, options.rateLimit.maxRequests, options.rateLimit.windowMs)) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Rate limit exceeded',
              code: 'RATE_LIMIT_EXCEEDED'
            },
            { status: 429 }
          );
        }
      }

      return await handler(req, context);
    } catch (error) {
      console.error('API Auth Error:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Internal server error',
          code: 'INTERNAL_ERROR'
        },
        { status: 500 }
      );
    }
  };
}

export function withAdminAuth(
  handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>
) {
  return withApiAuth(handler, PERMISSIONS.ADMIN.ACCESS_ADMIN_PANEL);
}

export function withDeveloperAuth(
  handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>
) {
  return withApiAuth(handler, PERMISSIONS.DEVELOPER.ACCESS_DEVELOPER_DASHBOARD);
}

export function withModeratorAuth(
  handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>
) {
  return withApiAuth(handler, PERMISSIONS.MODERATOR.PARTICIPATE_COMMUNITY);
}

export function withPublicAuth(
  handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>
) {
  return withApiAuth(handler, undefined, { requireAuth: false });
}

export function withResourceAuth(
  resource: string,
  action: string
) {
  return function(handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>) {
    return withApiAuth(handler, { resource, action });
  };
}

export function withConditionalAuth(
  permissionChecker: (context: ApiContext) => boolean
) {
  return function(handler: (req: NextRequest, context: ApiContext) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Authentication required',
              code: 'UNAUTHORIZED'
            },
            { status: 401 }
          );
        }

        const userRole = (session.user as { role?: UserRole })?.role as UserRole;
        const userId = session.user.id;

        const context: ApiContext = {
          userId,
          userRole,
          session,
          request: req
        };

        if (!permissionChecker(context)) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Access denied',
              code: 'FORBIDDEN'
            },
            { status: 403 }
          );
        }

        return await handler(req, context);
      } catch (error) {
        console.error('Conditional Auth Error:', error);
        return NextResponse.json(
          { 
            success: false,
            error: 'Internal server error',
            code: 'INTERNAL_ERROR'
          },
          { status: 500 }
        );
      }
    };
  };
}

export function createApiResponse(data: unknown, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function createSuccessResponse(data: unknown, message?: string) {
  return NextResponse.json({ 
    success: true, 
    data, 
    ...(message && { message }) 
  });
}

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const key = identifier;
  const current = rateLimitMap.get(key);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
}

// CSRF protection helper
export function validateCSRF(req: NextRequest): boolean {
  const token = req.headers.get('x-csrf-token');
  const session = req.headers.get('x-session-token');
  
  // In a real implementation, you would validate the CSRF token
  // against the session token
  return !!(token && session);
}

// Input validation helper
export function validateRequired(data: Record<string, unknown>, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      return `Field '${field}' is required`;
    }
  }
  return null;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
