import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryCard } from "@/components/tienda/CategoryCard";
import { ProductCard } from "@/components/tienda/ProductCard";
import { Button } from "@/components/ui/button";
import { getCategoriesFromFirestore } from "@/lib/data/firestore";
import { getProducts } from "@/lib/data/products";
import { PLACEHOLDER_PRODUCT_IMAGE, TRABAJOS_REALIZADOS_IMAGENES } from "@/lib/constants";

export default async function HomePage() {
  const [categoriesFromDb, products] = await Promise.all([
    getCategoriesFromFirestore(),
    // Mostrar todos los productos que están en tienda (sin filtrar por "featured").
    getProducts({ sort: "featured" }),
  ]);
  const categories = categoriesFromDb.map((c) => ({ slug: c.slug, name: c.name }));

  // Imágenes por categoría para el bloque "Qué hacemos".
  // Importante: el fallback NO debe incluir texto para que no "muestre la palabra"
  // cuando no haya mapeo para un `slug`.
  const categoryExampleImages: Record<string, string> = {
    barras:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop",
    cocinas:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&auto=format&fit=crop",
    muebles:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
    "muebles-de-bano":
      "https://images.unsplash.com/photo-1600566753086-050adfa0f44f?w=600&auto=format&fit=crop",
    escritorios:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop",
    estantes:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&auto=format&fit=crop",
    "bibliotecas-estantes":
      "https://images.unsplash.com/photo-1716034352723-59aa280e630f?w=600&auto=format&fit=crop",

    // Categorías que te faltaban (según tu captura)
    mesas:
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mesa:
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sillas:
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    silla:
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    placares:
      "https://images.unsplash.com/photo-1722153152286-d7c1ba92010f?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // Variantes por si el slug viniera singular
    placar:
      "https://images.unsplash.com/photo-1722153152286-d7c1ba92010f?fm=jpg&q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  const normalizeEs = (s: string) =>
    s
      .toLowerCase()
      .trim()
      // Normaliza tildes: "placares" == "placáres"
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const getCategoryImage = (slug: string, name: string) => {
    const bySlug = categoryExampleImages[slug];
    if (bySlug) return bySlug;

    const n = normalizeEs(name);
    if (n.includes("mesa"))
      return (
        categoryExampleImages["mesas"] ??
        categoryExampleImages["mesa"] ??
        PLACEHOLDER_PRODUCT_IMAGE
      );
    if (n.includes("silla"))
      return (
        categoryExampleImages["sillas"] ??
        categoryExampleImages["silla"] ??
        PLACEHOLDER_PRODUCT_IMAGE
      );
    if (n.includes("placar"))
      return (
        categoryExampleImages["placares"] ??
        categoryExampleImages["placar"] ??
        PLACEHOLDER_PRODUCT_IMAGE
      );
    if (n.includes("estante") || n.includes("biblioteca"))
      return categoryExampleImages["bibliotecas-estantes"] ?? PLACEHOLDER_PRODUCT_IMAGE;
    if (n.includes("escritorio"))
      return categoryExampleImages["escritorios"] ?? PLACEHOLDER_PRODUCT_IMAGE;
    if (n.includes("barra"))
      return categoryExampleImages["barras"] ?? PLACEHOLDER_PRODUCT_IMAGE;
    if (n.includes("cocina"))
      return categoryExampleImages["cocinas"] ?? PLACEHOLDER_PRODUCT_IMAGE;
    if (n.includes("bano"))
      return (
        categoryExampleImages["muebles-de-bano"] ?? PLACEHOLDER_PRODUCT_IMAGE
      );

    return PLACEHOLDER_PRODUCT_IMAGE;
  };

  return (
    <>
      <HeroSection trabajosPreviews={TRABAJOS_REALIZADOS_IMAGENES} />

      <section className="border-y border-border bg-wood-950/50 py-12">
        <div className="container mx-auto px-4">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 text-center text-sm font-medium text-muted">
            {[
              "Fabricación a medida",
              "Atención personalizada",
              "Cotizaciones sin costo",
              "Herrajes Häfele, Blum, Eurohard",
              "Pilar y todo Buenos Aires",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Qué hacemos"
            subtitle="Cocinas, placares, barras y más. Melamina MDF, enchapado y laqueado."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                name={cat.name}
                slug={cat.slug}
                imageUrl={getCategoryImage(cat.slug, cat.name)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-wood-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              title="Muebles en venta"
              subtitle="Algunos de nuestros productos con precio cerrado."
            />
            <Button asChild variant="outline" size="sm">
              <Link href="/tienda">Ver todos</Link>
            </Button>
          </div>
          <div className="mt-10 flex w-full items-stretch gap-0">
            <div
              className="min-w-0 flex-1 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex w-max gap-4 snap-x snap-mandatory">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="snap-start min-w-[260px] w-[260px] sm:min-w-[280px] sm:w-[280px]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex shrink-0 items-center justify-center px-3 text-cream/80"
              aria-hidden
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              title="Trabajos realizados"
              subtitle="Proyectos reales de nuestro taller."
            />
            <Button asChild variant="outline" size="sm">
              <Link href="/trabajos">Ver galería</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRABAJOS_REALIZADOS_IMAGENES.map((trabajo, i) => (
              <Link
                key={i}
                href="/trabajos"
                className="group block overflow-hidden rounded-lg border border-border bg-wood-900/20 transition hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-wood-900/40">
                  <Image
                    src={trabajo.src}
                    alt={trabajo.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground group-hover:underline">
                    {trabajo.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-cream">
                    Quiero algo similar →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-wood-950/50 py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Cómo trabajamos"
            subtitle="Del pedido a la entrega, en pocos pasos."
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Nos contás lo que necesitás",
              "Definimos medidas, material y herrajes",
              "Te enviamos presupuesto sin costo",
              "Fabricamos y coordinamos visita/entrega",
            ].map((text, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-sm font-medium text-background">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader title="Preguntas frecuentes" subtitle="Algunas dudas habituales." />
          <dl className="mt-10 max-w-2xl space-y-6">
            {[
              {
                q: "¿Dónde están ubicados?",
                a: "Estamos en Pilar y trabajamos por todo Buenos Aires.",
              },
              {
                q: "¿Qué materiales utilizan?",
                a: "Utilizamos melamina MDF (no aglomerado), trabajos enchapados y laqueados.",
              },
              {
                q: "¿Las cotizaciones tienen costo?",
                a: "No. Son sin costo. Coordinamos visita para medir y armar el presupuesto juntos.",
              },
              {
                q: "¿Cómo pido un presupuesto?",
                a: "Por WhatsApp, email o el formulario de “A medida”. Atención personalizada por cualquier medio.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <dt className="font-medium text-foreground">{faq.q}</dt>
                <dd className="mt-1 text-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-16 text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-medium md:text-4xl">
            ¿Listo para tu mueble a medida?
          </h2>
          <p className="mt-4 text-background/80">
            Contanos tu proyecto y te respondemos con un presupuesto sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-cream hover:bg-wood-900 hover:text-cream"
            >
              <Link href="/a-medida">Pedir presupuesto</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a
                href="https://wa.me/5491130245478?text=Hola,%20quiero%20consultar%20por%20un%20mueble%20a%20medida."
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribinos por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
