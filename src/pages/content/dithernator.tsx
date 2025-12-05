import { CollapsibleSection } from "../../utils/pageContext";

const whatIsDithernator = (
  <>
    <h2 className="rightSideSection__h2">What is Dithernator?</h2>
    <p className="rightSideSection__p">
      A cross-platform C++ image processing tool that applies dithering effects to images. 
      Dithering creates the illusion of color depth and smooth gradients by distributing 
      contrasting pixels in specific patterns. Simply pass an image file as a command-line 
      argument, and Dithernator applies the Floyd-Steinberg dithering algorithm, saving 
      the result with a "Dithered_" prefix. Supports JPG, JPEG, PNG, and BMP formats.
    </p>
  </>
);

const CommandLineInterface = (
  <>
    <CollapsibleSection title="Command-Line Interface">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Simple CLI that accepts a single image filename as argument. Validates the file 
        extension and passes it to the dithering engine. Provides clear error messages if 
        the file format is invalid or arguments are missing.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Checks command-line argument count (must be exactly 2: program name + image filename). 
        Validates filename extension against supported formats (.jpg, .jpeg, .png, .bmp). 
        If valid, calls generateDither(). If invalid, outputs usage message and exits with error code.
      </p>
    </CollapsibleSection>
  </>
);

const FileValidation = (
  <>
    <CollapsibleSection title="File Extension Validation">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Ensures only supported image formats are processed. Checks filename against 
        whitelist of valid extensions: .jpg, .jpeg, .png, .bmp. Prevents errors from 
        attempting to load incompatible file types.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Creates static vector of valid extension strings. Iterates through each extension, 
        extracting the last N characters from filename and comparing. Uses string substring 
        to match file endings. Returns true only if exact match found.
      </p>
    </CollapsibleSection>
  </>
);

const ImageLoading = (
  <>
    <CollapsibleSection title="Image Loading">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Loads image file from disk into memory using stb_image library. Extracts image dimensions 
        (width, height) and channel information. Converts image to grayscale (1 channel) for 
        consistent dithering processing.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Calls stbi_load() with filename and forced channel count of 1 (grayscale). Returns 
        pixel data as unsigned char array. If load fails, outputs error message. Stores width, 
        height, and channels in reference variables for use by dithering algorithm.
      </p>
    </CollapsibleSection>
  </>
);

const FloydSteinbergDithering = (
  <>
    <CollapsibleSection title="Floyd-Steinberg Dithering Algorithm">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Applies the Floyd-Steinberg dithering algorithm (Bill Atkinson variant) to reduce 
        color depth while maintaining perceived visual quality. Converts each pixel to either 
        pure black (0) or pure white (255), distributing quantization error to neighboring 
        pixels to create the dithering effect.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Iterates through every pixel top-to-bottom, left-to-right. For each pixel: stores 
        original value, converts to pure black/white by thresholding at 128, calculates 
        quantization error (difference between old and new value). Distributes error to 
        neighboring pixels using Bill Atkinson weights (each neighbor receives 1/12 of error). 
        Affected pixels: right (1), far right (1), bottom-left (1), bottom (1), bottom-right (1), 
        bottom-far (1). This creates characteristic dither pattern without sacrificing overall 
        image structure.
      </p>
    </CollapsibleSection>
  </>
);

const OutputGeneration = (
  <>
    <CollapsibleSection title="Output File Generation">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Saves the dithered image to disk with consistent naming. Preserves the original 
        directory structure and filename, adding "Dithered_" prefix to the filename. 
        Maintains original file format (JPG, PNG, etc.).
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Uses std::filesystem::path to parse input filename into directory and file components. 
        Constructs output path by combining original directory + "Dithered_" + original filename. 
        Handles edge case where no directory is specified (current directory). Calls stbi_write_jpg() 
        to save result with 100% quality. Frees allocated image memory. Outputs success message 
        showing output filepath.
      </p>
    </CollapsibleSection>
  </>
);

const STBImageLibrary = (
  <>
    <CollapsibleSection title="STB Image Library Integration">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Integrates stb_image single-header library for cross-platform image loading and saving. 
        Handles multiple image formats transparently. Provides minimal dependency footprint 
        compared to heavier image libraries.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p_end">
        Single-header library included via extern "C" block. Implementation enabled via preprocessor 
        defines (STB_IMAGE_IMPLEMENTATION, STB_IMAGE_WRITE_IMPLEMENTATION). Uses STBI_NO_THREAD_LOCALS 
        flag for MinGW compatibility on Windows. Provides stbi_load() for reading and stbi_write_jpg() 
        for writing. Automatic format detection based on file extension.
      </p>
    </CollapsibleSection>
  </>
);

const featureBreakdown = (
  <>
    <h1 className="rightSideSection__h1">Features</h1>
    {CommandLineInterface}
    {FileValidation}
    {ImageLoading}
    {FloydSteinbergDithering}
    {OutputGeneration}
    {STBImageLibrary}
  </>
);

export const dithernatorContent = (
  <>
    <h1 className="rightSide__h">Dithernator</h1>
    {whatIsDithernator}
    {featureBreakdown}
  </>
);
