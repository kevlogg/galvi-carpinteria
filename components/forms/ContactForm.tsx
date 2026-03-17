"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email válido"),
  message: z.string().min(10, "Escribí tu mensaje"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <p className="font-medium text-green-900">Mensaje enviado</p>
        <p className="mt-1 text-green-800">
          Te vamos a responder a la brevedad por email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-wood-700">Nombre *</label>
        <input
          {...register("name")}
          className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
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
        <label className="mb-1 block text-sm font-medium text-wood-700">Mensaje *</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full rounded-md border border-wood-200 px-3 py-2 text-wood-800"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Error al enviar. Probá de nuevo.</p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
