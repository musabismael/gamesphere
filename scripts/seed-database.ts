import { PrismaClient } from '@prisma/client';
import { mockData } from '../src/lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Clearing existing data...');
    
    await prisma.walletTransaction.deleteMany();
    await prisma.wallet.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.communityMembership.deleteMany();
    await prisma.community.deleteMany();
    await prisma.gameAnalytics.deleteMany();
    await prisma.gameMonetization.deleteMany();
    await prisma.userAchievement.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.gameProgress.deleteMany();
    await prisma.playSession.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.review.deleteMany();
    await prisma.game.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Existing data cleared');

    // Seed Users
    console.log('👥 Seeding users...');
    for (const user of mockData.users) {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          password: user.password,
          role: user.role,
          coins: user.coins,
          level: user.level,
          experience: user.experience,
          twoFactorEnabled: false,
          twoFactorSecret: null,
          backupCodes: [],
          lastLogin: null,
          loginAttempts: 0,
          lockedUntil: null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    }
    console.log(`✅ Created ${mockData.users.length} users`);

    // Seed Games
    console.log('🎮 Seeding games...');
    for (const game of mockData.games) {
      await prisma.game.create({
        data: {
          id: game.id,
          title: game.title,
          description: game.description,
          shortDescription: game.shortDescription,
          thumbnail: game.thumbnail,
          banner: game.banner,
          gameFile: game.gameFile,
          gameType: game.gameType,
          engine: game.engine,
          genre: game.genre,
          tags: game.tags,
          isPublished: game.isPublished,
          isFeatured: game.isFeatured,
          isKidsSafe: game.isKidsSafe,
          ageRating: game.ageRating,
          playCount: game.playCount,
          totalPlayTime: game.totalPlayTime,
          averageRating: game.averageRating,
          totalRatings: game.totalRatings,
          downloadCount: game.downloadCount,
          fileSize: game.fileSize,
          version: game.version,
          createdAt: game.createdAt,
          updatedAt: game.updatedAt,
          publishedAt: game.publishedAt,
          developerId: game.developerId
        }
      });
    }
    console.log(`✅ Created ${mockData.games.length} games`);

    // Seed Reviews
    console.log('⭐ Seeding reviews...');
    for (const review of mockData.reviews) {
      await prisma.review.create({
        data: {
          id: review.id,
          rating: review.rating,
          content: review.content,
          isVerified: review.isVerified,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          userId: review.userId,
          gameId: review.gameId
        }
      });
    }
    console.log(`✅ Created ${mockData.reviews.length} reviews`);

    // Seed Achievements
    console.log('🏆 Seeding achievements...');
    for (const achievement of mockData.achievements) {
      await prisma.achievement.create({
        data: {
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          points: achievement.points,
          isSecret: achievement.isSecret,
          createdAt: achievement.createdAt,
          gameId: achievement.gameId
        }
      });
    }
    console.log(`✅ Created ${mockData.achievements.length} achievements`);

    // Seed Play Sessions
    console.log('🎯 Seeding play sessions...');
    for (const session of mockData.playSessions) {
      await prisma.playSession.create({
        data: {
          id: session.id,
          startTime: session.startTime,
          endTime: session.endTime,
          duration: session.duration,
          score: session.score,
          level: session.level,
          isCompleted: session.isCompleted,
          userId: session.userId,
          gameId: session.gameId
        }
      });
    }
    console.log(`✅ Created ${mockData.playSessions.length} play sessions`);

    // Seed Game Progress
    console.log('📊 Seeding game progress...');
    for (const progress of mockData.gameProgress) {
      await prisma.gameProgress.create({
        data: {
          id: progress.id,
          progress: progress.progress as any,
          lastPlayed: progress.lastPlayed,
          isCompleted: progress.isCompleted,
          userId: progress.userId,
          gameId: progress.gameId
        }
      });
    }
    console.log(`✅ Created ${mockData.gameProgress.length} game progress records`);

    // Seed Communities
    console.log('👥 Seeding communities...');
    for (const community of mockData.communities) {
      await prisma.community.create({
        data: {
          id: community.id,
          name: community.name,
          description: community.description,
          genre: community.genre,
          isPublic: community.isPublic,
          memberCount: community.memberCount,
          createdAt: community.createdAt
        }
      });
    }
    console.log(`✅ Created ${mockData.communities.length} communities`);

    // Seed Notifications
    console.log('🔔 Seeding notifications...');
    for (const notification of mockData.notifications) {
      await prisma.notification.create({
        data: {
          id: notification.id,
          title: notification.title,
          content: notification.content,
          type: notification.type,
          isRead: notification.isRead,
          createdAt: notification.createdAt,
          userId: notification.userId
        }
      });
    }
    console.log(`✅ Created ${mockData.notifications.length} notifications`);

    // Seed Game Analytics
    console.log('📈 Seeding game analytics...');
    for (const analytics of mockData.gameAnalytics) {
      await prisma.gameAnalytics.create({
        data: {
          id: analytics.id,
          date: analytics.date,
          playCount: analytics.playCount,
          playTime: analytics.playTime,
          revenue: analytics.revenue,
          adViews: analytics.adViews,
          adClicks: analytics.adClicks,
          gameId: analytics.gameId
        }
      });
    }
    console.log(`✅ Created ${mockData.gameAnalytics.length} analytics records`);

    // Seed Game Monetization
    console.log('💰 Seeding game monetization...');
    for (const monetization of mockData.gameMonetization) {
      await prisma.gameMonetization.create({
        data: {
          id: monetization.id,
          hasAds: monetization.hasAds,
          adFrequency: monetization.adFrequency,
          hasInAppPurchases: monetization.hasInAppPurchases,
          price: monetization.price,
          currency: monetization.currency,
          revenueShare: monetization.revenueShare,
          gameId: monetization.gameId
        }
      });
    }
    console.log(`✅ Created ${mockData.gameMonetization.length} monetization records`);

    // Create some additional random data
    console.log('🎲 Generating additional random data...');
    
    // Generate some random users
    for (let i = 0; i < 10; i++) {
      const randomUser = mockData.generateRandomUser();
      await prisma.user.create({
        data: {
          id: randomUser.id,
          name: randomUser.name,
          email: randomUser.email,
          emailVerified: randomUser.emailVerified,
          image: randomUser.image,
          password: randomUser.password,
          role: randomUser.role,
          coins: randomUser.coins,
          level: randomUser.level,
          experience: randomUser.experience,
          twoFactorEnabled: false,
          twoFactorSecret: null,
          backupCodes: [],
          lastLogin: null,
          loginAttempts: 0,
          lockedUntil: null,
          createdAt: randomUser.createdAt,
          updatedAt: randomUser.updatedAt
        }
      });
    }

    // Generate some random games
    const developers = await prisma.user.findMany({ where: { role: 'DEVELOPER' } });
    for (let i = 0; i < 15; i++) {
      const randomDeveloper = developers[Math.floor(Math.random() * developers.length)];
      const randomGame = mockData.generateRandomGame(randomDeveloper.id, randomDeveloper as any);
      
      await prisma.game.create({
        data: {
          id: randomGame.id,
          title: randomGame.title,
          description: randomGame.description,
          shortDescription: randomGame.shortDescription,
          thumbnail: randomGame.thumbnail,
          banner: randomGame.banner,
          gameFile: randomGame.gameFile,
          gameType: randomGame.gameType,
          engine: randomGame.engine,
          genre: randomGame.genre,
          tags: randomGame.tags,
          isPublished: randomGame.isPublished,
          isFeatured: randomGame.isFeatured,
          isKidsSafe: randomGame.isKidsSafe,
          ageRating: randomGame.ageRating,
          playCount: randomGame.playCount,
          totalPlayTime: randomGame.totalPlayTime,
          averageRating: randomGame.averageRating,
          totalRatings: randomGame.totalRatings,
          downloadCount: randomGame.downloadCount,
          fileSize: randomGame.fileSize,
          version: randomGame.version,
          createdAt: randomGame.createdAt,
          updatedAt: randomGame.updatedAt,
          publishedAt: randomGame.publishedAt,
          developerId: randomGame.developerId
        }
      });
    }

    // Generate some random reviews
    const allUsers = await prisma.user.findMany();
    const allGames = await prisma.game.findMany();
    
    for (let i = 0; i < 50; i++) {
      const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
      const randomGame = allGames[Math.floor(Math.random() * allGames.length)];
      
      // Check if this user already reviewed this game
      const existingReview = await prisma.review.findFirst({
        where: {
          userId: randomUser.id,
          gameId: randomGame.id
        }
      });
      
      if (existingReview) {
        console.log(`Skipping duplicate review for user ${randomUser.id} and game ${randomGame.id}`);
        continue;
      }
      
      const randomReview = mockData.generateRandomReview(randomUser.id, randomUser as any, randomGame.id, randomGame as any);
      
      await prisma.review.create({
        data: {
          id: randomReview.id,
          rating: randomReview.rating,
          content: randomReview.content,
          isVerified: randomReview.isVerified,
          createdAt: randomReview.createdAt,
          updatedAt: randomReview.updatedAt,
          userId: randomReview.userId,
          gameId: randomReview.gameId
        }
      });
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${await prisma.user.count()}`);
    console.log(`- Games: ${await prisma.game.count()}`);
    console.log(`- Reviews: ${await prisma.review.count()}`);
    console.log(`- Achievements: ${await prisma.achievement.count()}`);
    console.log(`- Play Sessions: ${await prisma.playSession.count()}`);
    console.log(`- Communities: ${await prisma.community.count()}`);
    console.log(`- Notifications: ${await prisma.notification.count()}`);
    console.log(`- Analytics: ${await prisma.gameAnalytics.count()}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
