import { Suspense } from "react";
import { getProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/trabajos/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategoriesFromFirestore } from "@/lib/data/firestore";

export const metadata = {
  title: "Trabajos realizados",
  description: "Galería de proyectos de carpintería y muebles a medida en Mar del Plata.",
};

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function TrabajosPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const [projects, categoriesFromDb] = await Promise.all([
    getProjects(categoria ?? undefined),
    getCategoriesFromFirestore(),
  ]);
  const categories = categoriesFromDb.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Trabajos realizados"
        subtitle="Proyectos reales de nuestro taller. Cocinas, placares, barras y más."
      />
      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href="/trabajos"
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            !categoria
              ? "bg-wood-700 text-white"
              : "bg-wood-100 text-wood-800 hover:bg-wood-200"
          }`}
        >
          Todos
        </a>
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/trabajos?categoria=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              categoria === c.slug
                ? "bg-wood-700 text-white"
                : "bg-wood-100 text-wood-800 hover:bg-wood-200"
            }`}
          >
            {c.name}
          </a>
        ))}
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="mt-10 text-center text-wood-600">
          No hay trabajos en esta categoría todavía.
        </p>
      )}
    </div>
  );
}
