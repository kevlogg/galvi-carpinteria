import Link from "next/link";
import { CarritoContent } from "@/components/carrito/CarritoContent";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Carrito",
  description: "Tu carrito de compras - Galvi Carpintería",
};

export default function CarritoPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader title="Carrito" subtitle="Revisá tu pedido antes de pagar." />
      <CarritoContent />
    </div>
  );
}
