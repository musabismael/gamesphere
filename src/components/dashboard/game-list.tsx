import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Edit, 
  BarChart3,
  Play,
  Star,
  Users,
  Clock
} from 'lucide-react';
import { formatNumber, formatDuration } from '@/utils/index';

// Mock games data
const mockGames = [
  {
    id: '1',
    title: 'Space Adventure',
    description: 'An epic space exploration game with stunning graphics',
    thumbnail: '/placeholder-game.jpg',
    isPublished: true,
    isFeatured: true,
    playCount: 15000,
    totalPlayTime: 45000,
    averageRating: 4.8,
    totalRatings: 1250,
    revenue: 1250.50,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20')
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Challenge your mind with brain-teasing puzzles',
    thumbnail: '/placeholder-game.jpg',
    isPublished: true,
    isFeatured: false,
    playCount: 8500,
    totalPlayTime: 25000,
    averageRating: 4.6,
    totalRatings: 890,
    revenue: 750.25,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '3',
    title: 'Racing Thunder',
    description: 'High-speed racing action with realistic physics',
    thumbnail: '/placeholder-game.jpg',
    isPublished: false,
    isFeatured: false,
    playCount: 0,
    totalPlayTime: 0,
    averageRating: 0,
    totalRatings: 0,
    revenue: 0,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-18')
  }
];

export function GameList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockGames.map((game) => (
        <Card key={game.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-t-lg relative overflow-hidden">
            {game.thumbnail ? (
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-white/50 text-6xl">🎮</div>
              </div>
            )}
            
            {/* Status Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {game.isPublished ? (
                <Badge variant="success" className="bg-green-500/90 text-white">
                  Published
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-yellow-500/90 text-black">
                  Draft
                </Badge>
              )}
              {game.isFeatured && (
                <Badge variant="secondary" className="bg-yellow-500/90 text-black">
                  Featured
                </Badge>
              )}
            </div>

            {/* Action Menu */}
            <div className="absolute top-3 right-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-slate-900/50 hover:bg-slate-800/50">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">{game.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{game.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="h-4 w-4" />
                <span>{formatNumber(game.playCount)} plays</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(game.totalPlayTime)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Star className="h-4 w-4" />
                <span>{game.averageRating > 0 ? game.averageRating.toFixed(1) : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <BarChart3 className="h-4 w-4" />
                <span>${game.revenue.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              {game.isPublished && (
                <Button size="sm" variant="outline" className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
