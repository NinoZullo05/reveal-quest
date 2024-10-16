import React, { useState, useEffect } from 'react';

const sprites = Array.from({ length: 10 }, (_, i) => `../sprites/Walk (${i + 1}).png`);

function Player() {
  const [spriteIndex, setSpriteIndex] = useState(0);
  const [spritesLoaded, setSpritesLoaded] = useState(false);
  const [loadedSprites, setLoadedSprites] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    console.log('Attempting to load sprites:', sprites); // Debug log

    Promise.all(
      sprites.map((spritePath) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          
          img.onload = () => {
            console.log(`Successfully loaded: ${spritePath}`); // Debug log
            resolve(spritePath);
          };
          
          img.onerror = (e) => {
            console.error(`Failed to load sprite ${spritePath}:`, e);
            reject(new Error(`Failed to load ${spritePath}`));
          };
          
          img.src = spritePath;
        });
      })
    )
    .then((loaded) => {
      console.log('All sprites loaded successfully:', loaded); // Debug log
      setLoadedSprites(loaded);
      setSpritesLoaded(true);
      setLoadingError(null);
    })
    .catch((error) => {
      console.error('Error in sprite loading:', error);
      setLoadingError(error.message);
      setLoadedSprites(sprites);
      setSpritesLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!spritesLoaded) return;

    const intervalId = setInterval(() => {
      setSpriteIndex((prevIndex) => (prevIndex + 1) % loadedSprites.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, [spritesLoaded, loadedSprites.length]);

  if (loadingError && process.env.NODE_ENV === 'development') {
    console.error('Sprite loading error:', loadingError);
  }

  if (!spritesLoaded) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-12 h-12 transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: `url(${loadedSprites[spriteIndex]})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          transform: 'scale(2)',
        }}
      />
    </div>
  );
}

export default Player; // TODO : fix sprite animation 