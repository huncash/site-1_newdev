import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimSolutionCards } from "@/components/bim/BimSolutionCards";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/megoldasok",
  "Megoldásaink | VRGO BIM",
  "Válassza ki a feladathoz kapcsolódó megoldást: ipari felmérés, tervezőknek, modellezőknek, lakossági és további céloldalak."
);

export default function SolutionsPage() {
  return (
    <article className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <BimBreadcrumb items={[{ href: "/", label: "Kezdőlap" }, { label: "Megoldások" }]} />
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Megoldásaink</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Válassza ki a feladathoz kapcsolódó megoldást.
        </p>
        <BimSolutionCards />
      </div>
    </article>
  );
}
