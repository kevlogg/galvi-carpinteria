import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const links = [
  { href: "/tienda", label: "Tienda" },
  { href: "/a-medida", label: "A medida" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const WHATSAPP = "https://wa.me/5491130245478";
const EMAIL = "mailto:galvicarpinteria@gmail.com";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo showText={true} className="text-foreground" />
            <p className="mt-3 text-sm text-muted">
              Muebles a medida en Pilar y todo Buenos Aires. Melamina MDF,
              enchapado y laqueado. Herrajes de primera: Häfele, Blum y Eurohard.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Enlaces</p>
            <ul className="mt-2 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-cream transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Contacto</p>
            <p className="mt-2 text-sm text-muted">
              Pilar, Buenos Aires
              <br />
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-cream hover:underline">
                WhatsApp 11 3024-5478
              </a>
              <br />
              <a href={EMAIL} className="text-cream hover:underline">
                galvicarpinteria@gmail.com
              </a>
              <br />
              Atención personalizada por cualquier medio.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Galvi Carpintería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
