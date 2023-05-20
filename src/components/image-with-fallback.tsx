"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

// https://github.com/vercel/examples/tree/main/solutions/image-fallback
export interface ImageWithFallbackProps extends ImageProps {
  fallback: ImageProps["src"];
}

export const ImageWithFallback = ({
  fallback,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      {...props}
    />
  );
};
