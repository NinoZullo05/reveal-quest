import React from 'react';
import { useTheme } from '../hooks/ThemeContext';

function GameOverPopup({ onRestart, onClose }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-8 rounded-lg shadow-lg text-center`}>
        <h2 className="text-2xl font-bold mb-4">Game Over</h2>
        <p className="mb-6">You were caught by an enemy!</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Restart
          </button>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'} text-black`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverPopup;