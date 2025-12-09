import React, { useState, useEffect } from 'react';
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
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle body scroll locking and class management
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll and add class
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Restore body scroll and remove class
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  // Prevent scrolling on the modal content itself
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
        <div 
          className="image-modal__overlay" 
          onClick={handleModalClick}
        >
          <div className="image-modal__container">
            <img 
              src={src} 
              alt={alt} 
              className="image-modal__enlarged"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
              draggable={false} // Prevent image dragging on mobile
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
