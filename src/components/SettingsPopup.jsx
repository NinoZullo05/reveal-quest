import React, { useState, useEffect } from "react";
import Images from "../constants/Images";
import JSZip from "jszip";
import { X } from "lucide-react";

const STORAGE_KEY = "uploadedImages";
const MAX_STORED_IMAGES = 20;

const SettingsPopup = ({ onClose, onConfirm = () => {}, onReset }) => {
  const [selectedSprite, setSelectedSprite] = useState(Images.Idle1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStoredImages = async () => {
      const storedImages = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      const loadedImages = await Promise.all(
        storedImages.map(async (item) => {
          const response = await fetch(item.data);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      setBackgroundImages(loadedImages);
    };
    loadStoredImages();
  }, []);

  const saveImages = async (imagesToSave) => {
    const imagesToStore = await Promise.all(
      imagesToSave.map(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return {
          data: await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          }),
          type: blob.type,
        };
      })
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(imagesToStore));
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        try {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
          if (!selectedImage) {
            setSelectedImage(imageUrl);
          }
        } catch (error) {
          console.error("Error reading image file:", error);
          setError("Failed to load image file.");
        }
      } else if (file.name.endsWith(".zip")) {
        try {
          const zip = new JSZip();
          const zipContent = await zip.loadAsync(file);
          const zipImages = await Promise.all(
            Object.keys(zipContent.files).map(async (filename) => {
              if (
                filename.endsWith(".png") ||
                filename.endsWith(".jpg") ||
                filename.endsWith(".jpeg")
              ) {
                const fileData = await zip.file(filename).async("blob");
                return URL.createObjectURL(fileData);
              }
              return null;
            })
          );
          const validImages = zipImages.filter(Boolean);
          newImages.push(...validImages);
        } catch (error) {
          console.error("Error processing zip file:", error);
          setError(
            "Failed to load zip file. Please make sure it contains valid image files."
          );
        }
      }
    }

    if (newImages.length > 0) {
      const updatedImages = [...backgroundImages, ...newImages].slice(
        -MAX_STORED_IMAGES
      );
      setBackgroundImages(updatedImages);
      await saveImages(updatedImages);
      setError("");
    } else if (!selectedImage) {
      setError("No valid image files were selected.");
    }
  };

  const handleConfirm = () => {
    try {
      const result = {
        sprite: selectedSprite,
        image: selectedImage,
        additionalImages: backgroundImages,
      };

      if (typeof onConfirm === "function") {
        onConfirm(result);
      }

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Error in handleConfirm:", error);
      setError("Failed to save settings. Please try again.");
    }
  };

  const handleReset = () => {
    try {
      setSelectedSprite(Images.Idle1);
      setSelectedImage(null);
      setBackgroundImages([]);
      setError("");
      localStorage.removeItem(STORAGE_KEY);

      if (typeof onReset === "function") {
        onReset();
      }
    } catch (error) {
      console.error("Error in handleReset:", error);
      setError("Failed to reset settings. Please try again.");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = backgroundImages.filter((_, i) => i !== index);
    setBackgroundImages(updatedImages);
    saveImages(updatedImages);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg relative w-full max-w-full md:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Impostazioni
        </h2>

        {/* Sprite Selection Section */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg font-semibold mb-2 md:mb-3">
            Sprite Selezionato
          </h3>
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
          <h3 className="text-lg font-semibold mb-2 md:mb-3">
            Carica Immagini
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Puoi caricare singole immagini o un file .zip contenente più
            immagini.
          </p>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*,.zip"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {selectedImage && (
              <div className="mt-2">
                <h4 className="text-sm font-semibold mb-1">
                  Immagine principale:
                </h4>
                <div className="border rounded-lg p-2">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-32 object-contain"
                  />
                </div>
              </div>
            )}
            {backgroundImages.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-semibold mb-1">
                  Immagini caricate: {backgroundImages.length}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {backgroundImages.map((img, index) => (
                    <div key={img} className="relative">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancella tutto
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-red-600 transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
