import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Locos por la Pinotea | Muebles a medida en Mar del Plata",
    template: "%s | Locos por la Pinotea",
  },
  description:
    "Taller de carpintería y fabricación de muebles a medida en Mar del Plata. Cocinas, placares, barras, escritorios y más. Presupuestos sin compromiso.",
  keywords: ["muebles a medida", "carpintería", "Mar del Plata", "cocinas", "placares", "muebles"],
  openGraph: { locale: "es_AR" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
