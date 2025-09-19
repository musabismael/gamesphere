import { 
  User, 
  Game, 
  Review, 
  Achievement, 
  PlaySession, 
  GameProgress, 
  Community, 
  Notification, 
  GameAnalytics, 
  GameMonetization,
  UserRole,
  GameType,
  GameEngine,
  GameGenre
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    emailVerified: new Date('2024-01-15'),
    image: '/dev-avatar.jpg',
    role: 'DEVELOPER',
    coins: 2500,
    level: 12,
    experience: 8500,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'user_2',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    emailVerified: new Date('2024-01-20'),
    image: '/dev-avatar2.jpg',
    role: 'PLAYER',
    coins: 1800,
    level: 8,
    experience: 4200,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'user_3',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@example.com',
    emailVerified: new Date('2024-02-01'),
    image: '/dev-avatar3.jpg',
    role: 'ADMIN',
    coins: 5000,
    level: 20,
    experience: 15000,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'user_4',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    emailVerified: new Date('2024-02-10'),
    image: '/dev-avatar4.jpg',
    role: 'MODERATOR',
    coins: 3200,
    level: 15,
    experience: 9800,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: 'user_5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    emailVerified: new Date('2024-02-15'),
    image: '/dev-avatar5.jpg',
    role: 'DEVELOPER',
    coins: 1200,
    level: 5,
    experience: 1800,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'user_6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    emailVerified: new Date('2024-02-20'),
    image: '/dev-avatar6.jpg',
    role: 'PLAYER',
    coins: 950,
    level: 3,
    experience: 750,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-20')
  }
];

