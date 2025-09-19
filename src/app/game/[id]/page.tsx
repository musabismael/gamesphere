import { Suspense } from 'react';
import { GamePlayer } from '@/components/game/game-player';
import { GameInfo } from '@/components/game/game-info';
import { GameReviews } from '@/components/game/game-reviews';
import { GameComments } from '@/components/game/game-comments';
import { ArrowLeft, Share2, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Game, GameGenre } from '@/types';

// Mock game data
const mockGame: Game = {
  id: '1',
  title: 'Space Adventure',
  description: 'An epic space exploration game with stunning graphics and engaging gameplay. Embark on a journey through the cosmos, discover new planets, and battle alien forces in this action-packed adventure.',
  shortDescription: 'Epic space exploration with stunning graphics',
  thumbnail: '/placeholder-game.jpg',
  banner: '/placeholder-banner.jpg',
  gameFile: '/games/space-adventure/index.html',
  gameType: 'UNITY_WEB' as const,
  engine: 'UNITY' as const,
  genre: ['ACTION', 'ADVENTURE'] as GameGenre[],
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
};

interface GamePageProps {
  params: {
    id: string;
  };
}

export default function GamePage({}: GamePageProps) {
  const game = mockGame; // In a real app, fetch from API

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur border-b border-purple-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/games">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Games
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{game.title}</h1>
                <p className="text-gray-400">by {game.developer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Favorite
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Player */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600">
                <Suspense fallback={<GamePlayerSkeleton />}>
                  <GamePlayer game={game} />
                </Suspense>
              </div>
            </div>

            {/* Game Info */}
            <div className="mt-8">
              <GameInfo game={game} />
            </div>

            {/* Comments */}
            <div className="mt-8">
              <GameComments gameId={game.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Details */}
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Game Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Genre:</span>
                  <div className="flex gap-1">
                    {game.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Engine:</span>
                  <span className="text-white">{game.engine}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white">{game.version}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">File Size:</span>
                  <span className="text-white">{(game.fileSize! / 1024 / 1024).toFixed(1)} MB</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Age Rating:</span>
                  <span className="text-white">{game.ageRating}+</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Published:</span>
                  <span className="text-white">
                    {game.publishedAt?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Plays:</span>
                  <span className="text-white">{game.playCount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Play Time:</span>
                  <span className="text-white">
                    {Math.floor(game.totalPlayTime / 60)} hours
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Downloads:</span>
                  <span className="text-white">{game.downloadCount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Reviews:</span>
                  <span className="text-white">{game.totalRatings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-6">
              <GameReviews gameId={game.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GamePlayerSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/50 text-6xl">🎮</div>
    </div>
  );
}
