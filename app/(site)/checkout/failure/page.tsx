import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pago no realizado",
  description: "El pago no pudo completarse.",
};

export default function CheckoutFailurePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-medium text-wood-900">
        El pago no pudo completarse
      </h1>
      <p className="mt-4 text-wood-700">
        No te preocupes, tu carrito sigue disponible. Podés intentar de nuevo o
        escribirnos por WhatsApp para coordinar otra forma de pago.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Button asChild>
          <Link href="/carrito">Volver al carrito</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tienda">Seguir comprando</Link>
        </Button>
      </div>
    </div>
  );
}
