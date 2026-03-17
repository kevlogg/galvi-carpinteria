import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const imageUrl =
    project.images && project.images.length > 0
      ? project.images[0].url
      : `https://placehold.co/600x450/e4d9ca/5b4332?text=${encodeURIComponent(project.title || "Trabajo")}`;

  return (
    <Link
      href={`/trabajos/${project.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-wood-200 bg-white transition hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] bg-wood-100">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-wood-900 group-hover:underline">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1 line-clamp-2 text-sm text-wood-600">
            {project.description}
          </p>
        )}
        <p className="mt-2 text-sm font-medium text-wood-700">
          Quiero algo similar →
        </p>
      </div>
    </Link>
  );
}
