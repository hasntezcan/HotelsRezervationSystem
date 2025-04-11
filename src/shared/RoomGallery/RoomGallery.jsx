// src/components/RoomGallery/RoomGallery.jsx
import React, { useState } from 'react';
import './room-gallery.css';  

const RoomGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  const primaryIndex = images.findIndex(img => img.isPrimary === true);
  const [currentIndex, setCurrentIndex] = useState(
    primaryIndex !== -1 ? primaryIndex : 0
  );

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="room-gallery">
      <div className="room-gallery__main-wrapper">
        <button className="room-gallery__nav-button left" onClick={prevImage}>
          &#10094;
        </button>

        <img
          className="room-gallery__image"
          src={currentImage.imageUrl}
          alt={`RoomImage-${currentImage.imageId}`}
        />

        <button className="room-gallery__nav-button right" onClick={nextImage}>
          &#10095;
        </button>

        {/* Optional: small overlay thumbs at bottom if you want them */}
        <div className="room-gallery__overlay-thumbs">
          {images.map((img, idx) => (
            <img
              key={img.imageId}
              src={img.imageUrl}
              alt={`Thumb-${img.imageId}`}
              className={`room-gallery__thumb ${
                idx === currentIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomGallery;