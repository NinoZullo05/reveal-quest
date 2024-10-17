import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-500 to-blue-300">
      <motion.h1
        className="text-5xl font-bold text-white mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Benvenuto nel Gioco!
      </motion.h1>
      <motion.p
        className="text-xl text-white mb-10 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Esplora immagini, raccogli punti e sfida i tuoi amici!
      </motion.p>
      <motion.div
        className="flex items-center justify-center"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Link to="/game">
          <div className="relative inline-block text-lg font-bold text-white transition-transform duration-300">
            <span className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -rotate-2"></span>
            <span className="relative inline-block px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700">
              Gioca Ora!
            </span>
          </div>
        </Link>
      </motion.div>
      <motion.img
        src="https://example.com/your-game-image.png" // Replace with your game image
        alt="Game Preview"
        className="mt-10 w-80 h-auto rounded-lg shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default LandingPage;
