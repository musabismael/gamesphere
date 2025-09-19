import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Star, 
  Users, 
  Gamepad2, 
  TrendingUp, 
  Award,
  Filter,
  Grid,
  List
} from 'lucide-react';
import Link from 'next/link';

// Mock developer data
const developers = [
  {
    id: 'dev1',
    name: 'Space Games Studio',
    email: 'contact@spacegames.com',
    image: '/dev-avatar.jpg',
    bio: 'Creating immersive space adventures since 2020. We specialize in Unity-based games with stunning visuals and engaging gameplay.',
    location: 'San Francisco, CA',
    joinedDate: '2020-03-15',
    totalGames: 8,
    totalPlays: 150000,
    averageRating: 4.8,
    totalRatings: 12500,
    followers: 2500,
    isVerified: true,
    specialties: ['Unity', 'WebGL', 'Action', 'Adventure'],
    featuredGames: ['Space Adventure', 'Galaxy Explorer', 'Cosmic Battle']
  },
  {
    id: 'dev2',
    name: 'Puzzle Games Inc',
    email: 'hello@puzzlegames.com',
    image: '/dev-avatar2.jpg',
    bio: 'Dedicated to creating mind-bending puzzles that challenge and entertain players of all ages.',
    location: 'New York, NY',
    joinedDate: '2019-08-22',
    totalGames: 15,
    totalPlays: 89000,
    averageRating: 4.6,
    totalRatings: 8900,
    followers: 1800,
    isVerified: true,
    specialties: ['HTML5', 'Puzzle', 'Casual', 'Educational'],
    featuredGames: ['Puzzle Master', 'Brain Teaser', 'Logic Quest']
  },
  {
    id: 'dev3',
    name: 'Speed Games',
    email: 'info@speedgames.com',
    image: '/dev-avatar3.jpg',
    bio: 'Racing game specialists bringing high-octane action to the web. Experience the thrill of speed!',
    location: 'Los Angeles, CA',
    joinedDate: '2021-01-10',
    totalGames: 6,
    totalPlays: 250000,
    averageRating: 4.7,
    totalRatings: 21000,
    followers: 3200,
    isVerified: true,
    specialties: ['WebGL', 'Racing', 'Sports', 'Multiplayer'],
    featuredGames: ['Racing Thunder', 'Speed Demon', 'Track Champion']
  },
  {
    id: 'dev4',
    name: 'Fantasy Studios',
    email: 'contact@fantasystudios.com',
    image: '/dev-avatar4.jpg',
    bio: 'Crafting magical worlds and epic adventures. We bring fantasy to life through innovative game design.',
    location: 'Seattle, WA',
    joinedDate: '2018-11-05',
    totalGames: 12,
    totalPlays: 450000,
    averageRating: 4.9,
    totalRatings: 32000,
    followers: 4800,
    isVerified: true,
    specialties: ['Godot', 'RPG', 'Adventure', 'Fantasy'],
    featuredGames: ['Magic Quest', 'Dragon Slayer', 'Fantasy Realm']
  },
  {
    id: 'dev5',
    name: 'Strategy Games Co',
    email: 'hello@strategygames.com',
    image: '/dev-avatar5.jpg',
    bio: 'Strategic thinking meets engaging gameplay. We create games that challenge your mind and entertain your soul.',
    location: 'Austin, TX',
    joinedDate: '2020-06-18',
    totalGames: 10,
    totalPlays: 220000,
    averageRating: 4.5,
    totalRatings: 18000,
    followers: 2100,
    isVerified: false,
    specialties: ['Phaser', 'Strategy', 'Tower Defense', 'Simulation'],
    featuredGames: ['Tower Defense Pro', 'Empire Builder', 'War Tactics']
  },
  {
    id: 'dev6',
    name: 'Casual Games',
    email: 'info@casualgames.com',
    image: '/dev-avatar6.jpg',
    bio: 'Making gaming accessible to everyone with simple, fun, and addictive casual games.',
    location: 'Chicago, IL',
    joinedDate: '2019-12-03',
    totalGames: 25,
    totalPlays: 180000,
    averageRating: 4.3,
    totalRatings: 9500,
    followers: 1500,
    isVerified: false,
    specialties: ['PixiJS', 'Casual', 'Mobile', 'Arcade'],
    featuredGames: ['Endless Runner', 'Bubble Pop', 'Match Three']
  }
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Game Developers</h1>
          <p className="text-xl text-gray-300">
            Discover talented developers and their amazing creations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search developers..."
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Developers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.slice(0, 3).map((developer) => (
              <Card key={developer.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={developer.image} alt={developer.name} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {developer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-white text-lg">{developer.name}</CardTitle>
                          {developer.isVerified && (
                            <Award className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <CardDescription className="text-gray-400 text-sm">
                          {developer.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    {developer.bio}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Gamepad2 className="w-4 h-4 mr-2" />
                        {developer.totalGames} games
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        {developer.totalPlays.toLocaleString()} plays
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Star className="w-4 h-4 mr-2" />
                        {developer.averageRating} rating
                      </div>
                      <div className="flex items-center text-gray-400">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {developer.followers.toLocaleString()} followers
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {developer.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      asChild
                    >
                      <Link href={`/developer/${developer.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Developers */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">All Developers</h2>
          <Suspense fallback={<DevelopersLoadingSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developers.map((developer) => (
                <Card key={developer.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={developer.image} alt={developer.name} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                            {developer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-white">{developer.name}</CardTitle>
                            {developer.isVerified && (
                              <Award className="w-3 h-3 text-yellow-400" />
                            )}
                          </div>
                          <CardDescription className="text-gray-400 text-sm">
                            {developer.location}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Gamepad2 className="w-3 h-3 mr-1" />
                          {developer.totalGames} games
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Star className="w-3 h-3 mr-1" />
                          {developer.averageRating}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {developer.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white"
                        asChild
                      >
                        <Link href={`/developer/${developer.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
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

function DevelopersLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-slate-800/50 border-purple-500/20 animate-pulse">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div>
                  <div className="h-5 bg-slate-700 rounded w-24 mb-1"></div>
                  <div className="h-4 bg-slate-700 rounded w-20"></div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
              </div>
              <div className="flex gap-1">
                <div className="h-5 w-12 bg-slate-700 rounded"></div>
                <div className="h-5 w-16 bg-slate-700 rounded"></div>
              </div>
              <div className="h-8 bg-slate-700 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
