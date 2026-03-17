/**
 * Variables de entorno usadas en el proyecto.
 * Todas las NEXT_PUBLIC_* están disponibles en el cliente.
 */

const required = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER",
] as const;

const optional = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "MP_ACCESS_TOKEN",
  "NEXT_PUBLIC_MP_PUBLIC_KEY",
  "MP_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "NEXT_PUBLIC_BUSINESS_EMAIL",
] as const;

export function getEnv(key: (typeof required)[number]): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}

export function getEnvOptional(key: (typeof optional)[number]): string | undefined {
  return process.env[key];
}

export const siteUrl = () => getEnv("NEXT_PUBLIC_SITE_URL");
export const whatsappNumber = () => getEnv("NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER");
