import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Gamepad2, 
  Eye, 
  EyeOff,
  Save,
  Trash2,
  Download,
  Upload,
  Key,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-xl text-gray-300">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-purple-500/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Gaming
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
                <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-purple-500">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-purple-500">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="gaming" className="data-[state=active]:bg-purple-500">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Gaming
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium text-gray-300">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        defaultValue="Passionate gamer and game developer. Love creating immersive experiences and exploring new worlds through gaming."
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium text-gray-300">
                        Location
                      </label>
                      <Input
                        id="location"
                        defaultValue="San Francisco, CA"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Password & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium text-gray-300">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type="password"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 pr-10"
                        />
                        <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium text-gray-300">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type="password"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 pr-10"
                        />
                        <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 pr-10"
                        />
                        <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Key className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Enable 2FA</h4>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Setup Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Game Updates</h4>
                        <p className="text-gray-400 text-sm">Get notified when games you follow are updated</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Achievements</h4>
                        <p className="text-gray-400 text-sm">Receive notifications for new achievements</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Community</h4>
                        <p className="text-gray-400 text-sm">Notifications about community activity</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Marketing</h4>
                        <p className="text-gray-400 text-sm">Promotional emails and special offers</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Game Invites</h4>
                        <p className="text-gray-400 text-sm">When friends invite you to play games</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Messages</h4>
                        <p className="text-gray-400 text-sm">Direct messages from other users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">System Updates</h4>
                        <p className="text-gray-400 text-sm">Important platform updates and maintenance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Theme & Display</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Theme</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700 border-purple-500/20 hover:border-purple-500/40">
                          <div className="w-8 h-8 bg-slate-600 rounded"></div>
                          <span className="text-sm">Dark</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700 border-slate-600 hover:border-slate-500">
                          <div className="w-8 h-8 bg-white rounded"></div>
                          <span className="text-sm">Light</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700 border-slate-600 hover:border-slate-500">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                          <span className="text-sm">Auto</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Language</h4>
                      <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:border-purple-500 focus:outline-none">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ar">Arabic</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Display Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Show animations</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Compact mode</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">High contrast</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gaming Settings */}
              <TabsContent value="gaming" className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Gaming Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Default Game Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Auto-save progress</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Show FPS counter</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Enable cheats</span>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Privacy</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Show online status</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Allow friend requests</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Show play time publicly</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Export Data</h4>
                        <p className="text-gray-400 text-sm">Download a copy of your data</p>
                      </div>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Import Data</h4>
                        <p className="text-gray-400 text-sm">Import data from another account</p>
                      </div>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Import
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-red-400 font-semibold">Delete Account</h4>
                        <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
