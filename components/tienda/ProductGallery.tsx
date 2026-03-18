"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ProductGalleryProps {
  images: { url: string }[];
  title: string;
  className?: string;
}

export function ProductGallery({ images, title, className }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const list = images.length > 0 ? images : [{ url: "https://placehold.co/600x450/2d2620/d2c9b1?text=Producto" }];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-wood-950">
        <Image
          src={list[selected].url}
          alt={`${title} - imagen ${selected + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized={list[selected].url.startsWith("http") ? false : undefined}
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition",
                selected === i
                  ? "border-cream"
                  : "border-transparent hover:border-wood-600"
              )}
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
                unoptimized={img.url.startsWith("http") ? false : undefined}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
