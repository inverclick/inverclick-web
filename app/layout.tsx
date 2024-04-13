import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const poppins = Poppins({weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    default: "Inverclick",
    template: "%s - Inverclick",
  },
  description: "Inverclick - Invierte en Propiedad Raíz desde el EXTERIOR",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["inverclick", "propiedad raíz", "inversión", "crédito hipotecario", "inversión desde el exterior", "invertir en Colombia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
