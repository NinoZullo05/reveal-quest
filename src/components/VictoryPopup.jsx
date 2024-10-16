import React from 'react';

function VictoryPopup({ onPlayAgain }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg text-center animate-pulse">
        <h2 className="text-2xl font-bold mb-4">Livello Completato!</h2>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => alert('Next level coming soon!')}
        >
          Next Level
        </button>
      </div>
    </div>
  );
}

export default VictoryPopup;
