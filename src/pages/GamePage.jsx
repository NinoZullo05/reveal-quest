import React, { useState, useCallback, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import MobileController from "../components/MobileController";
import { useTheme } from "../hooks/ThemeContext";
import Images from "../constants/Images";
import SideBar from "../components/SideBar";
import VictoryPopup from "../components/VictoryPopup";
import SettingsPopup from "../components/SettingsPopup";

const BOARD_SIZE = 10;
const STORAGE_KEY = 'uploadedImages';

function GamePage() {
  const { isDarkMode } = useTheme();
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customLevels, setCustomLevels] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Load saved custom backgrounds from localStorage
    const loadStoredImages = async () => {
      const storedImages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (storedImages.length > 0) {
        const loadedImages = await Promise.all(storedImages.map(async (item) => {
          const response = await fetch(item.data);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }));
        setCustomLevels(loadedImages);
        setCurrentImageIndex(Object.values(Images).length);
      }
    };
    loadStoredImages();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Combine default images with custom levels
  const imageArray = [...Object.values(Images), ...customLevels];
  const currentImage = imageArray[currentImageIndex];

  const movePlayer = useCallback((direction) => {
    setPlayerPosition((prevPos) => {
      const newPos = { ...prevPos };
      switch (direction) {
        case "up":
          newPos.row = Math.max(0, prevPos.row - 1);
          break;
        case "down":
          newPos.row = Math.min(BOARD_SIZE - 1, prevPos.row + 1);
          break;
        case "left":
          newPos.col = Math.max(0, prevPos.col - 1);
          break;
        case "right":
          newPos.col = Math.min(BOARD_SIZE - 1, prevPos.col + 1);
          break;
        default:
          break;
      }
      return newPos;
    });
  }, []);

  const resetGame = useCallback(() => {
    setPlayerPosition({ row: 0, col: 0 });
    setGameKey((prevKey) => prevKey + 1);
  }, []);

  const newLevel = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    resetGame();
  }, [imageArray.length, resetGame]);

  const onVictory = useCallback(() => {
    console.log("Victory!");
    setVictory(true);
  }, []);

  const closeVictoryPopup = useCallback(() => {
    setVictory(false);
  }, []);

  const handleSettingsConfirm = (result) => {
    const newImages = [];

    if (result.image) {
      newImages.push(result.image);
    }

    if (result.additionalImages && result.additionalImages.length > 0) {
      newImages.push(...result.additionalImages);
    }

    if (newImages.length > 0) {
      setCustomLevels(newImages);
      setCurrentImageIndex(Object.values(Images).length);
      resetGame();
    }

    setShowSettings(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-between min-h-screen p-4 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-blue-100 to-blue-300 text-black"
      } transition-colors duration-500`}
    >
      <div className="w-full max-w-[520px] flex flex-col items-center flex-grow">
        <SideBar
          onReset={resetGame}
          onNewLevel={newLevel}
          onSettings={() => setShowSettings(true)}
        />
        <h1
          className={`mt-10 text-2xl md:text-4xl font-bold mb-4 md:mb-8 ${
            isDarkMode ? "text-blue-300" : "text-blue-800"
          }`}
        >
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
          onClose={closeVictoryPopup}
        />
      )}

      {showSettings && (
        <SettingsPopup
          onClose={() => setShowSettings(false)}
          onConfirm={handleSettingsConfirm}
          onReset={() => {
            setCustomLevels([]);
            localStorage.removeItem(STORAGE_KEY);
            setCurrentImageIndex(0);
            resetGame();
          }}
        />
      )}
    </div>
  );
}

export default GamePage;