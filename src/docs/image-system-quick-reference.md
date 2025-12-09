# Image System Quick Reference

## 🚀 Quick Start

### 1. Add a new image (3 steps)

**Step 1: Optimize the image**
```bash
# Place your image in src/media/
# Then run:
bash optimize-images.sh
```

**Step 2: Import and configure**
```typescript
// In src/config/imagesConfig.tsx

// Import all variants
import myImagePng from '../media/myimage.png';
import myImageWebp from '../media/myimage.webp';
import myImageMobile from '../media/myimage_mobile.png';
import myImageMobileWebp from '../media/myimage_mobile.webp';

// Add to config
export const IMAGES_CONFIG = {
  myimage: {
    id: 'myimage',
    src: myImagePng,
    srcWebp: myImageWebp,
    srcMobile: myImageMobile,
    srcMobileWebp: myImageMobileWebp,
    alt: 'My image description',
    width: 1920,
    height: 1080,
  },
};
```

**Step 3: Use in component**
```typescript
import { IMAGES_CONFIG } from '../../config/imagesConfig';
import { ImageModal } from '../../components/ImageModal';

<ImageModal 
  image={IMAGES_CONFIG.myimage}
  className="my-class"
/>
```

## 📦 Components

### ImageModal
Modal with thumbnail that opens full-size on click.
```typescript
<ImageModal 
  image={IMAGES_CONFIG.imagename}
  className="optional-class"
/>
```

### LazyImage
Standalone lazy-loading image (without modal).
```typescript
import { LazyImage } from '../../components/LazyImage';

<LazyImage 
  image={IMAGES_CONFIG.imagename}
  className="optional-class"
  onClick={() => console.log('clicked')}
/>
```

## 🎨 CSS Classes

### Loading states
```css
.lazy-image--loading  /* While loading (blur + shimmer) */
.lazy-image--loaded   /* After loaded (clear) */
```

### Modal classes
```css
.image-modal__thumbnail  /* Clickable thumbnail */
.image-modal__overlay    /* Dark backdrop */
.image-modal__container  /* Modal wrapper */
.image-modal__enlarged   /* Full-size image */
```

## ⚙️ Configuration Object

```typescript
interface OptimizedImage {
  id: string;              // Unique identifier
  src: string;             // Original/desktop PNG
  srcWebp?: string;        // Desktop WebP (optional)
  srcMobile?: string;      // Mobile PNG (optional)
  srcMobileWebp?: string;  // Mobile WebP (optional)
  alt: string;             // Alt text for accessibility
  width: number;           // Original width in pixels
  height: number;          // Original height in pixels
  blurDataURL?: string;    // Base64 blur placeholder (optional)
}
```

## 📊 File Size Expectations

| Format | Size | Use Case |
|--------|------|----------|
| Original PNG | 100% | Fallback for old browsers |
| Desktop WebP | 40-60% | Modern browsers, desktop |
| Mobile PNG | 25-35% | Old mobile browsers |
| Mobile WebP | 15-20% | Modern mobile browsers |

## 🎯 Performance Checklist

- [ ] All images in `/media/` directory
- [ ] Ran `optimize-images.sh` to create variants
- [ ] Imported all variants in `imagesConfig.tsx`
- [ ] Set correct width/height dimensions
- [ ] Wrote descriptive alt text
- [ ] Used `ImageModal` or `LazyImage` component
- [ ] Tested on Chrome DevTools (mobile view)
- [ ] Verified WebP loads in Network tab
- [ ] Checked lazy loading in Elements tab

## 🔧 Helper Functions

```typescript
// Get image by ID
import { getImage } from '../../config/imagesConfig';
const myImage = getImage('imagename');

// Check WebP support
import { hasWebP } from '../../config/imagesConfig';
if (hasWebP(IMAGES_CONFIG.myimage)) {
  console.log('WebP available!');
}

// Check mobile variants
import { hasMobileVariants } from '../../config/imagesConfig';
if (hasMobileVariants(IMAGES_CONFIG.myimage)) {
  console.log('Mobile versions available!');
}
```

## 🐛 Common Issues

### Image doesn't load
- Check file path in import
- Verify file exists in `/media/` directory
- Look for console errors

### No lazy loading
- Verify `LazyImage` component is used
- Check if Intersection Observer is supported
- Ensure image is in viewport

### Mobile still slow
- Verify mobile variants exist
- Check Network tab for correct file loading
- Ensure mobile breakpoint is 768px

### WebP not loading
- Check browser support (Chrome, Firefox, Edge, Safari 14+)
- Verify `srcWebp` is set in config
- PNG fallback should load automatically

## 📱 Mobile Optimization Tips

1. **Always create mobile variants** (800px width max)
2. **Use lower quality** for mobile (75 vs 80)
3. **Test on real devices** or Chrome DevTools
4. **Monitor data usage** in Network tab
5. **Check load time** on 3G throttling

## 🎓 Best Practices

✅ **DO:**
- Optimize all images before adding to project
- Use descriptive alt text for accessibility
- Test on mobile and desktop
- Keep original high-quality images as backup
- Use WebP format whenever possible

❌ **DON'T:**
- Commit unoptimized images to repository
- Skip alt text (important for accessibility)
- Use images larger than necessary
- Forget to test on mobile
- Ignore console warnings/errors

## 📚 Related Files

- `/types/images.ts` - TypeScript interfaces
- `/config/imagesConfig.tsx` - Image configuration
- `/components/LazyImage/` - Lazy loading component
- `/components/ImageModal.tsx` - Modal component
- `/docs/09-12-2025-image-optimization.md` - Full documentation
- `/docs/imagemagick-installation.md` - Installation guide
