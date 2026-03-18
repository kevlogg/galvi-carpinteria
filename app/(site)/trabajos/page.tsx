import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TRABAJOS_REALIZADOS_IMAGENES } from "@/lib/constants";

export const metadata = {
  title: "Trabajos realizados",
  description: "Galería de proyectos de carpintería y muebles a medida en Pilar y Buenos Aires.",
};

export default function TrabajosPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Trabajos realizados"
        subtitle="Proyectos reales de nuestro taller. Cocinas, placares, barras y más."
      />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TRABAJOS_REALIZADOS_IMAGENES.map((trabajo, i) => (
          <Link
            key={i}
            href="/a-medida"
            className="group block overflow-hidden rounded-lg border border-border bg-wood-900/50 transition hover:shadow-lg hover:border-cream/20"
          >
            <div className="relative aspect-[4/3] bg-wood-950">
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
              <h3 className="font-medium text-foreground transition-colors group-hover:text-cream">
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
  );
}
