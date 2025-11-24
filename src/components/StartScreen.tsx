import { Button } from './ui/button';
import sensodyneLogo from 'figma:asset/132ed8c2a5964b1b5cab18c272f5e7542ddbf7ef.png';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white relative overflow-hidden">
      {/* Top Wave Background */}
      <div className="absolute top-0 left-0 right-0 h-[30%] sm:h-2/5 bg-gradient-to-br from-[#0066CC] via-[#0080E6] to-[#00A3FF]">
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-white" style={{
          clipPath: 'ellipse(100% 100% at 50% 100%)',
          transform: 'translateY(50%)'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 overflow-y-auto">
        {/* Logo Section */}
        <div className="pt-6 sm:pt-12 pb-3 sm:pb-4 text-center flex-shrink-0">
          <img 
            src={sensodyneLogo} 
            alt="Sensodyne" 
            className="h-12 sm:h-16 md:h-20 w-auto mx-auto drop-shadow-lg"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 max-w-lg mx-auto w-full py-4">
          {/* Game Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066CC] to-[#00A3FF] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></span>
              JEU INTERACTIF
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-900">
              Protecteur de Dents
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Défi de 60 secondes</p>
          </div>

          {/* Game Preview - Teeth Illustration */}
          <div className="relative px-4">
            <div className="bg-gradient-to-b from-pink-100 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-pink-200">
              {/* Simple teeth illustration */}
              <div className="flex justify-center items-end gap-1 sm:gap-1.5 h-16 sm:h-20">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-b from-white to-gray-100 rounded-t-xl sm:rounded-t-2xl shadow-lg border-2 border-white"
                    style={{
                      width: '16%',
                      height: `${85 + Math.random() * 15}%`,
                    }}
                  />
                ))}
              </div>
              
              {/* Floating objects preview */}
              <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-xl border-2 sm:border-4 border-red-200 flex items-center justify-center animate-bounce">
                <span className="text-2xl sm:text-3xl">🍭</span>
              </div>
              <div className="absolute -top-2 -left-2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl border-2 sm:border-4 border-green-200 flex items-center justify-center" style={{ animation: 'bounce 2s infinite', animationDelay: '0.5s' }}>
                <span className="text-xl sm:text-2xl">🪥</span>
              </div>
            </div>
          </div>

          {/* Quick Rules */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 px-2">
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-xl sm:text-2xl">✅</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-700 leading-tight">Touchez<br/>les mauvais</p>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-xl sm:text-2xl">❌</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-700 leading-tight">Évitez<br/>les bons</p>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-xl sm:text-2xl">💣</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-700 leading-tight">Attention<br/>bombes</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pb-6 sm:pb-8 flex-shrink-0">
          <Button 
            onClick={onStart}
            className="w-full bg-gradient-to-r from-[#0066CC] to-[#00A3FF] hover:from-[#0052A3] hover:to-[#0066CC] text-white py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <span>COMMENCER LE JEU</span>
              <span className="text-xl sm:text-2xl">→</span>
            </span>
          </Button>
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">Protégez vos dents en 60 secondes!</p>
        </div>
      </div>
    </div>
  );
}