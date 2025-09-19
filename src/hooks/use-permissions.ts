'use client';

import { useSession } from 'next-auth/react';
import { 
  UserRole, 
  Permission, 
  hasPermission, 
  hasPermissionWithContext,
  canPerformAction,
  hasAnyPermission,
  hasAllPermissions,
  getRolePermissions
} from '@/lib/permissions';

export function usePermissions() {
  const { data: session, status } = useSession();
  const userRole = (session?.user as { role?: UserRole })?.role as UserRole;

  const can = (permission: Permission, context?: Record<string, unknown>): boolean => {
    if (status === 'loading' || !userRole) return false;
    return hasPermission(userRole, permission, context);
  };

  const canWithContext = (permission: Permission, context?: Record<string, unknown>): boolean => {
    if (status === 'loading' || !userRole) return false;
    return hasPermissionWithContext(userRole, permission, context);
  };

  const canPerform = (resource: string, action: string, context?: Record<string, unknown>): boolean => {
    if (status === 'loading' || !userRole) return false;
    return canPerformAction(userRole, resource, action, context);
  };

  const canAny = (permissions: Permission[], context?: Record<string, unknown>): boolean => {
    if (status === 'loading' || !userRole) return false;
    return hasAnyPermission(userRole, permissions, context);
  };

  const canAll = (permissions: Permission[], context?: Record<string, unknown>): boolean => {
    if (status === 'loading' || !userRole) return false;
    return hasAllPermissions(userRole, permissions, context);
  };

  const getPermissions = (): Permission[] => {
    if (status === 'loading' || !userRole) return [];
    return getRolePermissions(userRole);
  };

  const hasRole = (role: UserRole): boolean => {
    if (status === 'loading' || !userRole) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      PLAYER: 1,
      MODERATOR: 2,
      DEVELOPER: 3,
      ADMIN: 4,
    };

    return roleHierarchy[userRole] >= roleHierarchy[role];
  };

  const isAdmin = (): boolean => hasRole('ADMIN');
  const isDeveloper = (): boolean => hasRole('DEVELOPER');
  const isPlayer = (): boolean => hasRole('PLAYER');

  return {
    can,
    canWithContext,
    canPerform,
    canAny,
    canAll,
    getPermissions,
    hasRole,
    isAdmin,
    isDeveloper,
    isPlayer,
    userRole,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  };
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = usePermissions();
  
  return {
    isAuthenticated,
    isLoading,
    redirectTo: isAuthenticated ? null : '/signin',
  };
}

export function useRequireRole(requiredRole: UserRole) {
  const { hasRole, isLoading, isAuthenticated } = usePermissions();
  
  return {
    hasAccess: hasRole(requiredRole),
    isLoading,
    isAuthenticated,
    redirectTo: !isAuthenticated ? '/signin' : !hasRole(requiredRole) ? '/unauthorized' : null,
  };
}
