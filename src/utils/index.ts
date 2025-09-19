import { GameGenre, GameEngine, GameType } from '@/types';

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format duration
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
}

// Format number with commas (client-side only to avoid hydration mismatches)
export function formatNumber(num: number): string {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return num.toString(); // Fallback for server-side rendering
  }
  
  return num.toLocaleString();
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Calculate level from experience
export function calculateLevel(experience: number): number {
  return Math.floor(experience / 100) + 1;
}

// Calculate experience needed for next level
export function experienceToNextLevel(currentLevel: number): number {
  return currentLevel * 100;
}

// Get genre display name
export function getGenreDisplayName(genre: GameGenre): string {
  const genreNames: Record<GameGenre, string> = {
    ACTION: 'Action',
    ADVENTURE: 'Adventure',
    PUZZLE: 'Puzzle',
    STRATEGY: 'Strategy',
    SIMULATION: 'Simulation',
    SPORTS: 'Sports',
    RACING: 'Racing',
    SHOOTER: 'Shooter',
    RPG: 'RPG',
    PLATFORMER: 'Platformer',
    CARD: 'Card',
    BOARD: 'Board',
    EDUCATIONAL: 'Educational',
    KIDS: 'Kids',
    CASUAL: 'Casual',
    HORROR: 'Horror',
    MUSIC: 'Music',
    RHYTHM: 'Rhythm',
    FIGHTING: 'Fighting',
    MMO: 'MMO',
    MOBA: 'MOBA',
    BATTLE_ROYALE: 'Battle Royale',
    SURVIVAL: 'Survival',
    SANDBOX: 'Sandbox',
    TOWER_DEFENSE: 'Tower Defense',
    ENDLESS_RUNNER: 'Endless Runner',
    MATCH3: 'Match-3',
    WORD: 'Word',
    TRIVIA: 'Trivia',
    OTHER: 'Other',
  };
  
  return genreNames[genre] || genre;
}

// Get engine display name
export function getEngineDisplayName(engine: GameEngine): string {
  const engineNames: Record<GameEngine, string> = {
    HTML5: 'HTML5',
    WEBGL: 'WebGL',
    UNITY: 'Unity',
    GODOT: 'Godot',
    PHASER: 'Phaser',
    PIXIJS: 'PixiJS',
    CONSTRUCT3: 'Construct 3',
    GDEVELOP: 'GDevelop',
    CUSTOM: 'Custom',
  };
  
  return engineNames[engine] || engine;
}

// Get game type display name
export function getGameTypeDisplayName(gameType: GameType): string {
  const typeNames: Record<GameType, string> = {
    HTML5: 'HTML5',
    WEBGL: 'WebGL',
    UNITY_WEB: 'Unity Web',
    GODOT_WEB: 'Godot Web',
    PHASER: 'Phaser',
    PIXIJS: 'PixiJS',
    CONSTRUCT3: 'Construct 3',
    GDEVELOP: 'GDevelop',
  };
  
  return typeNames[gameType] || gameType;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Validate game file type
export function isValidGameFile(file: File, gameType: GameType): boolean {
  const validTypes: Record<GameType, string[]> = {
    HTML5: ['.html', '.htm'],
    WEBGL: ['.html', '.htm', '.js'],
    UNITY_WEB: ['.html', '.htm', '.js', '.wasm'],
    GODOT_WEB: ['.html', '.htm', '.js', '.wasm', '.pck'],
    PHASER: ['.html', '.htm', '.js'],
    PIXIJS: ['.html', '.htm', '.js'],
    CONSTRUCT3: ['.html', '.htm', '.js'],
    GDEVELOP: ['.html', '.htm', '.js'],
  };
  
  const validExtensions = validTypes[gameType] || ['.html', '.htm'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  return validExtensions.includes(fileExtension);
}

// Get file extension
export function getFileExtension(filename: string): string {
  return '.' + filename.split('.').pop()?.toLowerCase() || '';
}

// Calculate rating percentage
export function calculateRatingPercentage(rating: number, totalRatings: number): number {
  if (totalRatings === 0) return 0;
  return Math.round((rating / 5) * 100);
}

// Generate random color
export function generateRandomColor(): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format relative time (client-side only to avoid hydration mismatches)
export function formatRelativeTime(date: Date): string {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return 'recently'; // Fallback for server-side rendering
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return formatDate(date);
}
