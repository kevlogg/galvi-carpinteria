/**
 * Tipos para el dominio (productos, pedidos, proyectos, etc.).
 * Firestore usa estas formas en las colecciones.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  created_at?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  category_id: string | null;
  price: number;
  materials: string[] | null;
  finishes: string[] | null;
  dimensions: { width?: number; height?: number; depth?: number; unit?: string } | null;
  stock_type: "in_stock" | "on_request";
  stock_qty: number | null;
  featured: boolean;
  active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: OrderItem[];
  amount: number;
  payment_status: "pending" | "approved" | "rejected" | "cancelled";
  payment_id: string | null;
  mp_preference_id: string | null;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_title: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface CustomRequest {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  furniture_type: string;
  environment: string;
  width: string;
  height: string;
  depth: string;
  material: string;
  finish: string;
  estimated_budget: string;
  desired_date: string;
  description: string;
  wants_visit: boolean;
  status: "nueva" | "contactado" | "presupuestado" | "ganado" | "perdido";
  created_at: string;
  images?: CustomRequestImage[];
}

export interface CustomRequestImage {
  id: string;
  custom_request_id: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category_id: string | null;
  description: string | null;
  featured: boolean;
  created_at: string;
  category?: Category | null;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  project_id: string;
  url: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  content: string;
  rating: number;
  active: boolean;
  created_at?: string;
}

export interface Settings {
  id: string;
  business_name: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  opening_hours: string;
  instagram_url: string | null;
  facebook_url: string | null;
  map_embed_url: string | null;
}
