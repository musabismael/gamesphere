import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const developers = await prisma.user.findMany({
      where: {
        role: 'DEVELOPER'
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            games: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(developers);
  } catch (error) {
    console.error('Error fetching developers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch developers' },
      { status: 500 }
    );
  }
}
