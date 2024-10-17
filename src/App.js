import React, { useState, useCallback, useEffect } from 'react';
import GameBoard from './components/GameBoard';
// import Controls from './components/Controls'; deprecated : now use Sidenav.
import MobileController from './components/MobileController';
import { ThemeProvider } from './hooks/ThemeContext';
import Images from './constants/Images';
import Sidebar from './components/SideBar';
import VictoryPopup from './components/VictoryPopup'; 
const BOARD_SIZE = 10;

function App() {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [victory, setVictory] = useState(false);

  const imageArray = [Images.MAIN_AFTER, Images.image1];
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
    setVictory(true); 
  }, []);

  const closePopup = useCallback(() => {
    setVictory(false);
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-between min-h-screen p-4 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
        <div className="w-full max-w-[520px] flex flex-col items-center flex-grow">
        <Sidebar onReset={resetGame} onNewLevel={newLevel} />

          <h1 className="mt-10 text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-blue-800 dark:text-blue-300">
            Esplora l'Immagine
          </h1>
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
         
        </div>
        {isMobile && <MobileController onMove={movePlayer} />}
        
        {victory && (
          <VictoryPopup 
            onRestart={resetGame} 
            onNewLevel={newLevel} 
            image={currentImage}
            onClose={closePopup}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
