import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Settings, Sparkles } from 'lucide-react';
import SettingsPopup from '../components/SettingsPopup';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const LandingPage = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSettingsConfirm = ({ sprite, image }) => {
    console.log('Settings confirmed:', { sprite, image });
    setPopupVisible(false);
  };

  const handleSettingsReset = () => {
    console.log('Settings reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
        <motion.div
          className="space-y-8 text-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={fadeIn} className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Benvenuto nel 
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 text-transparent bg-clip-text"> Gioco!</span>
          </motion.h1>

          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Esplora immagini straordinarie, raccogli punti e sfida i tuoi amici in un'avventura indimenticabile!
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              to="/game"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Gioca Ora!
            </Link>

            <button
              onClick={() => setPopupVisible(true)}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <Settings className="w-5 h-5" />
              Impostazioni
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats or features */}
      <motion.div 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl"
      >
        {[
          { title: "Giocatori", value: "1+" },
          { title: "Livelli", value: "1" },
          { title: "Punteggi", value: "0" }
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white/80 text-sm font-medium">{stat.title}</h3>
              <p className="text-white text-3xl font-bold mt-1">{stat.value}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {isPopupVisible && (
        <SettingsPopup 
          onClose={() => setPopupVisible(false)}
          onConfirm={handleSettingsConfirm}
          onReset={handleSettingsReset}
        />
      )}
    </div>
  );
};

export default LandingPage;