import { Sparkles } from 'lucide-react';

interface HeaderProps {
  timeLeft: number;
  cleanliness: number;
}

export function Header({ timeLeft, cleanliness }: HeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCleanlinessColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    if (value >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-[#0066CC] text-white px-6 py-4 flex items-center justify-between" style={{ height: '10vh' }}>
      <div className="flex items-center gap-2">
        <Sparkles className="w-8 h-8" />
        <span className="text-2xl">Sensodyne</span>
      </div>

      <div className="text-3xl">
        TIME: {formatTime(timeLeft)}
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-3xl ${getCleanlinessColor(cleanliness)}`}>
          {cleanliness}%
        </span>
        <span className="text-2xl">🦷</span>
      </div>
    </div>
  );
}
