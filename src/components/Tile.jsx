import React from 'react';

function Tile({ row, col, playerPosition, opacity, isDarkMode }) {
  const isPlayer = playerPosition.row === row && playerPosition.col === col;

  return (
    <div
      className={`w-[50px] h-[50px] border transition-opacity duration-300 ease-in-out ${
        isDarkMode ? 'border-gray-600' : 'border-gray-300'
      } ${
        isPlayer ? 'bg-yellow-300 bg-opacity-50' : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}
      style={{ opacity: opacity }}
    >
      {isPlayer && (
        <div className="w-full h-full flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-blue-300' : 'bg-blue-500'}`}></div>
        </div>
      )}
    </div>
  );
}

export default Tile;