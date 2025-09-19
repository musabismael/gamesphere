import { Game } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Download, Tag } from 'lucide-react';
import { formatNumber, formatDuration } from '@/utils';

interface GameInfoProps {
  game: Game;
}

export function GameInfo({ game }: GameInfoProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-6">
      <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {game.description}
      </p>

      {/* Tags */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-2xl font-bold text-white">
              {game.averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {formatNumber(game.totalRatings)} reviews
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-blue-400 mr-1" />
            <span className="text-2xl font-bold text-white">
              {formatNumber(game.playCount)}
            </span>
          </div>
          <p className="text-sm text-gray-400">total plays</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-green-400 mr-1" />
            <span className="text-2xl font-bold text-white">
              {formatDuration(game.totalPlayTime)}
            </span>
          </div>
          <p className="text-sm text-gray-400">play time</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Download className="w-5 h-5 text-purple-400 mr-1" />
            <span className="text-2xl font-bold text-white">
              {formatNumber(game.downloadCount)}
            </span>
          </div>
          <p className="text-sm text-gray-400">downloads</p>
        </div>
      </div>

      {/* Genres */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {game.genre.map((genre) => (
            <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
              {genre.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
