import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

const MAX_STORED_IMAGES = 10;
const STORAGE_KEY = 'uploadedImages';

const FileInput = ({ onImagesLoaded }) => {
  const [error, setError] = useState('');
  const [storedImages, setStoredImages] = useState([]);

  useEffect(() => {
    const loadStoredImages = () => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setStoredImages(JSON.parse(storedData));
      }
    };
    loadStoredImages();
  }, []);

  const saveToLocalStorage = (newImages) => {
    const updatedImages = [...storedImages, ...newImages].slice(-MAX_STORED_IMAGES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    setStoredImages(updatedImages);
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = [];
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        imageFiles.push(imageUrl);
      } else if (file.name.endsWith('.zip')) {
        try {
          const zip = new JSZip();
          const zipContent = await zip.loadAsync(file);
          const zipImages = await Promise.all(
            Object.keys(zipContent.files).map(async (filename) => {
              if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
                const fileData = await zip.file(filename).async('blob');
                return URL.createObjectURL(fileData);
              }
              return null;
            })
          );
          imageFiles.push(...zipImages.filter((url) => url));
        } catch (error) {
          setError('Failed to load zip file. Please make sure it contains valid image files.');
          console.error(error);
        }
      }
    }

    if (imageFiles.length > 0) {
      saveToLocalStorage(imageFiles);
      onImagesLoaded([...storedImages, ...imageFiles]);
      setError('');
    } else {
      setError('No valid image files were selected.');
    }
  };

  return (
    <div className="mb-4">
      <p className="mb-2 dark:text-white text-black">
        Inserisci un file immagine o un file .zip contenente immagini per caricare lo sfondo.
      </p>
      <input
        type="file"
        accept="image/*,.zip"
        multiple
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {storedImages.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 dark:text-white text-black">Immagini salvate:</p>
          <div className="flex flex-wrap gap-2">
            {storedImages.map((url, index) => (
              <img key={index} src={url} alt={`Stored image ${index + 1}`} className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;