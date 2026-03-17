/**
 * Categorías destacadas para home y filtros.
 * En producción pueden venir de Supabase.
 */
export const CATEGORY_SLUGS = [
  "cocinas",
  "placares",
  "barras",
  "escritorios",
  "muebles-de-bano",
  "bibliotecas-estantes",
] as const;

export const CATEGORY_NAMES: Record<string, string> = {
  cocinas: "Cocinas",
  placares: "Placares",
  barras: "Barras",
  escritorios: "Escritorios",
  "muebles-de-bano": "Muebles de baño",
  "bibliotecas-estantes": "Bibliotecas / Estantes",
};

export interface CategoryOption {
  slug: string;
  name: string;
}

export function getCategoriesForHome(): CategoryOption[] {
  return CATEGORY_SLUGS.map((slug) => ({
    slug,
    name: CATEGORY_NAMES[slug] || slug,
  }));
}
