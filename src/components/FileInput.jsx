import React, { useState } from 'react';
import JSZip from 'jszip';

const FileInput = ({ onImagesLoaded }) => {
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = [];
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        imageFiles.push(URL.createObjectURL(file));
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
      onImagesLoaded(imageFiles);
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
        className="border border-gray-300 p-2 rounded"
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default FileInput;
