import Stripe from 'stripe';
import { prisma } from './prisma';
import { WalletTransactionType } from '@prisma/client';

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    })
  : null;

export interface CreatePaymentIntentData {
  amount: number;
  currency: string;
  userId: string;
  gameId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateSubscriptionData {
  userId: string;
  plan: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
}

/**
 * Create a payment intent for a game purchase
 */
export async function createPaymentIntent(data: CreatePaymentIntentData) {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency.toLowerCase(),
      metadata: {
        userId: data.userId,
        gameId: data.gameId || '',
        ...data.metadata
      },
      description: data.description || 'Game purchase',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        amount: data.amount,
        currency: data.currency,
        status: 'PENDING',
        paymentMethod: 'stripe',
        paymentIntentId: paymentIntent.id,
        description: data.description,
        metadata: data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : undefined,
        userId: data.userId,
        gameId: data.gameId
      }
    });

    return {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
}

/**
 * Confirm payment and update status
 */
export async function confirmPayment(paymentIntentId: string) {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment not succeeded');
    }

    // Find payment by paymentIntentId first
    const existingPayment = await prisma.payment.findFirst({
      where: { paymentIntentId }
    });

    if (!existingPayment) {
      throw new Error('Payment not found');
    }

    // Update payment status in database
    const payment = await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        status: 'COMPLETED',
        transactionId: paymentIntent.id,
        updatedAt: new Date()
      },
      include: {
        user: true,
        game: true
      }
    });

    // Add coins to user's wallet if it's a game purchase
    if (payment.gameId) {
      await addCoinsToWallet(payment.userId, Math.floor(payment.amount), 'Game purchase');
    }

    return payment;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw new Error('Failed to confirm payment');
  }
}

/**
 * Create a subscription
 */
export async function createSubscription(data: CreateSubscriptionData) {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }

    // Create customer if doesn't exist
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: data.userId, // Using userId as email for now
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: data.userId,
        metadata: { userId: data.userId }
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price_data: {
          currency: data.currency.toLowerCase(),
          product: `${data.plan} Plan`,
          unit_amount: Math.round(data.price * 100),
          recurring: {
            interval: data.interval,
          },
        },
      }],
      metadata: {
        userId: data.userId,
        plan: data.plan
      }
    });

    // Create subscription record in database
    const dbSubscription = await prisma.subscription.create({
      data: {
        status: 'ACTIVE',
        plan: data.plan,
        price: data.price,
        currency: data.currency,
        interval: data.interval,
        currentPeriodStart: new Date((subscription as unknown as { current_period_start: number }).current_period_start * 1000),
        currentPeriodEnd: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000),
        stripeSubscriptionId: subscription.id,
        userId: data.userId
      }
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: (subscription as unknown as { latest_invoice: string }).latest_invoice,
      dbSubscription
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription');
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }

    // Cancel subscription in Stripe
    await stripe.subscriptions.cancel(subscriptionId);

    // Find subscription by stripeSubscriptionId first
    const existingSubscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId }
    });

    if (!existingSubscription) {
      throw new Error('Subscription not found');
    }

    // Update subscription status in database
    const subscription = await prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: true
      }
    });

    return subscription;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}

/**
 * Get or create user wallet
 */
export async function getUserWallet(userId: string) {
  let wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: {
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });
  }

  return wallet;
}

/**
 * Add coins to user wallet
 */
export async function addCoinsToWallet(
  userId: string, 
  amount: number, 
  description: string,
  type: WalletTransactionType = 'REWARD'
) {
  try {
    const wallet = await getUserWallet(userId);

    // Update wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: wallet.balance + amount
      }
    });

    // Create transaction record
    await prisma.walletTransaction.create({
      data: {
        amount,
        type,
        description,
        walletId: wallet.id
      }
    });

    // Update user coins
    await prisma.user.update({
      where: { id: userId },
      data: {
        coins: { increment: amount }
      }
    });

    return updatedWallet;
  } catch (error) {
    console.error('Error adding coins to wallet:', error);
    throw new Error('Failed to add coins to wallet');
  }
}

/**
 * Deduct coins from user wallet
 */
export async function deductCoinsFromWallet(
  userId: string, 
  amount: number, 
  description: string
) {
  try {
    const wallet = await getUserWallet(userId);

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Update wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: wallet.balance - amount
      }
    });

    // Create transaction record
    await prisma.walletTransaction.create({
      data: {
        amount: -amount, // Negative amount for deduction
        type: 'PAYMENT',
        description,
        walletId: wallet.id
      }
    });

    // Update user coins
    await prisma.user.update({
      where: { id: userId },
      data: {
        coins: { decrement: amount }
      }
    });

    return updatedWallet;
  } catch (error) {
    console.error('Error deducting coins from wallet:', error);
    throw new Error('Failed to deduct coins from wallet');
  }
}

/**
 * Get user payment history
 */
export async function getUserPaymentHistory(userId: string, page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        game: {
          select: {
            id: true,
            title: true,
            thumbnail: true
          }
        }
      }
    }),
    prisma.payment.count({ where: { userId } })
  ]);

  return {
    payments,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  };
}

/**
 * Get user subscription
 */
export async function getUserSubscription(userId: string) {
  return await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE'
    },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * Handle Stripe webhook
 */
export async function handleStripeWebhook(event: Stripe.Event) {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await confirmPayment(paymentIntent.id);
        break;

      case 'invoice.payment_succeeded':
        // Handle subscription payment success
        break;

      case 'invoice.payment_failed':
        // Handle subscription payment failure
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        const existingSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id }
        });
        if (existingSubscription) {
          await prisma.subscription.update({
            where: { id: existingSubscription.id },
            data: { status: 'CANCELLED' }
          });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);
    throw error;
  }
}
