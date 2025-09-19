import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const communities = await prisma.community.findMany({
      include: {
        _count: {
          select: {
            members: true
          }
        }
      },
      orderBy: {
        memberCount: 'desc'
      }
    });

    return NextResponse.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
      { status: 500 }
    );
  }
}
