import { BimLink } from "@/components/bim/BimChrome";
import { bimHasFromPrices, BIM_CONFIG } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/arak-es-folyamat",
  "Árak és folyamat — díjszerkezet | VRGO BIM",
  "Miből áll a felmérési díj: terepi munka, georeferálás, feldolgozás, modellezés. Az ajánlat a méret és a feladat alapján készül."
);

const factors = [
  {
    title: "Terepi munka és kiszállás",
    text: "Helyszín, napok száma, esetleges visszatérés. A méret és a terek bonyolultsága befolyásolja az időt.",
  },
  {
    title: "Georeferálás",
    text: "Lokális vagy EOV-kötés, földmérői közreműködés, kontrollpontok — külön tételként jelenhetnek meg.",
  },
  {
    title: "Feldolgozás",
    text: "Pontfelhő regisztrációja, tisztítása, 2D alaprajz és metszet a megrendelés szerint.",
  },
  {
    title: "Modellezés (opcionális)",
    text: "BIM-modell Revitben vagy ArchiCAD-ben, IFC — külön tétel, a feladat és az LOD szerint.",
  },
] as const;

export default function PricingProcessPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Mennyibe kerül? — díjszerkezet</h1>
          <p className="mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
            Ez nem árlista. A díj felépítését mutatjuk; a végleges összeget az ajánlat tartalmazza.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        {bimHasFromPrices() ? (
          <section className="rounded-md border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground">Lakossági irányár</h2>
            <p className="mt-2">
              {BIM_CONFIG.residentialFromPriceHuf!.toLocaleString("hu-HU")} Ft-tól
              {typeof BIM_CONFIG.residentialMinPriceHuf === "number"
                ? ` (minimumdíj: ${BIM_CONFIG.residentialMinPriceHuf.toLocaleString("hu-HU")} Ft)`
                : null}
              .
            </p>
          </section>
        ) : null}
        <section className="grid gap-4 sm:grid-cols-2">
          {factors.map((item) => (
            <div key={item.title} className="rounded-md border border-border bg-card p-5">
              <h2 className="font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2">{item.text}</p>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Folyamat</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Rövid igényfelmérés (űrlap, telefon vagy EIR).</li>
            <li>Módszertan és árajánlat.</li>
            <li>Helyszíni rögzítés, majd feldolgozás és átadás a megbeszélt formátumban.</li>
          </ol>
        </section>
        <section className="rounded-md border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Következő lépés</h2>
          <p className="mt-2">
            Magánszemélyként:{" "}
            <BimLink href="/lakossagi-felmeres" className="font-semibold text-brand">
              lakás- és házfelmérés
            </BimLink>
            . Cégként vagy EIR alapján:{" "}
            <BimLink href="/kapcsolat" className="font-semibold text-brand">
              ajánlatkérés
            </BimLink>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
