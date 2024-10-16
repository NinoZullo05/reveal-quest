import { useState, useEffect, useCallback } from 'react';
import Tile from './Tile';
import VictoryPopup from './VictoryPopup';
import { useTheme } from '../hooks/ThemeContext';

function GameBoard({ playerPosition, movePlayer, currentImage, boardSize, onVictory, onRestart, onNewLevel }) {
  const [tiles, setTiles] = useState(() => 
    Array(boardSize).fill().map(() => Array(boardSize).fill({ explored: false }))
  );
  const [showVictory, setShowVictory] = useState(false);
  const { isDarkMode } = useTheme();

  

  const updateExploredTiles = useCallback(() => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];
      newTiles[playerPosition.row][playerPosition.col] = { explored: true };
      return newTiles;
    });
  }, [playerPosition]);
  useEffect(() => {
    const allExplored = tiles.every(row => row.every(tile => tile.explored));
    if (allExplored) {
      setShowVictory(true);
      onVictory();
    }
  }, [tiles, onVictory]);

  const handleRestart = () => {
    setShowVictory(false);
    onRestart();
  };

  const handleNewLevel = () => {
    setShowVictory(false);
    onNewLevel();
  };

  useEffect(() => {
    updateExploredTiles();
    const handleKeyDown = (event) => {
      const directions = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
      if (directions[event.key]) {
        movePlayer(directions[event.key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, updateExploredTiles]);

  useEffect(() => {
    const allExplored = tiles.every(row => row.every(tile => tile.explored));
    if (allExplored) {
      setShowVictory(true);
    }
  }, [tiles]);

  const handleVictory = () => {
    setShowVictory(false);
    onVictory();
  };

  return (
    <div className={`relative w-full max-w-[520px] aspect-square bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-10 gap-0">
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              playerPosition={playerPosition}
              explored={tile.explored}
              currentImage={currentImage}
              boardSize={boardSize}
            />
          ))
        )}
      </div>
      {showVictory && <VictoryPopup onRestart={handleRestart} onNewLevel={handleNewLevel} />}
    </div>
  );
}

export default GameBoard;