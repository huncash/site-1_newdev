import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { BimUseCaseList } from "@/components/bim/BimUseCaseList";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/kivitelezes",
  "Kivitelezés dokumentálása: előrehaladás és hibakövetés | VRGO BIM",
  "Időbélyegzett dokumentáció kivitelezéshez. A téradatot 3D lézerszkenneléssel gyűjtjük, a hivatalos ellenőrző mérést dedikált földmérő partnerünk végzi."
);

const packages = [
  {
    title: "Falzárás előtti dokumentálás",
    text: "A gépészet, a villamos szerelés és a vízvezeték lezárás előtti rögzítése.",
  },
  {
    title: "Mérföldkő-felvételek",
    text: "Szerkezetkész, szerelés vége, burkolás előtt, átadás-átvétel.",
  },
  {
    title: "Hibakövetési felvétel",
    text: "Időbélyegzett pontfelhő a kifogásolt területekről. A jelölést a modellen helyezzük el.",
  },
];

export default function ConstructionPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Kivitelezés dokumentálása: előrehaladás, hibakövetés, megvalósulási állapot
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">Generálkivitelezők, vállalkozó kivitelezők, lebonyolítók, építtetők.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <BimUseCaseList
            items={[
              { code: "150" },
              {
                code: "170",
                note: "A rögzítés a dokumentáció. A mennyiségi igazolás az EIR és a szerződés szerint készül.",
              },
              { code: "180" },
              {
                code: "190",
                note: "A hivatalos ellenőrző mérést és a szabványos georeferálást dedikált, eljárásra jogosult földmérő partnerünk biztosítja.",
              },
            ]}
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Csomagok</h2>
          <div className="mt-4 grid gap-4">
            {packages.map((item) => (
              <div key={item.title} className="rounded-md border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <div className="mt-2">
            <BimScopeNote />
          </div>
        </section>
        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Küldje el a feladat leírását vagy az EIR-t, módszertant és árajánlatot adunk.
        </BimLink>
      </div>
    </article>
  );
}
