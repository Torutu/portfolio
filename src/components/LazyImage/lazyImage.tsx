import React, { useState, useEffect, useRef } from 'react';
import { LazyImageProps } from '../../types/images';

export const LazyImage: React.FC<LazyImageProps> = ({ 
  image, 
  className = '', 
  onClick 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const isMobile = window.innerWidth <= 768;
  const imageSrc = isInView 
    ? (isMobile && image.srcMobile ? image.srcMobile : image.src)
    : undefined;

  const imageWebpSrc = isInView 
    ? (isMobile && image.srcMobileWebp ? image.srcMobileWebp : image.srcWebp)
    : undefined;

  return (
    <picture>
      {imageWebpSrc && <source type="image/webp" srcSet={imageWebpSrc} />}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={image.alt}
        className={`${className} ${isLoaded ? 'lazy-image--loaded' : 'lazy-image--loading'}`}
        onClick={onClick}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        width={image.width}
        height={image.height}
        style={{
          aspectRatio: `${image.width} / ${image.height}`,
        }}
      />
    </picture>
  );
};
