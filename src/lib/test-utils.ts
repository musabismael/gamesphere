import { mockData } from './mock-data';
import { User, Game, Review, PlaySession, GameProgress, GameGenre } from '@/types';

/**
 * Test utilities for working with mock data
 */

// Get a random user by role
export const getRandomUserByRole = (role: 'PLAYER' | 'DEVELOPER' | 'ADMIN' | 'MODERATOR'): User | undefined => {
  const users = mockData.users.filter(user => user.role === role);
  return users[Math.floor(Math.random() * users.length)];
};

// Get all users by role
export const getUsersByRole = (role: 'PLAYER' | 'DEVELOPER' | 'ADMIN' | 'MODERATOR'): User[] => {
  return mockData.users.filter(user => user.role === role);
};

// Get featured games
export const getFeaturedGames = (): Game[] => {
  return mockData.games.filter(game => game.isFeatured);
};

// Get games by genre
export const getGamesByGenre = (genre: string): Game[] => {
  return mockData.games.filter(game => game.genre.includes(genre as GameGenre));
};

// Get games by developer
export const getGamesByDeveloper = (developerId: string): Game[] => {
  return mockData.games.filter(game => game.developerId === developerId);
};

// Get reviews for a specific game
export const getReviewsForGame = (gameId: string): Review[] => {
  return mockData.reviews.filter(review => review.gameId === gameId);
};

// Get reviews by user
export const getReviewsByUser = (userId: string): Review[] => {
  return mockData.reviews.filter(review => review.userId === userId);
};

// Get play sessions for a user
export const getPlaySessionsForUser = (userId: string): PlaySession[] => {
  return mockData.playSessions.filter(session => session.userId === userId);
};

// Get play sessions for a game
export const getPlaySessionsForGame = (gameId: string): PlaySession[] => {
  return mockData.playSessions.filter(session => session.gameId === gameId);
};

// Get game progress for a user
export const getGameProgressForUser = (userId: string): GameProgress[] => {
  return mockData.gameProgress.filter(progress => progress.userId === userId);
};

// Get game progress for a game
export const getGameProgressForGame = (gameId: string): GameProgress[] => {
  return mockData.gameProgress.filter(progress => progress.gameId === gameId);
};

