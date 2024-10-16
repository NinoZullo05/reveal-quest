import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

function MobileController({ onMove }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-3 gap-2 p-2">
        <div></div>
        <button 
          onClick={() => onMove('up')} 
          className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-300"
        >
          <ArrowUp className="text-white" size={24} />
        </button>
        <div></div>
        <button 
          onClick={() => onMove('left')} 
          className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-300"
        >
          <ArrowLeft className="text-white" size={24} />
        </button>
        <div></div>
        <button 
          onClick={() => onMove('right')} 
          className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-300"
        >
          <ArrowRight className="text-white" size={24} />
        </button>
        <div></div>
        <button 
          onClick={() => onMove('down')} 
          className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-300"
        >
          <ArrowDown className="text-white" size={24} />
        </button>
        <div></div>
      </div>
    </div>
  );
}
export default MobileController;