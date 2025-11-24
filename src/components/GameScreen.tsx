import { useState, useEffect, useRef } from 'react';
import { GameHeader } from './GameHeader';
import { TeethDisplay } from './TeethDisplay';
import { GameCanvas } from './GameCanvas';

type GameState = 'instructions' | 'countdown' | 'playing';

interface GameScreenProps {
  gameState: GameState;
  onGameStateChange: (state: any) => void;
  onGameEnd: (score: number) => void;
}

export function GameScreen({ gameState, onGameStateChange, onGameEnd }: GameScreenProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [cleanliness, setCleanliness] = useState(100);
  const [countdown, setCountdown] = useState(3);
  const [instructionsTimer, setInstructionsTimer] = useState(5);

  // Instructions timer
  useEffect(() => {
    if (gameState === 'instructions') {
      const interval = setInterval(() => {
        setInstructionsTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onGameStateChange('countdown');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState, onGameStateChange]);

  // Countdown timer
  useEffect(() => {
    if (gameState === 'countdown') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onGameStateChange('playing');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState, onGameStateChange]);

  // Game timer
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onGameEnd(cleanliness);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState, cleanliness, onGameEnd]);

  const updateCleanliness = (change: number) => {
    setCleanliness(prev => Math.max(0, Math.min(100, prev + change)));
  };

  if (gameState === 'instructions') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0052A3] via-[#0066CC] to-[#0080E6] p-4 sm:p-8 md:p-12 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-10 right-10 w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-12 text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl shadow-2xl z-10 w-full mx-4">
          <h3 className="text-3xl sm:text-4xl md:text-6xl">Comment Jouer</h3>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-green-200 sm:border-2">
              <div className="text-4xl sm:text-5xl md:text-7xl flex-shrink-0">✅</div>
              <p className="text-base sm:text-xl md:text-3xl text-left">Touchez les <strong>mauvais aliments</strong><br/>(bonbons, soda, café, chocolat)</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-red-50 to-rose-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-red-200 sm:border-2">
              <div className="text-4xl sm:text-5xl md:text-7xl flex-shrink-0">❌</div>
              <p className="text-base sm:text-xl md:text-3xl text-left">Ne touchez pas les<br/><strong>produits Sensodyne</strong></p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-orange-50 to-amber-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-orange-200 sm:border-2">
              <div className="text-4xl sm:text-5xl md:text-7xl flex-shrink-0">💣</div>
              <p className="text-base sm:text-xl md:text-3xl text-left">Attention aux <strong>bombes!</strong></p>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl md:text-5xl bg-gradient-to-r from-[#0066CC] to-[#0080E6] text-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-full shadow-lg animate-pulse">
            Début dans {instructionsTimer}s...
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'countdown') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0052A3] via-[#0066CC] to-[#0080E6] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl animate-ping" style={{ animationDuration: '2s' }} />
        
        <div className="text-white text-[120px] sm:text-[180px] md:text-[250px] drop-shadow-2xl z-10 animate-bounce">
          {countdown > 0 ? countdown : '🚀'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header - 10% */}
      <div className="h-[10%]">
        <GameHeader timeLeft={timeLeft} cleanliness={cleanliness} />
      </div>

      {/* Drop Zone - 70% */}
      <div className="h-[70%] relative overflow-hidden">
        <GameCanvas 
          isPlaying={gameState === 'playing'}
          timeElapsed={60 - timeLeft}
          onUpdateCleanliness={updateCleanliness}
        />
      </div>

      {/* Teeth - 20% */}
      <div className="h-[20%]">
        <TeethDisplay cleanliness={cleanliness} />
      </div>
    </div>
  );
}