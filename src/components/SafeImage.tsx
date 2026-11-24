import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  /** Rendered instead of the image if it fails to load. Defaults to nothing. */
  fallback?: ReactNode;
}

/** An <img> that swaps to a CSS fallback instead of a broken-image icon. */
export function SafeImage({ src, fallback = null, alt = '', loading = 'lazy', ...rest }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(src)}
      {...rest}
    />
  );
}
