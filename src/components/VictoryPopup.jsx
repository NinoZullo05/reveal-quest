function VictoryPopup({ currentImage, onRestart, onNewLevel }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4">You won!</h2>
        <div className="mb-4">
          <img
            src={`/assets/${currentImage}`}
            alt="Complete"
            className="w-full h-auto"
          />
        </div>
        <div className="flex justify-around">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onRestart}
          >
            Gioca Ancora
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
