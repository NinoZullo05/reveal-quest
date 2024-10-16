import { useTheme } from '../hooks/ThemeContext';

function Tile({ row, col, playerPosition, explored, currentImage, boardSize }) {
  const { isDarkMode } = useTheme();
  const tileSize = 520 / boardSize; 

  const tileStyle = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    backgroundImage: explored ? `url(${currentImage})` : 'none',
    backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
    backgroundSize: `${520}px ${520}px`,
    transition: 'all 0.3s ease',
  };

  const isPlayerHere = playerPosition.row === row && playerPosition.col === col;

  return (
    <div 
      className={`relative ${explored ? '' : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} border border-gray-600`}
      style={tileStyle}
    >
      {isPlayerHere && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

export default Tile;