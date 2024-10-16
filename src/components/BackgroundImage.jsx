import React from 'react';

function BackgroundImage({ currentImage }) {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${currentImage})` }}
    />
  );
}

export default BackgroundImage;