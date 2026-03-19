import type { Product } from "@/lib/types/database";
import {
  getProductsFromFirestore,
  getProductBySlugFromFirestore,
} from "./firestore";
import { PRODUCTOS_EJEMPLO } from "@/lib/constants";

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    const list = await getProductsFromFirestore({
      featuredOnly: true,
      limit,
      sort: "featured",
    });
    if (list.length > 0) return list;
  } catch {
    // Firebase no configurado o error: usar productos de ejemplo
  }
  return PRODUCTOS_EJEMPLO.slice(0, limit);
}

export async function getProducts(filters?: {
  categorySlug?: string;
  sort?: "price_asc" | "price_desc" | "featured";
}): Promise<Product[]> {
  try {
    const list = await getProductsFromFirestore({
      categorySlug: filters?.categorySlug,
      sort: filters?.sort ?? "featured",
    });
    if (list.length > 0) return list;
  } catch {
    // Firebase no configurado: usar productos de ejemplo
  }
  let list = [...PRODUCTOS_EJEMPLO];
  if (filters?.sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (filters?.sort === "price_desc") list.sort((a, b) => b.price - a.price);
  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await getProductBySlugFromFirestore(slug);
    if (product) return product;
  } catch {
    // Firebase no configurado
  }
  return PRODUCTOS_EJEMPLO.find((p) => p.slug === slug) ?? null;
}
