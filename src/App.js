import React, { useState, useCallback, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import MobileController from './components/MobileController';
import { ThemeProvider } from './hooks/ThemeContext';
import Images from './constants/Images';

const BOARD_SIZE = 10;

function App() {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const imageArray = [Images.MAIN_AFTER];
  const currentImage = imageArray[currentImageIndex];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const newLevel = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    resetGame();
  }, [imageArray.length, resetGame]);

  const onVictory = useCallback(() => {
    console.log("Victory!");
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-blue-800 dark:text-blue-300">Esplora l'Immagine</h1>
        <GameBoard
          key={gameKey}
          playerPosition={playerPosition}
          movePlayer={movePlayer}
          currentImage={currentImage}
          boardSize={BOARD_SIZE}
          onVictory={onVictory}
          onRestart={resetGame}
          onNewLevel={newLevel}
        />
        <Controls onReset={resetGame} />
        {isMobile && <MobileController onMove={movePlayer} />}
      </div>
    </ThemeProvider>
  );
}

export default App;