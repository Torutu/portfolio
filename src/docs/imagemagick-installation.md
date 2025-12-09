# ImageMagick Installation Guide

## What is ImageMagick?
ImageMagick is a powerful image processing tool that can convert, resize, and optimize images from the command line.

## Installation

### Windows
1. Download installer from: https://imagemagick.org/script/download.php#windows
2. Choose "ImageMagick-7.x.x-Q16-HDRI-x64-dll.exe"
3. Run installer
4. **Important**: Check "Add to PATH" during installation
5. Restart your terminal

### macOS
```bash
brew install imagemagick
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install imagemagick
```

### Linux (Fedora/RHEL)
```bash
sudo dnf install imagemagick
```

## Verify Installation
Open terminal and run:
```bash
convert --version
```

You should see version information if installed correctly.

## Manual Image Optimization (Without Script)

If you prefer to optimize images manually:

### Create WebP version
```bash
convert input.png -quality 80 -define webp:method=6 output.webp
```

### Create mobile PNG version
```bash
convert input.png -resize 800x> -quality 85 output_mobile.png
```

### Create mobile WebP version
```bash
convert input.png -resize 800x> -quality 75 -define webp:method=6 output_mobile.webp
```

## Alternative: Online Tools

If you can't install ImageMagick, use online converters:
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **TinyPNG**: https://tinypng.com/ (PNG/WebP optimizer)
- **CloudConvert**: https://cloudconvert.com/ (Multiple format support)

### Manual Process with Online Tools
1. Upload your PNG to Squoosh
2. Choose WebP format, set quality to 80
3. Download as `imagename.webp`
4. Resize to 800px width, quality 75
5. Download as `imagename_mobile.webp`
6. Repeat for PNG versions with quality 85

## Recommended Settings

### Desktop Images
- **Format**: WebP
- **Quality**: 80
- **Max Width**: 1920px
- **Expected size**: 40-60% smaller than PNG

### Mobile Images
- **Format**: WebP
- **Quality**: 75
- **Max Width**: 800px
- **Expected size**: 80-85% smaller than original

### PNG Fallbacks
- **Desktop**: Original size, quality 90
- **Mobile**: 800px width, quality 85

## Common Issues

### "convert: command not found"
ImageMagick is not installed or not in PATH. Reinstall and ensure "Add to PATH" is checked.

### "convert: unable to open image"
Check file path and ensure file exists. Use quotes around paths with spaces.

### WebP quality too low
Increase quality value: `-quality 85` instead of `-quality 80`

### File size still too large
- Lower quality: try `-quality 70`
- Reduce dimensions further: `-resize 600x>` for mobile
- Use WebP format (much smaller than PNG)
