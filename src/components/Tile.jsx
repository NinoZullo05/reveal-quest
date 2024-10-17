import React from 'react';
import { useTheme } from '../hooks/ThemeContext';
import Player from './Player';

function Tile({ row, col, playerPosition, explored, currentImage, boardSize }) {
  const { isDarkMode } = useTheme();
  const isPlayerHere = playerPosition.row === row && playerPosition.col === col;

  return (
    <div 
      className={`relative w-full h-full ${explored ? '' : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} border border-gray-600`}
      style={{
        backgroundImage: explored ? `url(${currentImage})` : 'none',
        backgroundPosition: `${-col * 100}% ${-row * 100}%`,
        backgroundSize: `${boardSize * 100}% ${boardSize * 100}%`,
        transition: 'all 0.3s ease',
      }}
    >
      {isPlayerHere && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4">
            <Player />
          </div>
        </div>
      )}
    </div>
  );
}

export default Tile;