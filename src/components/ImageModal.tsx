import React, { useState } from 'react';
import '../styles/imageModal.css';

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <>
      {/* Thumbnail Image */}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} image-modal__thumbnail`}
        onClick={openModal}
      />

      {/* Modal Overlay */}
      {isOpen && (
        <div className="image-modal__overlay" onClick={closeModal}>
          <div className="image-modal__container">
            <img 
              src={src} 
              alt={alt} 
              className="image-modal__enlarged"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            <button 
              className="image-modal__close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};
