import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { verifyTwoFactorToken } from '@/lib/2fa';
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

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const result = await verifyTwoFactorToken(session.user.id, token);
    
    if (result.isValid) {
      await logAuthEvent('2FA_VERIFIED', session.user.id, request, {
        backupCodeUsed: result.backupCodeUsed,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        message: '2FA verified successfully',
        backupCodeUsed: result.backupCodeUsed
      });
    } else {
      await logAuthEvent('2FA_VERIFICATION_FAILED', session.user.id, request, {
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('2FA verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
