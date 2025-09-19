import { Suspense } from 'react';
import { GameCard } from '@/components/game/game-card';
import { GameFilters } from '@/components/game/game-filters';
import { SearchBar } from '@/components/game/search-bar';
import { Gamepad2, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
interface MockGame {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  genre: string[];
  engine: string;
  averageRating: number;
  totalRatings: number;
  playCount: number;
  isFeatured: boolean;
  isKidsSafe: boolean;
  developer: {
    name: string;
    id: string;
  };
}

const mockGames: MockGame[] = [
  {
    id: '1',
    title: 'Space Adventure',
    description: 'An epic space exploration game with stunning graphics and engaging gameplay.',
    thumbnail: '/placeholder-game.jpg',
    genre: ['ACTION', 'ADVENTURE'],
    engine: 'UNITY',
    averageRating: 4.8,
    totalRatings: 1250,
    playCount: 15000,
    isFeatured: true,
    isKidsSafe: true,
    developer: {
      name: 'Space Games Studio',
      id: 'dev1'
    }
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Challenge your mind with hundreds of brain-teasing puzzles.',
    thumbnail: '/placeholder-game.jpg',
    genre: ['PUZZLE', 'CASUAL'],
    engine: 'HTML5',
    averageRating: 4.6,
    totalRatings: 890,
    playCount: 12000,
    isFeatured: false,
    isKidsSafe: true,
    developer: {
      name: 'Puzzle Games Inc',
      id: 'dev2'
    }
  },
  {
    id: '3',
    title: 'Racing Thunder',
    description: 'High-speed racing action with realistic physics and stunning visuals.',
    thumbnail: '/placeholder-game.jpg',
    genre: ['RACING', 'SPORTS'],
    engine: 'WEBGL',
    averageRating: 4.7,
    totalRatings: 2100,
    playCount: 25000,
    isFeatured: true,
    isKidsSafe: false,
    developer: {
      name: 'Speed Games',
      id: 'dev3'
    }
  },
  {
    id: '4',
    title: 'Magic Quest',
    description: 'Embark on a magical journey through enchanted forests and mystical realms.',
    thumbnail: '/placeholder-game.jpg',
    genre: ['RPG', 'ADVENTURE'],
    engine: 'GODOT',
    averageRating: 4.9,
    totalRatings: 3200,
    playCount: 45000,
    isFeatured: true,
    isKidsSafe: true,
    developer: {
      name: 'Fantasy Studios',
      id: 'dev4'
    }
  },
  {
    id: '5',
    title: 'Tower Defense Pro',
    description: 'Defend your base against waves of enemies in this strategic tower defense game.',
    thumbnail: '/placeholder-game.jpg',
    genre: ['STRATEGY', 'TOWER_DEFENSE'],
    engine: 'PHASER',
    averageRating: 4.5,
    totalRatings: 1800,
    playCount: 22000,
    isFeatured: false,
    isKidsSafe: true,
    developer: {
      name: 'Strategy Games Co',
      id: 'dev5'
    }
  },
  {
    id: '6',
    title: 'Endless Runner',
    description: 'Run, jump, and dodge obstacles in this fast-paced endless runner.',
    thumbnail: '/placeholder-game.jpg',
    genre: ['ENDLESS_RUNNER', 'CASUAL'],
    engine: 'PIXIJS',
    averageRating: 4.3,
    totalRatings: 950,
    playCount: 18000,
    isFeatured: false,
    isKidsSafe: true,
    developer: {
      name: 'Casual Games',
      id: 'dev6'
    }
  }
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Discover Games</h1>
          <p className="text-xl text-gray-300">
            Explore thousands of amazing games from developers around the world
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

        {/* Featured Games Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockGames.filter(game => game.isFeatured).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        {/* All Games Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">All Games</h2>
          <Suspense fallback={<GamesLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </Suspense>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Load More Games
          </Button>
        </div>
      </div>
    </div>
  );
}

function GamesLoadingSkeleton() {
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
