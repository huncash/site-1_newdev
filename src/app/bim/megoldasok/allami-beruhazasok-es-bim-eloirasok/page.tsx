import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimLink } from "@/components/bim/BimChrome";
import { BimDecreeWhyNow } from "@/components/bim/BimDecreeBlocks";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { listPublishedBimArticles } from "@/lib/bim-articles";
import { bimMetadata } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata = bimMetadata(
  BIM_STATE_HUB_HREF,
  `${BIM_STATE_HUB_LABEL} | VRGO BIM`,
  "Állami beruházásnál vagy üzemeltetésnél a BIM-előírásoknak megfelelő felmérés: kapcsolódó szolgáltatásaink, határidők, előírás-összefoglaló."
);

export default function StateProjectsHubPage() {
  const related = listPublishedBimArticles()
    .filter((a) => a.category === "Rendelet és megfelelés")
    .slice(-4)
    .reverse();

  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/megoldasok", label: "Megoldások" },
              { label: BIM_STATE_HUB_LABEL },
            ]}
          />
          <h1 className="text-3xl font-bold sm:text-4xl">
            Állami beruházások és üzemeltetés: BIM-előírásoknak megfelelő felmérés
          </h1>
          <p className="mt-4 max-w-3xl text-sm opacity-90 sm:text-base">
            Állami beruházásnál, állami tulajdonú épület átépítésénél vagy üzemeltetésénél az állami
            BIM-szabályozás (31/2024. (VIII. 22.) ÉKM rendelet) meghatározott adatátadást és
            pontosságot kér. Az alábbi szolgáltatásainkkal ennek tudunk megfelelni.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek releváns?</h2>
          <p className="mt-3">
            Állami beruházások, állami tulajdonú vagy tulajdonba kerülő létesítmények üzemeltetői,
            vagyonkezelők, és a szabályozás szerinti tervezői / kivitelezői szereplők.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Melyik előírásból mi következik a felmérésre nézve?
          </h2>
          <p className="mt-3">
            A szabályozás georeferált, ellenőrizhető téradatot és — a megrendelés szerint —
            szabványos modellátadást vár. A helyszíni rögzítés, az EOV-bekötés és a leadott
            formátumok a feladat EIR-jéhez vagy specifikációjához igazodnak; a pontossági szintet
            előre egyeztetjük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Melyik szolgáltatásunk melyik kötelezettséghez kapcsolódik?
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Meglévő állapot rögzítése →{" "}
              <BimLink href="/meglevo-allami-epuletek" className="font-semibold text-brand">
                állami épületek felmérése
              </BimLink>
              ,{" "}
              <BimLink href="/szolgaltatasok/georeferalas-eov" className="font-semibold text-brand">
                EOV-bekötés
              </BimLink>
            </li>
            <li>
              Kivitelezés dokumentálása →{" "}
              <BimLink href="/kivitelezes" className="font-semibold text-brand">
                kivitelezés követése
              </BimLink>
            </li>
            <li>
              Üzemeltetés, éves állapot →{" "}
              <BimLink href="/uzemeltetes" className="font-semibold text-brand">
                digitális iker
              </BimLink>
            </li>
            <li>
              Pontfelhő átadás tervezőknek →{" "}
              <BimLink
                href="/tervezoknek"
                className="font-semibold text-brand"
              >
                tervezőknek
              </BimLink>
            </li>
            <li>
              Modellalkotás (külön tétel) →{" "}
              <BimLink href="/szolgaltatasok/bim-modellezes" className="font-semibold text-brand">
                BIM-modellezés
              </BimLink>
            </li>
          </ul>
        </section>

        <BimDecreeWhyNow />

        <section>
          <h2 className="text-xl font-semibold text-foreground">Az előírások egy oldalon</h2>
          <p className="mt-3">
            Összefoglaló a 31/2024. (VIII. 22.) ÉKM rendeletről — hatály, fogalmak, határidők.
          </p>
          <BimLink href="/ekm-rendelet" className="mt-3 inline-block font-semibold text-brand">
            Állami BIM-előírások egy oldalon →
          </BimLink>
        </section>

        {related.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-foreground">Kapcsolódó cikkek</h2>
            <ul className="mt-3 space-y-2">
              {related.map((article) => (
                <li key={article.slug}>
                  <BimLink href={`/cikkek/${article.slug}`} className="font-semibold text-brand">
                    {article.title}
                  </BimLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-md border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">Következő lépés</h2>
          <p className="mt-2">
            Küldje el az EIR-t vagy a feladat leírását, módszertant és árajánlatot adunk.
          </p>
          <BimLink
            href="/kapcsolat?forras=allami-beruhazasok-hub"
            className="mt-4 inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
          >
            Ajánlatkérés
          </BimLink>
        </section>
      </div>
    </article>
  );
}
