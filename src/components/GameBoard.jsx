import { useState, useEffect, useCallback } from 'react';
import Tile from './Tile';
import VictoryPopup from './VictoryPopup';
import { useTheme } from '../hooks/ThemeContext';

function GameBoard({ playerPosition, movePlayer, currentImage, boardSize, onVictory }) {
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
    <div className={`relative w-[520px] h-[520px] bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} overflow-hidden`}>
      <div className="absolute top-0 left-0 grid grid-cols-10 gap-0">
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
      {showVictory && <VictoryPopup onContinue={handleVictory} />}
    </div>
  );
}

export default GameBoard;