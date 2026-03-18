import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pago exitoso",
  description: "Tu pago fue aprobado.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-medium text-foreground">
        ¡Pago recibido!
      </h1>
      <p className="mt-4 text-muted">
        Tu pedido fue confirmado. Te vamos a contactar para coordinar la entrega.
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
