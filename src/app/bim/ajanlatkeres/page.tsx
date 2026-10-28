import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ajanlatkeres",
  "Ajánlatkérés | VRGO BIM",
  "Küldje el a feladat leírását vagy az EIR-t. 1 munkanapon belül módszert és árat javaslunk."
);

export default function BimQuotePage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Ajánlatkérés</h1>
          <p className="mt-4 opacity-90">
            Küldje el a feladat leírását vagy az EIR-t. 1 munkanapon belül módszert és árat javaslunk.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <BimQuoteForm />
      </div>
    </article>
  );
}