// Mock Games
export const mockGames: Game[] = [
  {
    id: 'game_1',
    title: 'Space Adventure Quest',
    description: 'Embark on an epic journey through the cosmos in this action-packed space adventure. Explore alien worlds, battle hostile creatures, and uncover the mysteries of the universe.',
    shortDescription: 'Epic space adventure with exploration and combat',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-game.jpg',
    gameFile: '/games/space-adventure/index.html',
    gameType: 'HTML5',
    engine: 'PHASER',
    genre: ['ACTION', 'ADVENTURE', 'RPG'],
    tags: ['space', 'adventure', 'rpg', 'exploration'],
    isPublished: true,
    isFeatured: true,
    isKidsSafe: false,
    ageRating: 12,
    playCount: 15420,
    totalPlayTime: 125000,
    averageRating: 4.6,
    totalRatings: 892,
    downloadCount: 12300,
    fileSize: 15728640,
    version: '2.1.0',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
    publishedAt: new Date('2024-01-20'),
    developerId: 'user_1',
    developer: mockUsers[0]
  },
  {
    id: 'game_2',
    title: 'Puzzle Master 3000',
    description: 'Challenge your mind with hundreds of brain-teasing puzzles. From simple jigsaws to complex logic puzzles, this game will keep you entertained for hours.',
    shortDescription: 'Brain-teasing puzzle collection',
    thumbnail: '/placeholder-game2.jpg',
    banner: '/placeholder-game2.jpg',
    gameFile: '/games/puzzle-master/index.html',
    gameType: 'HTML5',
    engine: 'PIXIJS',
    genre: ['PUZZLE', 'EDUCATIONAL'],
    tags: ['puzzle', 'brain', 'logic', 'educational'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 3,
    playCount: 8750,
    totalPlayTime: 89000,
    averageRating: 4.2,
    totalRatings: 456,
    downloadCount: 7200,
    fileSize: 8388608,
    version: '1.5.2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05'),
    publishedAt: new Date('2024-01-25'),
    developerId: 'user_1',
    developer: mockUsers[0]
  },
  {
    id: 'game_3',
    title: 'Racing Thunder',
    description: 'Feel the adrenaline rush in this high-speed racing game. Customize your cars, race on various tracks, and compete with players worldwide.',
    shortDescription: 'High-speed racing with customization',
    thumbnail: '/placeholder-game3.jpg',
    banner: '/placeholder-game3.jpg',
    gameFile: '/games/racing-thunder/index.html',
    gameType: 'WEBGL',
    engine: 'UNITY',
    genre: ['RACING', 'SPORTS'],
    tags: ['racing', 'cars', 'speed', 'multiplayer'],
    isPublished: true,
    isFeatured: true,
    isKidsSafe: true,
    ageRating: 7,
    playCount: 22300,
    totalPlayTime: 198000,
    averageRating: 4.8,
    totalRatings: 1234,
    downloadCount: 18900,
    fileSize: 25165824,
    version: '3.0.1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-15'),
    publishedAt: new Date('2024-01-15'),
    developerId: 'user_5',
    developer: mockUsers[4]
  },
  {
    id: 'game_4',
    title: 'Tower Defense Legends',
    description: 'Defend your kingdom from waves of enemies in this strategic tower defense game. Build towers, upgrade them, and use special abilities to survive.',
    shortDescription: 'Strategic tower defense game',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-game.jpg',
    gameFile: '/games/tower-defense/index.html',
    gameType: 'HTML5',
    engine: 'PHASER',
    genre: ['STRATEGY', 'TOWER_DEFENSE'],
    tags: ['strategy', 'tower defense', 'tactical', 'defense'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 7,
    playCount: 11200,
    totalPlayTime: 156000,
    averageRating: 4.4,
    totalRatings: 678,
    downloadCount: 9800,
    fileSize: 12582912,
    version: '1.8.3',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-08'),
    publishedAt: new Date('2024-01-30'),
    developerId: 'user_1',
    developer: mockUsers[0]
  },
  {
    id: 'game_5',
    title: 'Magic Card Duels',
    description: 'Collect magical cards and duel against other wizards in this strategic card game. Build your deck, master different spells, and become the ultimate wizard.',
    shortDescription: 'Strategic magical card dueling game',
    thumbnail: '/placeholder-game2.jpg',
    banner: '/placeholder-game2.jpg',
    gameFile: '/games/magic-cards/index.html',
    gameType: 'HTML5',
    engine: 'PIXIJS',
    genre: ['CARD', 'STRATEGY', 'RPG'],
    tags: ['cards', 'magic', 'strategy', 'wizard', 'duel'],
    isPublished: true,
    isFeatured: true,
    isKidsSafe: true,
    ageRating: 12,
    playCount: 18900,
    totalPlayTime: 234000,
    averageRating: 4.7,
    totalRatings: 1456,
    downloadCount: 16200,
    fileSize: 18874368,
    version: '2.3.0',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-12'),
    publishedAt: new Date('2024-01-12'),
    developerId: 'user_5',
    developer: mockUsers[4]
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review_1',
    rating: 5,
    content: 'Absolutely amazing game! The graphics are stunning and the gameplay is incredibly engaging. I\'ve been playing for weeks and still discovering new things.',
    isVerified: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    userId: 'user_2',
    user: mockUsers[1],
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'review_2',
    rating: 4,
    content: 'Great puzzle game with lots of variety. Some levels are quite challenging but very satisfying to complete. Would recommend to puzzle lovers.',
    isVerified: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
    userId: 'user_6',
    user: mockUsers[5],
    gameId: 'game_2',
    game: mockGames[1]
  },
  {
    id: 'review_3',
    rating: 5,
    content: 'Best racing game I\'ve played in years! The car customization is incredible and the multiplayer races are so much fun. Graphics are top-notch.',
    isVerified: true,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
    userId: 'user_2',
    user: mockUsers[1],
    gameId: 'game_3',
    game: mockGames[2]
  },
  {
    id: 'review_4',
    rating: 4,
    content: 'Solid tower defense game with good strategy elements. The upgrade system is well thought out and the difficulty curve is just right.',
    isVerified: false,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    userId: 'user_6',
    user: mockUsers[5],
    gameId: 'game_4',
    game: mockGames[3]
  },
  {
    id: 'review_5',
    rating: 5,
    content: 'Incredible card game! The artwork is beautiful and the strategic depth is amazing. I love collecting new cards and building different decks.',
    isVerified: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    userId: 'user_2',
    user: mockUsers[1],
    gameId: 'game_5',
    game: mockGames[4]
  }
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'achievement_1',
    name: 'First Steps',
    description: 'Complete your first game session',
    icon: '/icons/achievement-first.png',
    points: 10,
    isSecret: false,
    createdAt: new Date('2024-01-15'),
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'achievement_2',
    name: 'Space Explorer',
    description: 'Visit 10 different planets',
    icon: '/icons/achievement-explorer.png',
    points: 50,
    isSecret: false,
    createdAt: new Date('2024-01-15'),
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'achievement_3',
    name: 'Puzzle Master',
    description: 'Complete 100 puzzles',
    icon: '/icons/achievement-puzzle.png',
    points: 100,
    isSecret: false,
    createdAt: new Date('2024-01-20'),
    gameId: 'game_2',
    game: mockGames[1]
  },
  {
    id: 'achievement_4',
    name: 'Speed Demon',
    description: 'Win a race in under 2 minutes',
    icon: '/icons/achievement-speed.png',
    points: 75,
    isSecret: true,
    createdAt: new Date('2024-01-10'),
    gameId: 'game_3',
    game: mockGames[2]
  },
  {
    id: 'achievement_5',
    name: 'Tower Master',
    description: 'Survive 50 waves without losing',
    icon: '/icons/achievement-tower.png',
    points: 150,
    isSecret: false,
    createdAt: new Date('2024-01-25'),
    gameId: 'game_4',
    game: mockGames[3]
  }
];

