export type UserRole = 'PLAYER' | 'DEVELOPER' | 'ADMIN' | 'MODERATOR';
export type GameType = 'HTML5' | 'WEBGL' | 'UNITY_WEB' | 'GODOT_WEB' | 'PHASER' | 'PIXIJS' | 'CONSTRUCT3' | 'GDEVELOP';
export type GameEngine = 'HTML5' | 'WEBGL' | 'UNITY' | 'GODOT' | 'PHASER' | 'PIXIJS' | 'CONSTRUCT3' | 'GDEVELOP' | 'CUSTOM';
export type GameGenre = 'ACTION' | 'ADVENTURE' | 'PUZZLE' | 'STRATEGY' | 'SIMULATION' | 'SPORTS' | 'RACING' | 'SHOOTER' | 'RPG' | 'PLATFORMER' | 'CARD' | 'BOARD' | 'EDUCATIONAL' | 'KIDS' | 'CASUAL' | 'HORROR' | 'MUSIC' | 'RHYTHM' | 'FIGHTING' | 'MMO' | 'MOBA' | 'BATTLE_ROYALE' | 'SURVIVAL' | 'SANDBOX' | 'TOWER_DEFENSE' | 'ENDLESS_RUNNER' | 'MATCH3' | 'WORD' | 'TRIVIA' | 'OTHER';
export type CommunityRole = 'MEMBER' | 'MODERATOR' | 'ADMIN';
export type NotificationType = 'ACHIEVEMENT_UNLOCKED' | 'GAME_PUBLISHED' | 'NEW_REVIEW' | 'NEW_COMMENT' | 'COINS_EARNED' | 'LEVEL_UP' | 'GAME_UPDATE' | 'COMMUNITY_INVITE' | 'SYSTEM';

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: UserRole;
  coins: number;
  level: number;
  experience: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  banner?: string;
  gameFile: string;
  gameType: GameType;
  engine: GameEngine;
  genre: GameGenre[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  isKidsSafe: boolean;
  ageRating?: number;
  playCount: number;
  totalPlayTime: number;
  averageRating: number;
  totalRatings: number;
  downloadCount: number;
  fileSize?: number;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  developerId: string;
  developer: User;
}

export interface Review {
  id: string;
  rating: number;
  content?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  gameId: string;
  game: Game;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon?: string;
  points: number;
  isSecret: boolean;
  createdAt: Date;
  gameId: string;
  game: Game;
}

export interface PlaySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  score?: number;
  level?: number;
  isCompleted: boolean;
  userId: string;
  user: User;
  gameId: string;
  game: Game;
}

export interface GameProgress {
  id: string;
  progress: Record<string, unknown>; // JSON data
  lastPlayed: Date;
  isCompleted: boolean;
  userId: string;
  user: User;
  gameId: string;
  game: Game;
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  genre: GameGenre;
  isPublic: boolean;
  memberCount: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  userId: string;
  user: User;
}

export interface GameAnalytics {
  id: string;
  date: Date;
  playCount: number;
  playTime: number;
  revenue: number;
  adViews: number;
  adClicks: number;
  gameId: string;
  game: Game;
}

export interface GameMonetization {
  id: string;
  hasAds: boolean;
  adFrequency?: number;
  hasInAppPurchases: boolean;
  price?: number;
  currency: string;
  revenueShare: number;
  gameId: string;
  game: Game;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface GameUploadForm {
  title: string;
  description: string;
  shortDescription?: string;
  genre: GameGenre[];
  tags: string[];
  isKidsSafe: boolean;
  ageRating?: number;
  gameFile: File;
  thumbnail?: File;
  banner?: File;
}

export interface UserProfileForm {
  name: string;
  bio?: string;
  avatar?: File;
  preferences: {
    favoriteGenres: GameGenre[];
    notifications: boolean;
    emailUpdates: boolean;
  };
}

// Search and filter types
export interface GameFilters {
  genre?: GameGenre[];
  engine?: GameEngine[];
  isKidsSafe?: boolean;
  ageRating?: number;
  isFeatured?: boolean;
  minRating?: number;
  maxRating?: number;
  sortBy?: 'newest' | 'oldest' | 'rating' | 'playCount' | 'playTime';
  search?: string;
}

export interface SearchParams {
  query?: string;
  genre?: string;
  engine?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
