
const BASE = "https://wa.me";
const DEFAULT_MSG = "Hola, quiero hacer una consulta.";

/**
 * Número de WhatsApp del negocio (solo dígitos, con código de país).
 * Ej: 5492231234567. Si no está configurado, usa placeholder para desarrollo.
 */
function getNumber(): string {
  const raw = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER;
  if (!raw) return "5492231234567";
  const n = raw.replace(/\D/g, "");
  return n.startsWith("54") ? n : `54${n}`;
}

/**
 * Arma la URL de WhatsApp con mensaje prellenado.
 */
export function whatsappUrl(message: string = DEFAULT_MSG): string {
  const encoded = encodeURIComponent(message);
  return `${BASE}/${getNumber()}?text=${encoded}`;
}

/**
 * Mensaje para consulta general.
 */
export function messageGeneral(): string {
  return "Hola, quiero hacer una consulta sobre sus muebles y trabajos a medida.";
}

/**
 * Mensaje para consulta de un producto específico.
 */
export function messageProduct(productName: string, productUrl: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const fullUrl = baseUrl ? `${baseUrl}${productUrl}` : productUrl;
  return `Hola, quiero consultar por este producto: ${productName}\n${fullUrl}`;
}

/**
 * Mensaje después de enviar solicitud a medida (resumen para continuar por WhatsApp).
 */
export function messageCustomRequestSummary(params: {
  furnitureType: string;
  dimensions: string;
  material: string;
  finish: string;
  description: string;
}): string {
  const lines = [
    "Hola, acabo de enviar una solicitud de presupuesto para un mueble a medida.",
    `Tipo: ${params.furnitureType}`,
    `Medidas: ${params.dimensions}`,
    `Material: ${params.material}`,
    `Terminación: ${params.finish}`,
    `Descripción: ${params.description}`,
  ];
  return lines.join("\n");
}

/**
 * Mensaje desde la ficha de un trabajo realizado.
 */
export function messageFromProject(projectTitle: string): string {
  return `Hola, me interesa un trabajo similar a: "${projectTitle}". ¿Podrían cotizarme algo parecido?`;
}
