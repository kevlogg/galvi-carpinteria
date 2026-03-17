import Link from "next/link";
import {
  listProductsForAdmin,
  listOrdersForAdmin,
  listCustomRequestsForAdmin,
  listProjectsForAdmin,
} from "@/lib/data/firestore";

export default async function AdminDashboardPage() {
  const [products, orders, requests, projects] = await Promise.all([
    listProductsForAdmin(),
    listOrdersForAdmin(5),
    listCustomRequestsForAdmin(5),
    listProjectsForAdmin(),
  ]);

  const recentOrders = orders;
  const recentRequests = requests;
  const productsCount = products.length;
  const ordersCount = (await listOrdersForAdmin(500)).length;
  const requestsCount = (await listCustomRequestsForAdmin(500)).length;
  const projectsCount = projects.length;

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">Dashboard</h1>
      <p className="mt-1 text-wood-600">Resumen del negocio.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Productos activos" value={productsCount} href="/admin/productos" />
        <Card title="Pedidos" value={ordersCount} href="/admin/pedidos" />
        <Card title="Solicitudes a medida" value={requestsCount} href="/admin/solicitudes" />
        <Card title="Trabajos publicados" value={projectsCount} href="/admin/trabajos" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-wood-200 bg-white p-6">
          <h2 className="font-medium text-wood-900">Pedidos recientes</h2>
          {recentOrders?.length ? (
            <ul className="mt-4 space-y-2">
              {recentOrders.map((o) => (
                <li key={o.id} className="flex justify-between text-sm">
                  <Link href={`/admin/pedidos?id=${o.id}`} className="text-wood-700 hover:underline">
                    {o.customer_name}
                  </Link>
                  <span className="text-wood-600">
                    ${Number(o.amount).toLocaleString("es-AR")} · {o.payment_status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-wood-500">Sin pedidos recientes.</p>
          )}
          <Link href="/admin/pedidos" className="mt-4 inline-block text-sm font-medium text-wood-700 hover:underline">
            Ver todos →
          </Link>
        </div>

        <div className="rounded-lg border border-wood-200 bg-white p-6">
          <h2 className="font-medium text-wood-900">Solicitudes a medida recientes</h2>
          {recentRequests?.length ? (
            <ul className="mt-4 space-y-2">
              {recentRequests.map((r) => (
                <li key={r.id} className="flex justify-between text-sm">
                  <Link href={`/admin/solicitudes?id=${r.id}`} className="text-wood-700 hover:underline">
                    {r.full_name} – {r.furniture_type}
                  </Link>
                  <span className="text-wood-600">{r.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-wood-500">Sin solicitudes recientes.</p>
          )}
          <Link href="/admin/solicitudes" className="mt-4 inline-block text-sm font-medium text-wood-700 hover:underline">
            Ver todas →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, href }: { title: string; value: number; href: string }) {
  return (
    <Link href={href} className="block rounded-lg border border-wood-200 bg-white p-6 transition hover:border-wood-300">
      <p className="text-sm font-medium text-wood-600">{title}</p>
      <p className="mt-2 text-2xl font-medium text-wood-900">{value}</p>
    </Link>
  );
}
