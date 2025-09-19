import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  markNotificationAsRead, 
  deleteNotification 
} from '@/lib/notifications';
import { withRateLimit } from '@/lib/rate-limit';

const notificationsRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100
});

export const PUT = notificationsRateLimit(async (
  request: NextRequest,
  context?: { params: Promise<{ [key: string]: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action } = await request.json();

    if (action === 'markAsRead') {
      const params = await context?.params || {};
    const success = await markNotificationAsRead(params.id, session.user.id);
      
      if (success) {
        return NextResponse.json({
          success: true,
          message: 'Notification marked as read'
        });
      } else {
        return NextResponse.json(
          { success: false, error: 'Notification not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Update notification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const DELETE = notificationsRateLimit(async (
  request: NextRequest,
  context?: { params: Promise<{ [key: string]: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const params = await context?.params || {};
    const success = await deleteNotification(params.id, session.user.id);
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Notification deleted'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Notification not found' },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Delete notification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});
