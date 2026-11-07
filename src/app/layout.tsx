import type { Metadata } from "next";
import { headers } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ConsentBanner } from "@/components/legal/ConsentBanner";
import { bimLink } from "@/lib/links";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Bejárható 3D fotózás és Google Utcakép | VRGO",
  description:
    "Bejárható 3D túra, méretezett alaprajz és megjelenés a Google Térképen és Utcaképen. Üzleteknek, szállásoknak, irodáknak, ingatlanoknak. Kedvező áron. Kérjen ajánlatot.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const isBim = headerList.get("x-vrgo-site") === "bim";

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
        {isBim ? null : (
          <Navbar
            cta={{
              label: "Mérnöki 3D felmérés",
              href: bimLink("/", "header"),
            }}
          />
        )}
        <main className="flex-1">{children}</main>
        {isBim ? null : <Footer />}
        <ConsentBanner />
      </body>
    </html>
  );
}
