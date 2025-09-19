import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export type UserRole = 'PLAYER' | 'DEVELOPER' | 'ADMIN' | 'MODERATOR';

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
}

// Define base permissions first
const PLAYER_PERMISSIONS = {
  VIEW_PROFILE: { resource: 'profile', action: 'read' },
  EDIT_PROFILE: { resource: 'profile', action: 'update' },
  VIEW_GAMES: { resource: 'games', action: 'read' },
  PLAY_GAMES: { resource: 'games', action: 'play' },
  RATE_GAMES: { resource: 'games', action: 'rate' },
  COMMENT_GAMES: { resource: 'games', action: 'comment' },
  VIEW_COMMUNITY: { resource: 'community', action: 'read' },
  PARTICIPATE_COMMUNITY: { resource: 'community', action: 'participate' },
} as const;

const DEVELOPER_PERMISSIONS = {
  ...PLAYER_PERMISSIONS,
  UPLOAD_GAMES: { resource: 'games', action: 'create' },
  EDIT_GAMES: { resource: 'games', action: 'update', conditions: { owner: true } },
  DELETE_GAMES: { resource: 'games', action: 'delete', conditions: { owner: true } },
  VIEW_ANALYTICS: { resource: 'analytics', action: 'read' },
  MANAGE_GAME_COMMENTS: { resource: 'comments', action: 'moderate', conditions: { owner: true } },
  ACCESS_DEVELOPER_DASHBOARD: { resource: 'dashboard', action: 'read' },
} as const;

const ADMIN_PERMISSIONS = {
  ...DEVELOPER_PERMISSIONS,
  MANAGE_USERS: { resource: 'users', action: 'manage' },
  MANAGE_ALL_GAMES: { resource: 'games', action: 'manage' },
  MANAGE_GENRES: { resource: 'genres', action: 'manage' },
  MANAGE_COMMUNITY: { resource: 'community', action: 'moderate' },
  VIEW_AUDIT_LOGS: { resource: 'audit', action: 'read' },
  MANAGE_SYSTEM: { resource: 'system', action: 'manage' },
  ACCESS_ADMIN_PANEL: { resource: 'admin', action: 'access' },
} as const;

// Define PERMISSIONS as a const assertion to avoid circular dependency issues
const PERMISSIONS = {
  PLAYER: PLAYER_PERMISSIONS,
  MODERATOR: PLAYER_PERMISSIONS, // Moderators have same permissions as players for now
  DEVELOPER: DEVELOPER_PERMISSIONS,
  ADMIN: ADMIN_PERMISSIONS,
} as const;

export { PERMISSIONS };

export function hasPermission(
  userRole: UserRole,
  permission: Permission,
  context?: Record<string, unknown>
): boolean {
  const rolePermissions = PERMISSIONS[userRole];
  if (!rolePermissions) return false;

  // Check if permission exists in role
  const hasRolePermission = Object.values(rolePermissions).some(p => 
    p.resource === permission.resource && p.action === permission.action
  );

  if (!hasRolePermission) return false;

  // Check conditions if they exist
  if (permission.conditions && context) {
    return Object.entries(permission.conditions).every(([key, value]) => {
      return context[key] === value;
    });
  }

  return true;
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const routePermissions: Record<string, Permission> = {
    '/admin': { resource: 'admin', action: 'access' },
    '/developer': { resource: 'dashboard', action: 'read' },
    '/dashboard': { resource: 'dashboard', action: 'read' },
    '/profile': { resource: 'profile', action: 'read' },
    '/settings': { resource: 'profile', action: 'update' },
    '/upload-game': { resource: 'games', action: 'create' },
    '/moderate': { resource: 'community', action: 'moderate' },
  };

  const permission = routePermissions[route];
  if (!permission) return true; // Public route

  return hasPermission(userRole, permission);
}

export function canAccessApiRoute(userRole: UserRole, route: string): boolean {
  const apiRoutePermissions: Record<string, Permission> = {
    '/api/admin': { resource: 'admin', action: 'access' },
    '/api/developers': { resource: 'dashboard', action: 'read' },
    '/api/analytics': { resource: 'analytics', action: 'read' },
    '/api/profile': { resource: 'profile', action: 'read' },
    '/api/settings': { resource: 'profile', action: 'update' },
    '/api/games/upload': { resource: 'games', action: 'create' },
  };

  // Check if any API route matches
  for (const [apiRoute, permission] of Object.entries(apiRoutePermissions)) {
    if (route.startsWith(apiRoute)) {
      return hasPermission(userRole, permission);
    }
  }

  return true; // Default to allowing access for unmatched routes
}

export async function getCurrentUserRole(): Promise<UserRole | null> {
  const session = await getServerSession(authOptions);
  return (session?.user as { role?: UserRole })?.role || null;
}

export function requirePermission(permission: Permission, context?: Record<string, unknown>) {
  return async function handler(req: unknown, res: { status: (code: number) => { json: (data: unknown) => void } }, next: () => void) {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: UserRole })?.role as UserRole;

    if (!userRole || !hasPermission(userRole, permission, context)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    return next();
  };
}

export function requireRole(requiredRole: UserRole) {
  return async function handler(req: unknown, res: { status: (code: number) => { json: (data: unknown) => void } }, next: () => void) {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: UserRole })?.role as UserRole;

    if (!userRole) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const roleHierarchy: Record<UserRole, number> = {
      PLAYER: 1,
      MODERATOR: 2,
      DEVELOPER: 3,
      ADMIN: 4,
    };

    if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
      return res.status(403).json({ error: 'Insufficient role level' });
    }

    return next();
  };
}

// Enhanced permission checking with context
export function hasPermissionWithContext(
  userRole: UserRole,
  permission: Permission,
  context?: Record<string, unknown>
): boolean {
  if (!hasPermission(userRole, permission, context)) {
    return false;
  }

  // Additional context-based checks
  if (permission.conditions) {
    return Object.entries(permission.conditions).every(([key, value]) => {
      return context?.[key] === value;
    });
  }

  return true;
}

// Check if user can perform action on specific resource
export function canPerformAction(
  userRole: UserRole,
  resource: string,
  action: string,
  context?: Record<string, unknown>
): boolean {
  const permission: Permission = { resource, action, conditions: context };
  return hasPermission(userRole, permission, context);
}

// Get all permissions for a role
export function getRolePermissions(userRole: UserRole): Permission[] {
  const rolePermissions = PERMISSIONS[userRole];
  if (!rolePermissions) return [];
  
  return Object.values(rolePermissions);
}

// Check if user has any of the specified permissions
export function hasAnyPermission(
  userRole: UserRole,
  permissions: Permission[],
  context?: Record<string, unknown>
): boolean {
  return permissions.some(permission => 
    hasPermission(userRole, permission, context)
  );
}

// Check if user has all of the specified permissions
export function hasAllPermissions(
  userRole: UserRole,
  permissions: Permission[],
  context?: Record<string, unknown>
): boolean {
  return permissions.every(permission => 
    hasPermission(userRole, permission, context)
  );
}
