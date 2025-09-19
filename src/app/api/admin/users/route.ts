import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logUserEvent } from '@/lib/audit';
import { withAdminAuth, createSuccessResponse, createErrorResponse, rateLimit } from '@/lib/api-protection';

export const GET = withAdminAuth(async (request: NextRequest, context) => {
  try {
    // Rate limiting
    if (!rateLimit(context.userId!, 100, 15 * 60 * 1000)) {
      return createErrorResponse('Rate limit exceeded', 429);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    if (status === 'active') {
      where.lockedUntil = null;
    } else if (status === 'locked') {
      where.lockedUntil = { gt: new Date() };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          coins: true,
          level: true,
          twoFactorEnabled: true,
          lastLogin: true,
          loginAttempts: true,
          lockedUntil: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return createSuccessResponse({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    return createErrorResponse('Internal server error', 500);
  }
});

export const POST = withAdminAuth(async (request: NextRequest, context) => {
  try {
    // Rate limiting
    if (!rateLimit(context.userId!, 50, 15 * 60 * 1000)) {
      return createErrorResponse('Rate limit exceeded', 429);
    }

    const { name, email, password, role } = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'password', 'role'];
    const requestData = { name, email, password, role };
    const missingField = requiredFields.find(field => !requestData[field as keyof typeof requestData]);
    if (missingField) {
      return createErrorResponse(`Missing required field: ${missingField}`, 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return createErrorResponse('User already exists with this email', 400);
    }

    // Hash password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as 'PLAYER' | 'DEVELOPER' | 'ADMIN' | 'MODERATOR',
        coins: 100,
        level: 1,
        experience: 0
      }
    });

    // Log the user creation
    await logUserEvent('CREATE', newUser.id, context.userId!, request, {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unusedPassword, ...userWithoutPassword } = newUser;

    return createSuccessResponse(userWithoutPassword, 'User created successfully');

  } catch (error) {
    console.error('Create user error:', error);
    return createErrorResponse('Internal server error', 500);
  }
});
