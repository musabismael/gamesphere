import Link from 'next/link';
import { Gamepad2, Github, Twitter, Youtube, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-purple-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GameSphere</span>
            </Link>
            <p className="text-gray-400 text-sm">
              A next-generation global gaming platform where developers can upload their games 
              and players can enjoy them from anywhere.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Games */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Games</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/games" className="text-gray-400 hover:text-white transition-colors">
                  Browse All Games
                </Link>
              </li>
              <li>
                <Link href="/games/featured" className="text-gray-400 hover:text-white transition-colors">
                  Featured Games
                </Link>
              </li>
              <li>
                <Link href="/games/new" className="text-gray-400 hover:text-white transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/games/popular" className="text-gray-400 hover:text-white transition-colors">
                  Most Popular
                </Link>
              </li>
              <li>
                <Link href="/games/kids" className="text-gray-400 hover:text-white transition-colors">
                  Kids Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Developers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/developer" className="text-gray-400 hover:text-white transition-colors">
                  Developer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/developer/upload" className="text-gray-400 hover:text-white transition-colors">
                  Upload Game
                </Link>
              </li>
              <li>
                <Link href="/developer/docs" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/developer/analytics" className="text-gray-400 hover:text-white transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/developer/monetization" className="text-gray-400 hover:text-white transition-colors">
                  Monetization
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 GameSphere. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by the GameSphere Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
