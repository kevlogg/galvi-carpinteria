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
        "group relative block overflow-hidden rounded-lg border border-wood-200 bg-wood-50 aspect-[4/3]",
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
        <div className="absolute inset-0 bg-gradient-to-br from-wood-200 to-wood-300" />
      )}
      <div className="absolute inset-0 bg-wood-900/40 transition group-hover:bg-wood-900/50" />
      <div className="absolute inset-0 flex items-end p-4">
        <span className="font-medium text-white drop-shadow">{name}</span>
      </div>
    </Link>
  );
}
