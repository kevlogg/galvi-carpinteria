import type { Metadata } from "next";
import { DM_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const libreBaskerville = Libre_Baskerville({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Galvi Carpintería | Muebles a medida en Pilar y Buenos Aires",
    template: "%s | Galvi Carpintería",
  },
  description:
    "Carpintería a medida en Pilar. Cocinas, placares, muebles en melamina MDF, enchapado y laqueado. Herrajes Häfele, Blum y Eurohard. Cotizaciones sin costo.",
  keywords: [
    "muebles a medida",
    "carpintería",
    "Pilar",
    "Buenos Aires",
    "cocinas",
    "placares",
    "melamina",
    "Häfele",
    "Blum",
  ],
  openGraph: { locale: "es_AR" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${libreBaskerville.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
