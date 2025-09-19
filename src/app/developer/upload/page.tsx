'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Image as ImageIcon, 
  Eye,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function UploadGamePage() {
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    genre: [] as string[],
    tags: [] as string[],
    ageRating: 7,
    isKidsSafe: false,
    gameFile: null as File | null,
    thumbnail: null as File | null,
    banner: null as File | null,
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const availableGenres = [
    'ACTION', 'ADVENTURE', 'PUZZLE', 'RACING', 'SPORTS', 
    'STRATEGY', 'SIMULATION', 'RPG', 'HORROR', 'PLATFORMER'
  ];

  const handleFileUpload = (type: 'game' | 'thumbnail' | 'banner', file: File) => {
    setGameData(prev => ({
      ...prev,
      [type === 'game' ? 'gameFile' : type]: file
    }));
  };

  const handleGenreToggle = (genre: string) => {
    setGameData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre) 
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  const handleSubmit = async () => {
    if (!gameData.title || !gameData.description || !gameData.gameFile) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields and upload a game file.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Game Uploaded Successfully',
        description: 'Your game has been uploaded and is being processed.',
      });
      
      // Reset form
      setGameData({
        title: '',
        description: '',
        shortDescription: '',
        genre: [],
        tags: [],
        ageRating: 7,
        isKidsSafe: false,
        gameFile: null,
        thumbnail: null,
        banner: null,
      });
    } catch {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your game. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload New Game</h1>
          <p className="text-gray-400">Share your game with the GameSphere community</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Game Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Game Title *</label>
                  <Input
                    value={gameData.title}
                    onChange={(e) => setGameData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your game title"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Short Description *</label>
                  <Input
                    value={gameData.shortDescription}
                    onChange={(e) => setGameData(prev => ({ ...prev, shortDescription: e.target.value }))}
                    placeholder="Brief description (max 100 characters)"
                    maxLength={100}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {gameData.shortDescription.length}/100 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Description *</label>
                  <Textarea
                    value={gameData.description}
                    onChange={(e) => setGameData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of your game"
                    rows={4}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {availableGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={gameData.genre.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          gameData.genre.includes(genre) 
                            ? 'bg-purple-500 text-white' 
                            : 'border-slate-600 text-gray-300 hover:border-purple-500'
                        }`}
                        onClick={() => handleGenreToggle(genre)}
                      >
                        {genre.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    placeholder="action, adventure, multiplayer"
                    className="bg-slate-700 border-slate-600 text-white"
                    onChange={(e) => setGameData(prev => ({ 
                      ...prev, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Game Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Game File *</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-2">
                      {gameData.gameFile ? gameData.gameFile.name : 'Upload your game file (HTML, ZIP, or Unity WebGL)'}
                    </p>
                    <input
                      type="file"
                      accept=".html,.zip,.unity3d"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('game', e.target.files[0])}
                      className="hidden"
                      id="game-file"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="game-file" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400 mb-2">
                        {gameData.thumbnail ? gameData.thumbnail.name : 'Upload thumbnail (16:9 ratio)'}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('thumbnail', e.target.files[0])}
                        className="hidden"
                        id="thumbnail-file"
                      />
                      <Button asChild size="sm" variant="outline">
                        <label htmlFor="thumbnail-file" className="cursor-pointer">
                          Choose Image
                        </label>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Banner Image</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400 mb-2">
                        {gameData.banner ? gameData.banner.name : 'Upload banner (21:9 ratio)'}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('banner', e.target.files[0])}
                        className="hidden"
                        id="banner-file"
                      />
                      <Button asChild size="sm" variant="outline">
                        <label htmlFor="banner-file" className="cursor-pointer">
                          Choose Image
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Game Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Age Rating</label>
                  <select
                    value={gameData.ageRating}
                    onChange={(e) => setGameData(prev => ({ ...prev, ageRating: parseInt(e.target.value) }))}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value={3}>3+ (Everyone)</option>
                    <option value={7}>7+ (Everyone 7+)</option>
                    <option value={12}>12+ (Teen)</option>
                    <option value={16}>16+ (Mature)</option>
                    <option value={18}>18+ (Adults Only)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="kids-safe"
                    checked={gameData.isKidsSafe}
                    onChange={(e) => setGameData(prev => ({ ...prev, isKidsSafe: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="kids-safe" className="text-sm font-medium">
                    Mark as Kids Safe
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Game Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {gameData.title ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      {gameData.thumbnail ? (
                        <Image 
                          src={URL.createObjectURL(gameData.thumbnail)} 
                          alt="Game thumbnail preview" 
                          width={800}
                          height={450}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-white/50 text-4xl">🎮</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{gameData.title}</h3>
                      <p className="text-gray-400 mb-2">{gameData.shortDescription}</p>
                      <p className="text-sm text-gray-500">{gameData.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>Complete the basic information to see a preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" disabled={isUploading}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isUploading || !gameData.title || !gameData.description || !gameData.gameFile}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
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
      </div>
    </div>
  );
}
