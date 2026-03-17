import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-wood-100">
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-wood-900 md:text-5xl lg:text-6xl">
            Muebles a medida en Mar del Plata
          </h1>
          <p className="mt-6 text-lg text-wood-700 md:text-xl">
            Fabricamos cocinas, placares, barras, muebles de baño, escritorios y
            más. Diseño según tu espacio y necesidad, con atención personalizada
            y presupuestos sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="min-w-[180px]">
              <Link href="/a-medida">Pedir presupuesto</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[180px]">
              <Link href="/tienda">Ver muebles en venta</Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235b4332' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
