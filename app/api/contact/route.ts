import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    if (resend && process.env.RESEND_FROM_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || process.env.RESEND_FROM_EMAIL,
        subject: `Contacto web: ${name}`,
        html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong></p><p>${message}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact API error:", e);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }
}