// Mock Play Sessions
export const mockPlaySessions: PlaySession[] = [
  {
    id: 'session_1',
    startTime: new Date('2024-02-15T10:30:00'),
    endTime: new Date('2024-02-15T11:45:00'),
    duration: 75,
    score: 12500,
    level: 5,
    isCompleted: false,
    userId: 'user_2',
    user: mockUsers[1],
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'session_2',
    startTime: new Date('2024-02-15T14:20:00'),
    endTime: new Date('2024-02-15T15:10:00'),
    duration: 50,
    score: 8900,
    level: 3,
    isCompleted: true,
    userId: 'user_6',
    user: mockUsers[5],
    gameId: 'game_2',
    game: mockGames[1]
  },
  {
    id: 'session_3',
    startTime: new Date('2024-02-16T09:15:00'),
    endTime: new Date('2024-02-16T10:30:00'),
    duration: 75,
    score: 15600,
    level: 8,
    isCompleted: false,
    userId: 'user_2',
    user: mockUsers[1],
    gameId: 'game_3',
    game: mockGames[2]
  }
];

// Mock Game Progress
export const mockGameProgress: GameProgress[] = [
  {
    id: 'progress_1',
    progress: {
      currentLevel: 5,
      completedLevels: [1, 2, 3, 4],
      inventory: ['sword', 'shield', 'potion'],
      stats: { health: 100, mana: 80, experience: 2500 }
    },
    lastPlayed: new Date('2024-02-15T11:45:00'),
    isCompleted: false,
    userId: 'user_2',
    user: mockUsers[1],
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'progress_2',
    progress: {
      completedPuzzles: 45,
      currentStreak: 8,
      bestTime: 120,
      unlockedThemes: ['classic', 'space', 'nature']
    },
    lastPlayed: new Date('2024-02-15T15:10:00'),
    isCompleted: false,
    userId: 'user_6',
    user: mockUsers[5],
    gameId: 'game_2',
    game: mockGames[1]
  }
];

// Mock Communities
export const mockCommunities: Community[] = [
  {
    id: 'community_1',
    name: 'Space Adventurers',
    description: 'A community for fans of space exploration and sci-fi games',
    genre: 'ADVENTURE',
    isPublic: true,
    memberCount: 1250,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'community_2',
    name: 'Puzzle Masters',
    description: 'Brain teasers and puzzle game enthusiasts',
    genre: 'PUZZLE',
    isPublic: true,
    memberCount: 890,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'community_3',
    name: 'Racing Legends',
    description: 'High-speed racing and car customization fans',
    genre: 'RACING',
    isPublic: true,
    memberCount: 2100,
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'community_4',
    name: 'Strategy Gamers',
    description: 'Tactical and strategic game discussions',
    genre: 'STRATEGY',
    isPublic: true,
    memberCount: 1560,
    createdAt: new Date('2024-01-20')
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notification_1',
    title: 'Achievement Unlocked!',
    content: 'You\'ve unlocked the "First Steps" achievement in Space Adventure Quest',
    type: 'ACHIEVEMENT_UNLOCKED',
    isRead: false,
    createdAt: new Date('2024-02-15T11:45:00'),
    userId: 'user_2',
    user: mockUsers[1]
  },
  {
    id: 'notification_2',
    title: 'New Review',
    content: 'Sarah Chen left a 5-star review for your game "Space Adventure Quest"',
    type: 'NEW_REVIEW',
    isRead: true,
    createdAt: new Date('2024-01-25T14:30:00'),
    userId: 'user_1',
    user: mockUsers[0]
  },
  {
    id: 'notification_3',
    title: 'Level Up!',
    content: 'Congratulations! You\'ve reached level 8',
    type: 'LEVEL_UP',
    isRead: false,
    createdAt: new Date('2024-02-10T16:20:00'),
    userId: 'user_2',
    user: mockUsers[1]
  },
  {
    id: 'notification_4',
    title: 'Game Published',
    content: 'Your game "Tower Defense Legends" has been successfully published',
    type: 'GAME_PUBLISHED',
    isRead: true,
    createdAt: new Date('2024-01-30T10:15:00'),
    userId: 'user_1',
    user: mockUsers[0]
  }
];

// Mock Game Analytics
export const mockGameAnalytics: GameAnalytics[] = [
  {
    id: 'analytics_1',
    date: new Date('2024-02-15'),
    playCount: 1250,
    playTime: 8900,
    revenue: 450.50,
    adViews: 5600,
    adClicks: 280,
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'analytics_2',
    date: new Date('2024-02-14'),
    playCount: 980,
    playTime: 7200,
    revenue: 320.75,
    adViews: 4200,
    adClicks: 210,
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'analytics_3',
    date: new Date('2024-02-15'),
    playCount: 890,
    playTime: 5600,
    revenue: 180.25,
    adViews: 3400,
    adClicks: 170,
    gameId: 'game_2',
    game: mockGames[1]
  }
];

