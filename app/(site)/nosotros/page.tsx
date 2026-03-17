import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Nosotros",
  description:
    "Locos por la Pinotea - Taller de carpintería y muebles a medida en Mar del Plata.",
};

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Nosotros"
        subtitle="Un taller con foco en la calidad y en el trato humano."
      />
      <div className="mt-10 max-w-2xl space-y-8 text-wood-700">
        <p className="text-lg">
          Somos un taller de carpintería y fabricación de muebles a medida en Mar del
          Plata. Trabajamos cocinas, placares, barras, muebles de baño, escritorios,
          bibliotecas y todo lo que necesites para tu casa o negocio.
        </p>
        <p>
          Nuestro enfoque es simple: escuchar lo que necesitás, proponer una solución
          a medida y entregar un trabajo bien hecho. No vendemos solo muebles; armamos
          proyectos con medidas, materiales y terminaciones que se adaptan a tu
          espacio y a tu gusto.
        </p>
        <p>
          Atendemos en Mar del Plata y zona. Presupuestos sin compromiso, por
          formulario o por WhatsApp. Si preferís, coordinamos una visita para medir y
          definir el trabajo en persona.
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
