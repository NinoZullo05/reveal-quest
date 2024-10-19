import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Trophy, Rocket, RotateCcw } from 'lucide-react';

function VictoryPopup({ onRestart, onNewLevel, image, onClose }) {
  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto overflow-hidden">
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
              <img src={image} alt="Livello Completato" className="w-full h-full object-cover" />
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
  );
}

export default VictoryPopup;