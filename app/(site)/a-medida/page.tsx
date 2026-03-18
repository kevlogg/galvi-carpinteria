import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CustomRequestForm } from "@/components/forms/CustomRequestForm";
import { TRABAJOS_REALIZADOS_IMAGENES } from "@/lib/constants";

export const metadata = {
  title: "Muebles a medida",
  description:
    "Pedí tu presupuesto sin costo. Galvi Carpintería - Pilar y Buenos Aires. Visita a domicilio para medir y armar el presupuesto juntos.",
};

export default function AMedidaPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Muebles a medida según tu espacio y necesidad"
        subtitle="Contanos qué necesitás y te enviamos un presupuesto sin costo. Coordinamos visita para medir y armar el presupuesto juntos. Trabajamos cocinas, placares, barras, muebles de baño, escritorios y más."
      />
      <div className="mt-10 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-wood-900/50 p-6">
            <h3 className="font-medium text-foreground">Algunos trabajos realizados</h3>
            <p className="mt-2 text-sm text-muted">
              Para que veas la calidad y el tipo de proyectos que hacemos.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {TRABAJOS_REALIZADOS_IMAGENES.map((trabajo, i) => (
                <Link
                  key={i}
                  href="/trabajos"
                  className="group block overflow-hidden rounded-lg border border-border bg-wood-900/20 transition hover:shadow-lg hover:border-cream/20"
                >
                  <div className="relative aspect-[4/3] bg-wood-950">
                    <Image
                      src={trabajo.src}
                      alt={trabajo.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 280px"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-foreground transition-colors group-hover:text-cream">
                      {trabajo.title}
                    </h4>
                    <p className="mt-1 text-sm text-cream">Quiero algo similar →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <CustomRequestForm />
        </div>
      </div>
    </div>
  );
}
