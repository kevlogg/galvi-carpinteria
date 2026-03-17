/**
 * Para imágenes de Firebase Storage (u otros orígenes con CORS restrictivo),
 * usamos el proxy /api/image para que el navegador cargue desde el mismo origen.
 */
export function getProxiedImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  const isFirebase =
    url.includes("firebasestorage.googleapis.com") ||
    url.includes("firebasestorage.app") ||
    url.includes("storage.googleapis.com");
  if (isFirebase) {
    return `/api/image?url=${encodeURIComponent(url)}`;
  }
  return url;
}
