import { useState } from 'react';
import Images from '../constants/Images';

const useImages = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = [Images.IMAGE_1, Images.IMAGE_2, Images.IMAGE_3]; // Add all your images here

  const currentImage = imageArray[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  return { currentImage, nextImage };
};

export default useImages;