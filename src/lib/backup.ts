import { prisma } from './prisma';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { createHash } from 'crypto';

export interface BackupOptions {
  includeUsers?: boolean;
  includeGames?: boolean;
  includeReviews?: boolean;
  includeAnalytics?: boolean;
  compress?: boolean;
}

export interface BackupResult {
  success: boolean;
  backupId: string;
  filePath: string;
  size: number;
  createdAt: Date;
  tables: string[];
}

export interface BackupMetadata {
  backupId: string;
  createdAt: string;
  version: string;
  options: BackupOptions;
}

export interface BackupData {
  users?: unknown[];
  games?: unknown[];
  reviews?: unknown[];
  comments?: unknown[];
  analytics?: unknown[];
  playSessions?: unknown[];
  gameProgress?: unknown[];
  communities?: unknown[];
  achievements?: unknown[];
}

export interface BackupFile {
  metadata: BackupMetadata;
  data: BackupData;
}

/**
 * Create a database backup
 */
export async function createDatabaseBackup(options: BackupOptions = {}): Promise<BackupResult> {
  const {
    includeUsers = true,
    includeGames = true,
    includeReviews = true,
    includeAnalytics = true
  } = options;

  const backupId = generateBackupId();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = join(process.cwd(), 'backups');
  const fileName = `backup-${timestamp}-${backupId}.json`;
  const filePath = join(backupDir, fileName);

  try {
    // Ensure backup directory exists
    await mkdir(backupDir, { recursive: true });

    const backupData: BackupFile = {
      metadata: {
        backupId,
        createdAt: new Date().toISOString(),
        version: '1.0.0',
        options
      },
      data: {}
    };

    const tables: string[] = [];

    // Backup users
    if (includeUsers) {
      const users = await prisma.user.findMany({
        include: {
          accounts: true,
          sessions: true,
          wallet: {
            include: {
              transactions: true
            }
          },
          subscriptions: true
        }
      });
      backupData.data.users = users;
      tables.push('users');
    }

    // Backup games
    if (includeGames) {
      const games = await prisma.game.findMany({
        include: {
          developer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          monetization: true,
          analytics: true
        }
      });
      backupData.data.games = games;
      tables.push('games');
    }

    // Backup reviews
    if (includeReviews) {
      const reviews = await prisma.review.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          game: {
            select: {
              id: true,
              title: true
            }
          }
        }
      });
      backupData.data.reviews = reviews;
      tables.push('reviews');

      const comments = await prisma.comment.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          game: {
            select: {
              id: true,
              title: true
            }
          }
        }
      });
      backupData.data.comments = comments;
      tables.push('comments');
    }

    // Backup analytics
    if (includeAnalytics) {
      const analytics = await prisma.gameAnalytics.findMany();
      backupData.data.analytics = analytics;
      tables.push('analytics');

      const playSessions = await prisma.playSession.findMany();
      backupData.data.playSessions = playSessions;
      tables.push('playSessions');

      const gameProgress = await prisma.gameProgress.findMany();
      backupData.data.gameProgress = gameProgress;
      tables.push('gameProgress');
    }

    // Backup other important data
    const communities = await prisma.community.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
    backupData.data.communities = communities;
    tables.push('communities');

    const achievements = await prisma.achievement.findMany({
      include: {
        game: {
          select: {
            id: true,
            title: true
          }
        },
        userAchievements: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
    backupData.data.achievements = achievements;
    tables.push('achievements');

    // Write backup file
    const jsonData = JSON.stringify(backupData, null, 2);
    await writeFile(filePath, jsonData, 'utf8');

    // Get file size
    const stats = await import('fs').then(fs => fs.promises.stat(filePath));
    const size = stats.size;

    // Create backup record in database
    await prisma.auditLog.create({
      data: {
        action: 'BACKUP_CREATED',
        resource: 'SYSTEM',
        details: JSON.parse(JSON.stringify({
          backupId,
          filePath,
          size,
          tables,
          options
        }))
      }
    });

    return {
      success: true,
      backupId,
      filePath,
      size,
      createdAt: new Date(),
      tables
    };

  } catch (error) {
    console.error('Backup creation failed:', error);
    throw new Error('Failed to create backup');
  }
}

/**
 * Restore database from backup
 */
export async function restoreDatabaseFromBackup(backupFilePath: string): Promise<boolean> {
  try {
    // Read backup file
    const backupData = JSON.parse(await readFile(backupFilePath, 'utf8'));

    if (!backupData.metadata || !backupData.data) {
      throw new Error('Invalid backup file format');
    }

    // Start transaction
    await prisma.$transaction(async (tx) => {
      // Clear existing data (be careful in production!)
      if (backupData.data.users) {
        await tx.user.deleteMany();
      }
      if (backupData.data.games) {
        await tx.game.deleteMany();
      }
      if (backupData.data.reviews) {
        await tx.review.deleteMany();
      }
      if (backupData.data.comments) {
        await tx.comment.deleteMany();
      }

      // Restore users
      if (backupData.data.users) {
        for (const user of backupData.data.users) {
          const { accounts, sessions, wallet, subscriptions, ...userData } = user;
          
          await tx.user.create({
            data: {
              ...userData,
              accounts: {
                create: accounts || []
              },
              sessions: {
                create: sessions || []
              },
              wallet: wallet ? {
                create: {
                  ...wallet,
                  transactions: {
                    create: wallet.transactions || []
                  }
                }
              } : undefined,
              subscriptions: {
                create: subscriptions || []
              }
            }
          });
        }
      }

      // Restore games
      if (backupData.data.games) {
        for (const game of backupData.data.games) {
          const { monetization, analytics, ...gameData } = game;
          
          await tx.game.create({
            data: {
              ...gameData,
              monetization: monetization ? {
                create: monetization
              } : undefined,
              analytics: {
                create: analytics || []
              }
            }
          });
        }
      }

      // Restore reviews and comments
      if (backupData.data.reviews) {
        await tx.review.createMany({
          data: backupData.data.reviews
        });
      }

      if (backupData.data.comments) {
        await tx.comment.createMany({
          data: backupData.data.comments
        });
      }

      // Restore other data
      if (backupData.data.communities) {
        for (const community of backupData.data.communities) {
          const { members, ...communityData } = community;
          
          await tx.community.create({
            data: {
              ...communityData,
              members: {
                create: members || []
              }
            }
          });
        }
      }

      if (backupData.data.achievements) {
        for (const achievement of backupData.data.achievements) {
          const { userAchievements, ...achievementData } = achievement;
          
          await tx.achievement.create({
            data: {
              ...achievementData,
              userAchievements: {
                create: userAchievements || []
              }
            }
          });
        }
      }
    });

    // Log restore action
    await prisma.auditLog.create({
      data: {
        action: 'BACKUP_RESTORED',
        resource: 'SYSTEM',
        details: {
          backupFilePath,
          restoredAt: new Date().toISOString()
        }
      }
    });

    return true;

  } catch (error) {
    console.error('Backup restore failed:', error);
    throw new Error('Failed to restore from backup');
  }
}

/**
 * List available backups
 */
export async function listBackups(): Promise<Array<{
  fileName: string;
  filePath: string;
  size: number;
  createdAt: Date;
  backupId: string;
}>> {
  try {
    const fs = await import('fs');
    await import('path');
    const backupDir = join(process.cwd(), 'backups');

    // Check if backup directory exists
    try {
      await fs.promises.access(backupDir);
    } catch {
      return [];
    }

    const files = await fs.promises.readdir(backupDir);
    const backupFiles = files.filter(file => file.endsWith('.json'));

    const backups = await Promise.all(
      backupFiles.map(async (file) => {
        const filePath = join(backupDir, file);
        const stats = await fs.promises.stat(filePath);
        
        // Try to read backup metadata
        let backupId = 'unknown';
        try {
          const content = await fs.promises.readFile(filePath, 'utf8');
          const data = JSON.parse(content);
          backupId = data.metadata?.backupId || 'unknown';
        } catch {
          // Ignore errors reading metadata
        }

        return {
          fileName: file,
          filePath,
          size: stats.size,
          createdAt: stats.birthtime,
          backupId
        };
      })
    );

    return backups.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  } catch (error) {
    console.error('Failed to list backups:', error);
    return [];
  }
}

/**
 * Delete backup file
 */
export async function deleteBackup(fileName: string): Promise<boolean> {
  try {
    const fs = await import('fs');
    await import('path');
    const backupDir = join(process.cwd(), 'backups');
    const filePath = join(backupDir, fileName);

    await fs.promises.unlink(filePath);

    // Log deletion
    await prisma.auditLog.create({
      data: {
        action: 'BACKUP_DELETED',
        resource: 'SYSTEM',
        details: {
          fileName,
          deletedAt: new Date().toISOString()
        }
      }
    });

    return true;

  } catch (error) {
    console.error('Failed to delete backup:', error);
    return false;
  }
}

/**
 * Generate unique backup ID
 */
function generateBackupId(): string {
  return createHash('md5')
    .update(Date.now().toString())
    .update(Math.random().toString())
    .digest('hex')
    .substring(0, 8);
}

/**
 * Schedule automatic backups
 */
export async function scheduleAutomaticBackups() {
  // This would typically be implemented with a cron job or scheduler
  // For now, we'll just log that it should be scheduled
  console.log('Automatic backup scheduling should be implemented with a cron job');
  
  // Example: Run backup every day at 2 AM
  // cron.schedule('0 2 * * *', async () => {
  //   try {
  //     await createDatabaseBackup();
  //     console.log('Automatic backup completed');
  //   } catch (error) {
  //     console.error('Automatic backup failed:', error);
  //   }
  // });
}
