import React, { useState, useEffect } from 'react';

const sprites = Array.from({ length: 10 }, (_, i) => `/sprites/walk(${i + 1}).png`);

function Player() {
  const [spriteIndex, setSpriteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSpriteIndex((prevIndex) => (prevIndex + 1) % sprites.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out"
      style={{
        backgroundImage: `url(${sprites[spriteIndex]})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
}

export default Player;