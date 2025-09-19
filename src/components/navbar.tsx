'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  Gamepad2, 
  Search, 
  User, 
  Upload, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Coins,
  Trophy,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from '@/components/language-selector';
import { useLanguage } from '@/contexts/language-context';

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GameSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              href="/games" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('navigation.games')}
            </Link>
            <Link 
              href="/genres" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('navigation.genres')}
            </Link>
            <Link 
              href="/developers" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('navigation.developers')}
            </Link>
            <Link 
              href="/community" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('navigation.community')}
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex md:flex-1 md:max-w-md md:mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t('games.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:border-purple-500"
                />
              </div>
            </form>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />
            {status === 'loading' ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-700" />
            ) : session ? (
              <div className="flex items-center space-x-3">
                {/* Coins and Level */}
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">
                      {(session.user as { coins?: number })?.coins || 0}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-400 font-medium">
                      Lv. {(session.user as { level?: number })?.level || 1}
                    </span>
                  </div>
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    3
                  </Badge>
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                        <AvatarFallback>
                          {session.user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{session.user?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {(session.user as { role?: string })?.role === 'DEVELOPER' && (
                      <DropdownMenuItem asChild>
                        <Link href="/developer" className="flex items-center">
                          <Upload className="mr-2 h-4 w-4" />
                          Developer Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => signIn()}>
                  Sign In
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400"
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <Link
                href="/games"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                href="/genres"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Genres
              </Link>
              <Link
                href="/developers"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Developers
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
