import Link from "next/link";

const links = [
  { href: "/tienda", label: "Tienda" },
  { href: "/a-medida", label: "A medida" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-wood-200 bg-wood-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-medium text-wood-900">
              Locos por la Pinotea
            </p>
            <p className="mt-2 text-sm text-wood-600">
              Muebles a medida en Mar del Plata. Carpintería y fabricación con
              atención personalizada.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-wood-900">Enlaces</p>
            <ul className="mt-2 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-wood-600 hover:text-wood-900"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-wood-900">Contacto</p>
            <p className="mt-2 text-sm text-wood-600">
              Mar del Plata, Argentina
              <br />
              Consultas por WhatsApp o formulario.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-wood-200 pt-6 text-center text-sm text-wood-500">
          © {new Date().getFullYear()} Locos por la Pinotea. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
