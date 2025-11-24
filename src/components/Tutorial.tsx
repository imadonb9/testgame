import { motion } from 'motion/react';
import { useEffect } from 'react';
import { CheckCircle, XCircle, Bomb } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

export function Tutorial({ onComplete }: TutorialProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0066CC] to-[#004C99] text-white px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h2 className="text-5xl mb-12">How to Play</h2>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl mb-2">TAP Bad Items</h3>
            <p className="text-lg">Candy, soda, coffee hurt your teeth. Tap them to remove!</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl mb-2">DON'T TAP Sensodyne</h3>
            <p className="text-lg">Let toothpaste & brushes reach your teeth for bonus points!</p>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <Bomb className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-2xl mb-2">AVOID Bombs</h3>
            <p className="text-lg">Bombs cause major damage. Don't tap them!</p>
          </motion.div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-3xl"
        >
          Get ready...
        </motion.div>
      </motion.div>
    </div>
  );
}
