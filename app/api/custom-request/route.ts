import { NextResponse } from "next/server";
import { createCustomRequest, addCustomRequestImages } from "@/lib/data/firestore";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      phone,
      email,
      city,
      furniture_type,
      environment,
      width,
      height,
      depth,
      material,
      finish,
      estimated_budget,
      desired_date,
      description,
      wants_visit,
      image_urls,
    } = body;

    if (!full_name || !phone || !email || !city || !furniture_type || !description) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const requestId = await createCustomRequest({
      full_name,
      phone,
      email,
      city,
      furniture_type,
      environment: environment || "",
      width: width || "",
      height: height || "",
      depth: depth || "",
      material: material || "",
      finish: finish || "",
      estimated_budget: estimated_budget || "",
      desired_date: desired_date || "",
      description,
      wants_visit: !!wants_visit,
    });

    if (Array.isArray(image_urls) && image_urls.length > 0) {
      await addCustomRequestImages(requestId, image_urls);
    }

    if (resend && process.env.RESEND_FROM_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || process.env.RESEND_FROM_EMAIL,
        subject: `Nueva solicitud a medida: ${furniture_type} - ${full_name}`,
        html: `
          <h2>Nueva solicitud de mueble a medida</h2>
          <p><strong>Nombre:</strong> ${full_name}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Ciudad:</strong> ${city}</p>
          <p><strong>Tipo de mueble:</strong> ${furniture_type}</p>
          <p><strong>Ambiente:</strong> ${environment || "-"}</p>
          <p><strong>Medidas:</strong> ${width || "-"} x ${height || "-"} x ${depth || "-"} cm</p>
          <p><strong>Material:</strong> ${material || "-"}</p>
          <p><strong>Terminación:</strong> ${finish || "-"}</p>
          <p><strong>Presupuesto estimado:</strong> ${estimated_budget || "-"}</p>
          <p><strong>Fecha deseada:</strong> ${desired_date || "-"}</p>
          <p><strong>Visita/medición:</strong> ${wants_visit ? "Sí" : "No"}</p>
          <p><strong>Descripción:</strong></p>
          <p>${description}</p>
          ${image_urls?.length ? `<p>Imágenes: ${image_urls.join(", ")}</p>` : ""}
        `,
      });
    }

    return NextResponse.json({ id: requestId, ok: true });
  } catch (e) {
    console.error("custom-request API error:", e);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
