import { Clock, Sparkles } from 'lucide-react';

interface GameHeaderProps {
  timeLeft: number;
  cleanliness: number;
}

export function GameHeader({ timeLeft, cleanliness }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCleanlinessColor = () => {
    if (cleanliness >= 70) return 'text-green-400';
    if (cleanliness >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full h-full bg-gradient-to-r from-[#0052A3] to-[#0066CC] text-white px-3 sm:px-6 md:px-8 flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="bg-white/20 p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </div>
        <span className="text-lg sm:text-xl md:text-3xl">Sensodyne</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
          <span className="text-xl sm:text-2xl md:text-4xl tabular-nums">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <span className="text-xs sm:text-sm md:text-xl opacity-90 hidden sm:inline">PROPRE:</span>
          <span className={`text-xl sm:text-2xl md:text-4xl tabular-nums ${getCleanlinessColor()}`}>
            {Math.round(cleanliness)}%
          </span>
        </div>
      </div>
    </div>
  );
}