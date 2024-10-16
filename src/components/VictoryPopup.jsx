import Images from '../constants/Images';

function VictoryPopup({ onRestart, onNewLevel }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-3xl font-bold mb-3">You won!</h2>
        <div className="mb-4">
          <img
            src={Images.MAIN_AFTER} 
            alt="Complete"
            className="w-full h-auto max-w-[250px] mx-auto"
          />
        </div>
        <div className="flex justify-around">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            onClick={onRestart}
          >
            Gioca Ancora
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            onClick={onNewLevel}
          >
            Nuovo Livello
          </button>
        </div>
      </div>
    </div>
  );
}

export default VictoryPopup;