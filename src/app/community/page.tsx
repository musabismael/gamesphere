import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Trophy, 
  Heart,
  Share2,
  MoreHorizontal,
  TrendingUp,
  Gamepad2,
  Award
} from 'lucide-react';

// Mock community data
const posts = [
  {
    id: '1',
    author: {
      name: 'GamerPro123',
      avatar: '/user-avatar1.svg',
      level: 25,
      isVerified: true
    },
    content: 'Just completed Space Adventure on hard mode! The boss fight was absolutely epic. Anyone else struggling with the final level?',
    timestamp: '2 hours ago',
    likes: 42,
    comments: 8,
    shares: 3,
    game: {
      name: 'Space Adventure',
      thumbnail: '/placeholder-game.jpg'
    },
    tags: ['space-adventure', 'achievement', 'help']
  },
  {
    id: '2',
    author: {
      name: 'PuzzleMaster',
      avatar: '/user-avatar2.svg',
      level: 18,
      isVerified: false
    },
    content: 'Created a new puzzle game using HTML5! Check it out and let me know what you think. Looking for feedback on the difficulty curve.',
    timestamp: '4 hours ago',
    likes: 28,
    comments: 15,
    shares: 7,
    game: {
      name: 'Puzzle Master',
      thumbnail: '/placeholder-game2.jpg'
    },
    tags: ['puzzle-master', 'feedback', 'html5']
  },
  {
    id: '3',
    author: {
      name: 'SpeedRacer',
      avatar: '/user-avatar3.svg',
      level: 32,
      isVerified: true
    },
    content: 'New high score in Racing Thunder! 2:34.567 - can anyone beat that? 🏎️💨',
    timestamp: '6 hours ago',
    likes: 67,
    comments: 23,
    shares: 12,
    game: {
      name: 'Racing Thunder',
      thumbnail: '/placeholder-game3.jpg'
    },
    tags: ['racing-thunder', 'high-score', 'challenge']
  }
];

const achievements = [
  {
    id: '1',
    title: 'First Victory',
    description: 'Complete your first game',
    icon: '🏆',
    rarity: 'common',
    unlockedBy: 1250,
    totalUsers: 1500
  },
  {
    id: '2',
    title: 'Speed Demon',
    description: 'Complete any racing game in under 3 minutes',
    icon: '⚡',
    rarity: 'rare',
    unlockedBy: 89,
    totalUsers: 1500
  },
  {
    id: '3',
    title: 'Puzzle Master',
    description: 'Solve 100 puzzles without hints',
    icon: '🧩',
    rarity: 'epic',
    unlockedBy: 23,
    totalUsers: 1500
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Help 50 other players in the community',
    icon: '🤝',
    rarity: 'legendary',
    unlockedBy: 5,
    totalUsers: 1500
  }
];

const leaderboard = [
  {
    rank: 1,
    player: {
      name: 'GameMaster',
      avatar: '/user-avatar4.svg',
      level: 45
    },
    score: 125000,
    gamesPlayed: 89,
    achievements: 23
  },
  {
    rank: 2,
    player: {
      name: 'SpeedRacer',
      avatar: '/user-avatar3.svg',
      level: 32
    },
    score: 98000,
    gamesPlayed: 67,
    achievements: 18
  },
  {
    rank: 3,
    player: {
      name: 'PuzzleMaster',
      avatar: '/user-avatar2.svg',
      level: 28
    },
    score: 87000,
    gamesPlayed: 54,
    achievements: 15
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Community</h1>
          <p className="text-xl text-gray-300">
            Connect with players, share achievements, and discover new games
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="posts" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
                <TabsTrigger value="posts" className="data-[state=active]:bg-purple-500">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500">
                  <Trophy className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-500">
                  <Award className="w-4 h-4 mr-2" />
                  Leaderboard
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                {/* Create Post */}
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/user-avatar.svg" alt="You" />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          Y
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Share your gaming experience..."
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        />
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Gamepad2 className="w-4 h-4 mr-2" />
                              Game
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trophy className="w-4 h-4 mr-2" />
                              Achievement
                            </Button>
                          </div>
                          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                {post.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-white font-semibold">{post.author.name}</h3>
                                {post.author.isVerified && (
                                  <Award className="w-4 h-4 text-yellow-400" />
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  Level {post.author.level}
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm">{post.timestamp}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        
                        {post.game && (
                          <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-3">
                              <Image 
                                src={post.game.thumbnail} 
                                alt={post.game.name}
                                width={64}
                                height={64}
                                sizes="64px"
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h4 className="text-white font-semibold">{post.game.name}</h4>
                                <p className="text-gray-400 text-sm">Play now</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                              <Heart className="w-4 h-4 mr-2" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                              <Share2 className="w-4 h-4 mr-2" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">{achievement.icon}</div>
                        <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Unlocked by:</span>
                            <span className="text-white">{achievement.unlockedBy} players</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${(achievement.unlockedBy / achievement.totalUsers) * 100}%` }}
                            ></div>
                          </div>
                          <Badge 
                            variant={achievement.rarity === 'legendary' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Top Players</CardTitle>
                    <CardDescription className="text-gray-400">
                      Based on total score and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((player) => (
                        <div key={player.rank} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                              {player.rank}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={player.player.avatar} alt={player.player.name} />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                {player.player.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-white font-semibold">{player.player.name}</h4>
                              <p className="text-gray-400 text-sm">Level {player.player.level}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">{player.score.toLocaleString()}</p>
                            <p className="text-gray-400 text-sm">{player.gamesPlayed} games</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white font-semibold">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Played:</span>
                  <span className="text-white font-semibold">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Achievements:</span>
                  <span className="text-white font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Score:</span>
                  <span className="text-white font-semibold">25,430</span>
                </div>
              </CardContent>
            </Card>

            {/* Trending Games */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Trending Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Space Adventure', 'Puzzle Master', 'Racing Thunder'].map((game, index) => (
                  <div key={game} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-white text-sm">{game}</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
