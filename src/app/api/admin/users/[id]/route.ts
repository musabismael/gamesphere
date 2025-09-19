import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logUserEvent } from '@/lib/audit';
import { withRateLimit } from '@/lib/rate-limit';

const adminRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100
});

export const GET = adminRateLimit(async (
  request: NextRequest,
  context?: { params: Promise<{ [key: string]: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const params = await context?.params || {};
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        coins: true,
        level: true,
        experience: true,
        twoFactorEnabled: true,
        lastLogin: true,
        loginAttempts: true,
        lockedUntil: true,
        createdAt: true,
        updatedAt: true,
        games: {
          select: {
            id: true,
            title: true,
            isPublished: true,
            playCount: true,
            averageRating: true,
            createdAt: true
          }
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            createdAt: true,
            game: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const PUT = adminRateLimit(async (
  request: NextRequest,
  context?: { params: Promise<{ [key: string]: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const params = await context?.params || {};
    const { name, email, role, coins, level, experience } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is already taken by another user
    if (email && email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email }
      });

      if (emailTaken) {
        return NextResponse.json(
          { success: false, error: 'Email already taken' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(coins !== undefined && { coins }),
        ...(level !== undefined && { level }),
        ...(experience !== undefined && { experience })
      }
    });

    // Log the user update
    await logUserEvent('UPDATE', params.id, session.user.id, request, {
      changes: {
        name: name !== existingUser.name ? { from: existingUser.name, to: name } : undefined,
        email: email !== existingUser.email ? { from: existingUser.email, to: email } : undefined,
        role: role !== existingUser.role ? { from: existingUser.role, to: role } : undefined,
        coins: coins !== existingUser.coins ? { from: existingUser.coins, to: coins } : undefined,
        level: level !== existingUser.level ? { from: existingUser.level, to: level } : undefined,
        experience: experience !== existingUser.experience ? { from: existingUser.experience, to: experience } : undefined
      }
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unusedPassword, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const DELETE = adminRateLimit(async (
  request: NextRequest,
  context?: { params: Promise<{ [key: string]: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const params = await context?.params || {};
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent admin from deleting themselves
    if (params.id === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Delete user
    await prisma.user.delete({
      where: { id: params.id }
    });

    // Log the user deletion
    await logUserEvent('DELETE', params.id, session.user.id, request, {
      deletedUser: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});
