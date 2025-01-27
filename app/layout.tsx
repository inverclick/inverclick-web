import { Chatbot } from "@/components/shared/chatbot/chatbot";
import { DownloadApp } from "@/components/shared/download-app";
import { PreRegistration } from "@/components/shared/pre-registration/pre-registration";
import { WelcomeDialog } from "@/components/shared/pre-registration/welcome-dialog";
import { YupLocalization } from "@/components/shared/yup-localization/yup-localization";
import { Toaster } from "@/components/ui/sonner";
import { CurrencyProvider } from "@/contexts/currency-context";
import { PreRegistrationProvider } from "@/contexts/pre-registration-context";
import { UserProvider } from "@/contexts/user-context";
import { ENV_VARS } from "@/global/env";
import { getPreRegistration } from "@/services/get-pre-registration";
import { getTRM } from "@/services/get-trm";
import { createClient } from "@/services/supabase/server-client";
import { getUser } from "@/services/user/get-user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

import Script from "next/script";

import { Providers } from "@/app/providers";
import "@inverclick/inverclick-ui/theme.css";
import "atropos/css";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
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
      <Script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      />
    </html>
  );
}
