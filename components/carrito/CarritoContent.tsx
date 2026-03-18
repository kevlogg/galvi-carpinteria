"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckoutForm } from "./CheckoutForm";

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(n);
}

export function CarritoContent() {
  const { items, removeItem, updateQuantity, subtotal, clear } = useCartStore();

  if (items.length === 0) {
    return (
      <EmptyState
        title="Tu carrito está vacío"
        description="Agregá productos desde la tienda para continuar."
      >
        <Button asChild>
          <Link href="/tienda">Ir a la tienda</Link>
        </Button>
      </EmptyState>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-4 rounded-lg border border-border bg-wood-900/50 p-4"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-wood-950">
              <Image
                src={item.product.images?.[0]?.url ?? "https://placehold.co/96x96/2d2620/d2c9b1?text=+"}
                alt={item.product.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/tienda/${item.product.slug}`}
                className="font-medium text-foreground hover:text-cream"
              >
                {item.product.title}
              </Link>
              <p className="mt-1 text-muted">
                {formatPrice(item.product.price)} x {item.quantity}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="h-8 w-8 rounded border border-border text-foreground hover:bg-wood-800"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm text-foreground">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="h-8 w-8 rounded border border-border text-foreground hover:bg-wood-800"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="ml-4 text-sm text-red-400 hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
            <div className="text-right font-medium text-cream">
              {formatPrice(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="sticky top-24 rounded-lg border border-border bg-wood-900/50 p-6">
          <h3 className="font-medium text-foreground">Resumen</h3>
          <p className="mt-4 flex justify-between text-foreground/90">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal())}</span>
          </p>
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-foreground">Datos para el pago</p>
            <CheckoutForm />
          </div>
          <Button
            type="button"
            variant="link"
            className="mt-3 w-full"
            onClick={() => clear()}
          >
            Vaciar carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
