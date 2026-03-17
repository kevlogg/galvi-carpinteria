import Link from "next/link";
import { listProjectsForAdmin } from "@/lib/data/firestore";
import { Button } from "@/components/ui/button";

export default async function AdminTrabajosPage() {
  let projects: Awaited<ReturnType<typeof listProjectsForAdmin>> = [];
  let error: string | null = null;
  try {
    projects = await listProjectsForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar";
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium text-wood-900">Trabajos realizados</h1>
        <Button asChild>
          <Link href="/admin/trabajos/nuevo">Nuevo trabajo</Link>
        </Button>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-lg border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50">
            <tr>
              <th className="p-3 font-medium text-wood-900">Título</th>
              <th className="p-3 font-medium text-wood-900">Destacado</th>
              <th className="p-3 font-medium text-wood-900"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-wood-100">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.featured ? "Sí" : "No"}</td>
                <td className="p-3">
                  <Link href={`/admin/trabajos/${p.id}`} className="text-wood-700 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && !error && <p className="p-6 text-center text-wood-500">No hay trabajos.</p>}
      </div>
    </div>
  );
}
