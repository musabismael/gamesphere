import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Settings, Shield, Eye, BarChart3, Target, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Cookie className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">Cookie Settings</h1>
          </div>
          <p className="text-xl text-gray-300">
            Manage your cookie preferences and learn how we use cookies to improve your experience
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <Badge variant="secondary" className="text-sm">
              <Calendar className="w-3 h-3 mr-1" />
              Last updated: February 20, 2024
            </Badge>
            <Badge variant="outline" className="text-sm">
              Version 1.0
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cookie Settings Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-purple-500/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Cookie Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Essential Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Essential Cookies</h4>
                      <p className="text-gray-400 text-sm">Required for basic functionality</p>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                  <p className="text-gray-300 text-xs">
                    These cookies are necessary for the website to function and cannot be switched off.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Analytics Cookies</h4>
                      <p className="text-gray-400 text-sm">Help us improve our service</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-gray-300 text-xs">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Marketing Cookies</h4>
                      <p className="text-gray-400 text-sm">Used for targeted advertising</p>
                    </div>
                    <Switch />
                  </div>
                  <p className="text-gray-300 text-xs">
                    These cookies are used to deliver relevant advertisements to you.
                  </p>
                </div>

                {/* Preference Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Preference Cookies</h4>
                      <p className="text-gray-400 text-sm">Remember your settings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-gray-300 text-xs">
                    These cookies remember your preferences and settings.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Save Preferences
                  </Button>
                  <Button variant="outline" className="w-full mt-2">
                    Accept All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What Are Cookies */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Cookie className="w-6 h-6" />
                  <span>What Are Cookies?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2">Safe & Secure</h4>
                      <p className="text-gray-300 text-sm">
                        Cookies do not contain viruses or malicious code. They are simply text files that help us improve your experience on our platform.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Essential Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Essential Cookies</h4>
                      <p className="text-gray-400 text-sm">Always active - Required for basic functionality</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm ml-11">
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and authentication. The website cannot function properly without these cookies.
                  </p>
                  <div className="ml-11">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Examples:</p>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Session management cookies</li>
                      <li>Authentication cookies</li>
                      <li>Security cookies</li>
                      <li>Load balancing cookies</li>
                    </ul>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Analytics Cookies</h4>
                      <p className="text-gray-400 text-sm">Help us understand how you use our site</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm ml-11">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website&apos;s performance and user experience.
                  </p>
                  <div className="ml-11">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Examples:</p>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Google Analytics cookies</li>
                      <li>Page view tracking</li>
                      <li>User behavior analysis</li>
                      <li>Performance monitoring</li>
                    </ul>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Marketing Cookies</h4>
                      <p className="text-gray-400 text-sm">Used to deliver relevant advertisements</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm ml-11">
                    These cookies are used to track visitors across websites to display relevant and engaging advertisements. They help us measure the effectiveness of our advertising campaigns.
                  </p>
                  <div className="ml-11">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Examples:</p>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Advertising network cookies</li>
                      <li>Social media tracking</li>
                      <li>Retargeting cookies</li>
                      <li>Conversion tracking</li>
                    </ul>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Preference Cookies</h4>
                      <p className="text-gray-400 text-sm">Remember your settings and preferences</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm ml-11">
                    These cookies remember your choices and preferences to provide you with a more personalized experience. They help us remember your language, theme, and other settings.
                  </p>
                  <div className="ml-11">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Examples:</p>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Language preferences</li>
                      <li>Theme settings</li>
                      <li>Display preferences</li>
                      <li>Game preferences</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Some cookies on our site are set by third-party services that appear on our pages. We have no control over these cookies and they are subject to the respective privacy policies of these third parties.
                </p>
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      We use Google Analytics to analyze website traffic and user behavior.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Privacy Policy: <a href="#" className="text-purple-400 hover:text-purple-300">https://policies.google.com/privacy</a>
                    </p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Social Media</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Social media platforms may set cookies when you interact with their content on our site.
                    </p>
                    <p className="text-gray-400 text-xs">
                      These include Facebook, Twitter, and other social platforms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Managing Your Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Use the cookie settings panel on this page</li>
                  <li>Configure your browser settings to block or delete cookies</li>
                  <li>Use browser extensions to manage cookies</li>
                  <li>Opt out of specific third-party cookies through their websites</li>
                </ul>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">Important Note</h4>
                      <p className="text-gray-300 text-sm">
                        Disabling certain cookies may affect the functionality of our website and your user experience. Some features may not work properly without cookies.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link href="/privacy">
                  Read Privacy Policy
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
