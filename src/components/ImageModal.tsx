import React, { useState, useEffect } from 'react';
import { ImageModalProps } from '../types/images';
import { LazyImage } from './LazyImage';
import '../styles/imageModal.css';
import '../components/LazyImage/lazyImage.css';

export const ImageModal: React.FC<ImageModalProps> = ({ image, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const isMobile = window.innerWidth <= 768;
  const modalSrc = isMobile && image.srcMobile ? image.srcMobile : image.src;
  const modalWebpSrc = isMobile && image.srcMobileWebp ? image.srcMobileWebp : image.srcWebp;

  return (
    <>
      <LazyImage
        image={image}
        className={`${className} image-modal__thumbnail`}
        onClick={openModal}
      />

      {isOpen && (
        <div 
          className="image-modal__overlay" 
          onClick={handleModalClick}
        >
          <div className="image-modal__container">
            <picture>
              {modalWebpSrc && <source type="image/webp" srcSet={modalWebpSrc} />}
              <img 
                src={modalSrc}
                alt={image.alt}
                className="image-modal__enlarged"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      )}
    </>
  );
};
