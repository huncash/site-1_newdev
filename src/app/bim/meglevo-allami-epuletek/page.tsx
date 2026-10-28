import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { BimUseCaseList } from "@/components/bim/BimUseCaseList";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/meglevo-allami-epuletek",
  "Meglévő állami épületek rögzítése a 2035-ös határidőhöz | VRGO BIM",
  "Ipari lézerszkennelés, E57 pontfelhő és IFC a 2035. december 31-i határidőhöz."
);

export default function ExistingBuildingsPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Meglévő állami épületek: pontfelhő és BIM a 2035. december 31-i határidőhöz
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">
            Egyetemek, kutatóhelyek, kórházak, oktatási és közigazgatási intézmények,
            vagyonkezelők, üzemeltetők.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">A helyzet</h2>
          <p className="mt-2">
            Meglévő épületről a dokumentáció gyakran hiányos. A rendelet hatálybalépésekor már
            állami tulajdonú, BIM nélküli létesítménynél a modellt legkésőbb 2035. december 31-ig
            kell létrehozni (22. § (2)). A részletes téradatot 3D lézerszkenneléssel gyűjtjük, a
            szabványos georeferálást és a hivatalos ellenőrző méréseket dedikált, eljárásra jogosult
            földmérő partnerünk biztosítja.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Amit szállítunk</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Pontfelhő export (E57, XYZ) belső és külső terekről, ha a helyszíni rögzítés mindkettőt magában foglalja.</li>
            <li>E57 pontfelhő, OBJ, XYZ, méretezett alaprajz, ha a csomag tartalmazza.</li>
            <li>IFC és BCF a modellezési partnerünktől, az EIR szerinti részletezettségben.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <BimUseCaseList
            items={[
              { code: "010" },
              {
                code: "190",
                note: "A szabványos georeferálást és a hivatalos ellenőrző mérést dedikált, eljárásra jogosult földmérő partnerünk biztosítja.",
              },
              { code: "200" },
            ]}
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <div className="mt-2">
            <BimScopeNote />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Referencia</h2>
          <p className="mt-2">
            Meglévő állami létesítmény felmérése georeferált pontfelhővé és BIM-modellé.{" "}
            <BimLink href="/referenciak" className="font-semibold text-brand">
              Részletek
            </BimLink>
          </p>
        </section>
        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
        >
          Küldje el a feladat leírását
        </BimLink>
        <p>A pilot feltételeit az ajánlatban közöljük. Százalékos kedvezményt ezen az oldalon nem hirdetünk.</p>
      </div>
    </article>
  );
}
