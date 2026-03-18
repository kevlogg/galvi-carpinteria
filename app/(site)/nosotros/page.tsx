import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Nosotros",
  description:
    "Galvi Carpintería - Muebles a medida en Pilar y Buenos Aires. Melamina MDF, enchapado, laqueado. Herrajes Häfele, Blum, Eurohard.",
};

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Nosotros"
        subtitle="Un taller con foco en la calidad y en el trato humano."
      />
      <div className="mt-10 max-w-2xl space-y-8 text-muted">
        <p className="text-lg text-foreground/90">
          Somos un taller de carpintería y fabricación de muebles a medida en Pilar.
          Trabajamos por todo Buenos Aires: cocinas, placares, barras, muebles de
          baño, escritorios y todo lo que necesites para tu casa o negocio.
        </p>
        <p>
          Utilizamos melamina MDF (no aglomerado), realizamos trabajos enchapados
          y laqueados. Trabajamos solo a medida: no tenemos stock permanente;
          cada proyecto se diseña según tu espacio, material y gama de herrajes
          (baja, media o alta). Usamos marcas de primera como Häfele, Blum y Eurohard.
        </p>
        <p>
          Las cotizaciones son sin costo. Coordinamos una visita para medir,
          replantear y armar el presupuesto juntos. Atendemos por WhatsApp,
          email o formulario, con atención personalizada.
        </p>
        <p>
          Confianza, calidad y atención personalizada: eso es lo que nos define.
        </p>
      </div>
      <div className="mt-12">
        <Button asChild size="lg">
          <Link href="/contacto">Contactanos</Link>
        </Button>
      </div>
    </div>
  );
}
