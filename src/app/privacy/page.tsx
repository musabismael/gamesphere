import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, Lock, Eye, Database, User, Settings } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-purple-500/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#overview" className="block text-purple-400 hover:text-purple-300 text-sm">
                  1. Overview
                </a>
                <a href="#information" className="block text-purple-400 hover:text-purple-300 text-sm">
                  2. Information We Collect
                </a>
                <a href="#usage" className="block text-purple-400 hover:text-purple-300 text-sm">
                  3. How We Use Information
                </a>
                <a href="#sharing" className="block text-purple-400 hover:text-purple-300 text-sm">
                  4. Information Sharing
                </a>
                <a href="#security" className="block text-purple-400 hover:text-purple-300 text-sm">
                  5. Data Security
                </a>
                <a href="#retention" className="block text-purple-400 hover:text-purple-300 text-sm">
                  6. Data Retention
                </a>
                <a href="#rights" className="block text-purple-400 hover:text-purple-300 text-sm">
                  7. Your Rights
                </a>
                <a href="#cookies" className="block text-purple-400 hover:text-purple-300 text-sm">
                  8. Cookies & Tracking
                </a>
                <a href="#children" className="block text-purple-400 hover:text-purple-300 text-sm">
                  9. Children&apos;s Privacy
                </a>
                <a href="#changes" className="block text-purple-400 hover:text-purple-300 text-sm">
                  10. Policy Changes
                </a>
                <a href="#contact" className="block text-purple-400 hover:text-purple-300 text-sm">
                  11. Contact Us
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <Card id="overview" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  This Privacy Policy explains how GameSphere (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your personal information when you use our gaming platform and services.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">Our Commitment</h4>
                      <p className="text-gray-300 text-sm">
                        We are committed to protecting your privacy and ensuring the security of your personal information. We will never sell your data to third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card id="information" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Personal Information</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-6">
                    <li>Name and email address (when you create an account)</li>
                    <li>Profile information and preferences</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Usage Information</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-6">
                    <li>Game play data and statistics</li>
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Interaction with our platform and features</li>
                    <li>Performance and error logs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Content Information</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-6">
                    <li>Games you upload (if you&apos;re a developer)</li>
                    <li>Reviews, comments, and ratings you post</li>
                    <li>Messages and communications</li>
                    <li>User-generated content and media</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card id="usage" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  <span>How We Use Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Provide and personalize your gaming experience</li>
                  <li>Process transactions and manage your account</li>
                  <li>Communicate with you about updates and features</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card id="sharing" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Information Sharing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist in our operations</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2">Data Protection</h4>
                      <p className="text-gray-300 text-sm">
                        All third-party service providers are required to maintain the same level of data protection as we do.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card id="security" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  <span>Data Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication systems</li>
                  <li>Secure data centers and infrastructure</li>
                  <li>Employee training on data protection</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card id="rights" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                  <span>Your Rights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Restrict or object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-2">Exercise Your Rights</h4>
                      <p className="text-gray-300 text-sm">
                        To exercise any of these rights, please contact us at privacy@gamesphere.com or use the settings in your account.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card id="cookies" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                  <span>Cookies & Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  We use cookies and similar technologies to enhance your experience and analyze usage patterns:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies (with your consent)</li>
                </ul>
                <p className="text-gray-300">
                  You can control cookie preferences through your browser settings or our cookie management tool.
                </p>
              </CardContent>
            </Card>

            {/* Section 9 */}
            <Card id="children" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                  <span>Children&apos;s Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  We are committed to protecting children&apos;s privacy. Our platform is designed to be safe for users of all ages, and we have special protections in place for children under 13.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>We do not knowingly collect personal information from children under 13</li>
                  <li>Parents can review, update, or delete their child&apos;s information</li>
                  <li>We provide special safety features for kids&apos; games</li>
                  <li>Content is moderated to ensure age-appropriateness</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card id="contact" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                  <span>Contact Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">GameSphere Privacy Team</p>
                  <p className="text-gray-300 text-sm">Email: privacy@gamesphere.com</p>
                  <p className="text-gray-300 text-sm">Address: 123 Gaming Street, Tech City, TC 12345</p>
                </div>
              </CardContent>
            </Card>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link href="/terms">
                  Read Terms of Service
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cookies">
                  Cookie Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
