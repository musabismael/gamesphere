'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { TranslationTest } from '@/components/translation-test';
import { 
  Gamepad2, 
  Upload, 
  Users, 
  Trophy, 
  Star, 
  Play, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

export default function Home() {
  const { t, isRTL } = useLanguage();
  return (
    <div className="min-h-screen">
      {/* Translation Test - Remove this after testing */}
      <div className="container mx-auto px-4 py-8">
        <TranslationTest />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('home.subtitle')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {t('home.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/games">
                  <Play className="w-5 h-5 mr-2" />
                  {t('home.getStarted')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/developer">
                  <Upload className="w-5 h-5 mr-2" />
                  {t('navigation.upload')}
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">10K+</div>
                <div className="text-sm text-gray-400">Games</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">1M+</div>
                <div className="text-sm text-gray-400">Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">50+</div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose GameSphere?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We&apos;re building the future of gaming with cutting-edge technology and 
              community-driven features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-400">
                Optimized for speed with automatic compression and CDN delivery 
                for instant game loading worldwide.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Multi-Engine Support</h3>
              <p className="text-gray-400">
                Support for HTML5, WebGL, Unity, Godot, Phaser, and more. 
                Upload your game from any engine.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Vibrant Community</h3>
              <p className="text-gray-400">
                Connect with players and developers, share achievements, 
                and discover new games through our social features.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Achievement System</h3>
              <p className="text-gray-400">
                Earn coins, unlock achievements, and level up as you play. 
                Compete with friends and climb the leaderboards.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Safe for Kids</h3>
              <p className="text-gray-400">
                Advanced content moderation and age-appropriate filtering 
                ensure a safe gaming environment for all ages.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
              <p className="text-gray-400">
                Multilingual support and worldwide CDN ensure your games 
                reach players everywhere with optimal performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Games
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover amazing games handpicked by our community and editors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Placeholder for featured games */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Gamepad2 className="w-16 h-16 text-white/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Featured Game {i}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-400">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    An amazing game that showcases the power of GameSphere platform.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Action</Badge>
                    <Button size="sm" className="group-hover:bg-purple-600">
                      Play Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/games">
                View All Games
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Future of Gaming?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a player looking for amazing games or a developer 
            ready to showcase your creations, GameSphere has everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/developer">
                Developer Portal
                <Upload className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
