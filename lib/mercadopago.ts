/**
 * Mercado Pago - Checkout Pro.
 * Crear preferencia y obtener URL de pago.
 * Webhook para actualizar estado del pago en orders.
 */

const MP_API = "https://api.mercadopago.com";

export interface CheckoutItem {
  product_id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export interface CreatePreferenceParams {
  items: CheckoutItem[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  order_id?: string;
}

export async function createPreference(params: CreatePreferenceParams): Promise<{
  preference_id: string;
  init_point: string;
}> {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    throw new Error("MP_ACCESS_TOKEN no configurado");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: params.items.map((item) => ({
        id: item.product_id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "ARS",
      })),
      payer: {
        name: params.customer_name,
        email: params.customer_email,
        phone: { number: params.customer_phone.replace(/\D/g, "") },
      },
      back_urls: {
        success: params.back_urls.success,
        failure: params.back_urls.failure,
        pending: params.back_urls.pending,
      },
      auto_return: "approved",
      external_reference: params.order_id || undefined,
      notification_url: `${siteUrl}/api/webhooks/mercadopago`,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Mercado Pago API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return {
    preference_id: data.id,
    init_point: data.init_point,
  };
}
