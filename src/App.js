import React, { useState, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import useImages from './hooks/useImages';
import { ThemeProvider } from './hooks/ThemeContext';

const BOARD_SIZE = 10;

function App() {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const { currentImage, nextImage } = useImages();
  const [gameKey, setGameKey] = useState(0);

  const movePlayer = useCallback((direction) => {
    setPlayerPosition((prevPos) => {
      const newPos = { ...prevPos };
      switch (direction) {
        case 'up': newPos.row = Math.max(0, prevPos.row - 1); break;
        case 'down': newPos.row = Math.min(BOARD_SIZE - 1, prevPos.row + 1); break;
        case 'left': newPos.col = Math.max(0, prevPos.col - 1); break;
        case 'right': newPos.col = Math.min(BOARD_SIZE - 1, prevPos.col + 1); break;
        default: break;
      }
      return newPos;
    });
  }, []);

  const resetGame = useCallback(() => {
    setPlayerPosition({ row: 0, col: 0 });
    setGameKey(prevKey => prevKey + 1);
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
        <h1 className="text-4xl font-bold mb-8 text-blue-800 dark:text-blue-300">Esplora l'Immagine</h1>
        <GameBoard
          key={gameKey}
          playerPosition={playerPosition}
          movePlayer={movePlayer}
          currentImage={currentImage}
          boardSize={BOARD_SIZE}
          onVictory={nextImage}
        />
        <Controls onReset={resetGame} />
      </div>
    </ThemeProvider>
  );
}

export default App;