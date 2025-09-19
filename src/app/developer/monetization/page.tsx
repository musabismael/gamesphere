'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Users,
  BarChart3
} from 'lucide-react';

// Mock monetization data
const mockMonetization = {
  overview: {
    totalRevenue: 12345.67,
    monthlyRevenue: 2345.67,
    totalEarnings: 9876.54,
    pendingPayout: 1234.56,
    conversionRate: 12.5,
    averageRevenuePerUser: 8.45,
    totalPayouts: 4567.89,
    nextPayoutDate: '2024-03-01'
  },
  revenueStreams: [
    {
      id: '1',
      name: 'In-App Purchases',
      type: 'iap',
      revenue: 5678.90,
      percentage: 46.0,
      isActive: true,
      description: 'Virtual items, power-ups, and premium content'
    },
    {
      id: '2',
      name: 'Premium Downloads',
      type: 'premium',
      revenue: 3456.78,
      percentage: 28.0,
      isActive: true,
      description: 'One-time purchase for full game access'
    },
    {
      id: '3',
      name: 'Ad Revenue',
      type: 'ads',
      revenue: 2345.67,
      percentage: 19.0,
      isActive: true,
      description: 'Banner ads, interstitial ads, and rewarded videos'
    },
    {
      id: '4',
      name: 'Subscription',
      type: 'subscription',
      revenue: 864.32,
      percentage: 7.0,
      isActive: false,
      description: 'Monthly premium subscription service'
    }
  ],
  pricingTiers: [
    {
      id: '1',
      name: 'Free',
      price: 0,
      features: ['Basic gameplay', 'Limited levels', 'Community access'],
      isActive: true,
      userCount: 12345
    },
    {
      id: '2',
      name: 'Premium',
      price: 9.99,
      features: ['Full game access', 'All levels', 'Exclusive content', 'No ads'],
      isActive: true,
      userCount: 2345
    },
    {
      id: '3',
      name: 'Pro',
      price: 19.99,
      features: ['Everything in Premium', 'Early access', 'Priority support', 'Custom themes'],
      isActive: true,
      userCount: 567
    }
  ],
  payoutHistory: [
    {
      id: '1',
      date: '2024-02-01',
      amount: 1234.56,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: '2',
      date: '2024-01-01',
      amount: 987.65,
      status: 'completed',
      method: 'PayPal'
    },
    {
      id: '3',
      date: '2023-12-01',
      amount: 1456.78,
      status: 'completed',
      method: 'Bank Transfer'
    }
  ]
};

export default function MonetizationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [revenueStreams, setRevenueStreams] = useState(mockMonetization.revenueStreams);
  const [pricingTiers, setPricingTiers] = useState(mockMonetization.pricingTiers);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const toggleRevenueStream = (id: string) => {
    setRevenueStreams(prev => 
      prev.map(stream => 
        stream.id === id ? { ...stream, isActive: !stream.isActive } : stream
      )
    );
  };

  const togglePricingTier = (id: string) => {
    setPricingTiers(prev => 
      prev.map(tier => 
        tier.id === id ? { ...tier, isActive: !tier.isActive } : tier
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Monetization Dashboard</h1>
          <p className="text-gray-400">Manage your revenue streams and pricing strategies</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(mockMonetization.overview.totalRevenue)}</p>
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
                  <p className="text-sm font-medium text-gray-400">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(mockMonetization.overview.monthlyRevenue)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+8.7%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Pending Payout</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(mockMonetization.overview.pendingPayout)}</p>
                </div>
                <CreditCard className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Next payout: {new Date(mockMonetization.overview.nextPayoutDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">{mockMonetization.overview.conversionRate}%</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+2.1%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueStreams.map((stream) => (
                      <div key={stream.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${stream.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <div>
                            <p className="text-white font-medium">{stream.name}</p>
                            <p className="text-sm text-gray-400">{stream.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{formatCurrency(stream.revenue)}</p>
                          <p className="text-sm text-gray-400">{stream.percentage}%</p>
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
                    <span className="text-gray-400">Average Revenue Per User</span>
                    <span className="text-white font-medium">{formatCurrency(mockMonetization.overview.averageRevenuePerUser)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Payouts</span>
                    <span className="text-white font-medium">{formatCurrency(mockMonetization.overview.totalPayouts)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Conversion Rate</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {mockMonetization.overview.conversionRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Next Payout</span>
                    <span className="text-white font-medium">
                      {new Date(mockMonetization.overview.nextPayoutDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Revenue Streams</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stream
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueStreams.map((stream) => (
                    <div key={stream.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Switch
                          checked={stream.isActive}
                          onCheckedChange={() => toggleRevenueStream(stream.id)}
                        />
                        <div>
                          <h3 className="text-white font-medium">{stream.name}</h3>
                          <p className="text-sm text-gray-400">{stream.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right mr-4">
                          <p className="text-white font-medium">{formatCurrency(stream.revenue)}</p>
                          <p className="text-sm text-gray-400">{stream.percentage}% of total</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Pricing Tiers</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {pricingTiers.map((tier) => (
                    <div key={tier.id} className={`p-6 rounded-lg border-2 ${
                      tier.isActive 
                        ? 'border-purple-500/50 bg-purple-500/10' 
                        : 'border-slate-600 bg-slate-700/50'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                        <Switch
                          checked={tier.isActive}
                          onCheckedChange={() => togglePricingTier(tier.id)}
                        />
                      </div>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-white">
                          {tier.price === 0 ? 'Free' : formatCurrency(tier.price)}
                        </span>
                        {tier.price > 0 && <span className="text-gray-400">/month</span>}
                      </div>
                      <ul className="space-y-2 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-300">
                            <Star className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span>{tier.userCount.toLocaleString()} users</span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Payout History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMonetization.payoutHistory.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{payout.method}</p>
                          <p className="text-sm text-gray-400">{new Date(payout.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{formatCurrency(payout.amount)}</p>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            payout.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {payout.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Payout Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Payout Method</p>
                      <p className="text-sm text-gray-400">Bank Transfer</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Payout Threshold</p>
                      <p className="text-sm text-gray-400">$100.00 minimum</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Payout Schedule</p>
                      <p className="text-sm text-gray-400">Monthly (1st of each month)</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Change
                    </Button>
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
