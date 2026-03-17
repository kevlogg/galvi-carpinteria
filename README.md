# Locos por la Pinotea – Web del taller

Sitio híbrido para un taller de carpintería y muebles a medida en Mar del Plata: portfolio de trabajos, tienda con productos con precio cerrado (Mercado Pago), solicitudes a medida y panel admin.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + componentes tipo shadcn (Button, etc.)
- **Firebase**: Firestore (datos), Auth (admin), Storage (imágenes)
- **Mercado Pago**: Checkout Pro
- **Resend**: emails (nueva compra, solicitud a medida, contacto)
- **Zustand**: carrito persistente
- **React Hook Form + Zod**: formularios y validación

## Estructura del proyecto

```
carpinteria/
├── app/
│   ├── (site)/                 # Sitio público (Navbar, Footer, WhatsApp)
│   ├── admin/                  # login + (dashboard)
│   └── api/                    # custom-request, contact, checkout, webhooks, admin/*
├── components/
│   ├── layout/                # Navbar, Footer
│   ├── ui/                    # Button, WhatsAppButton, etc.
│   ├── admin/                 # AdminSidebar, ProductForm, AuthGuard
│   └── ...
├── lib/
│   ├── firebase/              # config, client (Auth/Firestore/Storage), admin (server)
│   ├── data/                  # products, projects, firestore helpers, mock
│   ├── store/                 # cart-store
│   └── ...
```

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_FIREBASE_*` | Config de la app web Firebase (apiKey, authDomain, projectId, storageBucket, appId, etc.) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | JSON completo de la cuenta de servicio (una línea). Sin esto el sitio usa datos mock en el servidor. |
| `ADMIN_EMAIL` | Email que puede entrar al panel admin (ej. loggia.1996@gmail.com) |
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio |
| `MP_ACCESS_TOKEN` | Token de Mercado Pago |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Emails con Resend |
| `NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER` | WhatsApp del negocio |

## Firebase

1. **Proyecto**: Ya tenés la app web "web locosporlapinotea" en Firebase. El `.env.example` incluye los valores de esa app.
2. **Cuenta de servicio**: En Firebase Console → Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada. Copiá el JSON y guardalo en `FIREBASE_SERVICE_ACCOUNT_JSON` (todo en una línea, sin saltos).
3. **Auth**: En Authentication → Sign-in method habilitá "Correo/contraseña". Creá un usuario con el email que quieras usar como admin y poné ese email en `ADMIN_EMAIL` (ej. loggia.1996@gmail.com).
4. **Firestore**: Creá las colecciones según el uso de la app:
   - `products` (documentos con: title, slug, price, active, featured, category_id, description, etc.; subcollection `images` con url, sort_order)
   - `categories` (name, slug, active)
   - `orders` (customer_name, customer_email, customer_phone, items, amount, payment_status, payment_id, mp_preference_id, created_at)
   - `custom_requests` (full_name, phone, email, city, furniture_type, description, status, etc.; subcollection `images` con url)
   - `projects` (title, slug, description, featured, category_id; subcollection `images` con url, sort_order)
   - `settings` (documento con id "main": business_name, whatsapp, email, address, city, opening_hours, etc.)
5. **Storage**: Se usa el bucket por defecto. Las imágenes de referencia de solicitudes se guardan en rutas tipo `refs/...`. Podés crear reglas de seguridad en Storage según necesidad.
6. **Índices**: Si Firestore pide índices compuestos al hacer consultas (ej. products donde active y featured con orderBy), creálos desde el enlace que muestra la consola.

Sin `FIREBASE_SERVICE_ACCOUNT_JSON` el sitio usa datos mock para productos y trabajos.

## Cómo correr el proyecto

```bash
cd carpinteria
npm install
npm run dev
```

Abrir http://localhost:3000. Admin: http://localhost:3000/admin (login con el email configurado en `ADMIN_EMAIL`).

## Deploy (Vercel)

Conectar el repo a Vercel y configurar todas las variables de entorno. Para `FIREBASE_SERVICE_ACCOUNT_JSON` pegá el JSON en una sola línea.

## Flujos principales

- **Compra**: Carrito → datos del cliente → POST /api/checkout/create → redirección a Mercado Pago → success/failure/pending → webhook actualiza el pedido en Firestore.
- **A medida**: Formulario en /a-medida → POST /api/custom-request → se guarda en Firestore (e imágenes en Storage si se suben) → email al negocio (Resend) → mensaje de éxito y botón WhatsApp.
- **Admin**: Login con Firebase Auth (solo el email en `ADMIN_EMAIL`). El panel usa Firestore para productos, pedidos, solicitudes, trabajos, categorías y configuración.
