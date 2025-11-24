import { Sparkles } from 'lucide-react';

interface TeethDisplayProps {
  cleanliness: number;
}

export function TeethDisplay({ cleanliness }: TeethDisplayProps) {
  const getTeethColor = () => {
    if (cleanliness >= 80) return '#FFFFFF';
    if (cleanliness >= 60) return '#D1D5DB';
    if (cleanliness >= 40) return '#9CA3AF';
    if (cleanliness >= 20) return '#6B7280';
    return '#374151';
  };

  const getTeethGradient = () => {
    if (cleanliness >= 80) return 'from-white via-gray-50 to-gray-100';
    if (cleanliness >= 60) return 'from-gray-200 via-gray-300 to-gray-400';
    if (cleanliness >= 40) return 'from-gray-400 via-gray-500 to-gray-600';
    if (cleanliness >= 20) return 'from-gray-600 via-gray-700 to-gray-800';
    return 'from-gray-800 via-gray-900 to-black';
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-pink-200 via-pink-100 to-pink-200 relative overflow-hidden shadow-inner">
      {/* Realistic Gum line with texture */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 md:h-20 bg-gradient-to-b from-pink-500 via-pink-400 to-pink-300 shadow-inner">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
          backgroundSize: '8px 8px'
        }} />
      </div>
      
      {/* Teeth container */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 flex items-end justify-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8">
        {/* Individual teeth with anatomically correct shapes */}
        {[...Array(8)].map((_, i) => {
          // Define tooth types: 0-1 molars, 2-3 incisors, 4-5 incisors, 6-7 molars
          let toothShape, toothHeight, toothWidth, toothStyle;
          
          if (i === 0 || i === 7) {
            // Back Molars - shortest, widest, most square
            toothHeight = 65;
            toothWidth = 'w-8 sm:w-11 md:w-16';
            toothShape = 'polygon(10% 0%, 90% 0%, 100% 8%, 100% 100%, 0% 100%, 0% 8%)';
            toothStyle = { borderRadius: '2px 2px 0 0' };
          } else if (i === 1 || i === 6) {
            // Canines - pointed, tallest
            toothHeight = 88;
            toothWidth = 'w-7 sm:w-10 md:w-14';
            toothShape = 'polygon(50% 0%, 100% 12%, 100% 100%, 0% 100%, 0% 12%)';
            toothStyle = { borderRadius: '1px 1px 0 0' };
          } else if (i === 2 || i === 5) {
            // Lateral Incisors - medium height, rectangular
            toothHeight = 82;
            toothWidth = 'w-8 sm:w-12 md:w-17';
            toothShape = 'polygon(12% 0%, 88% 0%, 100% 6%, 100% 100%, 0% 100%, 0% 6%)';
            toothStyle = { borderRadius: '3px 3px 0 0' };
          } else {
            // Central Incisors - tall, wide, flat front
            toothHeight = 85;
            toothWidth = 'w-9 sm:w-13 md:w-19';
            toothShape = 'polygon(8% 0%, 92% 0%, 100% 4%, 100% 100%, 0% 100%, 0% 4%)';
            toothStyle = { borderRadius: '4px 4px 0 0' };
          }
          
          return (
            <div
              key={i}
              className={`${toothWidth} bg-gradient-to-b ${getTeethGradient()} shadow-2xl transition-all duration-700 relative`}
              style={{
                height: `${toothHeight}%`,
                clipPath: toothShape,
                ...toothStyle,
                filter: cleanliness >= 80 
                  ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) brightness(1.15)' 
                  : cleanliness >= 60
                  ? 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15))'
                  : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4))',
              }}
            >
              {/* 3D depth - left edge shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-r from-black/10 to-transparent" />
              
              {/* 3D depth - right edge highlight */}
              <div className="absolute right-0 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-l from-black/5 to-transparent" />
              
              {/* Natural tooth texture/lines */}
              <div className="absolute inset-0 opacity-10" style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
              }} />
              
              {/* Vertical ridge in center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2/5 bg-gradient-to-b from-black/8 via-black/3 to-transparent" />
              
              {/* Bottom edge - connection to gum */}
              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-t from-pink-400/30 to-transparent" />
              
              {/* Enamel shine on clean teeth */}
              {cleanliness >= 60 && (
                <>
                  <div className="absolute top-1 sm:top-2 md:top-3 left-1 sm:left-2 md:left-3 w-1.5 sm:w-2 md:w-3 h-4 sm:h-6 md:h-10 bg-white/60 rounded-full blur-[2px]" />
                  <div className="absolute top-3 sm:top-5 md:top-7 right-1 sm:right-2 md:right-3 w-1 sm:w-1.5 md:w-2 h-3 sm:h-4 md:h-6 bg-white/30 rounded-full blur-[1px]" />
                </>
              )}
              
              {/* Sparkle on very clean teeth */}
              {cleanliness >= 80 && i >= 2 && i <= 5 && (
                <Sparkles 
                  className="absolute -top-3 sm:-top-5 md:-top-7 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-yellow-300 animate-pulse"
                  style={{ animationDuration: '2s', animationDelay: `${i * 0.2}s` }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Cleanliness indicator */}
      <div className="absolute top-2 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-200">
        <span className="text-sm sm:text-base md:text-xl">
          {cleanliness >= 80 ? '✨ Très propre!' : 
           cleanliness >= 60 ? '😊 Propre' :
           cleanliness >= 40 ? '😐 Moyen' :
           cleanliness >= 20 ? '😟 Sale' : '😰 Très sale!'}
        </span>
      </div>
    </div>
  );
}