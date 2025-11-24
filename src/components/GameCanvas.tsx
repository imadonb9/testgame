import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GameObject {
  id: number;
  type: 'bad' | 'sensodyne' | 'bomb';
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  image: string;
  size: number;
}

interface GameCanvasProps {
  isPlaying: boolean;
  timeElapsed: number;
  onUpdateCleanliness: (change: number) => void;
}

const BAD_ITEMS = [
  'https://images.unsplash.com/photo-1657641908545-592c2a8e3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  'https://images.unsplash.com/photo-1665359045452-bfa257a2a6bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  'https://images.unsplash.com/photo-1533776992670-a72f4c28235e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
];

const SENSODYNE_ITEMS = [
  'https://images.unsplash.com/photo-1712168044214-f5a272c23a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  'https://images.unsplash.com/photo-1676897288522-e8a081e71430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
];

export function GameCanvas({ isPlaying, timeElapsed, onUpdateCleanliness }: GameCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; type: string }>>([]);
  const nextIdRef = useRef(0);
  const [bombBlockActive, setBombBlockActive] = useState(false);

  // Spawn objects
  useEffect(() => {
    if (!isPlaying) return;

    const spawnObject = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      
      let newObjects: GameObject[] = [];

      // Spawn bad items
      const badItemCount = timeElapsed < 20 ? 4 : timeElapsed < 40 ? 6 : 7;
      for (let i = 0; i < badItemCount; i++) {
        newObjects.push({
          id: nextIdRef.current++,
          type: 'bad',
          x: Math.random() * (width - 60),
          y: -80,
          speed: 150 + Math.random() * 100,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 5,
          image: BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)],
          size: 60 + Math.random() * 15,
        });
      }

      // Spawn Sensodyne product (more frequently now)
      if (!bombBlockActive && Math.random() < 0.48) {
        newObjects.push({
          id: nextIdRef.current++,
          type: 'sensodyne',
          x: Math.random() * (width - 80),
          y: -80,
          speed: 130 + Math.random() * 100,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 3,
          image: SENSODYNE_ITEMS[Math.floor(Math.random() * SENSODYNE_ITEMS.length)],
          size: 70 + Math.random() * 20,
        });
      }

      setObjects(prev => [...prev, ...newObjects]);
    };

    // Spawn immediately when game starts
    spawnObject();

    const getSpawnInterval = () => {
      if (timeElapsed < 20) return 1200;
      if (timeElapsed < 40) return 900;
      return 600;
    };

    const interval = setInterval(spawnObject, getSpawnInterval());
    return () => clearInterval(interval);
  }, [isPlaying, bombBlockActive]);

  // Spawn bombs at specific times
  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;
    
    const shouldSpawnBomb = [10, 15, 25, 30, 35, 45, 50, 55].includes(timeElapsed);
    
    if (shouldSpawnBomb) {
      const width = containerRef.current.offsetWidth;
      setObjects(prev => [...prev, {
        id: nextIdRef.current++,
        type: 'bomb',
        x: Math.random() * (width - 160),
        y: -160,
        speed: 250 + Math.random() * 150,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 8,
        image: '💣',
        size: 140 + Math.random() * 20,
      }]);
    }
  }, [isPlaying, timeElapsed]);

  // Update object positions
  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;

    const interval = setInterval(() => {
      const height = containerRef.current?.offsetHeight || 0;
      
      setObjects(prev => {
        const updated = prev.map(obj => ({
          ...obj,
          y: obj.y + obj.speed / 60,
          rotation: obj.rotation + obj.rotationSpeed,
        }));

        // Remove objects that hit the bottom and apply effects
        const remaining = updated.filter(obj => {
          if (obj.y > height) {
            // Object hit teeth
            if (obj.type === 'bad') {
              onUpdateCleanliness(-3);
            } else if (obj.type === 'sensodyne') {
              onUpdateCleanliness(7);
              setParticles(p => [...p, { id: Date.now(), x: obj.x, y: height - 50, type: 'sparkle' }]);
            } else if (obj.type === 'bomb') {
              onUpdateCleanliness(-5);
            }
            return false;
          }
          return true;
        });

        return remaining;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isPlaying, onUpdateCleanliness]);

  // Clean up particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleObjectClick = (obj: GameObject, event: React.MouseEvent) => {
    event.stopPropagation();

    if (obj.type === 'bad') {
      // Good tap - remove bad item
      onUpdateCleanliness(1);
      setObjects(prev => prev.filter(o => o.id !== obj.id));
      setParticles(p => [...p, { id: Date.now(), x: obj.x, y: obj.y, type: 'pop' }]);
    } else if (obj.type === 'sensodyne') {
      // Bad tap - penalty
      onUpdateCleanliness(-3);
      setObjects(prev => prev.filter(o => o.id !== obj.id));
    } else if (obj.type === 'bomb') {
      // Bomb tapped - big penalty
      onUpdateCleanliness(-10);
      setObjects(prev => prev.filter(o => o.id !== obj.id));
      
      // Remove all Sensodyne products and block spawning
      setObjects(prev => prev.filter(o => o.type !== 'sensodyne'));
      setBombBlockActive(true);
      setTimeout(() => setBombBlockActive(false), 5000);
      
      setParticles(p => [...p, { id: Date.now(), x: obj.x, y: obj.y, type: 'explosion' }]);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50">
      {/* Decorative clouds */}
      <div className="absolute top-10 left-10 w-32 h-16 bg-white/40 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-20 right-20 w-40 h-20 bg-white/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Falling objects */}
      {objects.map(obj => (
        <div
          key={obj.id}
          className="absolute"
          style={{
            left: obj.x - 20,
            top: obj.y - 20,
            width: obj.size + 40,
            height: obj.size + 40,
          }}
        >
          {/* Larger invisible touch area */}
          <div
            className="absolute inset-0 cursor-pointer active:scale-90"
            style={{
              transition: 'transform 0.1s ease-out',
            }}
            onClick={(e) => handleObjectClick(obj, e)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleObjectClick(obj, e as any);
            }}
          />
          
          {/* Visual object */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: 20,
              top: 20,
              width: obj.size,
              height: obj.size,
              transform: `rotate(${obj.rotation}deg)`,
              transition: 'transform 0.05s linear',
            }}
          >
            {obj.type === 'bomb' ? (
              <div className="w-full h-full flex items-center justify-center text-6xl animate-pulse rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl border-4 border-red-500">
                💣
              </div>
            ) : (
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/80 ring-2 ring-black/10">
                <ImageWithFallback
                  src={obj.image}
                  alt={obj.type}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Type indicator */}
            {obj.type === 'sensodyne' && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl border-3 border-white animate-pulse">
                <span className="text-2xl">✓</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-50"
          style={{ left: particle.x, top: particle.y }}
        >
          {particle.type === 'pop' && (
            <div className="text-5xl animate-ping">💥</div>
          )}
          {particle.type === 'sparkle' && (
            <div className="text-5xl animate-bounce">✨</div>
          )}
          {particle.type === 'explosion' && (
            <div className="text-7xl animate-ping">💥</div>
          )}
        </div>
      ))}

      {/* Bomb block warning */}
      {bombBlockActive && (
        <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full shadow-2xl animate-pulse border-2 sm:border-4 border-white z-40">
          <span className="text-sm sm:text-lg md:text-2xl">⚠️ Pas de produits Sensodyne pendant 5s! ⚠️</span>
        </div>
      )}
    </div>
  );
}