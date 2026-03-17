import Link from "next/link";
import { listCustomRequestsForAdmin } from "@/lib/data/firestore";

export default async function AdminSolicitudesPage() {
  let requests: Awaited<ReturnType<typeof listCustomRequestsForAdmin>> = [];
  let error: string | null = null;
  try {
    requests = await listCustomRequestsForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar";
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">Solicitudes a medida</h1>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-lg border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50">
            <tr>
              <th className="p-3 font-medium text-wood-900">Nombre</th>
              <th className="p-3 font-medium text-wood-900">Tipo mueble</th>
              <th className="p-3 font-medium text-wood-900">Estado</th>
              <th className="p-3 font-medium text-wood-900">Fecha</th>
              <th className="p-3 font-medium text-wood-900"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-wood-100">
                <td className="p-3">
                  <div>{r.full_name}</div>
                  <div className="text-wood-500">{r.phone}</div>
                </td>
                <td className="p-3">{r.furniture_type}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">
                  {r.created_at && typeof (r.created_at as { toDate?: () => Date }).toDate === "function"
                    ? (r.created_at as { toDate: () => Date }).toDate().toLocaleDateString("es-AR")
                    : "-"}
                </td>
                <td className="p-3">
                  <Link href={`/admin/solicitudes?id=${r.id}`} className="text-wood-700 hover:underline">
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && !error && <p className="p-6 text-center text-wood-500">No hay solicitudes.</p>}
      </div>
    </div>
  );
}
