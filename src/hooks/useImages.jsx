import { useState, useCallback } from 'react';

const images = [
  '../assets/MainAfter.jpg',
];

function useImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  return {
    currentImage: images[currentImageIndex],
    nextImage,
  };
}

export default useImages;