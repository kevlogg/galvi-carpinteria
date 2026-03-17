/**
 * Helpers para leer/escribir Firestore. Usa Firebase Admin en servidor.
 * Colecciones: products, productImages (subcollection), categories, orders,
 * custom_requests, custom_request_images (subcollection o campo array),
 * projects, project_images (subcollection), testimonials, settings.
 */
import {
  getAdminFirestore,
} from "@/lib/firebase/admin";
import type { Product, ProductImage, Category, Project, ProjectImage, Order, CustomRequest } from "@/lib/types/database";
import type { DocumentData } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

const toProduct = (id: string, d: DocumentData, images?: ProductImage[]): Product => {
  const data = d as Record<string, unknown>;
  return {
    id,
    slug: (data.slug as string) ?? "",
    title: (data.title as string) ?? "",
    short_description: (data.short_description as string) ?? null,
    description: (data.description as string) ?? null,
    category_id: (data.category_id as string) ?? null,
    price: Number(data.price ?? 0),
    materials: (data.materials as string[]) ?? null,
    finishes: (data.finishes as string[]) ?? null,
    dimensions: (data.dimensions as Product["dimensions"]) ?? null,
    stock_type: (data.stock_type as "in_stock" | "on_request") ?? "on_request",
    stock_qty: data.stock_qty != null ? Number(data.stock_qty) : null,
    featured: !!data.featured,
    active: data.active !== false,
    seo_title: (data.seo_title as string) ?? null,
    seo_description: (data.seo_description as string) ?? null,
    created_at: (data.created_at as { toDate?: () => Date })?.toDate?.()?.toISOString() ?? new Date().toISOString(),
    updated_at: (data.updated_at as { toDate?: () => Date })?.toDate?.()?.toISOString() ?? new Date().toISOString(),
    images: images ?? [],
  };
};

const toProject = (id: string, d: DocumentData, images?: ProjectImage[]): Project => {
  const data = d as Record<string, unknown>;
  return {
    id,
    slug: (data.slug as string) ?? "",
    title: (data.title as string) ?? "",
    category_id: (data.category_id as string) ?? null,
    description: (data.description as string) ?? null,
    featured: !!data.featured,
    created_at: (data.created_at as { toDate?: () => Date })?.toDate?.()?.toISOString() ?? new Date().toISOString(),
    images: images ?? [],
  };
};

export async function getProductsFromFirestore(filters?: {
  categorySlug?: string;
  sort?: "price_asc" | "price_desc" | "featured";
  limit?: number;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  const db = getAdminFirestore();
  let q = db.collection("products").where("active", "==", true);

  if (filters?.featuredOnly) {
    q = q.where("featured", "==", true);
  }
  if (filters?.categorySlug) {
    const catSnap = await db.collection("categories").where("slug", "==", filters.categorySlug).limit(1).get();
    const catId = catSnap.docs[0]?.id;
    if (catId) q = q.where("category_id", "==", catId);
  }

  const snap = await q.get();
  let docs = snap.docs;

  const orderField = filters?.sort === "price_asc" || filters?.sort === "price_desc" ? "price" : "created_at";
  const orderDir = filters?.sort === "price_desc" ? "desc" : "asc";
  const toSortVal = (v: unknown): number => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const t = v as { toMillis?: () => number; toDate?: () => Date };
    if (typeof t.toMillis === "function") return t.toMillis();
    if (typeof t.toDate === "function") return t.toDate().getTime();
    return 0;
  };
  docs = docs.sort((a, b) => {
    const aVal = toSortVal(a.data()[orderField]);
    const bVal = toSortVal(b.data()[orderField]);
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return orderDir === "desc" ? -cmp : cmp;
  });

  if (filters?.limit) docs = docs.slice(0, filters.limit);

  const products: Product[] = [];
  for (const doc of docs) {
    const imgs = await getProductImages(doc.id);
    products.push(toProduct(doc.id, doc.data(), imgs));
  }
  return products;
}

export async function getProductBySlugFromFirestore(slug: string): Promise<Product | null> {
  const db = getAdminFirestore();
  const snap = await db.collection("products").where("slug", "==", slug).where("active", "==", true).limit(1).get();
  const doc = snap.docs[0];
  if (!doc) return null;
  const images = await getProductImages(doc.id);
  return toProduct(doc.id, doc.data(), images);
}

async function getProductImages(productId: string): Promise<ProductImage[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("products").doc(productId).collection("images").orderBy("sort_order").get();
  return snap.docs.map((d) => ({
    id: d.id,
    product_id: productId,
    url: d.data().url as string,
    sort_order: (d.data().sort_order as number) ?? 0,
  }));
}

export async function getProjectsFromFirestore(filters?: {
  categorySlug?: string;
  limit?: number;
  featuredOnly?: boolean;
}): Promise<Project[]> {
  const db = getAdminFirestore();
  let q = db.collection("projects");
  if (filters?.featuredOnly) {
    q = q.where("featured", "==", true);
  }
  if (filters?.categorySlug) {
    const catSnap = await db.collection("categories").where("slug", "==", filters.categorySlug).limit(1).get();
    const catId = catSnap.docs[0]?.id;
    if (catId) q = q.where("category_id", "==", catId);
  }
  q = q.orderBy("created_at", "desc");
  if (filters?.limit) q = q.limit(filters.limit);

  const snap = await q.get();
  const projects: Project[] = [];
  for (const doc of snap.docs) {
    const imgs = await getProjectImages(doc.id);
    projects.push(toProject(doc.id, doc.data(), imgs));
  }
  return projects;
}

