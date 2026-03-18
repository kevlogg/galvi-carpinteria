"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/tienda/AddToCartButton";
import type { Product } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { PLACEHOLDER_PRODUCT_IMAGE } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(n);
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : PLACEHOLDER_PRODUCT_IMAGE;
  const productLink = `/tienda/${product.slug}`;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-wood-900/50 transition hover:shadow-lg hover:border-cream/20",
        className
      )}
    >
      <Link href={productLink} className="relative block aspect-[4/3] bg-wood-950">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={imageUrl.startsWith("http") ? false : undefined}
        />
        {product.stock_type === "on_request" && (
          <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-0.5 text-xs text-cream">
            A pedido
          </span>
        )}
        {product.stock_type === "in_stock" && (
          <span className="absolute left-2 top-2 rounded bg-green-700/90 px-2 py-0.5 text-xs text-white">
            En stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium text-foreground line-clamp-2">
          <Link href={productLink} className="hover:text-cream transition-colors">
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 text-lg font-medium text-cream">
          {formatPrice(product.price)}
        </p>
        <div className="mt-4 flex flex-1 flex-col gap-2">
          <Button asChild size="sm" className="w-full">
            <Link href={productLink}>Ver detalle</Link>
          </Button>
          <AddToCartButton product={product} size="sm" className="w-full" />
        </div>
      </div>
    </article>
  );
}
