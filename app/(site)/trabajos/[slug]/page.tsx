import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/data/projects";
import { Button } from "@/components/ui/button";
import { whatsappUrl, messageFromProject } from "@/lib/whatsapp";
import { getPlaceholderProjectImage, PLACEHOLDER_PROJECT_IMAGE } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Trabajo no encontrado" };
  return {
    title: project.title,
    description: project.description || undefined,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const placeholderUrl = getPlaceholderProjectImage(project.title || "Trabajo");
  const images = project.images?.length
    ? project.images.map((img) =>
        img.url &&
        (img.url.includes("placehold.co") || img.url === PLACEHOLDER_PROJECT_IMAGE)
          ? { ...img, url: placeholderUrl }
          : img
      )
    : [{ id: "1", project_id: project.id, url: placeholderUrl, sort_order: 0 }];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-muted">
          {project.category?.name ?? "Trabajo realizado"}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium text-foreground md:text-4xl">
          {project.title}
        </h1>
        {project.description && (
          <p className="mt-6 text-lg text-foreground/90">{project.description}</p>
        )}
        <div className="mt-10 space-y-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-wood-950"
            >
              <Image
                src={img.url}
                alt={`${project.title} - ${img.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/a-medida">Quiero algo similar - Pedir presupuesto</Link>
          </Button>
          <Button asChild variant="whatsapp" size="lg">
            <a
              href={whatsappUrl(messageFromProject(project.title))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
