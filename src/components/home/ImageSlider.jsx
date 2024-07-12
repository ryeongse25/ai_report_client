import React, { useEffect, useState } from 'react';

const images = [
  '/images/homeimg1.jpg',
  '/images/homeimg2.jpg',
  '/images/homeimg3.jpg',
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
    <div style={{width:'100%', height: "100%"}}>
      <img src={images[currentIndex]} alt="Slideshow" />
    </div>
  );
};

export default ImageSlider;
