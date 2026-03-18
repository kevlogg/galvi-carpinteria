"use client";

import { getProxiedImageUrl } from "@/lib/image-url";

interface ProxiedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | null | undefined;
}

/**
 * Imagen que usa el proxy para URLs de Firebase Storage, evitando CORS.
 * Usar en admin (vista previa) y en tienda (productos).
 */
export function ProxiedImage({ src, ...props }: ProxiedImageProps) {
  const resolvedSrc = getProxiedImageUrl(src);
  if (!resolvedSrc) return null;
  return <img src={resolvedSrc} {...props} />;
}
