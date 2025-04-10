import React, { useState } from 'react';
import './hotel-gallery.css'; // optional, for custom styling

const HotelGallery = ({ images }) => {
  // If no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="hotel-gallery">
        <img
          src="https://via.placeholder.com/500x300?text=No+Images"
          alt="No Images"
          className="hotel-gallery__main"
        />
      </div>
    );
  }

  // Find index of primary image if it exists, otherwise default to 0
  let primaryIndex = images.findIndex((img) => img.isPrimary);
  if (primaryIndex === -1) primaryIndex = 0;

  // We'll store the currentIndex in state; initialize to primaryIndex
  const [currentIndex, setCurrentIndex] = useState(primaryIndex);

  // Helper to go to next/prev
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  // The currently-displayed image
  const currentImage = images[currentIndex];

  return (
    <div className="hotel-gallery">
      {/* Main image section */}
      <div className="hotel-gallery__main-wrapper">
        <button className="hotel-gallery__nav-button left" onClick={goToPrev}>
          &#10094; {/* Left arrow */}
        </button>
        <img
          src={currentImage.imageUrl}
          alt={`Hotel ${currentImage.imageId}`}
          className="hotel-gallery__main"
        />
        <button className="hotel-gallery__nav-button right" onClick={goToNext}>
          &#10095; {/* Right arrow */}
        </button>
      </div>

      {/* Thumbnails */}
      <div className="hotel-gallery__thumbnails">
        {images.map((img, idx) => (
          <img
            key={img.imageId}
            src={img.imageUrl}
            alt={`Thumbnail-${img.imageId}`}
            className={`hotel-gallery__thumb ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelGallery;