"use client";

import { useState } from "react";

interface MascotImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackEmoji: string;
  className?: string;
}

export default function MascotImage({
  src,
  alt,
  fallbackEmoji,
  className = "",
  ...props
}: MascotImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="leading-none text-2xl">{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}
