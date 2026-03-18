"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryOption {
  slug: string;
  name: string;
}

interface FiltersBarProps {
  categories: CategoryOption[];
  currentCategory?: string;
  currentSort?: string;
}

export function FiltersBar({ categories, currentCategory, currentSort }: FiltersBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/tienda?${next.toString()}`);
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-foreground">Categoría:</span>
      <select
        value={currentCategory ?? ""}
        onChange={(e) => setFilter("categoria", e.target.value || null)}
        className="rounded-md border border-border bg-wood-900/50 px-3 py-2 text-sm text-foreground"
      >
        <option value="">Todas</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <span className="text-sm font-medium text-foreground">Ordenar:</span>
      <select
        value={currentSort ?? ""}
        onChange={(e) => setFilter("orden", e.target.value || null)}
        className="rounded-md border border-border bg-wood-900/50 px-3 py-2 text-sm text-foreground"
      >
        <option value="">Destacados</option>
        <option value="precio-asc">Precio menor a mayor</option>
        <option value="precio-desc">Precio mayor a menor</option>
      </select>
    </div>
  );
}
