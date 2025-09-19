'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Play, 
  Heart, 
  MoreHorizontal,
  Users,
  Clock
} from 'lucide-react';
import { formatNumber } from '@/utils';
import { useToast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks/use-permissions';

interface GameCardProps {
  game: {
    id: string; 
    title: string; 
    description: string; 
    thumbnail?: string;
    averageRating?: number;
    totalRatings?: number;
    playCount?: number;
    genre?: string[];
    developer?: { name?: string; id: string };
    isFeatured?: boolean;
    isKidsSafe?: boolean;
  };
}

export function GameCard({ game }: GameCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = usePermissions();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to add games to your favorites',
        variant: 'destructive',
      });
      return;
    }

    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? 'Removed from Favorites' : 'Added to Favorites',
      description: isFavorited ? 'Game removed from your favorites' : 'Game added to your favorites',
    });
  };

  // const handleLike = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   
  //   if (!isAuthenticated) {
  //     toast({
  //       title: 'Authentication Required',
  //       description: 'Please sign in to like games',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }

  //   setIsLiked(!isLiked);
  //   toast({
  //     title: isLiked ? 'Unliked' : 'Liked',
  //     description: isLiked ? 'Game unliked' : 'Game liked',
  //   });
  // };

  const handleMoreOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // TODO: Implement more options menu
    toast({
      title: 'More Options',
      description: 'More options menu coming soon',
    });
  };

  return (
    <div className="group bg-slate-800/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Game Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
        {game.thumbnail ? (
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white/50 text-6xl">🎮</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="icon" 
            variant="secondary" 
            className={`h-8 w-8 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            onClick={handleFavorite}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8"
            onClick={handleMoreOptions}
            title="More options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Featured Badge */}
        {game.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-yellow-500/90 text-black">
              Featured
            </Badge>
          </div>
        )}

        {/* Kids Safe Badge */}
        {game.isKidsSafe && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="success" className="bg-green-500/90 text-white">
              Kids Safe
            </Badge>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-400">
              {game.averageRating?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {game.description}
        </p>

        {/* Developer */}
        <p className="text-xs text-gray-500 mb-4">
          by {game.developer?.name || 'Unknown'}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-4">
          {game.genre?.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre.replace('_', ' ')}
            </Badge>
          )) || []}
          {(game.genre?.length || 0) > 2 && (
            <Badge variant="outline" className="text-xs">
              +{(game.genre?.length || 0) - 2}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{formatNumber(game.playCount || 0)} plays</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{game.totalRatings || 0} reviews</span>
          </div>
        </div>

        {/* Play Button */}
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Link href={`/game/${game.id}`}>
            <Play className="h-4 w-4 mr-2" />
            Play Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
