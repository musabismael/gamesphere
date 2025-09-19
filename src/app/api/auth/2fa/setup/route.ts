import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateTwoFactorSecret } from '@/lib/2fa';
import { logAuthEvent } from '@/lib/audit';
import { withRateLimit } from '@/lib/rate-limit';
import { RATE_LIMITS } from '@/lib/rate-limit';

const rateLimitedHandler = withRateLimit(RATE_LIMITS.TWO_FACTOR);

export const POST = rateLimitedHandler(async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const setup = await generateTwoFactorSecret(session.user.id);
    
    // Log the 2FA setup attempt
    await logAuthEvent('2FA_SETUP_ATTEMPT', session.user.id, request, {
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: setup
    });

  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});
