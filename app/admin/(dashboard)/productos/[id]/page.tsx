import { notFound } from "next/navigation";
import { getProductByIdForAdmin, listCategoriesForAdmin } from "@/lib/data/firestore";
import { ProductForm } from "@/components/admin/ProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProductoEditPage({ params }: PageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductByIdForAdmin(id),
    listCategoriesForAdmin(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">Editar producto</h1>
      <ProductForm product={product} categories={categories} className="mt-6 max-w-2xl" />
    </div>
  );
}
