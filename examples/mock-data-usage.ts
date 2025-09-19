/**
 * Example usage of GameSphere mock data
 * This file demonstrates how to use the mock data in your tests and development
 */

import { mockData } from '../src/lib/mock-data';
import testUtils from '../src/lib/test-utils';

// Example 1: Basic data access
console.log('=== Basic Data Access ===');
console.log('Total users:', mockData.users.length);
console.log('Total games:', mockData.games.length);
console.log('Total reviews:', mockData.reviews.length);

// Example 2: Get users by role
console.log('\n=== Users by Role ===');
const developers = testUtils.getUsersByRole('DEVELOPER');
console.log('Developers:', developers.map(u => u.name));

const players = testUtils.getUsersByRole('PLAYER');
console.log('Players:', players.map(u => u.name));

// Example 3: Get featured games
console.log('\n=== Featured Games ===');
const featuredGames = testUtils.getFeaturedGames();
console.log('Featured games:', featuredGames.map(g => g.title));

// Example 4: Get games by genre
console.log('\n=== Games by Genre ===');
const actionGames = testUtils.getGamesByGenre('ACTION');
console.log('Action games:', actionGames.map(g => g.title));

const puzzleGames = testUtils.getGamesByGenre('PUZZLE');
console.log('Puzzle games:', puzzleGames.map(g => g.title));

// Example 5: Get reviews for a specific game
console.log('\n=== Reviews for Space Adventure Quest ===');
const spaceAdventureReviews = testUtils.getReviewsForGame('game_1');
console.log('Reviews:', spaceAdventureReviews.map(r => ({
  user: r.user.name,
  rating: r.rating,
  content: r.content?.substring(0, 50) + '...'
})));

// Example 6: Calculate statistics
console.log('\n=== Game Statistics ===');
const gameStats = testUtils.getGameStats('game_1');
if (gameStats) {
  console.log(`Game: ${gameStats.game.title}`);
  console.log(`Average Rating: ${gameStats.averageRating.toFixed(2)}`);
  console.log(`Total Play Time: ${gameStats.totalPlayTime} minutes`);
  console.log(`Unique Players: ${gameStats.uniquePlayers}`);
  console.log(`Completion Rate: ${(gameStats.completionRate * 100).toFixed(1)}%`);
}

// Example 7: User statistics
console.log('\n=== User Statistics ===');
const userStats = testUtils.getUserStats('user_2');
if (userStats) {
  console.log(`User: ${userStats.user.name}`);
  console.log(`Total Reviews: ${userStats.totalReviews}`);
  console.log(`Average Rating Given: ${userStats.averageRating.toFixed(2)}`);
  console.log(`Total Play Time: ${userStats.totalPlayTime} minutes`);
  console.log(`Games Played: ${userStats.gamesPlayed}`);
  console.log(`Games Completed: ${userStats.gamesCompleted}`);
}

// Example 8: Search and filter games
console.log('\n=== Search and Filter ===');
const searchResults = testUtils.searchGames('space');
console.log('Games matching "space":', searchResults.map(g => g.title));

const filteredGames = testUtils.filterGames({
  genre: ['ACTION', 'ADVENTURE'],
  isFeatured: true,
  minRating: 4.0
});
console.log('Filtered games:', filteredGames.map(g => g.title));

// Example 9: Sort games
console.log('\n=== Sorted Games ===');
const sortedByRating = testUtils.sortGames(mockData.games, 'rating');
console.log('Games sorted by rating:', sortedByRating.map(g => `${g.title} (${g.averageRating})`));

const sortedByPlayCount = testUtils.sortGames(mockData.games, 'playCount');
console.log('Games sorted by play count:', sortedByPlayCount.map(g => `${g.title} (${g.playCount})`));

// Example 10: Generate test scenarios
console.log('\n=== Test Scenarios ===');
const newUserScenario = testUtils.generateTestScenario('new_user');
console.log('New user scenario:', {
  user: newUserScenario?.user?.name,
  games: newUserScenario?.games?.map(g => g.title)
});

const popularGameScenario = testUtils.generateTestScenario('popular_game');
console.log('Popular game scenario:', {
  game: popularGameScenario?.game?.title,
  reviewCount: popularGameScenario?.reviews?.length,
  sessionCount: popularGameScenario?.sessions?.length
});

const developerScenario = testUtils.generateTestScenario('developer_portfolio');
console.log('Developer portfolio scenario:', {
  developer: developerScenario?.developer?.name,
  gameCount: developerScenario?.games?.length,
  totalRevenue: developerScenario?.totalRevenue
});

// Example 11: Generate random data
console.log('\n=== Random Data Generation ===');
const randomUser = mockData.generateRandomUser();
console.log('Random user:', {
  name: randomUser.name,
  role: randomUser.role,
  coins: randomUser.coins,
  level: randomUser.level
});

const randomGame = mockData.generateRandomGame('user_1', mockData.users[0]);
console.log('Random game:', {
  title: randomGame.title,
  genre: randomGame.genre,
  gameType: randomGame.gameType,
  engine: randomGame.engine
});

const randomReview = mockData.generateRandomReview('user_2', mockData.users[1], 'game_1', mockData.games[0]);
console.log('Random review:', {
  rating: randomReview.rating,
  content: randomReview.content,
  isVerified: randomReview.isVerified
});

console.log('\n=== Mock Data Usage Examples Complete ===');
