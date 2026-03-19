import type { Product } from "@/lib/types/database";

/* Placeholders acordes al branding oscuro Galvi (fondo dark, texto crema) */
export const PLACEHOLDER_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1560440021-33f9b867899d?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const PLACEHOLDER_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1716034352723-59aa280e630f?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function getPlaceholderProjectImage(title: string): string {
  const t = (title || "").toLowerCase();

  // Elegir una imagen acorde al tipo de trabajo (para que se vea “real” y
  // consistente con el texto de la card).
  if (t.includes("cocina")) {
    return "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&auto=format&fit=crop";
  }

  if (t.includes("placar") || t.includes("placard")) {
    return "https://images.unsplash.com/photo-1722153152286-d7c1ba92010f?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  if (t.includes("escritorio")) {
    return "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop";
  }

  if (t.includes("biblioteca") || t.includes("estante") || t.includes("estantes")) {
    return "https://images.unsplash.com/photo-1716034352723-59aa280e630f?w=600&auto=format&fit=crop";
  }

  if (t.includes("barra") || t.includes("isla")) {
    return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop";
  }

  if (t.includes("mesa")) {
    return "https://images.unsplash.com/photo-1560440021-33f9b867899d?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  // Fallback: estantería/biblioteca (foto “neutral”).
  return PLACEHOLDER_PROJECT_IMAGE;
}

/** Imágenes fijas de la sección "Trabajos realizados". Colocar 1.jpeg, 2.jpeg y 3.jpeg en public/imagenes/trabajos-realizados/ */
export const TRABAJOS_REALIZADOS_IMAGENES: { title: string; src: string }[] = [
  { title: "Trabajo 1", src: "/imagenes/trabajos-realizados/1.jpeg" },
  { title: "Trabajo 2", src: "/imagenes/trabajos-realizados/2.jpeg" },
  { title: "Trabajo 3", src: "/imagenes/trabajos-realizados/3.jpeg" },
];

/**
 * Productos de ejemplo para la tienda cuando Firebase no está configurado (ej. deploy en Vercel sin env).
 * Colocar imágenes en public/imagenes/tienda-ejemplo/: 1.jpg, 2.jpg, 3.jpg, 4.jpg
 */
function productoEjemplo(
  id: string,
  slug: string,
  title: string,
  price: number,
  imagePath: string,
  shortDescription: string
): Product {
  const now = new Date().toISOString();
  return {
    id,
    slug,
    title,
    short_description: shortDescription,
    description: shortDescription,
    category_id: null,
    price,
    materials: null,
    finishes: null,
    dimensions: null,
    stock_type: "on_request",
    stock_qty: null,
    featured: true,
    active: true,
    seo_title: null,
    seo_description: null,
    created_at: now,
    updated_at: now,
    images: [{ id: `${id}-img`, product_id: id, url: imagePath, sort_order: 0 }],
  };
}

export const PRODUCTOS_EJEMPLO: Product[] = [
  productoEjemplo(
    "ej-mesa",
    "mesa-ratona",
    "Mesa ratona",
    180000,
    "/imagenes/tienda-ejemplo/1.jpg",
    "Mesa ratona de melamina. Diseño moderno, terminación mate."
  ),
  productoEjemplo(
    "ej-silla",
    "silla-comedor",
    "Silla de comedor",
    45000,
    "/imagenes/tienda-ejemplo/2.jpg",
    "Silla con estructura sólida. Disponible en varios acabados."
  ),
  productoEjemplo(
    "ej-escritorio",
    "escritorio-home-office",
    "Escritorio home office",
    165000,
    "/imagenes/tienda-ejemplo/3.jpg",
    "Escritorio amplio con cajonera. Ideal para teletrabajo."
  ),
  productoEjemplo(
    "ej-estanteria",
    "estanteria-modular",
    "Estantería modular",
    95000,
    "/imagenes/tienda-ejemplo/4.jpg",
    "Estantería de 5 cuerpos. Montaje sencillo."
  ),
];
