import React, { useState } from "react";
import {
  Menu,
  Home,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";
import SettingsPopup from "./SettingsPopup";
import GuidePopup from "./GuidePopup";

function Sidebar({ onReset, onNewLevel }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const openGuide = () => setIsGuideOpen(true);
  const closeGuide = () => setIsGuideOpen(false);

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isOpen ? "w-64" : "w-16"}
          md:block`}
      >
        <div className="hidden md:block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-[-12px] top-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col h-full p-4">
          <div className="flex items-center space-x-3 mb-8">
            {isOpen && (
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                Esplora l'Immagine
              </span>
            )}
          </div>

          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <button
                  className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => navigate("/")}
                >
                  <Home className="w-5 h-5 text-blue-600" />
                  {isOpen && (
                    <span className="dark:text-white text-black">Home</span>
                  )}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={onNewLevel}
                >
                  <RotateCcw className="w-5 h-5 text-green-600" />
                  {isOpen && (
                    <span className="dark:text-white text-black">
                      Ricomincia
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={handleSettingsClick}
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  {isOpen && (
                    <span className="dark:text-white text-black">
                      Impostazioni
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={openGuide}
                >
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  {isOpen && (
                    <span className="dark:text-white text-black">
                      Apri Guida
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          <div className="border-t dark:border-gray-700 pt-4">
            <button
              className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  {isOpen && (
                    <span className="dark:text-white text-black">
                      Modalità Chiara
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-blue-500" />
                  {isOpen && (
                    <span className="dark:text-white text-black">
                      Modalità Scura
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed left-4 top-4 z-50 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {isSettingsOpen && (
        <SettingsPopup onClose={() => setIsSettingsOpen(false)} />
      )}

      <GuidePopup isOpen={isGuideOpen} onClose={closeGuide} />
    </>
  );
}

export default Sidebar;