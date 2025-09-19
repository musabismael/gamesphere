import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logGameEvent } from '@/lib/audit';
import { withRateLimit } from '@/lib/rate-limit';

const adminRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100
});

export const GET = adminRateLimit(async (request: NextRequest) => {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const genre = searchParams.get('genre') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status === 'published') {
      where.isPublished = true;
    } else if (status === 'pending') {
      where.isPublished = false;
    }
    
    if (genre) {
      where.genre = { has: genre };
    }

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          developer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              reviews: true,
              playSessions: true
            }
          }
        }
      }),
      prisma.game.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        games,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Get games error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const PUT = adminRateLimit(async (request: NextRequest) => {
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

    const { gameId, action, reason } = await request.json();

    if (!gameId || !action) {
      return NextResponse.json(
        { success: false, error: 'Game ID and action are required' },
        { status: 400 }
      );
    }

    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        developer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      );
    }

    let updateData: Record<string, unknown> = {};
    let logAction: 'PUBLISH' | 'UNPUBLISH' | 'FEATURE' | 'UNFEATURE' | 'APPROVE' | 'REJECT' = 'PUBLISH';

    switch (action) {
      case 'publish':
        updateData = { isPublished: true, publishedAt: new Date() };
        logAction = 'PUBLISH';
        break;
      case 'unpublish':
        updateData = { isPublished: false };
        logAction = 'UNPUBLISH';
        break;
      case 'feature':
        updateData = { isFeatured: true };
        logAction = 'FEATURE';
        break;
      case 'unfeature':
        updateData = { isFeatured: false };
        logAction = 'UNFEATURE';
        break;
      case 'approve':
        updateData = { isPublished: true, publishedAt: new Date() };
        logAction = 'APPROVE';
        break;
      case 'reject':
        updateData = { isPublished: false };
        logAction = 'REJECT';
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Update game
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: updateData
    });

    // Log the action
    await logGameEvent(logAction, gameId, session.user.id, request, {
      reason,
      previousStatus: {
        isPublished: game.isPublished,
        isFeatured: game.isFeatured
      },
      newStatus: {
        isPublished: updatedGame.isPublished,
        isFeatured: updatedGame.isFeatured
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedGame,
      message: `Game ${action}ed successfully`
    });

  } catch (error) {
    console.error('Update game error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});
