import { useTheme } from '../hooks/ThemeContext';

function Controls({ onReset }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="mt-4 space-y-4">
      <p className="text-center text-lg text-gray-800 dark:text-gray-200">
        Usa le frecce della tastiera per muoverti e rivelare l'immagine
      </p>
      <div className="flex justify-center space-x-4">
        <button 
          onClick={toggleTheme} 
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            isDarkMode 
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500" 
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {isDarkMode ? "Modalità Chiara" : "Modalità Scura"}
        </button>
        <button 
          onClick={onReset} 
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
        >
          Nuova Partita
        </button>
      </div>
    </div>
  );
}
export default Controls;