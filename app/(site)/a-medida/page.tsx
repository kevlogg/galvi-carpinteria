import { SectionHeader } from "@/components/ui/SectionHeader";
import { CustomRequestForm } from "@/components/forms/CustomRequestForm";
import { getFeaturedProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/trabajos/ProjectCard";

export const metadata = {
  title: "Muebles a medida",
  description:
    "Pedí tu presupuesto para muebles a medida. Cocinas, placares, barras, escritorios. Fabricación en Mar del Plata.",
};

export default async function AMedidaPage() {
  const projects = await getFeaturedProjects(4);

  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Muebles a medida según tu espacio y necesidad"
        subtitle="Contanos qué necesitás y te enviamos un presupuesto sin compromiso. Trabajamos cocinas, placares, barras, muebles de baño, escritorios y más."
      />
      <div className="mt-10 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-wood-200 bg-wood-50/50 p-6">
            <h3 className="font-medium text-wood-900">Algunos trabajos realizados</h3>
            <p className="mt-2 text-sm text-wood-600">
              Para que veas la calidad y el tipo de proyectos que hacemos.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <CustomRequestForm />
        </div>
      </div>
    </div>
  );
}
