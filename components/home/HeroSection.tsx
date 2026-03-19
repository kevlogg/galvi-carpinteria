import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type TrabajoPreview = { title: string; src: string };

export function HeroSection({ trabajosPreviews }: { trabajosPreviews: TrabajoPreview[] }) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Muebles a medida. Haciendo de tu casa un hogar moderno.
            </h1>
            <p className="mt-6 text-lg text-muted md:text-xl">
              Trabajos personalizados en melamina, enchapado y laqueado… Cotizaciones sin costo.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="min-w-[180px]">
                <Link href="/a-medida">Pedir presupuesto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-w-[180px]"
              >
                <Link href="/tienda">Ver muebles en venta</Link>
              </Button>
            </div>
          </div>

          {trabajosPreviews.length > 0 && (
            <div className="flex w-full min-w-0 flex-col sm:flex-row sm:items-stretch sm:gap-0">
              <aside className="min-w-0 flex-1 rounded-lg border border-border bg-wood-900/20 p-4 sm:min-w-[280px]">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-lg font-medium text-foreground">
                    Trabajos realizados
                  </h2>
                  <Link
                    href="/trabajos"
                    className="text-sm font-medium text-cream hover:underline"
                  >
                    Ver galería
                  </Link>
                </div>

                <div
                  className="mt-4 flex gap-3 overflow-x-auto pb-2 pr-1 snap-x snap-mandatory scrollbar-hide [-webkit-overflow-scrolling:touch]"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {trabajosPreviews.map((t, i) => (
                    <Link
                      key={i}
                      href="/trabajos"
                      className="group block min-w-[180px] w-[180px] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-wood-900/20 sm:min-w-[220px] sm:w-[220px] md:min-w-[240px] md:w-[240px]"
                      aria-label={`Ver trabajo: ${t.title}`}
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={t.src}
                          alt={t.title}
                          fill
                          className="object-cover transition group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 240px"
                          unoptimized
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
              <div
                className="hidden shrink-0 items-center justify-center px-2 text-cream/80 sm:flex"
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
          )}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
