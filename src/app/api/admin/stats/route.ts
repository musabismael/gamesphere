import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit';

const adminRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100
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
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get current date for calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all stats in parallel
    const [
      totalUsers,
      activeUsers,
      totalGames,
      publishedGames,
      totalPlays,
      averageRating,
      monthlyRevenue,
      totalRevenue,
      lockedUsers,
      recentLogins
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Active users (logged in within last 30 days)
      prisma.user.count({
        where: {
          lastLogin: {
            gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Total games
      prisma.game.count(),
      
      // Published games
      prisma.game.count({
        where: { isPublished: true }
      }),
      
      // Total plays (sum of all play sessions)
      prisma.playSession.count(),
      
      // Average rating
      prisma.review.aggregate({
        _avg: { rating: true }
      }),
      
      // Monthly revenue (this month)
      prisma.payment.aggregate({
        where: {
          createdAt: { gte: startOfMonth },
          status: 'COMPLETED'
        },
        _sum: { amount: true }
      }),
      
      // Total revenue
      prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      }),
      
      // Locked users
      prisma.user.count({
        where: {
          lockedUntil: { gt: now }
        }
      }),
      
      // Recent logins (last 24 hours)
      prisma.user.count({
        where: {
          lastLogin: {
            gte: new Date(now.getTime() - 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    // Calculate system health based on various factors
    const systemHealth = Math.min(100, Math.max(0, 
      100 - (lockedUsers * 2) - (recentLogins < 10 ? 5 : 0)
    ));

    // Calculate security alerts (simplified)
    const securityAlerts = Math.max(0, lockedUsers + (recentLogins < 5 ? 1 : 0));

    const stats = {
      totalUsers,
      activeUsers,
      totalGames,
      publishedGames,
      totalRevenue: totalRevenue._sum.amount || 0,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      totalPlays,
      averageRating: averageRating._avg.rating || 0,
      systemHealth: Math.round(systemHealth),
      securityAlerts,
      lockedUsers,
      recentLogins
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});
