"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Logo } from "@/components/layout/Logo";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/a-medida", label: "A medida" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(n);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const cartPreviewRef = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0)
  );
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  const cartAriaLabel =
    totalItems > 0
      ? "Carrito, " + totalItems + " producto" + (totalItems !== 1 ? "s" : "")
      : "Carrito";

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCartMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setCartPreviewOpen(true);
  };

  const handleCartMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setCartPreviewOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo showText={true} />

        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/90 hover:text-cream transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/a-medida">Presupuesto</Link>
          </Button>
          <div
            className="relative"
            ref={cartPreviewRef}
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
          >
            <Button asChild size="sm" aria-label={cartAriaLabel}>
              <Link href="/carrito" className="relative flex items-center justify-center">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span
                    className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cream px-1 text-[10px] font-semibold text-background"
                    aria-hidden
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>
            {cartPreviewOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-background py-3 shadow-lg"
                role="dialog"
                aria-label="Vista previa del carrito"
              >
                <div className="border-b border-border px-4 pb-3">
                  <h3 className="font-medium text-foreground">Carrito</h3>
                </div>
                <div className="max-h-64 overflow-y-auto px-4 py-2">
                  {items.length === 0 ? (
                    <p className="py-4 text-center text-sm text-muted">
                      Tu carrito está vacío
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {items.map((item) => (
                        <li key={item.product.id} className="flex gap-3 text-sm">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-wood-800">
                            {item.product.images?.[0]?.url ? (
                              <Image
                                src={item.product.images[0].url}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="48px"
                                unoptimized
                              />
                            ) : (
                              <div className="h-full w-full bg-wood-700" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-foreground">
                              {item.product.title}
                            </p>
                            <p className="text-muted">
                              {item.quantity} × {formatPrice(item.product.price)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {items.length > 0 && (
                  <>
                    <div className="border-t border-border px-4 py-2">
                      <p className="flex justify-between text-sm font-medium text-foreground">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </p>
                    </div>
                    <div className="px-4 pb-3 pt-1">
                      <Button asChild size="sm" className="w-full">
                        <Link href="/carrito">Ver carrito</Link>
                      </Button>
                    </div>
                  </>
                )}
                {items.length === 0 && (
                  <div className="px-4 pt-1">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/tienda">Ir a la tienda</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-foreground hover:text-cream"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/a-medida" onClick={() => setOpen(false)}>
                  Presupuesto
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full" aria-label={cartAriaLabel}>
                <Link href="/carrito" onClick={() => setOpen(false)} className="relative flex items-center justify-center gap-2">
                  <span className="relative inline-flex">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-cream px-1 text-[10px] font-semibold text-background">
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </span>
                  Carrito
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
