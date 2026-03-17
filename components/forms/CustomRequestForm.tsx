"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { messageCustomRequestSummary } from "@/lib/whatsapp";
import { whatsappUrl } from "@/lib/whatsapp";

const schema = z.object({
  full_name: z.string().min(2, "Nombre y apellido requeridos"),
  phone: z.string().min(8, "Teléfono válido"),
  email: z.string().email("Email válido"),
  city: z.string().min(2, "Ciudad o localidad"),
  furniture_type: z.string().min(1, "Indicá el tipo de mueble"),
  environment: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  depth: z.string().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  estimated_budget: z.string().optional(),
  desired_date: z.string().optional(),
  description: z.string().min(10, "Contanos en detalle qué necesitás"),
  wants_visit: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export function CustomRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { wants_visit: false },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/custom-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image_urls: uploadedUrls }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al enviar");
      setRequestId(json.id ?? null);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const formValues = watch();
  const wpMessage = messageCustomRequestSummary({
    furnitureType: formValues.furniture_type || "-",
    dimensions: [formValues.width, formValues.height, formValues.depth]
      .filter(Boolean)
      .join(" x ") || "-",
    material: formValues.material || "-",
    finish: formValues.finish || "-",
    description: formValues.description || "-",
  });

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h3 className="font-medium text-green-900">Solicitud enviada</h3>
        <p className="mt-2 text-green-800">
          Recibimos tu pedido. Te vamos a contactar a la brevedad por WhatsApp o email.
        </p>
        <Button asChild variant="whatsapp" size="lg" className="mt-6">
          <a href={whatsappUrl(wpMessage)} target="_blank" rel="noopener noreferrer">
            Continuar por WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Nombre y apellido *
          </label>
          <input
            {...register("full_name")}
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">Teléfono *</label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">Email *</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Ciudad / localidad *
          </label>
          <input
            {...register("city")}
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">
          Tipo de mueble *
        </label>
        <input
          {...register("furniture_type")}
          placeholder="Ej: Placard, cocina, barra, escritorio"
          className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
        />
        {errors.furniture_type && (
          <p className="mt-1 text-sm text-red-600">{errors.furniture_type.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Ambiente</label>
        <input
          {...register("environment")}
          placeholder="Ej: Dormitorio, living, oficina"
          className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">Ancho (cm)</label>
          <input
            {...register("width")}
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">Alto (cm)</label>
          <input
            {...register("height")}
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Profundidad (cm)
          </label>
          <input
            {...register("depth")}
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Material deseado
          </label>
          <input
            {...register("material")}
            placeholder="Ej: Melamina, MDF, madera"
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Color o terminación
          </label>
          <input
            {...register("finish")}
            placeholder="Ej: Blanco mate, natural"
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Presupuesto estimado
          </label>
          <input
            {...register("estimated_budget")}
            placeholder="Ej: Hasta $500.000"
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-wood-700">
            Fecha aproximada deseada
          </label>
          <input
            {...register("desired_date")}
            placeholder="Ej: En 2 meses"
            className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">
          Descripción detallada *
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Contanos qué necesitás, cómo es el espacio, preferencias..."
          className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">
          Imágenes de referencia (opcional)
        </label>
        <p className="mb-2 text-sm text-wood-500">
          Subí fotos de referencia. Tras enviar el formulario podrás adjuntar más por
          WhatsApp si hace falta.
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm text-wood-600 file:mr-4 file:rounded file:border-0 file:bg-wood-100 file:px-4 file:py-2 file:text-wood-800"
          onChange={async (e) => {
            const files = e.target.files;
            if (!files?.length) return;
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append("files", files[i]);
            }
            try {
              const res = await fetch("/api/upload-reference", {
                method: "POST",
                body: formData,
              });
              const json = await res.json();
              if (json.urls) setUploadedUrls((prev) => [...prev, ...json.urls]);
            } catch {
              // silent
            }
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="wants_visit"
          {...register("wants_visit")}
          className="h-4 w-4 rounded border-wood-300"
        />
        <label htmlFor="wants_visit" className="text-sm text-wood-700">
          Necesito visita / medición a domicilio
        </label>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">
          No pudimos enviar la solicitud. Probá de nuevo o escribinos por WhatsApp.
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </Button>
    </form>
  );
}
