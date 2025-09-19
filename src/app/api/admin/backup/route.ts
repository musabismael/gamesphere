import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createDatabaseBackup, listBackups } from '@/lib/backup';
import { withRateLimit } from '@/lib/rate-limit';

const adminRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10
});

export const GET = adminRateLimit(async () => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const backups = await listBackups();

    return NextResponse.json({
      success: true,
      data: backups
    });

  } catch (error) {
    console.error('List backups error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list backups' },
      { status: 500 }
    );
  }
});

export const POST = adminRateLimit(async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { 
      includeUsers = true,
      includeGames = true,
      includeReviews = true,
      includeAnalytics = true,
      compress = false
    } = await request.json();

    const result = await createDatabaseBackup({
      includeUsers,
      includeGames,
      includeReviews,
      includeAnalytics,
      compress
    });

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Create backup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create backup' },
      { status: 500 }
    );
  }
});
