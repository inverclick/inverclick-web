import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { ENV_VARS } from "@/global/env";
import { DownloadAppPopUp } from "@/components/shared/DownloadAppPopUp";
import 'atropos/css'

const poppins = Poppins({weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    default: "Inverclick - Invierte en Propiedad Raíz desde EL EXTERIOR",
    template: "%s - Inverclick",
  },
  description: "Descubre cómo invertir en propiedad raíz desde el exterior. Descubre propiedades verificadas y seguras en Colombia. Inverclick te ofrece un acceso exclusivo a las mejores opciones.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["inverclick", "propiedad raíz", "inversión", "crédito hipotecario", "inversión desde el exterior", "invertir en Colombia"],
  robots: "index, follow",
  alternates: {
    canonical: ENV_VARS.BASE_URL
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: ENV_VARS.BASE_URL,
    siteName: "Inverclick",
  },
  twitter: {
    card: "summary",
  },
  appleWebApp: {
    statusBarStyle: "black",
    capable: true,
    title: "Inverclick",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel='preconnect' href='https://public-bucket.inverclick.com' />
        <link rel='sitemap' href='/sitemap.xml' />
      </head>
      <body className={poppins.className}>
        {children}
        <Toaster />
        <DownloadAppPopUp />
      </body>
    </html>
  );
}
