import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contacto",
  description: "Contacto con Locos por la Pinotea. WhatsApp, dirección, horarios.",
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER || "5492231234567";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, quiero hacer una consulta.")}`;

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Contacto"
        subtitle="Escribinos por WhatsApp, email o completá el formulario."
      />
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="font-medium text-wood-900">WhatsApp</h3>
            <p className="mt-1 text-wood-600">
              Respuesta rápida para consultas y presupuestos.
            </p>
            <Button asChild variant="whatsapp" size="lg" className="mt-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Abrir WhatsApp
              </a>
            </Button>
          </div>
          <div>
            <h3 className="font-medium text-wood-900">Mar del Plata, Argentina</h3>
            <p className="mt-1 text-wood-600">
              Atendemos en Mar del Plata y zona. Coordinamos visita y entrega.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-wood-900">Horario</h3>
            <p className="mt-1 text-wood-600">
              Lunes a viernes. Consultar por WhatsApp.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-wood-900">Email / redes</h3>
            <p className="mt-1 text-wood-600">
              Podés escribirnos por el formulario o por Instagram si nos seguís.
            </p>
          </div>
          {/* Mapa: descomentar y poner URL del iframe de Google Maps */}
          {/* <div className="aspect-video w-full overflow-hidden rounded-lg bg-wood-200">
            <iframe
              src={process.env.NEXT_PUBLIC_MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            />
          </div> */}
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
