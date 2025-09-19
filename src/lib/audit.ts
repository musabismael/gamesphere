import { prisma } from './prisma';
import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';

export interface AuditLogData {
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(data: AuditLogData): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        details: data.details as Prisma.InputJsonValue,
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error to avoid breaking the main operation
  }
}

/**
 * Extract client information from request
 */
export function extractClientInfo(request: NextRequest): { ipAddress?: string; userAgent?: string } {
  const ipAddress = request.headers.get('x-forwarded-for') || 
    request.headers.get('x-real-ip') || 
    'unknown';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';

  return { ipAddress, userAgent };
}

/**
 * Log user authentication events
 */
export async function logAuthEvent(
  action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | '2FA_ENABLED' | '2FA_DISABLED' | '2FA_ENABLE_FAILED' | '2FA_SETUP_ATTEMPT' | '2FA_VERIFY_ATTEMPT' | '2FA_VERIFY_FAILED' | '2FA_VERIFIED' | '2FA_VERIFICATION_FAILED',
  userId?: string,
  request?: NextRequest,
  details?: Record<string, unknown>
): Promise<void> {
  const clientInfo = request ? extractClientInfo(request) : {};
  
  await createAuditLog({
    action,
    resource: 'AUTH',
    resourceId: userId,
    details: {
      ...details,
      timestamp: new Date().toISOString()
    },
    userId,
    ...clientInfo
  });
}

/**
 * Log user management events
 */
export async function logUserEvent(
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ROLE_CHANGE' | 'LOCK' | 'UNLOCK',
  targetUserId: string,
  adminUserId: string,
  request?: NextRequest,
  details?: Record<string, unknown>
): Promise<void> {
  const clientInfo = request ? extractClientInfo(request) : {};
  
  await createAuditLog({
    action,
    resource: 'USER',
    resourceId: targetUserId,
    details: {
      ...details,
      adminUserId,
      timestamp: new Date().toISOString()
    },
    userId: adminUserId,
    ...clientInfo
  });
}

/**
 * Log game management events
 */
export async function logGameEvent(
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'FEATURE' | 'UNFEATURE' | 'APPROVE' | 'REJECT',
  gameId: string,
  userId: string,
  request?: NextRequest,
  details?: Record<string, unknown>
): Promise<void> {
  const clientInfo = request ? extractClientInfo(request) : {};
  
  await createAuditLog({
    action,
    resource: 'GAME',
    resourceId: gameId,
    details: {
      ...details,
      timestamp: new Date().toISOString()
    },
    userId,
    ...clientInfo
  });
}

/**
 * Log system events
 */
export async function logSystemEvent(
  action: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, unknown>,
  request?: NextRequest
): Promise<void> {
  const clientInfo = request ? extractClientInfo(request) : {};
  
  await createAuditLog({
    action,
    resource,
    resourceId,
    details: {
      ...details,
      timestamp: new Date().toISOString()
    },
    ...clientInfo
  });
}

/**
 * Get audit logs with pagination
 */
export async function getAuditLogs(
  page: number = 1,
  limit: number = 50,
  filters?: {
    action?: string;
    resource?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }
) {
  const skip = (page - 1) * limit;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  
  if (filters?.action) {
    where.action = filters.action;
  }
  
  if (filters?.resource) {
    where.resource = filters.resource;
  }
  
  if (filters?.userId) {
    where.userId = filters.userId;
  }
  
  if (filters?.startDate || filters?.endDate) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where.createdAt = {} as any;
    if (filters.startDate) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (where.createdAt as any).gte = filters.startDate;
    }
    if (filters.endDate) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (where.createdAt as any).lte = filters.endDate;
    }
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    }),
    prisma.auditLog.count({ where })
  ]);

  return {
    logs,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  };
}
