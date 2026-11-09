import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/referenciak",
  "Módszer és átadási alap | VRGO BIM",
  "Terepi felmérés, pontfelhő és a megrendelés szerinti átadás — módszer és minőségbiztosítás."
);

const pillars = [
  "Terepi felmérés, regisztráció és minőség-ellenőrzés",
  "Tervezésre használható pontfelhő",
  "EOV-illesztés és a megrendelés szerinti kimenet",
  "Ipari környezetben a termelési ütemtervhez igazodó helyszíni munka",
  "Országos kiszállás; nagyobb projektnél többnapos helyszíni munka",
] as const;

export default function ReferencesPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Módszer és átadási alap a tervezéshez
          </h1>
          <p className="mt-4 max-w-3xl opacity-90">
            Publikus ügyféllogók helyett a módszert, a kimeneteket és a minőségbiztosítást
            mutatjuk. Konkrét referenciaanyagot az ajánlatkérés után, a megrendelő engedélyével
            adunk át.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
        <ul className="grid gap-3 sm:grid-cols-2">
          {pillars.map((item) => (
            <li key={item} className="rounded-md border border-border bg-card px-4 py-3 text-sm">
              {item}
            </li>
          ))}
        </ul>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Módszer</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A terepi felmérést robotmérőállomással, GNSS-vevővel és drónos fotogrammetriával
            végezzük. A konkrét feladathoz tartozó lézerszkennelési kapacitást a megrendelés előtt
            egyeztetjük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Következő lépés</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/kapcsolat?utvonal=ipar&forras=referenciak"
              className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
            >
              Helyszíni felmérési ajánlat
            </BimLink>
            <BimLink
              href="/scan-to-bim-kapacitas"
              className="inline-flex rounded-md border border-brand px-5 py-2.5 text-sm font-semibold text-brand"
            >
              BIM-modellezőknek
            </BimLink>
          </div>
        </section>
      </div>
    </article>
  );
}
