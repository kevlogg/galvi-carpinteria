"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  FolderOpen,
  Tags,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/solicitudes", label: "Solicitudes a medida", icon: FileText },
  { href: "/admin/trabajos", label: "Trabajos realizados", icon: FolderOpen },
  { href: "/admin/categorias", label: "Categorías", icon: Tags },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  async function handleSignOut() {
    const auth = getFirebaseAuth();
    await signOut(auth);
    window.location.href = "/admin/login";
  }

  return (
    <aside className="w-56 shrink-0 border-r border-wood-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-wood-200 px-4">
        <span className="font-medium text-wood-900">Admin</span>
      </div>
      <nav className="p-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
                isActive
                  ? "bg-wood-100 font-medium text-wood-900"
                  : "text-wood-600 hover:bg-wood-50 hover:text-wood-800"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-wood-200 p-2">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-wood-600 hover:bg-wood-50 hover:text-wood-800"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
