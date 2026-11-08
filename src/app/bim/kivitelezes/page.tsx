import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/kivitelezes",
  "Kivitelezés dokumentálása: előrehaladás és hibakövetés | VRGO BIM",
  "Időbélyegzett dokumentáció kivitelezéshez. 3D lézerszkennelés, georeferálás, előrehaladás és hibakövetés."
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
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/megoldasok", label: "Megoldások" },
              { label: "Kivitelezés követése" },
            ]}
          />
          <h1 className="text-3xl font-bold leading-tight text-section-dark-foreground sm:text-4xl">
            Kivitelezés követése
          </h1>
          <p className="mt-3 text-sm opacity-90 sm:text-base">
            Magán- és vállalati projektekre egyaránt: időbélyegzett pontfelhő a helyszíni állapotról.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">Generálkivitelezők, vállalkozó kivitelezők, lebonyolítók, építtetők.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor érdemes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Előrehaladás dokumentálása mérföldköveknél</li>
            <li>Hibakövetés és vita esetén visszakereshető állapot</li>
            <li>Megvalósulási (as-built) rögzítés átadáshoz</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kap</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Időbélyegzett pontfelhő</li>
            <li>Előrehaladási / hibakövetési anyag a megrendelés szerint</li>
            <li>Igény szerint megvalósulási dokumentáció és georeferálás</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Hogyan zajlik</h2>
          <p className="mt-2">
            A kivitelezési ütemtervhez igazítjuk a helyszíni napokat. A téradatot lézerszkenneléssel
            gyűjtjük; ha a feladat kéri, geodéziai ellenőrzéssel és EOV-bekötéssel egészítjük ki.
          </p>
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
          <p className="mt-2">
            A pontossági szintet az EIR vagy a megrendelés határozza meg. Részletek:{" "}
            <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
              pontosság és formátumok
            </BimLink>
            .
          </p>
        </section>

        <section className="rounded-md border border-border bg-secondary/60 p-5">
          <h2 className="text-lg font-semibold text-foreground">
            Állami beruházásnál / a BIM-előírások szerint
          </h2>
          <p className="mt-2">
            Ha a projekt állami beruházás vagy a szabályozás szerinti felhasználási eseteket
            (előrehaladás, elszámolás, hibakövetés, megvalósulási dokumentáció) is érinti, a
            részletek és a kapcsolódó szolgáltatások a hubon vannak.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li>Előrehaladás követése (felhasználási eset 150)</li>
            <li>Elszámolás dokumentálása (170) — a mennyiségi igazolás a szerződés szerint</li>
            <li>Hibakövetés (180)</li>
            <li>Megvalósulási dokumentáció (190), georeferálással</li>
          </ul>
          <BimLink href={BIM_STATE_HUB_HREF} className="mt-3 inline-block font-semibold text-brand">
            {BIM_STATE_HUB_LABEL} →
          </BimLink>
        </section>

        <BimDeliverableBlock
          deliverables="Időbélyegzett pontfelhő, előrehaladási / hibakövetési anyag, igény szerint megvalósulási dokumentáció."
          timeline="A mérföldkövek ütemezése a kivitelezési tervhez igazodik; a határidőt az ajánlat rögzíti."
          fromYou="Ütemterv, hozzáférés a szakaszokhoz, felmérési specifikáció vagy EIR."
        />
        <BimLink
          href="/kapcsolat?forras=kivitelezes"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Küldje el a feladat leírását, módszertant és árajánlatot adunk.
        </BimLink>
      </div>
    </article>
  );
}
