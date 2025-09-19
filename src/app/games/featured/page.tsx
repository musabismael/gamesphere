import { Suspense } from 'react';
import { GameCard } from '@/components/game/game-card';
import { GameFilters } from '@/components/game/game-filters';
import { SearchBar } from '@/components/game/search-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gamepad2, Star, Filter, Grid, List, Crown } from 'lucide-react';
import { Game } from '@/types';

// Mock featured games data
const featuredGames: Game[] = [
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
  }
];

export default function FeaturedGamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Featured Games</h1>
          </div>
          <p className="text-xl text-gray-300">
            Handpicked games that showcase the best of GameSphere
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

        {/* Featured Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">All Featured Games</h2>
            <Badge variant="secondary" className="text-sm">
              {featuredGames.length} games
            </Badge>
          </div>
          
          <Suspense fallback={<FeaturedGamesLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredGames.map((game) => (
                <div key={game.id} className="relative">
                  <GameCard game={game} />
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>

        {/* Why Featured Section */}
        <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why These Games Are Featured</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">High Quality</h4>
              <p className="text-gray-400 text-sm">
                Exceptional gameplay, graphics, and user experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Popular</h4>
              <p className="text-gray-400 text-sm">
                Loved by thousands of players worldwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Innovative</h4>
              <p className="text-gray-400 text-sm">
                Pushing the boundaries of web gaming
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedGamesLoadingSkeleton() {
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
