import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { enableTwoFactor } from '@/lib/2fa';
import { logAuthEvent } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { secret, token } = await request.json();

    if (!secret || !token) {
      return NextResponse.json(
        { success: false, error: 'Secret and token are required' },
        { status: 400 }
      );
    }

    const success = await enableTwoFactor(session.user.id, secret, token);
    
    if (success) {
      await logAuthEvent('2FA_ENABLED', session.user.id, request, {
        timestamp: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        message: '2FA enabled successfully'
      });
    } else {
      await logAuthEvent('2FA_ENABLE_FAILED', session.user.id, request, {
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('2FA enable error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
