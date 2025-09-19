import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

// Mock FAQ data
const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address. It only takes a few minutes!'
      },
      {
        question: 'How do I upload my first game?',
        answer: 'Go to the Developer Dashboard, click "Upload Game", and follow the step-by-step process. Make sure your game meets our technical requirements.'
      },
      {
        question: 'What file formats are supported?',
        answer: 'We support HTML5, WebGL, Unity WebGL, Godot Web, Phaser, and PixiJS games. Check our developer documentation for specific requirements.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: '👤',
    questions: [
      {
        question: 'How do I change my password?',
        answer: 'Go to Settings > Account Security > Change Password. You\'ll need to enter your current password and create a new one.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account from Settings > Account > Delete Account. This action is permanent and cannot be undone.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Click on your profile picture in the top right, select "Edit Profile", and update your information. Changes are saved automatically.'
      }
    ]
  },
  {
    id: 'games',
    title: 'Games & Playing',
    icon: '🎮',
    questions: [
      {
        question: 'Why won\'t my game load?',
        answer: 'Check your internet connection, try refreshing the page, or clear your browser cache. If the problem persists, contact support.'
      },
      {
        question: 'How do I save my game progress?',
        answer: 'Most games automatically save your progress. For games that don\'t, look for a save button or check the game\'s instructions.'
      },
      {
        question: 'Can I play games offline?',
        answer: 'Some games support offline play, but most require an internet connection. Check the game\'s description for offline capabilities.'
      }
    ]
  },
  {
    id: 'developer',
    title: 'Developer Tools',
    icon: '🛠️',
    questions: [
      {
        question: 'How do I monetize my games?',
        answer: 'Use our built-in monetization tools like ads, in-game purchases, and premium features. Check the Developer Dashboard for options.'
      },
      {
        question: 'How do I track my game\'s performance?',
        answer: 'Access detailed analytics in the Developer Dashboard, including play counts, user engagement, and revenue metrics.'
      },
      {
        question: 'What are the technical requirements?',
        answer: 'Games must be web-compatible, under 500MB, and meet our content guidelines. See our developer documentation for full requirements.'
      }
    ]
  }
];

const popularArticles = [
  {
    title: 'Getting Started with GameSphere',
    description: 'Complete guide to setting up your account and uploading your first game',
    category: 'Getting Started',
    readTime: '5 min read',
    views: '12.5k'
  },
  {
    title: 'Game Upload Requirements',
    description: 'Everything you need to know about technical requirements and file formats',
    category: 'Developer',
    readTime: '8 min read',
    views: '8.2k'
  },
  {
    title: 'Monetization Strategies',
    description: 'Learn how to maximize revenue from your games on GameSphere',
    category: 'Developer',
    readTime: '12 min read',
    views: '6.8k'
  },
  {
    title: 'Community Guidelines',
    description: 'Understanding our community standards and content policies',
    category: 'Community',
    readTime: '6 min read',
    views: '4.5k'
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Help Center</h1>
          </div>
          <p className="text-xl text-gray-300">
            Find answers to your questions and get the support you need
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 pl-12 pr-4 py-6 text-lg"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
                    <MessageCircle className="w-6 h-6" />
                    <span>Contact Support</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
                    <BookOpen className="w-6 h-6" />
                    <span>View Documentation</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
                    <Video className="w-6 h-6" />
                    <span>Watch Tutorials</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-700/50 border-purple-500/20 hover:border-purple-500/40">
                    <Users className="w-6 h-6" />
                    <span>Join Community</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Popular Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold mb-1">{article.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{article.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{article.category}</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              {faqCategories.map((category) => (
                <Card key={category.id} className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
                        <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Support
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-400">
                  <p>Average response time:</p>
                  <p className="text-white font-semibold">2-4 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Community Support */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Community Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discord Server
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Developer Forum
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Knowledge Base
                  </Button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">Community Active</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">
                    1,200+ members online
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Platform</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Games</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Uploads</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Payments</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
