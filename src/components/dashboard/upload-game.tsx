'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Gamepad2
} from 'lucide-react';
import { GameGenre, GameEngine, GameType } from '@/types';
import { useToast } from '@/hooks/use-toast';

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

const GAME_TYPES: GameType[] = [
  'HTML5', 'WEBGL', 'UNITY_WEB', 'GODOT_WEB', 'PHASER', 
  'PIXIJS', 'CONSTRUCT3', 'GDEVELOP'
];

export function UploadGame() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    genre: [] as GameGenre[],
    tags: [] as string[],
    isKidsSafe: false,
    ageRating: 3,
    engine: 'HTML5' as GameEngine,
    gameType: 'HTML5' as GameType,
  });
  
  const [files, setFiles] = useState({
    gameFile: null as File | null,
    thumbnail: null as File | null,
    banner: null as File | null,
  });
  
  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [name]: file }));
  };

  const toggleGenre = (genre: GameGenre) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files.gameFile) {
      toast({
        title: 'Error',
        description: 'Please select a game file to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          toast({
            title: 'Success',
            description: 'Game uploaded successfully!',
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card className="bg-slate-800/50 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload New Game
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Game Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter game title"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Short Description
                </label>
                <Input
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief description (optional)"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your game in detail..."
                required
                rows={4}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Game Files */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Game Files</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Game File *
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    name="gameFile"
                    onChange={handleFileChange}
                    accept=".html,.htm,.js,.wasm,.pck"
                    className="hidden"
                    id="gameFile"
                    required
                  />
                  <label htmlFor="gameFile" className="cursor-pointer">
                    <Gamepad2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      {files.gameFile ? files.gameFile.name : 'Click to upload game file'}
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Thumbnail
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="thumbnail"
                  />
                  <label htmlFor="thumbnail" className="cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      {files.thumbnail ? files.thumbnail.name : 'Click to upload thumbnail'}
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Banner
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    name="banner"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="banner"
                  />
                  <label htmlFor="banner" className="cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      {files.banner ? files.banner.name : 'Click to upload banner'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Game Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Game Engine
                </label>
                <select
                  name="engine"
                  value={formData.engine}
                  onChange={(e) => setFormData(prev => ({ ...prev, engine: e.target.value as GameEngine }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {ENGINES.map(engine => (
                    <option key={engine} value={engine}>{engine}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Game Type
                </label>
                <select
                  name="gameType"
                  value={formData.gameType}
                  onChange={(e) => setFormData(prev => ({ ...prev, gameType: e.target.value as GameType }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {GAME_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Age Rating
                </label>
                <select
                  name="ageRating"
                  value={formData.ageRating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={3}>3+ (Everyone)</option>
                  <option value={7}>7+ (Everyone)</option>
                  <option value={12}>12+ (Teen)</option>
                  <option value={16}>16+ (Mature)</option>
                  <option value={18}>18+ (Adult)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  name="isKidsSafe"
                  checked={formData.isKidsSafe}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                />
                <label className="text-sm text-gray-300">
                  Mark as kids safe
                </label>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.genre.includes(genre)
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {genre.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tags</h3>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                <span className="text-sm text-gray-400">Uploading game...</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{uploadProgress}% complete</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isUploading || !files.gameFile}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Game
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
