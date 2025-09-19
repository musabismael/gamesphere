import { prisma } from './prisma';
import { NotificationType } from '@prisma/client';

export interface CreateNotificationData {
  userId: string;
  title: string;
  content: string;
  type: NotificationType;
  metadata?: Record<string, unknown>;
}

/**
 * Create a new notification
 */
export async function createNotification(data: CreateNotificationData): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        content: data.content,
        type: data.type
      }
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}

/**
 * Create multiple notifications for multiple users
 */
export async function createBulkNotifications(
  userIds: string[],
  title: string,
  content: string,
  type: NotificationType
): Promise<void> {
  try {
    const notifications = userIds.map(userId => ({
      userId,
      title,
      content,
      type
    }));

    await prisma.notification.createMany({
      data: notifications
    });
  } catch (error) {
    console.error('Failed to create bulk notifications:', error);
  }
}

/**
 * Get user notifications
 */
export async function getUserNotifications(
  userId: string,
  page: number = 1,
  limit: number = 20,
  unreadOnly: boolean = false
) {
  const skip = (page - 1) * limit;
  
  const where: Record<string, unknown> = { userId };
  if (unreadOnly) {
    where.isRead = false;
  }

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.notification.count({ where })
  ]);

  return {
    notifications,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  };
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string, userId: string): Promise<boolean> {
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: userId
      }
    });

    if (!notification) {
      return false;
    }

    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });

    return true;
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    return false;
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: string): Promise<number> {
  try {
    const result = await prisma.notification.updateMany({
      where: {
        userId: userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });

    return result.count;
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
    return 0;
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: string, userId: string): Promise<boolean> {
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: userId
      }
    });

    if (!notification) {
      return false;
    }

    await prisma.notification.delete({
      where: { id: notificationId }
    });

    return true;
  } catch (error) {
    console.error('Failed to delete notification:', error);
    return false;
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    return await prisma.notification.count({
      where: {
        userId: userId,
        isRead: false
      }
    });
  } catch (error) {
    console.error('Failed to get unread notification count:', error);
    return 0;
  }
}

/**
 * Notification templates and helpers
 */
export class NotificationService {
  /**
   * Send achievement unlocked notification
   */
  static async sendAchievementUnlocked(
    userId: string,
    achievementName: string,
    gameTitle: string
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'Achievement Unlocked! 🏆',
      content: `You unlocked "${achievementName}" in ${gameTitle}`,
      type: 'ACHIEVEMENT_UNLOCKED'
    });
  }

  /**
   * Send game published notification
   */
  static async sendGamePublished(
    userId: string,
    gameTitle: string
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'Game Published! 🎮',
      content: `Your game "${gameTitle}" has been published and is now live`,
      type: 'GAME_PUBLISHED'
    });
  }

  /**
   * Send new review notification
   */
  static async sendNewReview(
    userId: string,
    gameTitle: string,
    reviewerName: string,
    rating: number
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'New Review Received ⭐',
      content: `${reviewerName} reviewed "${gameTitle}" with ${rating} stars`,
      type: 'NEW_REVIEW'
    });
  }

  /**
   * Send new comment notification
   */
  static async sendNewComment(
    userId: string,
    gameTitle: string,
    commenterName: string
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'New Comment 💬',
      content: `${commenterName} commented on "${gameTitle}"`,
      type: 'NEW_COMMENT'
    });
  }

  /**
   * Send coins earned notification
   */
  static async sendCoinsEarned(
    userId: string,
    amount: number,
    reason: string
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'Coins Earned! 💰',
      content: `You earned ${amount} coins for ${reason}`,
      type: 'COINS_EARNED'
    });
  }

  /**
   * Send level up notification
   */
  static async sendLevelUp(
    userId: string,
    newLevel: number
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'Level Up! 🚀',
      content: `Congratulations! You reached level ${newLevel}`,
      type: 'LEVEL_UP'
    });
  }

  /**
   * Send game update notification
   */
  static async sendGameUpdate(
    userId: string,
    gameTitle: string,
    version: string
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'Game Updated 🔄',
      content: `"${gameTitle}" has been updated to version ${version}`,
      type: 'GAME_UPDATE'
    });
  }

  /**
   * Send community invite notification
   */
  static async sendCommunityInvite(
    userId: string,
    communityName: string,
    inviterName: string
  ): Promise<void> {
    await createNotification({
      userId,
      title: 'Community Invite 👥',
      content: `${inviterName} invited you to join "${communityName}"`,
      type: 'COMMUNITY_INVITE'
    });
  }

  /**
   * Send system notification
   */
  static async sendSystemNotification(
    userId: string,
    title: string,
    content: string
  ): Promise<void> {
    await createNotification({
      userId,
      title,
      content,
      type: 'SYSTEM'
    });
  }

  /**
   * Send bulk system notification to all users
   */
  static async sendBulkSystemNotification(
    title: string,
    content: string,
    userRole?: string
  ): Promise<void> {
    try {
      const where: Record<string, unknown> = {};
      if (userRole) {
        where.role = userRole;
      }

      const users = await prisma.user.findMany({
        where,
        select: { id: true }
      });

      const userIds = users.map(user => user.id);

      await createBulkNotifications(userIds, title, content, 'SYSTEM');
    } catch (error) {
      console.error('Failed to send bulk system notification:', error);
    }
  }
}
