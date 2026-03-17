"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type SettingsData = {
  business_name?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  opening_hours?: string | null;
  instagram?: string | null;
  facebook?: string | null;
};

const FIELDS: { key: keyof SettingsData; label: string; placeholder?: string }[] = [
  { key: "business_name", label: "Nombre del negocio", placeholder: "Ej: Locos por la Pinotea" },
  { key: "whatsapp", label: "WhatsApp (número con código de país)", placeholder: "Ej: 5491112345678" },
  { key: "email", label: "Email" },
  { key: "address", label: "Dirección", placeholder: "Calle y número" },
  { key: "city", label: "Ciudad / Localidad" },
  { key: "opening_hours", label: "Horarios", placeholder: "Ej: Lun–Vie 9–18, Sáb 9–13" },
  { key: "instagram", label: "Instagram (usuario o URL)" },
  { key: "facebook", label: "Facebook (URL)" },
];

export function SettingsForm({ initial }: { initial: Record<string, unknown> | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const data = initial as SettingsData | null;
  const [form, setForm] = useState<SettingsData>(() =>
    data
      ? { ...data }
      : {
          business_name: null,
          whatsapp: null,
          email: null,
          address: null,
          city: null,
          opening_hours: null,
          instagram: null,
          facebook: null,
        }
  );

  useEffect(() => {
    const d = initial as SettingsData | null;
    if (d) setForm((prev) => ({ ...prev, ...d }));
  }, [initial]);

  function update(key: keyof SettingsData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {FIELDS.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="mb-1 block text-sm font-medium text-wood-700">{label}</label>
          <input
            type="text"
            value={form[key] ?? ""}
            onChange={(e) => update(key, e.target.value)}
            placeholder={placeholder}
            className="w-full max-w-md rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
      ))}
      <Button type="submit" disabled={loading}>
        {loading ? "Guardando…" : initial ? "Guardar cambios" : "Crear configuración"}
      </Button>
    </form>
  );
}
