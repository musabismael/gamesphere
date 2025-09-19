import { NextResponse } from 'next/server';
import { GameGenre } from '@prisma/client';

export async function GET() {
  try {
    // Return all available game genres from the enum
    const genres = Object.values(GameGenre).map(genre => ({
      id: genre,
      name: genre.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
      slug: genre.toLowerCase()
    }));

    return NextResponse.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch genres' },
      { status: 500 }
    );
  }
}
