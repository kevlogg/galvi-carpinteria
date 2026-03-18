import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl?: string | null;
  className?: string;
}

export function CategoryCard({ name, slug, imageUrl, className }: CategoryCardProps) {
  return (
    <Link
      href={`/tienda?categoria=${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg border border-border bg-wood-900 aspect-[4/3]",
        className
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-wood-800 to-wood-900" />
      )}
      <div className="absolute inset-0 bg-black/50 transition group-hover:bg-black/60" />
      <div className="absolute inset-0 flex items-end p-4">
        <span className="font-medium text-white drop-shadow">{name}</span>
      </div>
    </Link>
  );
}
