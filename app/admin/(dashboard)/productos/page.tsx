import Link from "next/link";
import { listProductsForAdmin } from "@/lib/data/firestore";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProductosPage() {
  let products: Awaited<ReturnType<typeof listProductsForAdmin>> = [];
  let error: string | null = null;
  try {
    products = await listProductsForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar";
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium text-wood-900">Productos</h1>
        <Button asChild>
          <Link href="/admin/productos/nuevo">Nuevo producto</Link>
        </Button>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-lg border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50">
            <tr>
              <th className="p-3 font-medium text-wood-900">Título</th>
              <th className="p-3 font-medium text-wood-900">Precio</th>
              <th className="p-3 font-medium text-wood-900">Estado</th>
              <th className="p-3 font-medium text-wood-900">Destacado</th>
              <th className="p-3 font-medium text-wood-900"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-wood-100">
                <td className="p-3">{p.title}</td>
                <td className="p-3">${Number(p.price).toLocaleString("es-AR")}</td>
                <td className="p-3">{p.active ? "Activo" : "Inactivo"}</td>
                <td className="p-3">{p.featured ? "Sí" : "No"}</td>
                <td className="p-3 flex items-center gap-3">
                  <Link href={`/admin/productos/${p.id}`} className="text-wood-700 hover:underline">
                    Editar
                  </Link>
                  <DeleteProductButton id={p.id} title={p.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && !error && <p className="p-6 text-center text-wood-500">No hay productos.</p>}
      </div>
    </div>
  );
}
