import { Suspense } from "react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Ajánlatkérés — VRGO",
  description:
    "Kérj egyedi ajánlatot bejárható 3D fotózásra, virtuális túrára. 24 órán belüli visszajelzés.",
};

export default function AjanlatPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Ajánlatkérés</h1>
      <p className="mt-3 text-muted-foreground">
        Az ajánlatkérő űrlap a fő kapcsolati pontunk. Írd le röviden a helyszínt és az
        igényt — szükség esetén telefonon vagy helyszíni bejárással egyeztetünk.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
          <ContactForm defaultSource="ajanlat-page" />
        </Suspense>
      </div>
    </div>
  );
}
