import { Suspense } from 'react';
import { GameList } from '@/components/dashboard/game-list';
import { UploadGame } from '@/components/dashboard/upload-game';
import { Analytics } from '@/components/dashboard/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  BarChart3, 
  Gamepad2, 
  Settings, 
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';

export default function DeveloperDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Developer Dashboard</h1>
          <p className="text-xl text-gray-300">
            Manage your games, track analytics, and grow your audience
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Games</p>
                  <p className="text-3xl font-bold text-white">12</p>
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
                  <p className="text-3xl font-bold text-white">45.2K</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Revenue</p>
                  <p className="text-3xl font-bold text-white">$2,450</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Avg Rating</p>
                  <p className="text-3xl font-bold text-white">4.7</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="games" className="data-[state=active]:bg-purple-500">
              <Gamepad2 className="w-4 h-4 mr-2" />
              My Games
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-purple-500">
              <Upload className="w-4 h-4 mr-2" />
              Upload Game
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">My Games</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Game
              </Button>
            </div>
            <Suspense fallback={<GamesLoadingSkeleton />}>
              <GameList />
            </Suspense>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Upload New Game</h2>
            <Suspense fallback={<UploadLoadingSkeleton />}>
              <UploadGame />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
            <Suspense fallback={<AnalyticsLoadingSkeleton />}>
              <Analytics />
            </Suspense>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Developer Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function GamesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-slate-800/50 border-purple-500/20 animate-pulse">
          <div className="aspect-video bg-slate-700 rounded-t-lg"></div>
          <CardContent className="p-6">
            <div className="h-6 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 w-16 bg-slate-700 rounded"></div>
              <div className="h-8 w-20 bg-slate-700 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function UploadLoadingSkeleton() {
  return (
    <Card className="bg-slate-800/50 border-purple-500/20 animate-pulse">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="h-8 bg-slate-700 rounded w-1/3"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-32 bg-slate-700 rounded"></div>
          <div className="h-10 bg-slate-700 rounded w-1/4"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-purple-500/20 animate-pulse">
          <CardContent className="p-6">
            <div className="h-64 bg-slate-700 rounded"></div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-purple-500/20 animate-pulse">
          <CardContent className="p-6">
            <div className="h-64 bg-slate-700 rounded"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
