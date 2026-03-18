import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types/database";
import { getPlaceholderProjectImage, PLACEHOLDER_PROJECT_IMAGE } from "@/lib/constants";

function getProjectImage(project: Project): string {
  const url = project.images?.[0]?.url;
  if (url && !url.includes("placehold.co") && url !== PLACEHOLDER_PROJECT_IMAGE) return url;
  return getPlaceholderProjectImage(project.title || "Trabajo");
}

export function ProjectMiniCard({ project }: { project: Project }) {
  const imageUrl = getProjectImage(project);

  return (
    <Link
      href={`/trabajos/${project.slug}`}
      className="group flex items-center gap-3 rounded-md border border-border bg-wood-900/20 p-2 transition hover:border-cream/30"
      aria-label={`Ver trabajo: ${project.title}`}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="56px"
          unoptimized
        />
      </div>
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {project.title}
      </p>
    </Link>
  );
}

