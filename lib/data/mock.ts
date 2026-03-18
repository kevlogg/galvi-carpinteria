import type { Product } from "@/lib/types/database";
import type { Project } from "@/lib/types/database";
import { PLACEHOLDER_PRODUCT_IMAGE, PLACEHOLDER_PROJECT_IMAGE } from "@/lib/constants";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "mesa-ratona-maciza",
    title: "Mesa ratona de pinotea maciza",
    short_description: "Mesa de living en pinotea con terminación natural.",
    description: "Mesa ratona fabricada en pinotea maciza, patas robustas y tapa de 50mm. Terminación al aceite. Ideal para living.",
    category_id: null,
    price: 185000,
    materials: ["Pinotea"],
    finishes: ["Al aceite natural"],
    dimensions: { width: 120, height: 45, depth: 60, unit: "cm" },
    stock_type: "on_request",
    stock_qty: null,
    featured: true,
    active: true,
    seo_title: null,
    seo_description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: "1", product_id: "1", url: PLACEHOLDER_PRODUCT_IMAGE, sort_order: 0 }],
  },
  {
    id: "2",
    slug: "estanteria-modular",
    title: "Estantería modular 5 cuerpos",
    short_description: "Estantería de melamina blanca, diseño modular.",
    description: "Estantería de 5 cuerpos en melamina blanca 18mm. Modulable. Incluye soportes y tornillos.",
    category_id: null,
    price: 95000,
    materials: ["Melamina"],
    finishes: ["Blanco mate"],
    dimensions: { width: 200, height: 180, depth: 35, unit: "cm" },
    stock_type: "on_request",
    stock_qty: null,
    featured: true,
    active: true,
    seo_title: null,
    seo_description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: "2", product_id: "2", url: PLACEHOLDER_PRODUCT_IMAGE, sort_order: 0 }],
  },
  {
    id: "3",
    slug: "escritorio-home-office",
    title: "Escritorio home office",
    short_description: "Escritorio amplio con cajonera.",
    description: "Escritorio en MDF y melamina. Tablero 140x70cm, cajonera de 3 cajones. Terminación blanco.",
    category_id: null,
    price: 165000,
    materials: ["MDF", "Melamina"],
    finishes: ["Blanco"],
    dimensions: { width: 140, height: 75, depth: 70, unit: "cm" },
    stock_type: "on_request",
    stock_qty: null,
    featured: true,
    active: true,
    seo_title: null,
    seo_description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: "3", product_id: "3", url: PLACEHOLDER_PRODUCT_IMAGE, sort_order: 0 }],
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "cocina-integral-mdp",
    title: "Cocina integral a medida",
    category_id: null,
    description: "Cocina completa en melamina, isla con barra y alacenas altas. Mar del Plata.",
    featured: true,
    created_at: new Date().toISOString(),
    images: [{ id: "1", project_id: "1", url: PLACEHOLDER_PROJECT_IMAGE, sort_order: 0 }],
  },
  {
    id: "2",
    slug: "placard-dormitorio",
    title: "Placard a medida con cajoneras",
    category_id: null,
    description: "Placard de 3 cuerpos con puertas corredizas y módulo de cajoneras.",
    featured: true,
    created_at: new Date().toISOString(),
    images: [{ id: "2", project_id: "2", url: PLACEHOLDER_PROJECT_IMAGE, sort_order: 0 }],
  },
];

/** Si no hay cuenta de servicio de Firebase, usamos datos mock en el servidor. */
export function useMockData(): boolean {
  return !process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
}