async function getProjectImages(projectId: string): Promise<ProjectImage[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("projects").doc(projectId).collection("images").orderBy("sort_order").get();
  return snap.docs.map((d) => ({
    id: d.id,
    project_id: projectId,
    url: d.data().url as string,
    sort_order: (d.data().sort_order as number) ?? 0,
  }));
}

export async function getProjectBySlugFromFirestore(slug: string): Promise<Project | null> {
  const db = getAdminFirestore();
  const snap = await db.collection("projects").where("slug", "==", slug).limit(1).get();
  const doc = snap.docs[0];
  if (!doc) return null;
  const images = await getProjectImages(doc.id);
  return toProject(doc.id, doc.data(), images);
}

export async function getCategoriesFromFirestore(): Promise<Category[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("categories").where("active", "==", true).get();
  return snap.docs.map((d) => ({
    id: d.id,
    name: d.data().name as string,
    slug: d.data().slug as string,
    active: d.data().active !== false,
  }));
}

/** Crea una orden (checkout). */
export async function createOrder(data: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: Order["items"];
  amount: number;
  payment_status?: string;
  mp_preference_id?: string | null;
}): Promise<string> {
  const db = getAdminFirestore();
  const ref = await db.collection("orders").add({
    ...data,
    payment_status: data.payment_status ?? "pending",
    payment_id: null,
    created_at: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

/** Actualiza estado de pago de una orden. */
export async function updateOrderPayment(
  orderId: string,
  paymentId: string,
  paymentStatus: string
): Promise<void> {
  const db = getAdminFirestore();
  await db.collection("orders").doc(orderId).update({
    payment_id: paymentId,
    payment_status: paymentStatus,
  });
}

/** Actualiza mp_preference_id de una orden. */
export async function updateOrderPreferenceId(orderId: string, mpPreferenceId: string): Promise<void> {
  const db = getAdminFirestore();
  await db.collection("orders").doc(orderId).update({ mp_preference_id: mpPreferenceId });
}

/** Crea solicitud a medida. */
export async function createCustomRequest(data: Omit<CustomRequest, "id" | "created_at" | "status">): Promise<string> {
  const db = getAdminFirestore();
  const ref = await db.collection("custom_requests").add({
    ...data,
    status: "nueva",
    created_at: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

/** Agrega URLs de imágenes a una solicitud (subcollection). */
export async function addCustomRequestImages(requestId: string, urls: string[]): Promise<void> {
  const db = getAdminFirestore();
  const batch = db.batch();
  for (const url of urls) {
    const ref = db.collection("custom_requests").doc(requestId).collection("images").doc();
    batch.set(ref, { url });
  }
  await batch.commit();
}

/** Obtiene un producto por ID para admin (edición). */
export async function getProductByIdForAdmin(id: string): Promise<Record<string, unknown> | null> {
  const db = getAdminFirestore();
  const doc = await db.collection("products").doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data() as Record<string, unknown>;
  return { id: doc.id, ...data };
}

/** Lista productos para admin (sin subcollections). */
export async function listProductsForAdmin(): Promise<{ id: string; title: string; slug: string; price: number; active: boolean; featured: boolean; created_at: unknown }[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("products").orderBy("created_at", "desc").get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title as string,
      slug: data.slug as string,
      price: Number(data.price ?? 0),
      active: data.active !== false,
      featured: !!data.featured,
      created_at: data.created_at,
    };
  });
}

/** Lista pedidos para admin. */
export async function listOrdersForAdmin(limit = 50): Promise<{ id: string; customer_name: string; customer_email: string; customer_phone: string; amount: number; payment_status: string; created_at: unknown }[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("orders").orderBy("created_at", "desc").limit(limit).get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      customer_name: data.customer_name as string,
      customer_email: data.customer_email as string,
      customer_phone: data.customer_phone as string,
      amount: Number(data.amount ?? 0),
      payment_status: (data.payment_status as string) ?? "pending",
      created_at: data.created_at,
    };
  });
}

/** Lista solicitudes a medida para admin. */
export async function listCustomRequestsForAdmin(limit = 50): Promise<{ id: string; full_name: string; phone: string; furniture_type: string; status: string; created_at: unknown }[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("custom_requests").orderBy("created_at", "desc").limit(limit).get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      full_name: data.full_name as string,
      phone: data.phone as string,
      furniture_type: data.furniture_type as string,
      status: (data.status as string) ?? "nueva",
      created_at: data.created_at,
    };
  });
}

/** Lista proyectos para admin. */
export async function listProjectsForAdmin(): Promise<{ id: string; title: string; slug: string; featured: boolean; created_at: unknown }[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("projects").orderBy("created_at", "desc").get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title as string,
      slug: data.slug as string,
      featured: !!data.featured,
      created_at: data.created_at,
    };
  });
}

/** Lista categorías para admin. */
export async function listCategoriesForAdmin(): Promise<{ id: string; name: string; slug: string; active: boolean }[]> {
  const db = getAdminFirestore();
  const snap = await db.collection("categories").get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name as string,
      slug: data.slug as string,
      active: data.active !== false,
    };
  });
}

/** Obtiene documento de settings (id: main). */
export async function getSettingsForAdmin(): Promise<Record<string, unknown> | null> {
  const db = getAdminFirestore();
  const doc = await db.collection("settings").doc("main").get();
  return doc.exists ? (doc.data() as Record<string, unknown>) : null;
}

