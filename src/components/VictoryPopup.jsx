import * as Dialog from '@radix-ui/react-dialog';
import { Trophy, Rocket, RotateCcw } from 'lucide-react';

function VictoryPopup({ onRestart, onNewLevel, image }) {
  return (
    <Dialog.Root open={true}>
      <Dialog.DialogOverlay className="fixed inset-0 bg-black/30" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Dialog.Title className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Vittoria!
              </span>
            </div>
          </Dialog.Title>
          <div className="flex flex-col items-center space-y-6 p-4">
            <div className="relative w-full max-w-[250px] aspect-square rounded-lg overflow-hidden shadow-lg">
              <img src={image} alt="Livello Completato" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={onRestart}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rigioca</span>
              </button>

              <button
                onClick={onNewLevel}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                <Rocket className="w-4 h-4" />
                <span>Nuovo Livello</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default VictoryPopup;
