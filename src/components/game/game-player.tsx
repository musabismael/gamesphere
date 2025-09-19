'use client';

import { useState, useRef, useEffect } from 'react';
import { Game } from '@/types';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Maximize, Settings } from 'lucide-react';

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Simulate game loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    // In a real implementation, you would start the game
  };

  const handlePause = () => {
    setIsPlaying(false);
    // In a real implementation, you would pause the game
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setIsLoading(true);
    // In a real implementation, you would restart the game
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-white/70">Loading game...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-900">
      {/* Game Container */}
      <div className="w-full h-full relative">
        {isPlaying ? (
          <iframe
            ref={iframeRef}
            src={game.gameFile}
            className="w-full h-full border-0"
            allow="fullscreen; gamepad; microphone; camera"
            title={game.title}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-8xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-gray-400 text-center mb-6 max-w-md">
              {game.shortDescription || game.description}
            </p>
            <Button
              onClick={handlePlay}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Playing
            </Button>
          </div>
        )}
      </div>

      {/* Game Controls */}
      {isPlaying && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-900/80 backdrop-blur rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={isPlaying ? handlePause : handlePlay}
              className="text-white hover:bg-slate-700"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRestart}
              className="text-white hover:bg-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="text-white hover:bg-slate-700"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Game Info Overlay */}
      {isPlaying && (
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur rounded-lg p-3">
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Playing</span>
          </div>
        </div>
      )}
    </div>
  );
}
