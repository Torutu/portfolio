export interface OptimizedImage {
  id: string;
  src: string;
  srcWebp?: string;
  srcMobile?: string;
  srcMobileWebp?: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface ImageModalProps {
  image: OptimizedImage;
  className?: string;
}

export interface LazyImageProps {
  image: OptimizedImage;
  className?: string;
  onClick?: () => void;
}
