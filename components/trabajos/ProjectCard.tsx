import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { getPlaceholderProjectImage, PLACEHOLDER_PROJECT_IMAGE } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

function getProjectImage(project: Project): string {
  const url = project.images?.[0]?.url;
  // Si la imagen viene como placeholder (placehold.co) o como placeholder genérico,
  // reemplazamos por una imagen acorde al título.
  if (url && !url.includes("placehold.co") && url !== PLACEHOLDER_PROJECT_IMAGE) return url;
  return getPlaceholderProjectImage(project.title || "Trabajo");
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const imageUrl = getProjectImage(project);

  return (
    <Link
      href={`/trabajos/${project.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-border bg-wood-900/50 transition hover:shadow-lg hover:border-cream/20",
        className
      )}
    >
      <div className="relative aspect-[4/3] bg-wood-950">
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
        <h3 className="font-medium text-foreground group-hover:text-cream transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {project.description}
          </p>
        )}
        <p className="mt-2 text-sm font-medium text-cream">
          Quiero algo similar →
        </p>
      </div>
    </Link>
  );
}
