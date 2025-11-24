import { useState, useEffect } from 'react';
import { Sparkles, Frown, Smile, Star } from 'lucide-react';
import { Button } from './ui/button';

interface ResultsScreenProps {
  score: number;
  onPlayAgain: () => void;
  onReturnToAttract: () => void;
}

export function ResultsScreen({ score, onPlayAgain, onReturnToAttract }: ResultsScreenProps) {
  const [autoReturnTimer, setAutoReturnTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoReturnTimer(prev => {
        if (prev <= 1) {
          onReturnToAttract();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onReturnToAttract]);

  const getMessage = () => {
    if (score >= 90) return {
      title: "EXCELLENT!",
      subtitle: "Parfaitement propres!",
      icon: Star,
      color: "text-yellow-500"
    };
    if (score >= 70) return {
      title: "SUPER TRAVAIL!",
      subtitle: "Très bien!",
      icon: Sparkles,
      color: "text-green-500"
    };
    if (score >= 50) return {
      title: "BON EFFORT!",
      subtitle: "Continuez!",
      icon: Smile,
      color: "text-blue-500"
    };
    return {
      title: "BON ESSAI!",
      subtitle: "La pratique aide!",
      icon: Frown,
      color: "text-orange-500"
    };
  };

  const message = getMessage();
  const Icon = message.icon;

  const getTeethGradient = () => {
    if (score >= 80) return 'from-white to-gray-50';
    if (score >= 60) return 'from-gray-200 to-gray-300';
    if (score >= 40) return 'from-gray-400 to-gray-500';
    if (score >= 20) return 'from-gray-600 to-gray-700';
    return 'from-gray-800 to-gray-900';
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0052A3] via-[#0066CC] to-[#0080E6] flex flex-col items-center justify-center text-white p-4 sm:p-8 md:p-12 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="text-center space-y-4 sm:space-y-6 md:space-y-10 max-w-3xl z-10 w-full">
        <div className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-3xl sm:rounded-[40px] backdrop-blur-md inline-block shadow-2xl">
          <Icon className={`w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 mx-auto ${message.color} animate-bounce drop-shadow-2xl`} />
        </div>
        
        <div className="space-y-2 sm:space-y-3 md:space-y-4 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl drop-shadow-2xl">{message.title}</h1>
          <p className="text-2xl sm:text-3xl md:text-4xl opacity-90">{message.subtitle}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6 md:space-y-8 shadow-2xl mx-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0066CC]">VOTRE SCORE</h2>
          <div className="text-6xl sm:text-7xl md:text-9xl tabular-nums bg-gradient-to-r from-[#0066CC] to-[#0080E6] bg-clip-text text-transparent drop-shadow-xl">
            {Math.round(score)}%
          </div>
          
          {/* Teeth visualization */}
          <div className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-b from-pink-200 via-pink-100 to-pink-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative h-32 sm:h-40 md:h-48 shadow-inner">
            <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 md:h-12 bg-gradient-to-b from-pink-400 via-pink-300 to-transparent rounded-t-2xl sm:rounded-t-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-36 flex items-end justify-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-8 pb-2 sm:pb-4 md:pb-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 sm:w-10 md:w-14 rounded-t-[20px] sm:rounded-t-[25px] md:rounded-t-[30px] bg-gradient-to-b ${getTeethGradient()} shadow-2xl border border-white/30 sm:border-2`}
                  style={{
                    height: `${70 + Math.random() * 20}%`,
                    filter: score >= 80 ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) brightness(1.1)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center pt-2 sm:pt-4 md:pt-6 px-4">
          <Button
            onClick={onPlayAgain}
            className="bg-white text-[#0066CC] hover:bg-gray-50 hover:scale-105 px-8 py-4 sm:px-10 sm:py-6 md:px-12 md:py-8 text-xl sm:text-2xl md:text-3xl rounded-full shadow-2xl transition-all duration-300"
          >
            ▶ REJOUER
          </Button>
          <Button
            onClick={onReturnToAttract}
            className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-[#0066CC] hover:scale-105 px-8 py-4 sm:px-10 sm:py-6 md:px-12 md:py-8 text-xl sm:text-2xl md:text-3xl rounded-full shadow-2xl transition-all duration-300 backdrop-blur-sm"
          >
            🏠 MENU
          </Button>
        </div>

        <div className="bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full backdrop-blur-sm">
          <p className="text-sm sm:text-base md:text-xl opacity-90">
            Retour au menu dans {autoReturnTimer}s...
          </p>
        </div>
      </div>
    </div>
  );
}