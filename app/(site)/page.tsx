import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryCard } from "@/components/tienda/CategoryCard";
import { ProductCard } from "@/components/tienda/ProductCard";
import { ProjectCard } from "@/components/trabajos/ProjectCard";
import { Button } from "@/components/ui/button";
import { getCategoriesFromFirestore } from "@/lib/data/firestore";
import { getFeaturedProducts } from "@/lib/data/products";
import { getFeaturedProjects } from "@/lib/data/projects";

export default async function HomePage() {
  const [categoriesFromDb, products, projects] = await Promise.all([
    getCategoriesFromFirestore(),
    getFeaturedProducts(6),
    getFeaturedProjects(6),
  ]);
  const categories = categoriesFromDb.map((c) => ({ slug: c.slug, name: c.name }));

  // Imágenes de ejemplo por categoría (slug) para "Qué hacemos"
  const categoryExampleImages: Record<string, string> = {
    barras:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&auto=format&fit=crop",
    muebles:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
  };
  const getCategoryImage = (slug: string, name: string) =>
    categoryExampleImages[slug] ??
    `https://placehold.co/600x450/e4d9ca/5b4332?text=${encodeURIComponent(name)}`;

  return (
    <>
      <HeroSection />

      {/* Bloque de confianza */}
      <section className="border-y border-wood-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 text-center">
            {[
              "Fabricación a medida",
              "Atención personalizada",
              "Presupuestos por WhatsApp",
              "Trabajos reales",
              "Servicio en Mar del Plata",
            ].map((item) => (
              <li key={item} className="text-sm font-medium text-wood-800">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Qué hacemos"
            subtitle="Cocinas, placares, barras y más, diseñados a tu medida."
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

      {/* Productos destacados */}
      <section className="bg-wood-50 py-16">
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trabajos realizados */}
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
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="border-t border-wood-200 bg-wood-50 py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Cómo trabajamos"
            subtitle="Del pedido a la entrega, en pocos pasos."
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Nos contás lo que necesitás",
              "Definimos medidas y terminaciones",
              "Te enviamos presupuesto",
              "Fabricamos y coordinamos entrega/instalación",
            ].map((text, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wood-700 text-sm font-medium text-white">
                  {i + 1}
                </span>
                <span className="text-wood-800">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonios (placeholder) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader title="Lo que dicen nuestros clientes" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Cliente MDP", text: "Excelente atención y terminación. El placard quedó perfecto." },
              { name: "Familia G.", text: "Nos hicieron la cocina a medida. Muy conformes con el resultado." },
              { name: "Laura S.", text: "Presupuesto claro y entrega en tiempo. Los recomiendo." },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="rounded-lg border border-wood-200 bg-white p-6"
              >
                <p className="text-wood-700">&ldquo;{t.text}&rdquo;</p>
                <cite className="mt-3 block text-sm font-medium not-italic text-wood-800">
                  — {t.name}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ resumido */}
      <section className="border-t border-wood-200 py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Preguntas frecuentes"
            subtitle="Algunas dudas habituales."
          />
          <dl className="mt-10 space-y-6 max-w-2xl">
            {[
              {
                q: "¿Hacen envíos?",
                a: "Trabajamos en Mar del Plata y zona. Coordinamos entrega e instalación según el trabajo.",
              },
              {
                q: "¿Cómo pido un presupuesto?",
                a: "Podés completar el formulario de “A medida” o escribirnos por WhatsApp con tu idea y medidas.",
              },
              {
                q: "¿Cuánto demora un trabajo a medida?",
                a: "Depende del proyecto. Te damos un plazo estimado al presupuestar.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <dt className="font-medium text-wood-900">{faq.q}</dt>
                <dd className="mt-1 text-wood-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-wood-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-medium md:text-4xl">
            ¿Listo para tu mueble a medida?
          </h2>
          <p className="mt-4 text-wood-200">
            Contanos tu proyecto y te respondemos con un presupuesto sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-wood-900 hover:bg-wood-100">
              <Link href="/a-medida">Pedir presupuesto</Link>
            </Button>
            <Button
              asChild
              variant="whatsapp"
              size="lg"
            >
              <a
                href="https://wa.me/5492231234567?text=Hola,%20quiero%20consultar%20por%20un%20mueble%20a%20medida."
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
