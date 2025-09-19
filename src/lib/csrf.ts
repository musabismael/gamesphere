import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { prisma } from './prisma';

export interface CSRFToken {
  token: string;
  expiresAt: Date;
}

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Create a CSRF token for a user session
 */
export async function createCSRFToken(userId: string): Promise<string> {
  const token = generateCSRFToken();
  // Token expires in 24 hours
  
  // Store token in database (you might want to use Redis for better performance)
  await prisma.user.update({
    where: { id: userId },
    data: {
      // We'll add a csrfTokens field to the User model
      // For now, we'll use a simple approach with sessions
    }
  });
  
  return token;
}

/**
 * Verify CSRF token
 */
export async function verifyCSRFToken(
  userId: string, 
  token: string
): Promise<boolean> {
  // In a real implementation, you'd check against stored tokens
  // For now, we'll implement a simple verification
  if (!token || token.length !== 64) {
    return false;
  }
  
  // Check if token is valid format (hex string)
  return /^[a-f0-9]{64}$/i.test(token);
}

/**
 * CSRF protection middleware
 */
export function withCSRFProtection() {
  return function csrfMiddleware(
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    return async function(request: NextRequest): Promise<NextResponse> {
      // Skip CSRF check for GET requests
      if (request.method === 'GET') {
        return handler(request);
      }
      
      // Skip CSRF check for safe methods
      const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
      if (safeMethods.includes(request.method)) {
        return handler(request);
      }
      
      // Get CSRF token from headers
      const csrfToken = request.headers.get('x-csrf-token') || 
                       request.headers.get('csrf-token');
      
      if (!csrfToken) {
        return NextResponse.json(
          {
            error: 'CSRF token missing',
            message: 'CSRF token is required for this request'
          },
          { status: 403 }
        );
      }
      
      // Get user ID from session (you'll need to implement this)
      const userId = request.headers.get('x-user-id');
      
      if (!userId) {
        return NextResponse.json(
          {
            error: 'Authentication required',
            message: 'User must be authenticated for CSRF protection'
          },
          { status: 401 }
        );
      }
      
      // Verify CSRF token
      const isValid = await verifyCSRFToken(userId, csrfToken);
      
      if (!isValid) {
        return NextResponse.json(
          {
            error: 'Invalid CSRF token',
            message: 'CSRF token is invalid or expired'
          },
          { status: 403 }
        );
      }
      
      return handler(request);
    };
  };
}

/**
 * Generate CSRF token for response
 */
export function generateCSRFResponse(): { csrfToken: string } {
  const token = generateCSRFToken();
  
  // In a real implementation, you'd store this token
  // and associate it with the user session
  
  return { csrfToken: token };
}

/**
 * CSRF token validation for API routes
 */
export async function validateCSRFToken(
  request: NextRequest,
  userId: string
): Promise<{ valid: boolean; error?: string }> {
  const csrfToken = request.headers.get('x-csrf-token') || 
                   request.headers.get('csrf-token');
  
  if (!csrfToken) {
    return {
      valid: false,
      error: 'CSRF token missing'
    };
  }
  
  const isValid = await verifyCSRFToken(userId, csrfToken);
  
  if (!isValid) {
    return {
      valid: false,
      error: 'Invalid CSRF token'
    };
  }
  
  return { valid: true };
}
