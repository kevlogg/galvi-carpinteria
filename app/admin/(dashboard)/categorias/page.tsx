import { listCategoriesForAdmin } from "@/lib/data/firestore";
import { AddCategoryForm } from "@/components/admin/AddCategoryForm";
import { DeleteCategoryButton } from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriasPage() {
  let categories: Awaited<ReturnType<typeof listCategoriesForAdmin>> = [];
  let error: string | null = null;
  try {
    categories = await listCategoriesForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar";
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">Categorías</h1>
      <p className="mt-1 text-wood-600">Agregá categorías para organizar productos (ej: Cocinas, Placares).</p>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <AddCategoryForm />
      <div className="mt-6 overflow-x-auto rounded-lg border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50">
            <tr>
              <th className="p-3 font-medium text-wood-900">Nombre</th>
              <th className="p-3 font-medium text-wood-900">Slug</th>
              <th className="p-3 font-medium text-wood-900">Activa</th>
              <th className="p-3 font-medium text-wood-900"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-wood-100">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">{c.active ? "Sí" : "No"}</td>
                <td className="p-3">
                  <DeleteCategoryButton id={c.id} name={c.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && !error && <p className="p-6 text-center text-wood-500">No hay categorías.</p>}
      </div>
    </div>
  );
}
