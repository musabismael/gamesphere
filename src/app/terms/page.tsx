import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using GameSphere
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
                <a href="#acceptance" className="block text-purple-400 hover:text-purple-300 text-sm">
                  1. Acceptance of Terms
                </a>
                <a href="#description" className="block text-purple-400 hover:text-purple-300 text-sm">
                  2. Service Description
                </a>
                <a href="#user-accounts" className="block text-purple-400 hover:text-purple-300 text-sm">
                  3. User Accounts
                </a>
                <a href="#content" className="block text-purple-400 hover:text-purple-300 text-sm">
                  4. User Content
                </a>
                <a href="#prohibited" className="block text-purple-400 hover:text-purple-300 text-sm">
                  5. Prohibited Uses
                </a>
                <a href="#intellectual" className="block text-purple-400 hover:text-purple-300 text-sm">
                  6. Intellectual Property
                </a>
                <a href="#privacy" className="block text-purple-400 hover:text-purple-300 text-sm">
                  7. Privacy Policy
                </a>
                <a href="#termination" className="block text-purple-400 hover:text-purple-300 text-sm">
                  8. Termination
                </a>
                <a href="#disclaimers" className="block text-purple-400 hover:text-purple-300 text-sm">
                  9. Disclaimers
                </a>
                <a href="#limitation" className="block text-purple-400 hover:text-purple-300 text-sm">
                  10. Limitation of Liability
                </a>
                <a href="#governing" className="block text-purple-400 hover:text-purple-300 text-sm">
                  11. Governing Law
                </a>
                <a href="#changes" className="block text-purple-400 hover:text-purple-300 text-sm">
                  12. Changes to Terms
                </a>
                <a href="#contact" className="block text-purple-400 hover:text-purple-300 text-sm">
                  13. Contact Information
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <Card id="acceptance" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Acceptance of Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  By accessing and using GameSphere (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">Important Notice</h4>
                      <p className="text-gray-300 text-sm">
                        These terms constitute a legally binding agreement. By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card id="description" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Service Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  GameSphere is a global gaming platform that allows developers to upload and showcase their games, and enables players to discover, play, and interact with a wide variety of games. Our service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Game hosting and distribution platform</li>
                  <li>User accounts and profiles</li>
                  <li>Community features including reviews and comments</li>
                  <li>Developer tools and analytics</li>
                  <li>Payment processing for premium features</li>
                  <li>Content moderation and safety features</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card id="user-accounts" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  <span>User Accounts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  To access certain features of the Service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your account information to keep it accurate and current</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2">Account Security</h4>
                      <p className="text-gray-300 text-sm">
                        You are responsible for maintaining the confidentiality of your account credentials. We recommend using strong, unique passwords and enabling two-factor authentication when available.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card id="content" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  <span>User Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  You retain ownership of any content you upload, post, or share on GameSphere (&quot;User Content&quot;). However, by posting User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with the Service.
                </p>
                <p className="text-gray-300">
                  You are solely responsible for your User Content and the consequences of posting it. We reserve the right to remove any content that violates these terms or our community guidelines.
                </p>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card id="prohibited" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  <span>Prohibited Uses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  You may not use GameSphere for any unlawful purpose or to solicit others to perform unlawful acts. Prohibited activities include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Transmitting malicious code or harmful content</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Interfering with the proper functioning of the Service</li>
                  <li>Harassing, threatening, or intimidating other users</li>
                  <li>Uploading content that infringes on intellectual property rights</li>
                  <li>Spamming or sending unsolicited communications</li>
                </ul>
              </CardContent>
            </Card>

            {/* Continue with remaining sections... */}
            <Card id="intellectual" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                  <span>Intellectual Property</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  The Service and its original content, features, and functionality are owned by GameSphere and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-300">
                  You may not reproduce, distribute, modify, or create derivative works of our content without express written permission.
                </p>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card id="contact" className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</span>
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">GameSphere Support</p>
                  <p className="text-gray-300 text-sm">Email: legal@gamesphere.com</p>
                  <p className="text-gray-300 text-sm">Address: 123 Gaming Street, Tech City, TC 12345</p>
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
