"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";

const schema = z.object({
  customer_name: z.string().min(2, "Nombre requerido"),
  customer_email: z.string().email("Email válido"),
  customer_phone: z.string().min(8, "Teléfono válido"),
});

type FormData = z.infer<typeof schema>;

export function CheckoutForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!items.length) return;
    setStatus("loading");
    try {
      const body = {
        items: items.map((i) => ({
          product_id: i.product.id,
          title: i.product.title,
          quantity: i.quantity,
          unit_price: i.product.price,
        })),
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
      };
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error");
      if (json.init_point) {
        clear();
        window.location.href = json.init_point;
        return;
      }
      throw new Error("No init_point");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Nombre y apellido *
        </label>
        <input
          {...register("customer_name")}
          className="w-full rounded-md border border-border bg-wood-900/50 px-3 py-2 text-foreground"
        />
        {errors.customer_name && (
          <p className="mt-1 text-sm text-red-400">{errors.customer_name.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
        <input
          {...register("customer_email")}
          type="email"
          className="w-full rounded-md border border-border bg-wood-900/50 px-3 py-2 text-foreground"
        />
        {errors.customer_email && (
          <p className="mt-1 text-sm text-red-400">{errors.customer_email.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Teléfono (WhatsApp) *
        </label>
        <input
          {...register("customer_phone")}
          type="tel"
          className="w-full rounded-md border border-border bg-wood-900/50 px-3 py-2 text-foreground"
        />
        {errors.customer_phone && (
          <p className="mt-1 text-sm text-red-400">{errors.customer_phone.message}</p>
        )}
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">
          No se pudo iniciar el pago. Revisá los datos o intentá de nuevo.
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Redirigiendo a Mercado Pago..." : "Ir a pagar"}
      </Button>
    </form>
  );
}
