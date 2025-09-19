'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Eye,
  Download,
  Star,
  Calendar,
  Filter,
  Play
} from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalPlays: 45678,
    uniquePlayers: 12345,
    totalRevenue: 2345.67,
    averageRating: 4.6,
    totalDownloads: 8901,
    playTime: 123456, // minutes
    conversionRate: 12.5,
    retentionRate: 68.3
  },
  dailyStats: [
    { date: '2024-02-20', plays: 234, revenue: 45.67, downloads: 89 },
    { date: '2024-02-19', plays: 198, revenue: 38.90, downloads: 76 },
    { date: '2024-02-18', plays: 312, revenue: 52.34, downloads: 98 },
    { date: '2024-02-17', plays: 267, revenue: 41.23, downloads: 82 },
    { date: '2024-02-16', plays: 289, revenue: 48.56, downloads: 91 },
    { date: '2024-02-15', plays: 345, revenue: 56.78, downloads: 105 },
    { date: '2024-02-14', plays: 298, revenue: 49.12, downloads: 87 }
  ],
  topGames: [
    {
      id: '1',
      title: 'Space Adventure',
      plays: 15000,
      revenue: 1250.50,
      rating: 4.8,
      downloads: 3200
    },
    {
      id: '2',
      title: 'Puzzle Master',
      plays: 8500,
      revenue: 750.25,
      rating: 4.6,
      downloads: 2100
    },
    {
      id: '3',
      title: 'Racing Thunder',
      plays: 6200,
      revenue: 520.80,
      rating: 4.4,
      downloads: 1800
    }
  ],
  demographics: {
    ageGroups: [
      { range: '13-17', percentage: 25 },
      { range: '18-24', percentage: 35 },
      { range: '25-34', percentage: 28 },
      { range: '35-44', percentage: 12 }
    ],
    regions: [
      { name: 'North America', percentage: 45 },
      { name: 'Europe', percentage: 30 },
      { name: 'Asia', percentage: 20 },
      { name: 'Other', percentage: 5 }
    ]
  }
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedGame, setSelectedGame] = useState('all');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your games&apos; performance and player engagement</p>
        </div>

        {/* Time Range and Filters */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-md px-3 py-1 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Games</option>
              <option value="space-adventure">Space Adventure</option>
              <option value="puzzle-master">Puzzle Master</option>
              <option value="racing-thunder">Racing Thunder</option>
            </select>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Plays</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(mockAnalytics.overview.totalPlays)}</p>
                </div>
                <Play className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Unique Players</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(mockAnalytics.overview.uniquePlayers)}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+8.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(mockAnalytics.overview.totalRevenue)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+15.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Avg Rating</p>
                  <p className="text-2xl font-bold text-white">{mockAnalytics.overview.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+0.2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Daily Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.dailyStats.map((stat) => (
                      <div key={stat.date} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-400">{new Date(stat.date).toLocaleDateString()}</p>
                          <p className="text-white font-medium">{stat.plays} plays</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-500 font-medium">{formatCurrency(stat.revenue)}</p>
                          <p className="text-sm text-gray-400">{stat.downloads} downloads</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Conversion Rate</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {mockAnalytics.overview.conversionRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Retention Rate</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      {mockAnalytics.overview.retentionRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Play Time</span>
                    <span className="text-white font-medium">
                      {Math.floor(mockAnalytics.overview.playTime / 60)}h {mockAnalytics.overview.playTime % 60}m
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Downloads</span>
                    <span className="text-white font-medium">{formatNumber(mockAnalytics.overview.totalDownloads)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Game Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topGames.map((game, index) => (
                    <div key={game.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{game.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {formatNumber(game.plays)} plays
                            </span>
                            <span className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              {formatNumber(game.downloads)} downloads
                            </span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {game.rating} rating
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-500 font-medium">{formatCurrency(game.revenue)}</p>
                        <p className="text-sm text-gray-400">revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Age Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.demographics.ageGroups.map((group) => (
                      <div key={group.range} className="flex items-center justify-between">
                        <span className="text-gray-400">{group.range} years</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${group.percentage}%` }}
                            />
                          </div>
                          <span className="text-white font-medium w-8">{group.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.demographics.regions.map((region) => (
                      <div key={region.name} className="flex items-center justify-between">
                        <span className="text-gray-400">{region.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${region.percentage}%` }}
                            />
                          </div>
                          <span className="text-white font-medium w-8">{region.percentage}%</span>
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
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{formatCurrency(1234.56)}</p>
                    <p className="text-sm text-gray-400">In-App Purchases</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Download className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{formatCurrency(890.12)}</p>
                    <p className="text-sm text-gray-400">Premium Downloads</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Eye className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{formatCurrency(221.99)}</p>
                    <p className="text-sm text-gray-400">Ad Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
