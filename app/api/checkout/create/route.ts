import { NextResponse } from "next/server";
import { createPreference } from "@/lib/mercadopago";
import { createOrder, updateOrderPreferenceId } from "@/lib/data/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer_name, customer_email, customer_phone } = body;

    if (
      !items?.length ||
      !customer_name ||
      !customer_email ||
      !customer_phone
    ) {
      return NextResponse.json(
        { error: "Faltan items o datos del cliente" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const amount = items.reduce(
      (acc: number, i: { unit_price: number; quantity: number }) =>
        acc + i.unit_price * i.quantity,
      0
    );

    const orderItems = items.map((i: { product_id: string; title: string; quantity: number; unit_price: number }) => ({
      product_id: i.product_id,
      product_title: i.title,
      quantity: i.quantity,
      unit_price: i.unit_price,
      total: i.unit_price * i.quantity,
    }));
    const orderId = await createOrder({
      customer_name,
      customer_email,
      customer_phone,
      items: orderItems,
      amount,
      payment_status: "pending",
    });

    const { preference_id, init_point } = await createPreference({
      items: items.map((i: { product_id: string; title: string; quantity: number; unit_price: number }) => ({
        product_id: i.product_id,
        title: i.title,
        quantity: i.quantity,
        unit_price: i.unit_price,
      })),
      customer_name,
      customer_email,
      customer_phone,
      back_urls: {
        success: `${siteUrl}/checkout/success`,
        failure: `${siteUrl}/checkout/failure`,
        pending: `${siteUrl}/checkout/pending`,
      },
      order_id: orderId,
    });

    await updateOrderPreferenceId(orderId, preference_id);

    return NextResponse.json({ init_point, order_id: orderId });
  } catch (e) {
    console.error("checkout create error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al crear el pago" },
      { status: 500 }
    );
  }
}
