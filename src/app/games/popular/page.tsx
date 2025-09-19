import { Suspense } from 'react';
import { GameCard } from '@/components/game/game-card';
import { GameFilters } from '@/components/game/game-filters';
import { SearchBar } from '@/components/game/search-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gamepad2, TrendingUp, Filter, Grid, List, Flame } from 'lucide-react';
import { Game } from '@/types';

// Mock popular games data
const popularGames: Game[] = [
  {
    id: '1',
    title: 'Space Adventure',
    description: 'An epic space exploration game with stunning graphics and engaging gameplay.',
    shortDescription: 'Epic space exploration with stunning graphics',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/space-adventure/index.html',
    gameType: 'UNITY_WEB' as const,
    engine: 'UNITY' as const,
    genre: ['ACTION', 'ADVENTURE'] as const,
    tags: ['space', 'adventure', 'action', 'exploration'],
    isPublished: true,
    isFeatured: true,
    isKidsSafe: true,
    ageRating: 7,
    playCount: 15000,
    totalPlayTime: 45000,
    averageRating: 4.8,
    totalRatings: 1250,
    downloadCount: 3200,
    fileSize: 125000000,
    version: '1.2.0',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
    publishedAt: new Date('2024-01-20'),
    developerId: 'dev1',
    developer: {
      id: 'dev1',
      name: 'Space Games Studio',
      email: 'contact@spacegames.com',
      image: '/dev-avatar.jpg',
      role: 'DEVELOPER' as const,
      coins: 5000,
      level: 15,
      experience: 1500,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2024-02-20')
    }
  },
  {
    id: '4',
    title: 'Magic Quest',
    description: 'Embark on a magical journey through enchanted forests and mystical realms.',
    shortDescription: 'Magical journey through enchanted forests',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/magic-quest/index.html',
    gameType: 'GODOT_WEB' as const,
    engine: 'GODOT' as const,
    genre: ['RPG', 'ADVENTURE'] as const,
    tags: ['magic', 'fantasy', 'rpg', 'adventure'],
    isPublished: true,
    isFeatured: true,
    isKidsSafe: true,
    ageRating: 7,
    playCount: 45000,
    totalPlayTime: 135000,
    averageRating: 4.9,
    totalRatings: 3200,
    downloadCount: 6800,
    fileSize: 156000000,
    version: '1.5.2',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-02-10'),
    publishedAt: new Date('2023-12-15'),
    developerId: 'dev4',
    developer: {
      id: 'dev4',
      name: 'Fantasy Studios',
      email: 'contact@fantasystudios.com',
      image: '/dev-avatar4.jpg',
      role: 'DEVELOPER' as const,
      coins: 12000,
      level: 35,
      experience: 3500,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2024-02-10')
    }
  },
  {
    id: '3',
    title: 'Racing Thunder',
    description: 'High-speed racing action with realistic physics and stunning visuals.',
    shortDescription: 'High-speed racing action with realistic physics',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/racing-thunder/index.html',
    gameType: 'WEBGL' as const,
    engine: 'WEBGL' as const,
    genre: ['RACING', 'SPORTS'] as const,
    tags: ['racing', 'sports', 'speed', 'competition'],
    isPublished: true,
    isFeatured: true,
    isKidsSafe: false,
    ageRating: 12,
    playCount: 25000,
    totalPlayTime: 75000,
    averageRating: 4.7,
    totalRatings: 2100,
    downloadCount: 4500,
    fileSize: 89000000,
    version: '2.1.0',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-15'),
    publishedAt: new Date('2024-01-15'),
    developerId: 'dev3',
    developer: {
      id: 'dev3',
      name: 'Speed Games',
      email: 'info@speedgames.com',
      image: '/dev-avatar3.jpg',
      role: 'DEVELOPER' as const,
      coins: 7500,
      level: 22,
      experience: 2200,
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2024-02-15')
    }
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Challenge your mind with hundreds of brain-teasing puzzles.',
    shortDescription: 'Challenge your mind with brain-teasing puzzles',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/puzzle-master/index.html',
    gameType: 'HTML5' as const,
    engine: 'HTML5' as const,
    genre: ['PUZZLE', 'CASUAL'] as const,
    tags: ['puzzle', 'brain', 'logic', 'casual'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 5,
    playCount: 12000,
    totalPlayTime: 36000,
    averageRating: 4.6,
    totalRatings: 890,
    downloadCount: 2100,
    fileSize: 45000000,
    version: '1.3.1',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-18'),
    publishedAt: new Date('2024-01-10'),
    developerId: 'dev2',
    developer: {
      id: 'dev2',
      name: 'Puzzle Games Inc',
      email: 'hello@puzzlegames.com',
      image: '/dev-avatar2.jpg',
      role: 'DEVELOPER' as const,
      coins: 6000,
      level: 18,
      experience: 1800,
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2024-02-18')
    }
  },
  {
    id: '5',
    title: 'Tower Defense Pro',
    description: 'Defend your base against waves of enemies in this strategic tower defense game.',
    shortDescription: 'Strategic tower defense game',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/tower-defense-pro/index.html',
    gameType: 'PHASER' as const,
    engine: 'PHASER' as const,
    genre: ['STRATEGY', 'TOWER_DEFENSE'] as const,
    tags: ['tower', 'defense', 'strategy', 'tactical'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 7,
    playCount: 22000,
    totalPlayTime: 66000,
    averageRating: 4.5,
    totalRatings: 1800,
    downloadCount: 3800,
    fileSize: 67000000,
    version: '2.0.3',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-02-12'),
    publishedAt: new Date('2023-11-20'),
    developerId: 'dev5',
    developer: {
      id: 'dev5',
      name: 'Strategy Games Co',
      email: 'hello@strategygames.com',
      image: '/dev-avatar5.jpg',
      role: 'DEVELOPER' as const,
      coins: 8000,
      level: 20,
      experience: 2000,
      createdAt: new Date('2023-05-01'),
      updatedAt: new Date('2024-02-12')
    }
  },
  {
    id: '6',
    title: 'Endless Runner',
    description: 'Run, jump, and dodge obstacles in this fast-paced endless runner.',
    shortDescription: 'Fast-paced endless runner',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/endless-runner/index.html',
    gameType: 'PIXIJS' as const,
    engine: 'PIXIJS' as const,
    genre: ['ENDLESS_RUNNER', 'CASUAL'] as const,
    tags: ['runner', 'endless', 'casual', 'arcade'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 5,
    playCount: 18000,
    totalPlayTime: 54000,
    averageRating: 4.3,
    totalRatings: 950,
    downloadCount: 2900,
    fileSize: 38000000,
    version: '1.4.2',
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-02-08'),
    publishedAt: new Date('2023-10-05'),
    developerId: 'dev6',
    developer: {
      id: 'dev6',
      name: 'Casual Games',
      email: 'info@casualgames.com',
      image: '/dev-avatar6.jpg',
      role: 'DEVELOPER' as const,
      coins: 4500,
      level: 16,
      experience: 1600,
      createdAt: new Date('2023-04-01'),
      updatedAt: new Date('2024-02-08')
    }
  }
];

export default function PopularGamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">Most Popular</h1>
          </div>
          <p className="text-xl text-gray-300">
            The games everyone&apos;s playing right now - join the fun!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <Suspense fallback={<div className="h-10 bg-slate-700/50 rounded-lg animate-pulse" />}>
            <SearchBar />
          </Suspense>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Suspense fallback={<div className="h-10 bg-slate-700/50 rounded-lg animate-pulse" />}>
                <GameFilters />
              </Suspense>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Trending Games</h2>
            <Badge variant="secondary" className="text-sm">
              {popularGames.length} popular games
            </Badge>
          </div>
          
          <Suspense fallback={<PopularGamesLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularGames.map((game, index) => (
                <div key={game.id} className="relative">
                  <GameCard game={game} />
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>

        {/* Popular This Week */}
        <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Popular This Week</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Space Adventure</h4>
                  <p className="text-gray-400 text-sm">+2,500 plays this week</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">+15%</span>
                </div>
                <Badge variant="secondary">#1 Trending</Badge>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Magic Quest</h4>
                  <p className="text-gray-400 text-sm">+1,800 plays this week</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">+12%</span>
                </div>
                <Badge variant="secondary">#2 Trending</Badge>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Racing Thunder</h4>
                  <p className="text-gray-400 text-sm">+1,200 plays this week</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">+8%</span>
                </div>
                <Badge variant="secondary">#3 Trending</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PopularGamesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-slate-800/50 rounded-xl overflow-hidden border border-purple-500/20 animate-pulse">
          <div className="aspect-video bg-slate-700 flex items-center justify-center">
            <Gamepad2 className="w-16 h-16 text-slate-600" />
          </div>
          <div className="p-6">
            <div className="h-6 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 w-16 bg-slate-700 rounded"></div>
              <div className="h-8 w-20 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
