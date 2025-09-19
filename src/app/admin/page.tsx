'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Gamepad2, 
  Shield, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  TrendingUp,
  Eye,
  Lock,
  Unlock,
  MoreHorizontal,
  Search,
  Filter,
  RefreshCw,
  Download,
  Database,
  Activity
} from 'lucide-react';
import { usePermissions } from '@/hooks/use-permissions';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// Types for API responses
interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGames: number;
  publishedGames: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalPlays: number;
  averageRating: number;
  systemHealth: number;
  securityAlerts: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'locked';
  lastLogin: string;
  joinDate: string;
  coins?: number;
  level?: number;
  twoFactorEnabled?: boolean;
}

interface Game {
  id: string;
  title: string;
  developer: string;
  status: 'published' | 'pending' | 'rejected';
  plays: number;
  rating: number;
  uploadDate: string;
  isFeatured?: boolean;
}


interface AuditLog {
  id: string;
  action: string;
  resource: string;
  userId: string;
  userEmail: string;
  timestamp: string;
  details: Record<string, unknown>;
}

interface Backup {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  type: 'full' | 'partial';
}

export default function AdminDashboard() {
  const { isAdmin, isLoading, userRole } = usePermissions();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // State for API data
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // API functions
  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setAdminStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/admin/games');
      if (response.ok) {
        const data = await response.json();
        setGames(data.data.games);
      }
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch('/api/admin/audit-logs');
      if (response.ok) {
        const data = await response.json();
        setAuditLogs(data.data.logs);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    }
  };

  const fetchBackups = async () => {
    try {
      const response = await fetch('/api/admin/backup');
      if (response.ok) {
        const data = await response.json();
        setBackups(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch backups:', error);
    }
  };

  const loadAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchAdminStats(),
        fetchUsers(),
        fetchGames(),
        fetchAuditLogs(),
        fetchBackups()
      ]);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to load admin data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [toast]);

  // Load data on component mount
  useEffect(() => {
    if (isAdmin()) {
      loadAllData();
    }
  }, [isAdmin, loadAllData]);

  // Redirect if not admin
  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-4">
              You need administrator privileges to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Current role: {userRole}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUserAction = async (userId: string, action: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: `User ${action} successfully`,
      });
    } catch {
      toast({
        title: 'Error',
        description: `Failed to ${action} user`,
        variant: 'destructive',
      });
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) {
      toast({
        title: 'No Selection',
        description: 'Please select users to perform bulk action',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Success',
        description: `Bulk ${action} completed for ${selectedUsers.length} users`,
      });
      setSelectedUsers([]);
    } catch {
      toast({
        title: 'Error',
        description: `Failed to perform bulk ${action}`,
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-xl text-gray-300">
                Manage users, games, and monitor system health
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={loadAllData}
                disabled={refreshing}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm">System Online</span>
              </div>
              <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {adminStats?.securityAlerts || 0} Alerts
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Users</p>
                  <p className="text-3xl font-bold text-white">
                    {adminStats?.totalUsers?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Active: {adminStats?.activeUsers?.toLocaleString() || '0'}
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
                  <p className="text-sm font-medium text-gray-400">Total Games</p>
                  <p className="text-3xl font-bold text-white">
                    {adminStats?.totalGames?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Published: {adminStats?.publishedGames?.toLocaleString() || '0'}
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
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">
                    ${adminStats?.totalRevenue?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    This month: ${adminStats?.monthlyRevenue?.toLocaleString() || '0'}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">System Health</p>
                  <p className="text-3xl font-bold text-white">
                    {adminStats?.systemHealth || 0}%
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    All systems operational
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-500">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-purple-500">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-purple-500">
              <Activity className="w-4 h-4 mr-2" />
              Audit Logs
            </TabsTrigger>
            <TabsTrigger value="backup" className="data-[state=active]:bg-purple-500">
              <Database className="w-4 h-4 mr-2" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Users</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">{user.role}</p>
                        <p className="text-xs text-gray-500">{user.lastLogin}</p>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-gray-400 text-center py-4">No users found</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Games */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Games</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {games.slice(0, 5).map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{game.title}</p>
                        <p className="text-sm text-gray-400">by {game.developer}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm ${
                          game.status === 'published' ? 'text-green-400' : 
                          game.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {game.status}
                        </p>
                        <p className="text-xs text-gray-500">{game.plays} plays</p>
                      </div>
                    </div>
                  ))}
                  {games.length === 0 && (
                    <p className="text-gray-400 text-center py-4">No games found</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">User Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleBulkAction('unlock')}
                      disabled={selectedUsers.length === 0}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Unlock Selected
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleBulkAction('lock')}
                      disabled={selectedUsers.length === 0}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Lock Selected
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Users className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{selectedUsers.length} users selected</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedUsers([])}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {users.filter(user =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(prev => [...prev, user.id]);
                            } else {
                              setSelectedUsers(prev => prev.filter(id => id !== user.id));
                            }
                          }}
                          className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                        />
                        <div className={`w-3 h-3 rounded-full ${
                          user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${
                          user.role === 'ADMIN' ? 'bg-red-500/20 text-red-400' :
                          user.role === 'DEVELOPER' ? 'bg-blue-500/20 text-blue-400' :
                          user.role === 'MODERATOR' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {user.role}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(user.id, 'view')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(user.id, user.status === 'active' ? 'lock' : 'unlock')}
                        >
                          {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No users found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>Audit Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-lg bg-slate-700/30 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{log.action} - {log.resource}</p>
                        <p className="text-sm text-gray-400">User: {log.userEmail}</p>
                        <p className="text-xs text-gray-500">{log.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {log.action}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {auditLogs.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No audit logs found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Tab */}
          <TabsContent value="backup" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Database className="w-5 h-5 text-green-400" />
                    <span>Database Backups</span>
                  </CardTitle>
                  <Button 
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/admin/backup', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            includeUsers: true,
                            includeGames: true,
                            includeReviews: true,
                            includeAnalytics: true,
                            compress: true
                          })
                        });
                        if (response.ok) {
                          toast({ title: 'Success', description: 'Backup created successfully' });
                          fetchBackups();
                        }
                      } catch {
                        toast({ title: 'Error', description: 'Failed to create backup', variant: 'destructive' });
                      }
                    }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Database className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{backup.filename}</p>
                        <p className="text-sm text-gray-400">
                          {(backup.size / 1024 / 1024).toFixed(2)} MB • {backup.type}
                        </p>
                        <p className="text-xs text-gray-500">{backup.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
                {backups.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No backups found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Game Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {games.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Gamepad2 className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">{game.title}</p>
                        <p className="text-sm text-gray-400">by {game.developer}</p>
                        <p className="text-xs text-gray-500">{game.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        game.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        game.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {game.status}
                      </Badge>
                      <span className="text-sm text-gray-400">{game.plays} plays</span>
                      <span className="text-sm text-gray-400">★ {game.rating}</span>
                    </div>
                  </div>
                ))}
                {games.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No games found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Advanced analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">System configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
