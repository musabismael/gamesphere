import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  AlertCircle,
  Users,
  Headphones
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          </div>
          <p className="text-xl text-gray-300">
            Get in touch with our team - we&apos;re here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
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
                      placeholder="Enter your email address"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-gray-300">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="developer">Developer Support</option>
                      <option value="report">Report an Issue</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="urgent"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="urgent" className="text-sm text-gray-300">
                      This is urgent and requires immediate attention
                    </label>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Email Support</h4>
                    <p className="text-gray-300 text-sm">support@gamesphere.com</p>
                    <p className="text-gray-400 text-xs">Response within 2-4 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Phone Support</h4>
                    <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-xs">Mon-Fri, 9AM-6PM PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Live Chat</h4>
                    <p className="text-gray-300 text-sm">Available 24/7</p>
                    <p className="text-gray-400 text-xs">Average wait: 2 minutes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Office Address</h4>
                    <p className="text-gray-300 text-sm">123 Gaming Street</p>
                    <p className="text-gray-300 text-sm">Tech City, TC 12345</p>
                    <p className="text-gray-400 text-xs">United States</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Live Chat</span>
                  <Badge className="bg-green-500 text-white">2 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Email</span>
                  <Badge className="bg-blue-500 text-white">2-4 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Phone</span>
                  <Badge className="bg-purple-500 text-white">Immediate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Community</span>
                  <Badge className="bg-orange-500 text-white">1-2 hours</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Monday - Friday</span>
                  <span className="text-white text-sm">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Saturday</span>
                  <span className="text-white text-sm">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Sunday</span>
                  <span className="text-gray-400 text-sm">Closed</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-4">
                  <div className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-semibold">24/7 Support</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">
                    Live chat and emergency support available around the clock
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Join Discord Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Developer Forum
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Status Page
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report a Bug
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-500/10 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400 text-lg">Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  For critical issues affecting your games or account security:
                </p>
                <div className="space-y-2">
                  <p className="text-white font-semibold">emergency@gamesphere.com</p>
                  <p className="text-gray-400 text-xs">
                    Response within 30 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
