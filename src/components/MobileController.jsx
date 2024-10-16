import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

function MobileController({ onMove }) {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center">
      <div className="grid grid-cols-3 gap-2">
        <div></div>
        <button onClick={() => onMove('up')} className="p-4 bg-blue-500 rounded-full">
          <ArrowUp className="text-white" />
        </button>
        <div></div>
        <button onClick={() => onMove('left')} className="p-4 bg-blue-500 rounded-full">
          <ArrowLeft className="text-white" />
        </button>
        <div></div>
        <button onClick={() => onMove('right')} className="p-4 bg-blue-500 rounded-full">
          <ArrowRight className="text-white" />
        </button>
        <div></div>
        <button onClick={() => onMove('down')} className="p-4 bg-blue-500 rounded-full">
          <ArrowDown className="text-white" />
        </button>
        <div></div>
      </div>
    </div>
  );
}

export default MobileController;