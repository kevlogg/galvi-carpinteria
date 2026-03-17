import { NextResponse } from "next/server";
import { updateOrderPayment } from "@/lib/data/firestore";

/**
 * Webhook de Mercado Pago para actualizar estado del pago.
 * URL: https://tudominio.com/api/webhooks/mercadopago — Tipo: payment.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ error: "No payment id" }, { status: 400 });
    }

    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "MP not configured" }, { status: 500 });
    }

    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "MP payment fetch failed" }, { status: 502 });
    }
    const payment = await res.json();
    const status = payment.status;
    const externalRef = payment.external_reference;

    const validStatuses = ["approved", "rejected", "cancelled", "pending"];
    const dbStatus = validStatuses.includes(status) ? status : "pending";

    if (externalRef) {
      await updateOrderPayment(String(externalRef), String(paymentId), dbStatus);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("MP webhook error:", e);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
