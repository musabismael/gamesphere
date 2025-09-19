import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Clock, 
  TrendingUp, 
  MessageCircle,
  Settings,
  Play,
  Award,
} from 'lucide-react';
import Link from 'next/link';

// Mock user data
const userStats = {
  level: 15,
  experience: 1250,
  nextLevelExp: 1500,
  coins: 2500,
  gamesPlayed: 42,
  achievements: 8,
  playTime: 125, // hours
  favoriteGenre: 'Action',
  joinDate: '2023-06-15'
};

const recentGames = [
  {
    id: '1',
    title: 'Space Adventure',
    thumbnail: '/placeholder-game.jpg',
    lastPlayed: '2 hours ago',
    playTime: '45 minutes',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Puzzle Master',
    thumbnail: '/placeholder-game2.jpg',
    lastPlayed: '1 day ago',
    playTime: '30 minutes',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Racing Thunder',
    thumbnail: '/placeholder-game3.jpg',
    lastPlayed: '3 days ago',
    playTime: '1 hour 15 minutes',
    rating: 4.7
  }
];

const achievements = [
  {
    id: '1',
    title: 'First Victory',
    description: 'Complete your first game',
    icon: '🏆',
    unlocked: true,
    date: '2023-06-20'
  },
  {
    id: '2',
    title: 'Speed Demon',
    description: 'Complete any racing game in under 3 minutes',
    icon: '⚡',
    unlocked: true,
    date: '2023-08-15'
  },
  {
    id: '3',
    title: 'Puzzle Master',
    description: 'Solve 100 puzzles without hints',
    icon: '🧩',
    unlocked: false,
    progress: 75
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Help 50 other players in the community',
    icon: '🤝',
    unlocked: false,
    progress: 30
  }
];

const friends = [
  {
    id: '1',
    name: 'GamerPro123',
    avatar: '/user-avatar1.svg',
    status: 'online',
    level: 22,
    lastSeen: 'Now'
  },
  {
    id: '2',
    name: 'PuzzleMaster',
    avatar: '/user-avatar2.svg',
    status: 'away',
    level: 18,
    lastSeen: '2 hours ago'
  },
  {
    id: '3',
    name: 'SpeedRacer',
    avatar: '/user-avatar3.svg',
    status: 'offline',
    level: 32,
    lastSeen: '1 day ago'
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-xl text-gray-300">
            Here&apos;s what&apos;s happening in your gaming world
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Level</p>
                  <p className="text-3xl font-bold text-white">{userStats.level}</p>
                  <p className="text-xs text-gray-500">
                    {userStats.experience}/{userStats.nextLevelExp} XP
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                  style={{ width: `${(userStats.experience / userStats.nextLevelExp) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Coins</p>
                  <p className="text-3xl font-bold text-white">{userStats.coins.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Available balance</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Games Played</p>
                  <p className="text-3xl font-bold text-white">{userStats.gamesPlayed}</p>
                  <p className="text-xs text-gray-500">Total games</p>
                </div>
                <Gamepad2 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Play Time</p>
                  <p className="text-3xl font-bold text-white">{userStats.playTime}h</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <Clock className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="recent" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
                <TabsTrigger value="recent" className="data-[state=active]:bg-purple-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-purple-500">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Recently Played</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentGames.map((game) => (
                      <div key={game.id} className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                        <Image 
                          src={game.thumbnail} 
                          alt={game.title}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold">{game.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {game.lastPlayed}
                            </span>
                            <span className="flex items-center">
                              <Play className="w-3 h-3 mr-1" />
                              {game.playTime}
                            </span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {game.rating}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          Play Again
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className={`flex items-center space-x-4 p-4 rounded-lg ${
                        achievement.unlocked 
                          ? 'bg-green-500/10 border border-green-500/20' 
                          : 'bg-slate-700/50'
                      }`}>
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold">{achievement.title}</h4>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                          {achievement.unlocked ? (
                            <p className="text-green-400 text-xs">
                              Unlocked on {achievement.date ? new Date(achievement.date).toLocaleDateString() : 'Unknown date'}
                            </p>
                          ) : (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        {achievement.unlocked && (
                          <Award className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Earned achievement &quot;Speed Demon&quot;</p>
                          <p className="text-gray-400 text-xs">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Gamepad2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Completed &quot;Space Adventure&quot;</p>
                          <p className="text-gray-400 text-xs">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Rated &quot;Puzzle Master&quot; 5 stars</p>
                          <p className="text-gray-400 text-xs">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
                  <Link href="/games">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Browse Games
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/community">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Community
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Friends */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Friends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={friend.avatar} 
                        alt={friend.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
                        friend.status === 'online' ? 'bg-green-400' :
                        friend.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold">{friend.name}</p>
                      <p className="text-gray-400 text-xs">Level {friend.level} • {friend.lastSeen}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-3">
                  View All Friends
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Favorite Genre:</span>
                  <span className="text-white text-sm font-semibold">{userStats.favoriteGenre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Member Since:</span>
                  <span className="text-white text-sm font-semibold">
                    {new Date(userStats.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Achievements:</span>
                  <span className="text-white text-sm font-semibold">{userStats.achievements}/50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Total Play Time:</span>
                  <span className="text-white text-sm font-semibold">{userStats.playTime}h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
