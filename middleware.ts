import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

// Type for token
interface Token {
  role?: string;
  sub?: string;
}

// Helper function to check if user role is in allowed roles
function hasAllowedRole(userRole: string | undefined, allowedRoles: readonly string[]): boolean {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
}

// Define route access rules
const ROUTE_ACCESS_RULES = {
  // Admin only routes
  admin: {
    roles: ['ADMIN'] as const,
    paths: ['/admin']
  },
  // Developer and Admin routes
  developer: {
    roles: ['DEVELOPER', 'ADMIN'] as const,
    paths: ['/developer', '/dashboard']
  },
  // Moderator and above routes
  moderator: {
    roles: ['MODERATOR', 'DEVELOPER', 'ADMIN'] as const,
    paths: ['/moderate']
  },
  // Authenticated user routes
  authenticated: {
    roles: ['PLAYER', 'MODERATOR', 'DEVELOPER', 'ADMIN'] as const,
    paths: ['/profile', '/settings', '/upload-game', '/game/[id]/play']
  }
} as const;

// API route access rules
const API_ACCESS_RULES = {
  admin: {
    roles: ['ADMIN'] as const,
    paths: ['/api/admin']
  },
  developer: {
    roles: ['DEVELOPER', 'ADMIN'] as const,
    paths: ['/api/developers', '/api/analytics']
  },
  authenticated: {
    roles: ['PLAYER', 'MODERATOR', 'DEVELOPER', 'ADMIN'] as const,
    paths: ['/api/profile', '/api/settings', '/api/games/upload']
  }
} as const;

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const userRole = token?.role as string;

    // Skip middleware for static files and Next.js internals
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.startsWith('/icons/') ||
      pathname.startsWith('/characters/') ||
      pathname === '/favicon.ico' ||
      pathname === '/manifest.json' ||
      pathname === '/sw.js' ||
      pathname.endsWith('.svg') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.jpeg') ||
      pathname.endsWith('.gif') ||
      pathname.endsWith('.webp') ||
      pathname.endsWith('.ico')
    ) {
      return NextResponse.next();
    }

    // Handle API routes
    if (pathname.startsWith('/api/')) {
      return handleApiAccess(req, pathname, token, userRole);
    }

    // Handle page routes
    return handlePageAccess(req, pathname, token, userRole);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/games',
          '/genres',
          '/developers',
          '/community',
          '/contact',
          '/help',
          '/privacy',
          '/terms',
          '/cookies',
          '/signin',
          '/signup',
          '/forgot-password',
          '/game',
          '/manifest.json',
          '/sw.js',
          '/api/auth',
          '/api/community',
          '/api/genres',
          '/api/notifications',
          '/api/payments'
        ];

        // Check if the route is public
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || pathname.startsWith(route + '/')
        );

        if (isPublicRoute) {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
  }
);

// Handle API route access control
function handleApiAccess(
  req: NextRequestWithAuth,
  pathname: string,
  token: Token | null,
  userRole: string | undefined
): NextResponse {
  // Check each API access rule
  for (const [, rule] of Object.entries(API_ACCESS_RULES)) {
    const hasAccess = rule.paths.some(path => pathname.startsWith(path));
    
    if (hasAccess) {
      if (!token) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Authentication required',
            code: 'UNAUTHORIZED'
          }, 
          { status: 401 }
        );
      }

      if (!hasAllowedRole(userRole, rule.roles)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Insufficient permissions',
            code: 'FORBIDDEN',
            requiredRole: rule.roles[0]
          }, 
          { status: 403 }
        );
      }

      return NextResponse.next();
    }
  }

  // For other API routes, require authentication
  if (!token) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      }, 
      { status: 401 }
    );
  }

  return NextResponse.next();
}

// Handle page route access control
function handlePageAccess(
  req: NextRequestWithAuth,
  pathname: string,
  token: Token | null,
  userRole: string | undefined
): NextResponse {
  // Check each route access rule
  for (const [, rule] of Object.entries(ROUTE_ACCESS_RULES)) {
    const hasAccess = rule.paths.some(path => {
      // Handle dynamic routes like /game/[id]
      if (path.includes('[') && path.includes(']')) {
        const pattern = path.replace(/\[.*?\]/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(pathname);
      }
      return pathname.startsWith(path);
    });
    
    if (hasAccess) {
      if (!token) {
        const callbackUrl = encodeURIComponent(pathname);
        return NextResponse.redirect(
          new URL(`/signin?callbackUrl=${callbackUrl}`, req.url)
        );
      }

      if (!hasAllowedRole(userRole, rule.roles)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      return NextResponse.next();
    }
  }

  // For other protected routes, require authentication
  const protectedRoutes = ['/profile', '/settings', '/upload-game'];
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/signin?callbackUrl=${callbackUrl}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - static assets
     */
    '/admin/:path*',
    '/api/:path*',
    '/developer/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/upload-game/:path*',
  ],
};
