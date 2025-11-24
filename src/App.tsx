import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

type GameState = 'attract' | 'instructions' | 'countdown' | 'playing' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('attract');
  const [finalScore, setFinalScore] = useState(100);

  const startGame = () => {
    setGameState('instructions');
  };

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setGameState('results');
  };

  const playAgain = () => {
    setGameState('instructions');
  };

  const returnToAttract = () => {
    setGameState('attract');
  };

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <div className="relative w-full h-full">
        {gameState === 'attract' && <StartScreen onStart={startGame} />}
        
        {(gameState === 'instructions' || gameState === 'countdown' || gameState === 'playing') && (
          <GameScreen 
            gameState={gameState}
            onGameStateChange={setGameState}
            onGameEnd={handleGameEnd}
          />
        )}
        
        {gameState === 'results' && (
          <ResultsScreen 
            score={finalScore}
            onPlayAgain={playAgain}
            onReturnToAttract={returnToAttract}
          />
        )}
      </div>
    </div>
  );
}