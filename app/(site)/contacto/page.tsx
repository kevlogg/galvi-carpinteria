import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/ContactForm";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contacto",
  description:
    "Contacto con Galvi Carpintería. WhatsApp 11 3024-5478, email, Pilar y Buenos Aires.",
};

const EMAIL = "galvicarpinteria@gmail.com";
const WHATSAPP_LINK = whatsappUrl("Hola, quiero hacer una consulta.");

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeader
        title="Contacto"
        subtitle="Escribinos por WhatsApp, email o completá el formulario. Atención personalizada por cualquier medio."
      />
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="font-medium text-foreground">WhatsApp</h3>
            <p className="mt-1 text-muted">
              Respuesta rápida para consultas y presupuestos. 11 3024-5478
            </p>
            <Button asChild variant="whatsapp" size="lg" className="mt-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Abrir WhatsApp
              </a>
            </Button>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Email</h3>
            <p className="mt-1 text-muted">
              <a href={`mailto:${EMAIL}`} className="text-cream hover:underline">
                {EMAIL}
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Ubicación</h3>
            <p className="mt-1 text-muted">
              Estamos en Pilar y trabajamos por todo Buenos Aires. Coordinamos
              visita para medir y armar el presupuesto juntos.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Redes</h3>
            <p className="mt-1 text-muted">
              Podés escribirnos por el formulario o por Instagram (@carpinteria_galvi).
            </p>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
