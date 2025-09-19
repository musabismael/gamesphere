import { Card, CardContent } from '@/components/ui/card';
import { 
  Gamepad2, 
  Users, 
  DollarSign, 
  TrendingUp,
  Star,
  Clock,
  Download,
  Eye
} from 'lucide-react';

// Mock developer stats
const mockStats = {
  totalGames: 12,
  totalPlays: 45230,
  totalRevenue: 2450.75,
  averageRating: 4.7,
  totalPlayTime: 125000,
  totalDownloads: 3200,
  uniquePlayers: 18500,
  averageSessionTime: 15.5
};

export function DeveloperStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Games</p>
              <p className="text-3xl font-bold text-white">{mockStats.totalGames}</p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2 this month
              </p>
            </div>
            <Gamepad2 className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Plays</p>
              <p className="text-3xl font-bold text-white">
                {mockStats.totalPlays.toLocaleString()}
              </p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-white">
                ${mockStats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.3% from last month
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Average Rating</p>
              <p className="text-3xl font-bold text-white">{mockStats.averageRating}</p>
              <p className="text-sm text-yellow-400 flex items-center">
                <Star className="w-4 h-4 mr-1" />
                +0.2 from last month
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Play Time</p>
              <p className="text-3xl font-bold text-white">
                {Math.floor(mockStats.totalPlayTime / 60)}h
              </p>
              <p className="text-sm text-blue-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {mockStats.averageSessionTime}m avg
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Downloads</p>
              <p className="text-3xl font-bold text-white">
                {mockStats.totalDownloads.toLocaleString()}
              </p>
              <p className="text-sm text-purple-400 flex items-center">
                <Download className="w-4 h-4 mr-1" />
                +15.2% from last month
              </p>
            </div>
            <Download className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Unique Players</p>
              <p className="text-3xl font-bold text-white">
                {mockStats.uniquePlayers.toLocaleString()}
              </p>
              <p className="text-sm text-cyan-400 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                +18.7% from last month
              </p>
            </div>
            <Users className="h-8 w-8 text-cyan-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Page Views</p>
              <p className="text-3xl font-bold text-white">
                {(mockStats.totalPlays * 1.5).toLocaleString()}
              </p>
              <p className="text-sm text-orange-400 flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                +22.1% from last month
              </p>
            </div>
            <Eye className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
