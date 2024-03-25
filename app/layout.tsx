import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const poppins = Poppins({weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin']});

// export const metadata: Metadata = {
//   title: "Inverclick",
//   description: "Inverclick - Invierte en Propiedad Raíz desde el EXTERIOR",
//   icons: {
//     icon: "/favicon.ico",
//   }
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name='description'
          content='Inverclick - Invierte en Propiedad Raíz desde el EXTERIOR'
        />
        <meta name='viewport' content='width=device-width' />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <title>Inverclick</title>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
