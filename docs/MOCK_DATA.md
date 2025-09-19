# GameSphere Mock Data

This document describes the mock data system for GameSphere testing and development.

## Overview

The mock data system provides comprehensive test data for all major entities in the GameSphere platform, including users, games, reviews, achievements, communities, and more.

## Files

- `src/lib/mock-data.ts` - Main mock data definitions and utility functions
- `src/lib/test-utils.ts` - Helper functions for working with mock data
- `scripts/seed-database.ts` - Database seeding script
- `examples/mock-data-usage.ts` - Usage examples

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Seed the Database

```bash
npm run db:seed
```

### 3. Test Mock Data

```bash
npm run test:mock
```

## Mock Data Structure

### Users
- **6 predefined users** with different roles (PLAYER, DEVELOPER, ADMIN, MODERATOR)
- **Random user generation** with realistic data
- Includes profile information, coins, level, experience

### Games
- **5 predefined games** with various genres and types
- **Random game generation** with different engines and types
- Includes metadata, ratings, play counts, file information

### Reviews
- **5 predefined reviews** with ratings and content
- **Random review generation** with realistic text
- Includes verification status and timestamps

### Additional Data
- **Achievements** - Game-specific achievements with points and descriptions
- **Play Sessions** - User gameplay sessions with duration and scores
- **Game Progress** - User progress tracking with JSON data
- **Communities** - Gaming communities by genre
- **Notifications** - User notifications of various types
- **Analytics** - Game performance metrics
- **Monetization** - Revenue and advertising data

## Usage Examples

### Basic Data Access

```typescript
import { mockData } from '@/lib/mock-data';

// Get all users
const users = mockData.users;

// Get all games
const games = mockData.games;

// Get all reviews
const reviews = mockData.reviews;
```

### Using Test Utilities

```typescript
import { testUtils } from '@/lib/test-utils';

// Get users by role
const developers = testUtils.getUsersByRole('DEVELOPER');
const players = testUtils.getUsersByRole('PLAYER');

// Get featured games
const featuredGames = testUtils.getFeaturedGames();

// Get games by genre
const actionGames = testUtils.getGamesByGenre('ACTION');

// Search games
const searchResults = testUtils.searchGames('space');

// Filter games
const filteredGames = testUtils.filterGames({
  genre: ['ACTION', 'ADVENTURE'],
  isFeatured: true,
  minRating: 4.0
});

// Sort games
const sortedGames = testUtils.sortGames(games, 'rating');
```

### Statistics and Analytics

```typescript
// Get user statistics
const userStats = testUtils.getUserStats('user_2');
console.log(userStats.totalPlayTime);
console.log(userStats.gamesPlayed);

// Get game statistics
const gameStats = testUtils.getGameStats('game_1');
console.log(gameStats.averageRating);
console.log(gameStats.uniquePlayers);
```

### Generate Random Data

```typescript
// Generate random user
const randomUser = mockData.generateRandomUser();

// Generate random game
const randomGame = mockData.generateRandomGame(developerId, developer);

// Generate random review
const randomReview = mockData.generateRandomReview(userId, user, gameId, game);
```

### Test Scenarios

```typescript
// Generate test scenarios
const newUserScenario = testUtils.generateTestScenario('new_user');
const popularGameScenario = testUtils.generateTestScenario('popular_game');
const developerScenario = testUtils.generateTestScenario('developer_portfolio');
const communityScenario = testUtils.generateTestScenario('community_activity');
```

## Database Seeding

The seeding script (`scripts/seed-database.ts`) will:

1. Clear all existing data
2. Seed predefined mock data
3. Generate additional random data
4. Create relationships between entities
5. Provide a summary of created data

### Running the Seeder

```bash
# Seed the database
npm run db:seed

# Test mock data loading
npm run test:mock
```

## Data Relationships

The mock data maintains proper relationships:

- **Users** can have multiple games (as developers)
- **Games** belong to developers and have reviews, achievements, analytics
- **Reviews** link users to games with ratings and content
- **Play Sessions** track user gameplay with games
- **Game Progress** stores user progress in games
- **Communities** group users by game genres
- **Notifications** alert users to various events

## Customization

### Adding New Mock Data

1. Add new data to the appropriate array in `mock-data.ts`
2. Update the seeding script to include the new data
3. Add utility functions in `test-utils.ts` if needed

### Modifying Existing Data

1. Edit the data arrays in `mock-data.ts`
2. Run the seeding script to update the database
3. Update any dependent utility functions

## Best Practices

1. **Use test utilities** instead of directly accessing mock data arrays
2. **Generate random data** for testing edge cases
3. **Use test scenarios** for complex testing situations
4. **Maintain data consistency** when adding new mock data
5. **Document new utility functions** for team use

## Troubleshooting

### Common Issues

1. **Database connection errors** - Ensure your database is running and accessible
2. **Type errors** - Make sure all imports are correct and types are up to date
3. **Seeding failures** - Check that all required fields are provided in mock data

### Debugging

1. Use `console.log` to inspect mock data structure
2. Check the seeding script output for error messages
3. Verify database schema matches mock data structure

## Contributing

When adding new mock data:

1. Follow the existing naming conventions
2. Include realistic and varied data
3. Update both the data arrays and seeding script
4. Add appropriate utility functions
5. Update this documentation

## Examples

See `examples/mock-data-usage.ts` for comprehensive usage examples covering all features of the mock data system.