// Calculate average rating for a game
export const getAverageRating = (gameId: string): number => {
  const reviews = getReviewsForGame(gameId);
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

// Get total play time for a user
export const getTotalPlayTimeForUser = (userId: string): number => {
  const sessions = getPlaySessionsForUser(userId);
  return sessions.reduce((total, session) => total + (session.duration || 0), 0);
};

// Get total play time for a game
export const getTotalPlayTimeForGame = (gameId: string): number => {
  const sessions = getPlaySessionsForGame(gameId);
  return sessions.reduce((total, session) => total + (session.duration || 0), 0);
};

// Get user statistics
export const getUserStats = (userId: string) => {
  const user = mockData.users.find(u => u.id === userId);
  if (!user) return null;

  const reviews = getReviewsByUser(userId);
  const sessions = getPlaySessionsForUser(userId);
  const progress = getGameProgressForUser(userId);

  return {
    user,
    totalReviews: reviews.length,
    averageRating: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
    totalPlayTime: sessions.reduce((total, s) => total + (s.duration || 0), 0),
    gamesPlayed: new Set(sessions.map(s => s.gameId)).size,
    gamesCompleted: progress.filter(p => p.isCompleted).length,
    totalSessions: sessions.length
  };
};

// Get game statistics
export const getGameStats = (gameId: string) => {
  const game = mockData.games.find(g => g.id === gameId);
  if (!game) return null;

  const reviews = getReviewsForGame(gameId);
  const sessions = getPlaySessionsForGame(gameId);
  const progress = getGameProgressForGame(gameId);

  return {
    game,
    totalReviews: reviews.length,
    averageRating: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
    totalPlayTime: sessions.reduce((total, s) => total + (s.duration || 0), 0),
    uniquePlayers: new Set(sessions.map(s => s.userId)).size,
    completionRate: progress.length > 0 ? progress.filter(p => p.isCompleted).length / progress.length : 0,
    totalSessions: sessions.length
  };
};

// Search games by title or description
export const searchGames = (query: string): Game[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockData.games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Filter games by multiple criteria
export const filterGames = (filters: {
  genre?: string[];
  isFeatured?: boolean;
  isKidsSafe?: boolean;
  minRating?: number;
  maxRating?: number;
  minPlayCount?: number;
  maxPlayCount?: number;
}) => {
  return mockData.games.filter(game => {
    if (filters.genre && !filters.genre.some(g => game.genre.includes(g as GameGenre))) return false;
    if (filters.isFeatured !== undefined && game.isFeatured !== filters.isFeatured) return false;
    if (filters.isKidsSafe !== undefined && game.isKidsSafe !== filters.isKidsSafe) return false;
    if (filters.minRating && game.averageRating < filters.minRating) return false;
    if (filters.maxRating && game.averageRating > filters.maxRating) return false;
    if (filters.minPlayCount && game.playCount < filters.minPlayCount) return false;
    if (filters.maxPlayCount && game.playCount > filters.maxPlayCount) return false;
    return true;
  });
};

// Sort games by various criteria
export const sortGames = (games: Game[], sortBy: 'newest' | 'oldest' | 'rating' | 'playCount' | 'playTime' | 'title') => {
  return [...games].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'rating':
        return b.averageRating - a.averageRating;
      case 'playCount':
        return b.playCount - a.playCount;
      case 'playTime':
        return b.totalPlayTime - a.totalPlayTime;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};

// Generate test data for specific scenarios
export const generateTestScenario = (scenario: 'new_user' | 'popular_game' | 'developer_portfolio' | 'community_activity') => {
  switch (scenario) {
    case 'new_user':
      return {
        user: mockData.generateRandomUser(),
        games: mockData.games.slice(0, 3), // First 3 games
        reviews: [],
        sessions: []
      };
    
    case 'popular_game':
      const popularGame = mockData.games.reduce((prev, current) => 
        prev.playCount > current.playCount ? prev : current
      );
      return {
        game: popularGame,
        reviews: getReviewsForGame(popularGame.id),
        sessions: getPlaySessionsForGame(popularGame.id),
        analytics: mockData.gameAnalytics.filter(a => a.gameId === popularGame.id)
      };
    
    case 'developer_portfolio':
      const developer = getRandomUserByRole('DEVELOPER');
      if (!developer) return null;
      
      return {
        developer,
        games: getGamesByDeveloper(developer.id),
        totalRevenue: mockData.gameAnalytics
          .filter(a => getGamesByDeveloper(developer.id).some(g => g.id === a.gameId))
          .reduce((sum, a) => sum + a.revenue, 0),
        totalPlayTime: mockData.gameAnalytics
          .filter(a => getGamesByDeveloper(developer.id).some(g => g.id === a.gameId))
          .reduce((sum, a) => sum + a.playTime, 0)
      };
    
    case 'community_activity':
      return {
        communities: mockData.communities,
        recentReviews: mockData.reviews.slice(-5),
        recentSessions: mockData.playSessions.slice(-10),
        notifications: mockData.notifications.filter(n => !n.isRead)
      };
    
    default:
      return null;
  }
};

const testUtils = {
  getRandomUserByRole,
  getUsersByRole,
  getFeaturedGames,
  getGamesByGenre,
  getGamesByDeveloper,
  getReviewsForGame,
  getReviewsByUser,
  getPlaySessionsForUser,
  getPlaySessionsForGame,
  getGameProgressForUser,
  getGameProgressForGame,
  getAverageRating,
  getTotalPlayTimeForUser,
  getTotalPlayTimeForGame,
  getUserStats,
  getGameStats,
  searchGames,
  filterGames,
  sortGames,
  generateTestScenario
};

export default testUtils;
