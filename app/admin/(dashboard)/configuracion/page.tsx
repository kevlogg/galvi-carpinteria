import { getSettingsForAdmin } from "@/lib/data/firestore";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminConfiguracionPage() {
  let settings: Awaited<ReturnType<typeof getSettingsForAdmin>> = null;
  let error: string | null = null;
  try {
    settings = await getSettingsForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar";
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-wood-900">Configuración</h1>
      <p className="mt-1 text-wood-600">
        Datos del negocio que se muestran en la web: nombre, WhatsApp, email, dirección, horarios y redes.
      </p>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 rounded-lg border border-wood-200 bg-white p-6">
        {!settings && (
          <p className="mb-6 text-sm text-wood-600">
            Completá los campos y guardá para crear la configuración. Se guarda en Firestore (documento &quot;main&quot; de la colección &quot;settings&quot;).
          </p>
        )}
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
