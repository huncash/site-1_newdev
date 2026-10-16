import type { Metadata } from "next";
import { headers } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ConsentBanner } from "@/components/legal/ConsentBanner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VRGO — Bejárható 3D fotózás és virtuális túra üzleti felhasználásra",
  description:
    "Tükrözd a valóságot egy 3D sétával. Virtuális túra, Google Utcakép, VR és 360° panoráma. Az átadási határidő az ajánlatban szerepel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isBim = (await headers()).get("x-vrgo-site") === "bim";

  return (
    <html lang="hu">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#6cb9f1" />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        {isBim ? null : <Navbar />}
        <main className="flex-1">{children}</main>
        {isBim ? null : <Footer />}
        <ConsentBanner />
      </body>
    </html>
  );
}
