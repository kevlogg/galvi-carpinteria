import type { Product } from "@/lib/types/database";
import {
  getProductsFromFirestore,
  getProductBySlugFromFirestore,
} from "./firestore";

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    return await getProductsFromFirestore({
      featuredOnly: true,
      limit,
      sort: "featured",
    });
  } catch {
    return [];
  }
}

export async function getProducts(filters?: {
  categorySlug?: string;
  sort?: "price_asc" | "price_desc" | "featured";
}): Promise<Product[]> {
  try {
    return await getProductsFromFirestore({
      categorySlug: filters?.categorySlug,
      sort: filters?.sort ?? "featured",
    });
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await getProductBySlugFromFirestore(slug);
  } catch {
    return null;
  }
}
