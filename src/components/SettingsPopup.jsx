import React, { useState } from 'react';
import Images from '../constants/Images'; 
const SettingsPopup = ({ onClose, onConfirm, onReset }) => {
  const [selectedSprite, setSelectedSprite] = useState(Images.Idle1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      localStorage.setItem('backgroundImage', selectedImage);
    }
    onConfirm({ sprite: selectedSprite, image: selectedImage });
    onClose();
  };

  const handleReset = () => {
    setSelectedSprite(Images.Idle1);
    setSelectedImage(null);
    onReset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg relative w-full max-w-full md:max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Impostazioni</h2>

        {/* Sprite Selection Section */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg font-semibold mb-2 md:mb-3">Sprite Selezionato</h3>
          <div className="flex items-center justify-center">
            <div className="p-2 border rounded-lg">
              <img
                src={selectedSprite}
                alt="Sprite Idle"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg font-semibold mb-2 md:mb-3">Carica Immagine Personalizzata</h3>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full md:w-1/2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedImage && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-24 md:h-32 object-contain rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end space-x-4">
          <button 
            onClick={handleReset}
            className="bg-gray-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-gray-600"
          >
            Azzera
          </button>
          <button 
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-red-600"
          >
            Annulla
          </button>
          <button 
            onClick={handleConfirm}
            className="bg-green-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-green-600"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
