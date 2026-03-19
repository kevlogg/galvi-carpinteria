import { Suspense } from "react";
import { getProducts } from "@/lib/data/products";
import { getCategoriesFromFirestore } from "@/lib/data/firestore";
import { ProductCard } from "@/components/tienda/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { FiltersBar } from "@/components/tienda/FiltersBar";

/** Evita prerender en build: esta página usa Firebase (categorías/productos). */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tienda",
  description: "Muebles con precio cerrado. Mesa, estanterías, escritorios y más.",
};

interface PageProps {
  searchParams: Promise<{ categoria?: string; orden?: string }>;
}

export default async function TiendaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categorySlug = params.categoria;
  const sort =
    params.orden === "precio-asc"
      ? "price_asc"
      : params.orden === "precio-desc"
        ? "price_desc"
        : "featured";

  const [products, categories] = await Promise.all([
    getProducts({ categorySlug, sort }),
    getCategoriesFromFirestore(),
  ]);
  const categoryOptions = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Tienda"
        subtitle="Productos con precio cerrado. Si no encontrás lo que buscás, pedinos presupuesto a medida."
      />
      <FiltersBar categories={categoryOptions} currentCategory={categorySlug} currentSort={params.orden} />
      <Suspense
        fallback={
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="mt-10 text-center text-muted">
            No hay productos en esta categoría. Prueba otro filtro o consultanos por WhatsApp.
          </p>
        )}
      </Suspense>
    </div>
  );
}
