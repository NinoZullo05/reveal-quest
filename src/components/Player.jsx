import React, { useState, useEffect } from 'react';

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const SPRITE_IMAGES = importAll(require.context('../sprites', false, /Walk.*\.png$/));

const Player = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedSprites, setLoadedSprites] = useState([]);
  
  useEffect(() => {
    const spriteArray = Object.entries(SPRITE_IMAGES)
      .sort(([a], [b]) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      })
      .map(([_, src]) => src);

    const loadImages = async () => {
      try {
        const loaded = await Promise.all(
          spriteArray.map(
            (src) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => reject(new Error(`Failed to load ${src}`));
              })
          )
        );
        setLoadedSprites(loaded);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading sprites:', err);
        setError('Failed to load sprite images');
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (isLoading || loadedSprites.length === 0) return;

    const animationInterval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % loadedSprites.length);
    }, 100);

    return () => clearInterval(animationInterval);
  }, [isLoading, loadedSprites.length]);

  if (error) {
    return (
      <div className="text-red-500 text-xs">
        Error: {error}
      </div>
    );
  }

  if (isLoading || loadedSprites.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={loadedSprites[currentFrame]}
        alt={`Walking animation frame ${currentFrame + 1}`}
        className="w-full h-full object-contain"
        style={{
          imageRendering: 'pixelated',
          transform: 'scale(1.3)',
        }}
      />
    </div>
  );
};

export default Player;