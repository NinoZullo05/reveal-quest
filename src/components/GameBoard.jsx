import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import BackgroundImage from './BackgroundImage';

const BOARD_SIZE = 10;

function GameBoard({ playerPosition, movePlayer }) {
  const [tiles, setTiles] = useState(
    Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill({ opacity: 1 }))
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp': movePlayer('up'); break;
        case 'ArrowDown': movePlayer('down'); break;
        case 'ArrowLeft': movePlayer('left'); break;
        case 'ArrowRight': movePlayer('right'); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  const revealTile = (row, col) => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];
      newTiles[row][col] = { opacity: 0 };
      return newTiles;
    });
  };

  useEffect(() => {
    revealTile(playerPosition.row, playerPosition.col);
  }, [playerPosition]);

  return (
    <div className="relative w-[500px] h-[500px]">
      <BackgroundImage />
      <div className="absolute top-0 left-0 grid grid-cols-10 gap-0">
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              playerPosition={playerPosition}
              opacity={tile.opacity}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;