import Link from "next/link";
import { listOrdersForAdmin } from "@/lib/data/firestore";

export default async function AdminPedidosPage() {
  let orders: Awaited<ReturnType<typeof listOrdersForAdmin>> = [];
  let error: string | null = null;
  try {
    orders = await listOrdersForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar";
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">Pedidos</h1>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-lg border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50">
            <tr>
              <th className="p-3 font-medium text-wood-900">Cliente</th>
              <th className="p-3 font-medium text-wood-900">Monto</th>
              <th className="p-3 font-medium text-wood-900">Estado pago</th>
              <th className="p-3 font-medium text-wood-900">Fecha</th>
              <th className="p-3 font-medium text-wood-900"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-wood-100">
                <td className="p-3">
                  <div>{o.customer_name}</div>
                  <div className="text-wood-500">{o.customer_email}</div>
                </td>
                <td className="p-3">${Number(o.amount).toLocaleString("es-AR")}</td>
                <td className="p-3">{o.payment_status}</td>
                <td className="p-3">
                  {o.created_at && typeof (o.created_at as { toDate?: () => Date }).toDate === "function"
                    ? (o.created_at as { toDate: () => Date }).toDate().toLocaleDateString("es-AR")
                    : "-"}
                </td>
                <td className="p-3">
                  <Link href={`/admin/pedidos?id=${o.id}`} className="text-wood-700 hover:underline">
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && !error && <p className="p-6 text-center text-wood-500">No hay pedidos.</p>}
      </div>
    </div>
  );
}
