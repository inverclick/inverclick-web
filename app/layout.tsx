import { Providers } from "@/app/providers";
import { ENV_VARS } from "@/global/env";
import { getPreRegistration } from "@/services/get-pre-registration";
import { getTRM } from "@/services/get-trm";
import { createClient } from "@/services/supabase/server-client";
import { getUser } from "@/services/user/get-user";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";

import Script from "next/script";

import "@inverclick/inverclick-ui/theme.css";
import "atropos/css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Inverclick - Invierte en Propiedad Raíz desde EL EXTERIOR",
    template: "%s - Inverclick",
  },
  description:
    "Descubre cómo invertir en propiedad raíz desde el exterior. Descubre propiedades verificadas y seguras en Colombia. Inverclick te ofrece un acceso exclusivo a las mejores opciones.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "inverclick",
    "propiedad raíz",
    "inversión",
    "crédito hipotecario",
    "inversión desde el exterior",
    "invertir en Colombia",
  ],
  robots: "index, follow",
  alternates: {
    canonical: ENV_VARS.BASE_URL,
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
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { TRM_USD, TRM_EUR, last_trm_update } = await getTRM();

  const user = await getUser(createClient())();
  const preRegistration = await getPreRegistration();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://lvptznfprobnfjquceok.supabase.co/storage/v1/object/public/inverclick-public"
        />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={GeistSans.className}>
        <Providers
          user={user}
          TRM_USD={TRM_USD}
          TRM_EUR={TRM_EUR}
          last_trm_update={last_trm_update}
          preRegistration={preRegistration}
        >
          {children}
        </Providers>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
