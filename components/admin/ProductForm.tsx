"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getProxiedImageUrl } from "@/lib/image-url";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  product?: Record<string, unknown> & { images?: { url: string; sort_order?: number }[] };
  categories?: CategoryOption[];
  className?: string;
}

export function ProductForm({ product, categories = [], className }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [stockType, setStockType] = useState<string>((product?.stock_type as string) ?? "on_request");
  const [imageUrls, setImageUrls] = useState<string[]>(
    (product?.images as { url: string }[] | undefined)?.map((i) => i.url) ?? []
  );
  const isEdit = !!product;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const payload = {
      title: (form.querySelector('[name="title"]') as HTMLInputElement).value,
      slug: (form.querySelector('[name="slug"]') as HTMLInputElement).value,
      short_description: (form.querySelector('[name="short_description"]') as HTMLInputElement).value || null,
      description: (form.querySelector('[name="description"]') as HTMLTextAreaElement).value || null,
      category_id: (form.querySelector('[name="category_id"]') as HTMLSelectElement).value || null,
      price: Number((form.querySelector('[name="price"]') as HTMLInputElement).value),
      stock_type: stockType,
      stock_qty: stockType === "in_stock" ? Number((form.querySelector('[name="stock_qty"]') as HTMLInputElement)?.value) || null : null,
      featured: (form.querySelector('[name="featured"]') as HTMLInputElement).checked,
      active: (form.querySelector('[name="active"]') as HTMLInputElement).checked,
      image_urls: imageUrls,
      dimensions_text: (form.querySelector('[name="dimensions_text"]') as HTMLInputElement)?.value?.trim() || null,
    };
    const url = isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products";
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/productos");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className ?? ""}`}>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Título *</label>
        <input
          name="title"
          defaultValue={product?.title as string}
          required
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Slug *</label>
        <input
          name="slug"
          defaultValue={product?.slug as string}
          required
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Imágenes</label>
        <p className="mb-2 text-sm text-wood-500">
          Subí una o más fotos del producto. La primera se usará como portada.
        </p>
        <label className="mb-3 inline-flex cursor-pointer items-center gap-2 rounded-md border border-wood-300 bg-wood-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-wood-700 hover:shadow active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60">
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploadingImage}
            className="sr-only"
            onChange={async (e) => {
              const files = e.target.files;
              if (!files?.length) return;
              setUploadingImage(true);
              const formData = new FormData();
              for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
              }
              try {
                const res = await fetch("/api/admin/upload-product-image", { method: "POST", body: formData });
                const json = await res.json();
                if (json.urls?.length) setImageUrls((prev) => [...prev, ...json.urls]);
              } finally {
                setUploadingImage(false);
                e.target.value = "";
              }
            }}
          />
          {uploadingImage ? "Subiendo…" : "Elegir archivos"}
        </label>
        {imageUrls.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imageUrls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border-2 border-wood-200 bg-wood-100 shadow-md"
              >
                <img
                  src={getProxiedImageUrl(url)}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const fallback = el.nextElementSibling as HTMLElement;
                    if (fallback) { fallback.classList.remove("hidden"); fallback.classList.add("flex"); }
                  }}
                />
                <div className="absolute inset-0 hidden flex-col items-center justify-center bg-wood-200 text-center text-xs text-wood-600" aria-hidden>
                  Sin vista previa
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== index))}
                  className="absolute right-1 top-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-medium text-white shadow hover:bg-red-700"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Categoría</label>
        <select
          name="category_id"
          defaultValue={(product?.category_id as string) ?? ""}
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        >
          <option value="">Sin categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Precio *</label>
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={product?.price as number}
          required
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Medidas (opcional)</label>
        <input
          name="dimensions_text"
          placeholder="Ej: 120 x 45 x 60 cm"
          defaultValue={
            product?.dimensions
              ? `${(product.dimensions as { width?: number }).width ?? ""} x ${(product.dimensions as { height?: number }).height ?? ""} x ${(product.dimensions as { depth?: number }).depth ?? ""} ${(product.dimensions as { unit?: string }).unit ?? "cm"}`.replace(/\s+x\s+x\s+/g, " x ").trim()
              : ""
          }
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Descripción corta</label>
        <input
          name="short_description"
          defaultValue={product?.short_description as string}
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Descripción completa</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description as string}
          className="w-full rounded-md border border-wood-200 px-3 py-2"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">Stock</label>
          <select
            name="stock_type"
            value={stockType}
            onChange={(e) => setStockType(e.target.value)}
            className="w-full rounded-md border border-wood-200 px-3 py-2"
          >
            <option value="on_request">A pedido</option>
            <option value="in_stock">En stock</option>
          </select>
        </div>
        {stockType === "in_stock" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-wood-700">Cantidad stock</label>
            <input
              name="stock_qty"
              type="number"
              min={0}
              defaultValue={product?.stock_qty as number ?? ""}
              className="w-full rounded-md border border-wood-200 px-3 py-2"
            />
          </div>
        )}
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured as boolean ?? false}
            className="rounded border-wood-300"
          />
          <span className="text-sm text-wood-700">Destacado</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            name="active"
            type="checkbox"
            defaultChecked={product?.active as boolean ?? true}
            className="rounded border-wood-300"
          />
          <span className="text-sm text-wood-700">Activo</span>
        </label>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
      </Button>
    </form>
  );
}
