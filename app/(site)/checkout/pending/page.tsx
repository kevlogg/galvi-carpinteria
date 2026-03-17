import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pago pendiente",
  description: "Tu pago está pendiente de confirmación.",
};

export default function CheckoutPendingPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-medium text-wood-900">
        Pago pendiente
      </h1>
      <p className="mt-4 text-wood-700">
        Recibimos tu pedido pero el pago aún no fue acreditado. Cuando se confirme,
        te contactamos para coordinar la entrega.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Button asChild>
          <Link href="/tienda">Seguir comprando</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
