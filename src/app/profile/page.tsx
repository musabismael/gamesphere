import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Gamepad2, 
  Star, 
  Clock, 
  Calendar,
  Edit,
  Settings,
  Share2,
  Heart,
  Award,
  Target
} from 'lucide-react';

// Mock user profile data
const userProfile = {
  id: 'user123',
  name: 'GamerPro123',
  email: 'gamer@example.com',
  avatar: '/user-avatar.svg',
  bio: 'Passionate gamer and game developer. Love creating immersive experiences and exploring new worlds through gaming.',
  location: 'San Francisco, CA',
  joinDate: '2023-06-15',
  level: 25,
  experience: 2500,
  nextLevelExp: 3000,
  coins: 5000,
  gamesPlayed: 89,
  achievements: 23,
  totalPlayTime: 450, // hours
  favoriteGenres: ['Action', 'Adventure', 'RPG'],
  socialLinks: {
    twitter: '@gamerpro123',
    discord: 'GamerPro#1234',
    website: 'gamerpro.dev'
  },
  stats: {
    gamesCompleted: 67,
    averageRating: 4.7,
    reviewsWritten: 45,
    friendsCount: 128,
    followersCount: 234
  }
};

const recentGames = [
  {
    id: '1',
    title: 'Space Adventure',
    thumbnail: '/placeholder-game.jpg',
    playTime: '45 hours',
    rating: 4.8,
    completed: true,
    lastPlayed: '2 days ago'
  },
  {
    id: '2',
    title: 'Puzzle Master',
    thumbnail: '/placeholder-game2.jpg',
    playTime: '12 hours',
    rating: 4.6,
    completed: false,
    lastPlayed: '1 week ago'
  },
  {
    id: '3',
    title: 'Racing Thunder',
    thumbnail: '/placeholder-game3.jpg',
    playTime: '8 hours',
    rating: 4.7,
    completed: true,
    lastPlayed: '3 days ago'
  }
];

const achievements = [
  {
    id: '1',
    title: 'First Victory',
    description: 'Complete your first game',
    icon: '🏆',
    unlocked: true,
    date: '2023-06-20',
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Speed Demon',
    description: 'Complete any racing game in under 3 minutes',
    icon: '⚡',
    unlocked: true,
    date: '2023-08-15',
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Puzzle Master',
    description: 'Solve 100 puzzles without hints',
    icon: '🧩',
    unlocked: true,
    date: '2023-09-10',
    rarity: 'epic'
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Help 50 other players in the community',
    icon: '🤝',
    unlocked: false,
    progress: 75,
    rarity: 'legendary'
  }
];

const reviews = [
  {
    id: '1',
    gameTitle: 'Space Adventure',
    gameThumbnail: '/placeholder-game.jpg',
    rating: 5,
    review: 'Absolutely amazing game! The graphics are stunning and the gameplay is incredibly engaging. Highly recommended!',
    date: '2024-02-15',
    helpful: 12
  },
  {
    id: '2',
    gameTitle: 'Puzzle Master',
    gameThumbnail: '/placeholder-game2.jpg',
    rating: 4,
    review: 'Great puzzle game with challenging levels. The difficulty curve is well balanced.',
    date: '2024-02-10',
    helpful: 8
  }
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="bg-slate-800/50 border-purple-500/20 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                    {userProfile.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{userProfile.name}</h1>
                    <p className="text-gray-400 mb-2">{userProfile.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(userProfile.joinDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        Level {userProfile.level}
                      </span>
                      <span className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        {userProfile.achievements} achievements
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{userProfile.stats.gamesCompleted}</div>
                <div className="text-sm text-gray-400">Games Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{userProfile.stats.averageRating}</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{userProfile.stats.followersCount}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{userProfile.totalPlayTime}h</div>
                <div className="text-sm text-gray-400">Total Play Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="games" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
                <TabsTrigger value="games" className="data-[state=active]:bg-purple-500">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Games
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500">
                  <Trophy className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-500">
                  <Star className="w-4 h-4 mr-2" />
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="games" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Games</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentGames.map((game) => (
                      <div key={game.id} className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                        <Image 
                          src={game.thumbnail} 
                          alt={game.title}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold">{game.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {game.playTime}
                            </span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {game.rating}
                            </span>
                            {game.completed && (
                              <Badge className="bg-green-500 text-white text-xs">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-500 text-xs mt-1">Last played: {game.lastPlayed}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
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
                        <div className="text-right">
                          <Badge 
                            variant={achievement.rarity === 'legendary' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                          {achievement.unlocked && (
                            <Award className="w-6 h-6 text-green-400 mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Game Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Image 
                            src={review.gameThumbnail} 
                            alt={review.gameTitle}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-white font-semibold">{review.gameTitle}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{review.review}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>{new Date(review.date).toLocaleDateString()}</span>
                              <span className="flex items-center">
                                <Heart className="w-3 h-3 mr-1" />
                                {review.helpful} helpful
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Genres */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Favorite Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.favoriteGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-sm">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Twitter:</span>
                  <span className="text-white text-sm">{userProfile.socialLinks.twitter}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Discord:</span>
                  <span className="text-white text-sm">{userProfile.socialLinks.discord}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Website:</span>
                  <span className="text-white text-sm">{userProfile.socialLinks.website}</span>
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Level Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current Level:</span>
                  <span className="text-white font-semibold">{userProfile.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experience:</span>
                  <span className="text-white font-semibold">{userProfile.experience}/{userProfile.nextLevelExp}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                    style={{ width: `${(userProfile.experience / userProfile.nextLevelExp) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs text-center">
                  {userProfile.nextLevelExp - userProfile.experience} XP to next level
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
