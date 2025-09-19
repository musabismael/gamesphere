import { Suspense } from 'react';
import { GameCard } from '@/components/game/game-card';
import { GameFilters } from '@/components/game/game-filters';
import { SearchBar } from '@/components/game/search-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gamepad2, Sparkles, Filter, Grid, List, Clock } from 'lucide-react';
import { Game } from '@/types';

// Mock new games data
const newGames: Game[] = [
  {
    id: '7',
    title: 'Cyberpunk Runner',
    description: 'Navigate through a neon-lit cyberpunk city in this fast-paced endless runner.',
    shortDescription: 'Neon-lit cyberpunk endless runner',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/cyberpunk-runner/index.html',
    gameType: 'HTML5' as const,
    engine: 'HTML5' as const,
    genre: ['ENDLESS_RUNNER', 'ACTION'] as const,
    tags: ['cyberpunk', 'runner', 'neon', 'futuristic'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: false,
    ageRating: 13,
    playCount: 1200,
    totalPlayTime: 3600,
    averageRating: 4.2,
    totalRatings: 45,
    downloadCount: 180,
    fileSize: 45000000,
    version: '1.0.0',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    publishedAt: new Date('2024-02-20'),
    developerId: 'dev7',
    developer: {
      id: 'dev7',
      name: 'Neon Games',
      email: 'contact@neongames.com',
      image: '/dev-avatar7.jpg',
      role: 'DEVELOPER' as const,
      coins: 2000,
      level: 8,
      experience: 800,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-02-20')
    }
  },
  {
    id: '8',
    title: 'Medieval Defense',
    description: 'Defend your castle against waves of medieval enemies in this tower defense game.',
    shortDescription: 'Medieval castle tower defense',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/medieval-defense/index.html',
    gameType: 'UNITY_WEB' as const,
    engine: 'UNITY' as const,
    genre: ['STRATEGY', 'TOWER_DEFENSE'] as const,
    tags: ['medieval', 'defense', 'strategy', 'castle'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 7,
    playCount: 850,
    totalPlayTime: 2550,
    averageRating: 4.5,
    totalRatings: 32,
    downloadCount: 95,
    fileSize: 78000000,
    version: '1.0.1',
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-19'),
    publishedAt: new Date('2024-02-18'),
    developerId: 'dev8',
    developer: {
      id: 'dev8',
      name: 'Medieval Studios',
      email: 'info@medievalstudios.com',
      image: '/dev-avatar8.jpg',
      role: 'DEVELOPER' as const,
      coins: 1500,
      level: 6,
      experience: 600,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-19')
    }
  },
  {
    id: '9',
    title: 'Ocean Explorer',
    description: 'Dive deep into the ocean and discover mysterious underwater worlds.',
    shortDescription: 'Underwater exploration adventure',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/ocean-explorer/index.html',
    gameType: 'WEBGL' as const,
    engine: 'WEBGL' as const,
    genre: ['ADVENTURE', 'SIMULATION'] as const,
    tags: ['ocean', 'underwater', 'exploration', 'adventure'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 5,
    playCount: 2100,
    totalPlayTime: 6300,
    averageRating: 4.7,
    totalRatings: 78,
    downloadCount: 320,
    fileSize: 95000000,
    version: '1.0.0',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    publishedAt: new Date('2024-02-15'),
    developerId: 'dev9',
    developer: {
      id: 'dev9',
      name: 'Aqua Games',
      email: 'hello@aquagames.com',
      image: '/dev-avatar9.jpg',
      role: 'DEVELOPER' as const,
      coins: 3000,
      level: 12,
      experience: 1200,
      createdAt: new Date('2023-11-01'),
      updatedAt: new Date('2024-02-15')
    }
  },
  {
    id: '10',
    title: 'Robot Factory',
    description: 'Build and program robots in this educational puzzle game.',
    shortDescription: 'Educational robot building puzzle',
    thumbnail: '/placeholder-game.jpg',
    banner: '/placeholder-banner.jpg',
    gameFile: '/games/robot-factory/index.html',
    gameType: 'HTML5' as const,
    engine: 'HTML5' as const,
    genre: ['PUZZLE', 'EDUCATIONAL'] as const,
    tags: ['robot', 'programming', 'educational', 'puzzle'],
    isPublished: true,
    isFeatured: false,
    isKidsSafe: true,
    ageRating: 5,
    playCount: 1800,
    totalPlayTime: 5400,
    averageRating: 4.3,
    totalRatings: 56,
    downloadCount: 240,
    fileSize: 32000000,
    version: '1.0.0',
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12'),
    publishedAt: new Date('2024-02-12'),
    developerId: 'dev10',
    developer: {
      id: 'dev10',
      name: 'EduGames',
      email: 'contact@edugames.com',
      image: '/dev-avatar10.jpg',
      role: 'DEVELOPER' as const,
      coins: 4000,
      level: 15,
      experience: 1500,
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-02-12')
    }
  }
];

export default function NewGamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">New Releases</h1>
          </div>
          <p className="text-xl text-gray-300">
            Fresh games just added to GameSphere - be the first to play them!
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

        {/* New Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Latest Games</h2>
            <Badge variant="secondary" className="text-sm">
              {newGames.length} new games
            </Badge>
          </div>
          
          <Suspense fallback={<NewGamesLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newGames.map((game) => (
                <div key={game.id} className="relative">
                  <GameCard game={game} />
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>

        {/* Release Schedule */}
        <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Coming Soon</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Mystic Realms</h4>
                  <p className="text-gray-400 text-sm">Fantasy RPG</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Embark on an epic fantasy adventure in a world of magic and mystery.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-sm font-medium">Coming March 15</span>
                <Button size="sm" variant="outline">Notify Me</Button>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Space Colony</h4>
                  <p className="text-gray-400 text-sm">Strategy Simulation</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Build and manage your own space colony in this strategic simulation game.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-sm font-medium">Coming March 22</span>
                <Button size="sm" variant="outline">Notify Me</Button>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Neon Racing</h4>
                  <p className="text-gray-400 text-sm">Racing Arcade</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                High-speed racing through neon-lit cityscapes with stunning visuals.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-sm font-medium">Coming March 29</span>
                <Button size="sm" variant="outline">Notify Me</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewGamesLoadingSkeleton() {
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
