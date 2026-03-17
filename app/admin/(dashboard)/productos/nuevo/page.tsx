import { listCategoriesForAdmin } from "@/lib/data/firestore";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminProductoNuevoPage() {
  let categories: Awaited<ReturnType<typeof listCategoriesForAdmin>> = [];
  try {
    categories = await listCategoriesForAdmin();
  } catch {
    // ignore
  }
  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">
        Nuevo producto
      </h1>
      <ProductForm categories={categories} className="mt-6 max-w-2xl" />
    </div>
  );
}
