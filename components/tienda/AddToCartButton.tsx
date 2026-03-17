"use client";

import { useState } from "react";
import { ShoppingCart, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product } from "@/lib/types/database";

const LOADING_MS = 400;
const SUCCESS_MS = 2000;

interface AddToCartButtonProps {
  product: Pick<Product, "id" | "title" | "slug" | "price"> & { images?: Product["images"] };
  quantity?: number;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  size = "default",
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleClick() {
    if (status !== "idle") return;
    setStatus("loading");
    addItem(product, quantity);
    await new Promise((r) => setTimeout(r, LOADING_MS));
    setStatus("success");
    setTimeout(() => setStatus("idle"), SUCCESS_MS);
  }

  return (
    <Button
      type="button"
      size={size}
      className={className}
      onClick={handleClick}
      disabled={status === "loading"}
      aria-busy={status === "loading"}
      aria-live="polite"
      aria-label={
        status === "loading"
          ? "Agregando al carrito..."
          : status === "success"
            ? "Agregado al carrito"
            : "Agregar al carrito"
      }
    >
      {status === "loading" && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      )}
      {status === "success" && (
        <Check className="h-4 w-4 text-green-500" aria-hidden />
      )}
      {status === "idle" && <ShoppingCart className="h-4 w-4" aria-hidden />}
      <span>
        {status === "loading"
          ? "Agregando..."
          : status === "success"
            ? "Agregado"
            : "Agregar al carrito"}
      </span>
    </Button>
  );
}
