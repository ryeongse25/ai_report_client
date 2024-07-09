import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

const images = [
  '/images/homeimage1.jpg',
  '/images/homeimage2.jpg',
  '/images/homeimage3.jpg',
  // 추가 이미지 경로
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5초마다 이미지 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
