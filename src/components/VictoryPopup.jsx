import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Trophy, Rocket, RotateCcw, Maximize2 } from "lucide-react";
import { ThemeProvider } from "../hooks/ThemeContext";

function VictoryPopup({ onRestart, onNewLevel, image, onClose }) {
  const imageRef = useRef(null); 

  const handleFullscreen = () => {
    if (imageRef.current) {
      if (imageRef.current.requestFullscreen) {
        imageRef.current.requestFullscreen();
      } else if (imageRef.current.mozRequestFullScreen) {
        // Firefox
        imageRef.current.mozRequestFullScreen();
      } else if (imageRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        imageRef.current.webkitRequestFullscreen();
      } else if (imageRef.current.msRequestFullscreen) {
        // IE/Edge
        imageRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <ThemeProvider>
      <Dialog.Root open={true} onOpenChange={onClose}>
        <Dialog.DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg mx-auto overflow-hidden">
            <Dialog.Title className="text-center p-4 bg-gradient-to-r from-yellow-400 to-yellow-600">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-8 h-8 text-white" />
                <span className="text-2xl md:text-3xl font-bold text-white">
                  Vittoria!
                </span>
              </div>
            </Dialog.Title>
            <div className="flex flex-col items-center space-y-6 p-6">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                <img
                  ref={imageRef}
                  src={image}
                  alt="Livello Completato"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleFullscreen}
                  className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => {
                    onRestart();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-lg">Rigioca</span>
                </button>

                <button
                  onClick={() => {
                    onNewLevel();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Rocket className="w-5 h-5" />
                  <span className="text-lg">Nuovo Livello</span>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </ThemeProvider>
  );
}

export default VictoryPopup;
