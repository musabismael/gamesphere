'use client';

import { useState } from 'react';
import { GameGenre, GameEngine } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, X } from 'lucide-react';

const GENRES: GameGenre[] = [
  'ACTION', 'ADVENTURE', 'PUZZLE', 'STRATEGY', 'SIMULATION', 
  'SPORTS', 'RACING', 'SHOOTER', 'RPG', 'PLATFORMER',
  'CARD', 'BOARD', 'EDUCATIONAL', 'KIDS', 'CASUAL',
  'HORROR', 'MUSIC', 'RHYTHM', 'FIGHTING', 'MMO',
  'MOBA', 'BATTLE_ROYALE', 'SURVIVAL', 'SANDBOX', 'TOWER_DEFENSE',
  'ENDLESS_RUNNER', 'MATCH3', 'WORD', 'TRIVIA', 'OTHER'
];

const ENGINES: GameEngine[] = [
  'HTML5', 'WEBGL', 'UNITY', 'GODOT', 'PHASER', 
  'PIXIJS', 'CONSTRUCT3', 'GDEVELOP', 'CUSTOM'
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'playCount', label: 'Most Played' },
  { value: 'playTime', label: 'Most Played Time' },
];

export function GameFilters() {
  const [selectedGenres, setSelectedGenres] = useState<GameGenre[]>([]);
  const [selectedEngines, setSelectedEngines] = useState<GameEngine[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isKidsSafe, setIsKidsSafe] = useState<boolean | null>(null);

  const toggleGenre = (genre: GameGenre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleEngine = (engine: GameEngine) => {
    setSelectedEngines(prev => 
      prev.includes(engine) 
        ? prev.filter(e => e !== engine)
        : [...prev, engine]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedEngines([]);
    setSortBy('newest');
    setIsKidsSafe(null);
  };

  const hasActiveFilters = selectedGenres.length > 0 || selectedEngines.length > 0 || isKidsSafe !== null;

  return (
    <div className="flex flex-wrap gap-2">
      {/* Genre Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Genres
            {selectedGenres.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedGenres.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-slate-800 border-slate-700">
          <DropdownMenuLabel className="text-white">Select Genres</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-700" />
          <div className="max-h-64 overflow-y-auto">
            {GENRES.map((genre) => (
              <DropdownMenuCheckboxItem
                key={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => toggleGenre(genre)}
                className="text-white focus:bg-slate-700"
              >
                {genre.replace('_', ' ')}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Engine Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Engines
            {selectedEngines.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedEngines.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-slate-800 border-slate-700">
          <DropdownMenuLabel className="text-white">Select Engines</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-700" />
          {ENGINES.map((engine) => (
            <DropdownMenuCheckboxItem
              key={engine}
              checked={selectedEngines.includes(engine)}
              onCheckedChange={() => toggleEngine(engine)}
              className="text-white focus:bg-slate-700"
            >
              {engine}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Kids Safe Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Age Rating
            {isKidsSafe !== null && (
              <Badge variant="secondary" className="ml-2">
                {isKidsSafe ? 'Kids' : 'Teen+'}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-slate-800 border-slate-700">
          <DropdownMenuLabel className="text-white">Age Rating</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-700" />
          <DropdownMenuCheckboxItem
            checked={isKidsSafe === true}
            onCheckedChange={() => setIsKidsSafe(isKidsSafe === true ? null : true)}
            className="text-white focus:bg-slate-700"
          >
            Kids Safe
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={isKidsSafe === false}
            onCheckedChange={() => setIsKidsSafe(isKidsSafe === false ? null : false)}
            className="text-white focus:bg-slate-700"
          >
            Teen & Adult
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Sort: {SORT_OPTIONS.find(opt => opt.value === sortBy)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-slate-800 border-slate-700">
          <DropdownMenuLabel className="text-white">Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-700" />
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={sortBy === option.value}
              onCheckedChange={() => setSortBy(option.value)}
              className="text-white focus:bg-slate-700"
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedGenres.map((genre) => (
            <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
              {genre.replace('_', ' ')}
              <button
                onClick={() => toggleGenre(genre)}
                className="ml-1 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedEngines.map((engine) => (
            <Badge key={engine} variant="secondary" className="bg-blue-500/20 text-blue-300">
              {engine}
              <button
                onClick={() => toggleEngine(engine)}
                className="ml-1 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {isKidsSafe !== null && (
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              {isKidsSafe ? 'Kids Safe' : 'Teen+'}
              <button
                onClick={() => setIsKidsSafe(null)}
                className="ml-1 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
