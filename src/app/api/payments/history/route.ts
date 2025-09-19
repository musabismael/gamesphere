import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserPaymentHistory } from '@/lib/payments';
import { withRateLimit } from '@/lib/rate-limit';

const paymentRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 50
});

export const GET = paymentRateLimit(async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await getUserPaymentHistory(session.user.id, page, limit);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get payment history error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get payment history' },
      { status: 500 }
    );
  }
});
