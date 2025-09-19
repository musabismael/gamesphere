import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPaymentIntent } from '@/lib/payments';
import { withRateLimit } from '@/lib/rate-limit';

const paymentRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10
});

export const POST = paymentRateLimit(async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { amount, currency, gameId, description } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        { success: false, error: 'Currency is required' },
        { status: 400 }
      );
    }

    const result = await createPaymentIntent({
      amount,
      currency,
      userId: session.user.id,
      gameId,
      description
    });

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
});
