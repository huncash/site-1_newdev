import { Suspense } from "react";

import { BimPhoneLink } from "@/components/bim/BimChrome";
import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { bimPhoneVisible } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/kapcsolat",
  "Kapcsolat | VRGO BIM",
  "Elsősorban az űrlapon várjuk megkeresését. Írja le röviden a feladatot, és e-mailben válaszolunk."
);

export default function BimContactPage() {
  return (
    <article className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        <h1 className="text-2xl font-bold sm:text-3xl">Kapcsolat</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Elsősorban az űrlapon várjuk megkeresését. Írja le röviden a feladatot, és e-mailben
          válaszolunk.
        </p>

        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
            <BimQuoteForm />
          </Suspense>
        </div>

        {bimPhoneVisible() ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Telefonos elérhetőség:{" "}
            <BimPhoneLink forras="kapcsolat" className="underline underline-offset-2" />
          </p>
        ) : null}
      </div>
    </article>
  );
}
