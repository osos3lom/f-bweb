"use client";

import React, { useState } from "react";
import { getAssetPath } from "@/lib/utils";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  fallbackSrc,
  aspectRatio,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const resolvedSrc = getAssetPath(src);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (props.onLoad) props.onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!error) {
      setError(true);
    }
    if (props.onError) props.onError(e);
  };

  const finalSrc = error && fallbackSrc ? getAssetPath(fallbackSrc) : resolvedSrc;

  return (
    <img
      ref={imgRef}
      src={finalSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      // @ts-ignore
      fetchpriority={priority ? "high" : "auto"}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={`transition-opacity duration-300 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        ...style,
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
      {...props}
    />
  );
}
