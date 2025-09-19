import { Suspense } from 'react';
import { GameCard } from '@/components/game/game-card';
import { GameFilters } from '@/components/game/game-filters';
import { SearchBar } from '@/components/game/search-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gamepad2, Shield, Filter, Grid, List, Heart } from 'lucide-react';
import { Game } from '@/types';

// Mock kids-safe games data
const kidsGames: Game[] = [
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

export default function KidsGamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">Kids Games</h1>
          </div>
          <p className="text-xl text-gray-300">
            Safe, fun, and educational games perfect for children of all ages
          </p>
        </div>

        {/* Safety Notice */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-green-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Safe for Kids</h3>
              <p className="text-gray-300 text-sm">
                All games in this section are carefully curated and verified to be appropriate for children. 
                They feature no violence, inappropriate content, or external links. Parents can play with confidence!
              </p>
            </div>
          </div>
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

        {/* Age Groups */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Age</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
              <div className="text-2xl">👶</div>
              <span className="text-sm font-medium">Ages 3-5</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
              <div className="text-2xl">🧒</div>
              <span className="text-sm font-medium">Ages 6-8</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
              <div className="text-2xl">👦</div>
              <span className="text-sm font-medium">Ages 9-12</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
              <div className="text-2xl">👧</div>
              <span className="text-sm font-medium">All Ages</span>
            </Button>
          </div>
        </div>

        {/* Kids Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">All Kids Games</h2>
            <Badge variant="secondary" className="text-sm">
              {kidsGames.length} safe games
            </Badge>
          </div>
          
          <Suspense fallback={<KidsGamesLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kidsGames.map((game) => (
                <div key={game.id} className="relative">
                  <GameCard game={game} />
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Kids Safe
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>

        {/* Educational Benefits */}
        <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Educational Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Safe Environment</h4>
              <p className="text-gray-400 text-sm">
                All games are carefully screened for appropriate content and safety
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Learning Through Play</h4>
              <p className="text-gray-400 text-sm">
                Educational games that teach while entertaining young minds
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Parent Approved</h4>
              <p className="text-gray-400 text-sm">
                Trusted by parents worldwide for safe, quality entertainment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KidsGamesLoadingSkeleton() {
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