// Mock Game Monetization
export const mockGameMonetization: GameMonetization[] = [
  {
    id: 'monetization_1',
    hasAds: true,
    adFrequency: 5,
    hasInAppPurchases: true,
    price: 0,
    currency: 'USD',
    revenueShare: 0.7,
    gameId: 'game_1',
    game: mockGames[0]
  },
  {
    id: 'monetization_2',
    hasAds: true,
    adFrequency: 3,
    hasInAppPurchases: false,
    price: 0,
    currency: 'USD',
    revenueShare: 0.7,
    gameId: 'game_2',
    game: mockGames[1]
  },
  {
    id: 'monetization_3',
    hasAds: false,
    adFrequency: undefined,
    hasInAppPurchases: true,
    price: 9.99,
    currency: 'USD',
    revenueShare: 0.8,
    gameId: 'game_3',
    game: mockGames[2]
  }
];

// Utility functions for generating additional mock data
export const generateRandomUser = (): User => {
  const roles: UserRole[] = ['PLAYER', 'DEVELOPER', 'ADMIN', 'MODERATOR'];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  
  return {
    id: `user_${Date.now()}`,
    name: `User ${Math.floor(Math.random() * 1000)}`,
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    emailVerified: new Date(),
    image: `/dev-avatar${Math.floor(Math.random() * 6) + 1}.jpg`,
    role: randomRole,
    coins: Math.floor(Math.random() * 5000),
    level: Math.floor(Math.random() * 20) + 1,
    experience: Math.floor(Math.random() * 15000),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const generateRandomGame = (developerId: string, developer: User): Game => {
  const gameTypes: GameType[] = ['HTML5', 'WEBGL', 'UNITY_WEB', 'GODOT_WEB', 'PHASER', 'PIXIJS'];
  const engines: GameEngine[] = ['HTML5', 'WEBGL', 'UNITY', 'GODOT', 'PHASER', 'PIXIJS'];
  const genres: GameGenre[] = ['ACTION', 'ADVENTURE', 'PUZZLE', 'STRATEGY', 'RACING', 'RPG'];
  
  const randomType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
  const randomEngine = engines[Math.floor(Math.random() * engines.length)];
  const randomGenres = genres.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
  
  return {
    id: `game_${Date.now()}`,
    title: `Game ${Math.floor(Math.random() * 1000)}`,
    description: 'A randomly generated game for testing purposes',
    shortDescription: 'Random test game',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-game.jpg',
    gameFile: '/games/test/index.html',
    gameType: randomType,
    engine: randomEngine,
    genre: randomGenres,
    tags: ['test', 'random'],
    isPublished: Math.random() > 0.5,
    isFeatured: Math.random() > 0.8,
    isKidsSafe: Math.random() > 0.3,
    ageRating: [3, 7, 12, 16, 18][Math.floor(Math.random() * 5)],
    playCount: Math.floor(Math.random() * 10000),
    totalPlayTime: Math.floor(Math.random() * 100000),
    averageRating: Math.random() * 5,
    totalRatings: Math.floor(Math.random() * 1000),
    downloadCount: Math.floor(Math.random() * 5000),
    fileSize: Math.floor(Math.random() * 50000000),
    version: '1.0.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: Math.random() > 0.5 ? new Date() : undefined,
    developerId,
    developer
  };
};

export const generateRandomReview = (userId: string, user: User, gameId: string, game: Game): Review => {
  const reviewTexts = [
    'Great game! Really enjoyed playing it.',
    'Amazing graphics and gameplay.',
    'Could be better, but overall decent.',
    'One of the best games I\'ve played!',
    'Not bad, but has some issues.',
    'Absolutely fantastic! Highly recommend.',
    'Good game with room for improvement.',
    'Incredible experience from start to finish.'
  ];
  
  return {
    id: `review_${Date.now()}`,
    rating: Math.floor(Math.random() * 5) + 1,
    content: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
    isVerified: Math.random() > 0.3,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
    user,
    gameId,
    game
  };
};

// Export all mock data as a single object for easy access
export const mockData = {
  users: mockUsers,
  games: mockGames,
  reviews: mockReviews,
  achievements: mockAchievements,
  playSessions: mockPlaySessions,
  gameProgress: mockGameProgress,
  communities: mockCommunities,
  notifications: mockNotifications,
  gameAnalytics: mockGameAnalytics,
  gameMonetization: mockGameMonetization,
  generateRandomUser,
  generateRandomGame,
  generateRandomReview
};

export default mockData;
