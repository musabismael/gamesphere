import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Mock genre data
const genres = [
  {
    id: 'action',
    name: 'Action',
    description: 'Fast-paced games with exciting combat and adventure',
    icon: '⚔️',
    gameCount: 1250,
    color: 'from-red-500 to-orange-500',
    popularGames: ['Space Adventure', 'Combat Zone', 'Thunder Strike']
  },
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Explore vast worlds and embark on epic journeys',
    icon: '🗺️',
    gameCount: 890,
    color: 'from-green-500 to-teal-500',
    popularGames: ['Magic Quest', 'Lost Temple', 'Mystic Forest']
  },
  {
    id: 'puzzle',
    name: 'Puzzle',
    description: 'Challenge your mind with brain-teasing puzzles',
    icon: '🧩',
    gameCount: 650,
    color: 'from-blue-500 to-cyan-500',
    popularGames: ['Puzzle Master', 'Brain Teaser', 'Logic Quest']
  },
  {
    id: 'racing',
    name: 'Racing',
    description: 'High-speed racing action and competition',
    icon: '🏎️',
    gameCount: 420,
    color: 'from-yellow-500 to-orange-500',
    popularGames: ['Racing Thunder', 'Speed Demon', 'Track Champion']
  },
  {
    id: 'strategy',
    name: 'Strategy',
    description: 'Plan, build, and conquer in strategic games',
    icon: '♟️',
    gameCount: 380,
    color: 'from-purple-500 to-pink-500',
    popularGames: ['Tower Defense Pro', 'Empire Builder', 'War Tactics']
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Easy-to-play games for quick entertainment',
    icon: '😊',
    gameCount: 2100,
    color: 'from-pink-500 to-rose-500',
    popularGames: ['Endless Runner', 'Bubble Pop', 'Match Three']
  },
  {
    id: 'rpg',
    name: 'RPG',
    description: 'Role-playing games with character development',
    icon: '⚔️',
    gameCount: 720,
    color: 'from-indigo-500 to-purple-500',
    popularGames: ['Magic Quest', 'Dragon Slayer', 'Fantasy Realm']
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Virtual sports and athletic competitions',
    icon: '⚽',
    gameCount: 340,
    color: 'from-emerald-500 to-green-500',
    popularGames: ['Soccer Pro', 'Basketball Stars', 'Tennis Master']
  }
];

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Game Genres</h1>
          <p className="text-xl text-gray-300">
            Discover games by category and find your perfect match
          </p>
        </div>

        {/* Featured Genres */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Genres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.slice(0, 4).map((genre) => (
              <Card key={genre.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${genre.color} flex items-center justify-center text-2xl`}>
                      {genre.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {genre.gameCount} games
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{genre.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {genre.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      {genre.gameCount.toLocaleString()} games
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Popular this week
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    asChild
                  >
                    <Link href={`/games?genre=${genre.id}`}>
                      Browse Games
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Genres */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">All Genres</h2>
          <Suspense fallback={<GenresLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {genres.map((genre) => (
                <Card key={genre.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${genre.color} flex items-center justify-center text-xl`}>
                        {genre.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {genre.gameCount}
                      </Badge>
                    </div>
                    <CardTitle className="text-white">{genre.name}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {genre.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-400">Popular games:</p>
                      <div className="flex flex-wrap gap-1">
                        {genre.popularGames.slice(0, 2).map((game, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {game}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white"
                      asChild
                    >
                      <Link href={`/games?genre=${genre.id}`}>
                        <Gamepad2 className="w-4 h-4 mr-2" />
                        View Games
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function GenresLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="bg-slate-800/50 border-purple-500/20 animate-pulse">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
              <div className="h-5 w-12 bg-slate-700 rounded"></div>
            </div>
            <div className="h-6 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded"></div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              <div className="flex gap-1">
                <div className="h-5 w-16 bg-slate-700 rounded"></div>
                <div className="h-5 w-20 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="h-10 bg-slate-700 rounded"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
