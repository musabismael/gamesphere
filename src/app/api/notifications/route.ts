import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  getUserNotifications, 
  markAllNotificationsAsRead
} from '@/lib/notifications';
import { withRateLimit } from '@/lib/rate-limit';

const notificationsRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100
});

export const GET = notificationsRateLimit(async (request: NextRequest) => {
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
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const result = await getUserNotifications(session.user.id, page, limit, unreadOnly);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const PUT = notificationsRateLimit(async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action } = await request.json();

    if (action === 'markAllAsRead') {
      const count = await markAllNotificationsAsRead(session.user.id);
      
      return NextResponse.json({
        success: true,
        data: { markedAsRead: count },
        message: `Marked ${count} notifications as read`
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Update notifications error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
});
