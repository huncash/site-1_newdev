import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BimUseCaseList } from "@/components/bim/BimUseCaseList";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
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
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/megoldasok", label: "Megoldások" },
              { href: BIM_STATE_HUB_HREF, label: BIM_STATE_HUB_LABEL },
              { label: "Állami épületek" },
            ]}
          />
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Meglévő állami épületek: pontfelhő és BIM a 2035. december 31-i határidőhöz
          </h1>
          <p className="mt-3 text-sm opacity-90">
            A georeferált felmérés a fő szolgáltatásunk; az állami BIM-szabályozás külön felhasználási
            terület. Lásd:{" "}
            <BimLink href={BIM_STATE_HUB_HREF} className="underline">
              {BIM_STATE_HUB_LABEL}
            </BimLink>
            .
          </p>
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
            kell létrehozni (22. § (2)). A téradatot lézerszkenneléssel gyűjtjük, és geodéziai
            ellenőrzéssel, EOV-bekötéssel egészítjük ki.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Amit szállítunk</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Pontfelhő export (E57, XYZ) belső és külső terekről, ha a helyszíni rögzítés mindkettőt magában foglalja.</li>
            <li>E57 pontfelhő, OBJ, XYZ, méretezett alaprajz, ha a csomag tartalmazza.</li>
            <li>BIM-modell külön tételként, a feladat és az LOD szerint.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <BimUseCaseList
            items={[
              { code: "010" },
              {
                code: "190",
                note: "A lézeres felmérést geodéziai ellenőrzéssel és EOV-bekötéssel egészítjük ki.",
              },
              { code: "200" },
            ]}
          />
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
        <section>
          <h2 className="text-xl font-semibold text-foreground">Referencia</h2>
          <p className="mt-2">
            Meglévő állami létesítményről pontfelhőt és szükség szerint BIM-modellt készítünk.{" "}
            <BimLink href="/referenciak" className="font-semibold text-brand">
              Részletek
            </BimLink>
          </p>
        </section>
        <BimDeliverableBlock
          deliverables="E57 / XYZ pontfelhő, alaprajz és metszet; IFC/natív modell külön tételként."
          timeline="A 2035-ös határidőhöz igazított ütemterv az ajánlatban; a helyszíni napok a létesítmény méretétől függnek."
          fromYou="EIR, épületlista, hozzáférés, koordináta-rendszer elvárás."
        />
        <BimLink
          href="/kapcsolat"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Küldje el a feladat leírását vagy az EIR-t, módszertant és árajánlatot adunk.
        </BimLink>
        <p>A pilot feltételeit az ajánlatban közöljük.</p>
      </div>
    </article>
  );
}
