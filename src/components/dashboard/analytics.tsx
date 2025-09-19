'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  Eye,
  MousePointer,
  Heart
} from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalPlays: 45230,
    totalPlayTime: 125000,
    totalRevenue: 2450.75,
    averageRating: 4.7,
    totalDownloads: 3200,
    uniquePlayers: 18500,
    averageSessionTime: 15.5,
    bounceRate: 12.3
  },
  dailyStats: [
    { date: '2024-02-15', plays: 1200, revenue: 85.50 },
    { date: '2024-02-16', plays: 1350, revenue: 92.30 },
    { date: '2024-02-17', plays: 1100, revenue: 78.90 },
    { date: '2024-02-18', plays: 1450, revenue: 105.20 },
    { date: '2024-02-19', plays: 1600, revenue: 115.80 },
    { date: '2024-02-20', plays: 1800, revenue: 128.50 },
    { date: '2024-02-21', plays: 1750, revenue: 125.30 }
  ],
  topGames: [
    { id: '1', title: 'Space Adventure', plays: 15000, revenue: 1250.50, rating: 4.8 },
    { id: '2', title: 'Puzzle Master', plays: 8500, revenue: 750.25, rating: 4.6 },
    { id: '3', title: 'Racing Thunder', plays: 12000, revenue: 980.75, rating: 4.7 }
  ],
  demographics: {
    ageGroups: [
      { age: '13-17', percentage: 25 },
      { age: '18-24', percentage: 35 },
      { age: '25-34', percentage: 28 },
      { age: '35-44', percentage: 12 }
    ],
    countries: [
      { country: 'United States', percentage: 35 },
      { country: 'United Kingdom', percentage: 15 },
      { country: 'Canada', percentage: 12 },
      { country: 'Germany', percentage: 10 },
      { country: 'Other', percentage: 28 }
    ]
  }
};

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Plays</p>
                <p className="text-3xl font-bold text-white">
                  {mockAnalytics.overview.totalPlays.toLocaleString()}
                </p>
                <p className="text-sm text-green-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                <p className="text-3xl font-bold text-white">
                  ${mockAnalytics.overview.totalRevenue.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-400">Unique Players</p>
                <p className="text-3xl font-bold text-white">
                  {mockAnalytics.overview.uniquePlayers.toLocaleString()}
                </p>
                <p className="text-sm text-blue-400 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  +15.2% from last month
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
                <p className="text-sm font-medium text-gray-400">Avg Session</p>
                <p className="text-3xl font-bold text-white">
                  {mockAnalytics.overview.averageSessionTime}m
                </p>
                <p className="text-sm text-yellow-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  +2.1m from last month
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">
            Overview
          </TabsTrigger>
          <TabsTrigger value="games" className="data-[state=active]:bg-purple-500">
            Games
          </TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-purple-500">
            Demographics
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-purple-500">
            Revenue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Plays Chart */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Daily Plays (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.dailyStats.map((stat) => (
                    <div key={stat.date} className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {new Date(stat.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${(stat.plays / 2000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-white w-16 text-right">
                          {stat.plays.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300">Page Views</span>
                    </div>
                    <span className="text-white font-semibold">
                      {mockAnalytics.overview.totalPlays.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MousePointer className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Click Rate</span>
                    </div>
                    <span className="text-white font-semibold">68.5%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Engagement</span>
                    </div>
                    <span className="text-white font-semibold">4.7/5</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-300">Avg Session</span>
                    </div>
                    <span className="text-white font-semibold">
                      {mockAnalytics.overview.averageSessionTime}m
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topGames.map((game, index) => (
                  <div key={game.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{game.title}</h4>
                        <p className="text-sm text-gray-400">
                          {game.plays.toLocaleString()} plays • {game.rating}/5 rating
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${game.revenue.toFixed(2)}</p>
                      <p className="text-sm text-gray-400">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Age Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.demographics.ageGroups.map((group) => (
                    <div key={group.age} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{group.age} years</span>
                        <span className="text-white">{group.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.demographics.countries.map((country) => (
                    <div key={country.country} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{country.country}</span>
                        <span className="text-white">{country.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">$1,450.25</p>
                  <p className="text-sm text-gray-400">In-Game Purchases</p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">$750.50</p>
                  <p className="text-sm text-gray-400">Ad Revenue</p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">$250.00</p>
                  <p className="text-sm text-gray-400">Premium Games</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
