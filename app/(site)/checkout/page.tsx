import { redirect } from "next/navigation";

/**
 * El pago se inicia desde /carrito completando datos y "Ir a pagar".
 * Si alguien entra directo a /checkout, lo mandamos al carrito.
 */
export default function CheckoutPage() {
  redirect("/carrito");
}
