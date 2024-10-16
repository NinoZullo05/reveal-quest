import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";

const BOARD_SIZE = 10;

function App() {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setImages(["image1.jpg", "image2.jpg", "image3.jpg"]);
  }, []);

  const movePlayer = (direction) => {
    setPlayerPosition((prevPos) => {
      let newRow = prevPos.row;
      let newCol = prevPos.col;

      switch (direction) {
        case "up":
          newRow = Math.max(0, prevPos.row - 1);
          break;
        case "down":
          newRow = Math.min(BOARD_SIZE - 1, prevPos.row + 1);
          break;
        case "left":
          newCol = Math.max(0, prevPos.col - 1);
          break;
        case "right":
          newCol = Math.min(BOARD_SIZE - 1, prevPos.col + 1);
          break;
        default:
          break;
      }

      return { row: newRow, col: newCol };
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Esplora l'Immagine</h1>
      <GameBoard
        playerPosition={playerPosition}
        movePlayer={movePlayer}
        isDarkMode={isDarkMode}
        currentImage={images[currentImageIndex]}
      />
      <div className="mt-4 space-y-2">
        <p>Usa le frecce della tastiera per muoverti e rivelare l'immagine</p>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded ${
            isDarkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
          }`}
        >
          {isDarkMode ? "Modalità Chiara" : "Modalità Scura"}
        </button>
        <button
          onClick={nextImage}
          className={`px-4 py-2 rounded ${
            isDarkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
          }`}
        >
          Prossima Immagine
        </button>
      </div>
    </div>
  );
}

export default App;
