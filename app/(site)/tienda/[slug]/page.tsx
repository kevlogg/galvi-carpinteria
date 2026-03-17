import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { getProducts } from "@/lib/data/products";
import { ProductGallery } from "@/components/tienda/ProductGallery";
import { AddToCartButton } from "@/components/tienda/AddToCartButton";
import { Button } from "@/components/ui/button";
import { whatsappUrl, messageProduct } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(n);
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.seo_title || product.title,
    description: product.seo_description || product.short_description || product.title,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category_id === product.category_id || !product.category_id))
    .slice(0, 3);

  const images = product.images?.length
    ? product.images.map((i) => ({ url: i.url }))
    : [{ url: "https://placehold.co/600x450/f5f2ed/5b4332?text=Producto" }];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={images} title={product.title} />
        <div>
          <p className="text-sm text-wood-500">
            {product.category?.name ?? "Producto"}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-wood-900 md:text-4xl">
            {product.title}
          </h1>
          <p className="mt-4 text-2xl font-medium text-wood-800">
            {formatPrice(product.price)}
          </p>
          {product.short_description && (
            <p className="mt-4 text-wood-700">{product.short_description}</p>
          )}
          {product.description && (
            <div className="mt-6 prose prose-wood max-w-none text-wood-700">
              {product.description}
            </div>
          )}
          {product.dimensions && (
            <p className="mt-4 text-sm text-wood-600">
              Medidas: {product.dimensions.width} x {product.dimensions.height} x{" "}
              {product.dimensions.depth} {product.dimensions.unit || "cm"}
            </p>
          )}
          {product.materials?.length ? (
            <p className="mt-2 text-sm text-wood-600">
              Materiales: {product.materials.join(", ")}
            </p>
          ) : null}
          {product.finishes?.length ? (
            <p className="mt-1 text-sm text-wood-600">
              Terminaciones: {product.finishes.join(", ")}
            </p>
          ) : null}
          <div className="mt-3 space-y-1 text-sm text-wood-600">
            <p>
              Estado:{" "}
              <span className="font-medium">
                {product.stock_type === "on_request" ? "A pedido" : "En stock"}
              </span>
            </p>
            {product.stock_type === "on_request" ? (
              <p>
                Este producto se fabrica especialmente para vos. El tiempo
                estimado de producción y entrega es de{" "}
                <span className="font-medium">3 a 5 semanas</span>, dependiendo
                de la complejidad y la carga de trabajo del taller.
              </p>
            ) : (
              <p>
                Tenemos unidades disponibles para entrega rápida. El despacho
                suele realizarse dentro de las{" "}
                <span className="font-medium">48 a 72 horas hábiles</span> desde
                la confirmación del pago.
              </p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <AddToCartButton product={product} size="lg" />
            <Button asChild variant="whatsapp" size="lg">
              <a
                href={whatsappUrl(messageProduct(product.title, `/tienda/${product.slug}`))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-wood-200 pt-16">
          <h2 className="font-serif text-2xl font-medium text-wood-900">
            Productos relacionados
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/tienda/${p.slug}`}
                className="group block overflow-hidden rounded-lg border border-wood-200 bg-white"
              >
                <div className="relative aspect-[4/3] bg-wood-100">
                  <Image
                    src={p.images?.[0]?.url ?? "https://placehold.co/600x450/f5f2ed/5b4332?text=Producto"}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-wood-900 group-hover:underline">
                    {p.title}
                  </h3>
                  <p className="text-wood-700">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
