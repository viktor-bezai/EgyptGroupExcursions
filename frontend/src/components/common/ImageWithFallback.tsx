import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";
const ERROR_IMAGE = "/images/media-not-found.png";

type ImageWithFallbackProps = Omit<ImageProps, "onError"> & {
  placeholderSrc?: string;
  errorSrc?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  placeholderSrc = PLACEHOLDER_IMAGE,
  errorSrc = ERROR_IMAGE,
  alt,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // If src is empty/falsy, use placeholder
  const isEmpty = !src || src === "";
  const displaySrc = isEmpty ? placeholderSrc : hasError ? errorSrc : src;

  return (
    <Image
      {...props}
      src={displaySrc}
      alt={alt}
      onError={() => {
        if (!hasError && !isEmpty) {
          setHasError(true);
        }
      }}
    />
  );
};

export default ImageWithFallback;
