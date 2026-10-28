import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { listPublishedBimArticles } from "@/lib/bim-articles";
import { bimMetadata } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata = bimMetadata(
  "/",
  "Meglévő épületek digitális rögzítése az ÉKM BIM-rendelethez | VRGO BIM",
  "As-built adatrögzítés a 31/2024. (VIII. 22.) ÉKM rendelethez: helyszíni rögzítés, geodéziai ellenőrző mérés és IFC-átadás egy csapattól, egy ajánlatban. Matterport-szolgáltató 2016 óta."
);

const areas = [
  { href: "/meglevo-allami-epuletek", title: "Meglévő állami épületek rögzítése" },
  { href: "/kivitelezes", title: "Kivitelezés dokumentálása" },
  { href: "/uzemeltetes", title: "Üzemeltetés, éves digitális iker" },
  { href: "/tervezoknek", title: "Partnerség tervezőknek" },
] as const;

const roles = [
  ["Rögzítés", "VRGO", "Pro3 (bel- és kültér, gyors) · BLK360 (bel- és kültér, lassabb, részletes) · Pro1 (csak beltér, leggyorsabb beltéri)"],
  ["Geodéziai ellenőrző mérés", "Földmérő partner", "Bekötés és mérési jegyzőkönyv, az EIR szerinti pontossági osztályban"],
  ["IFC / BCF", "Modellezési partner", "IFC, BCF és natív formátum az EIR szerint"],
] as const;

export default function BimHomePage() {
  const latest = listPublishedBimArticles().slice(-3).reverse();

  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Meglévő épületek digitális rögzítése az állami BIM-szabályozáshoz
          </h1>
          <p className="mt-4 text-base opacity-90 sm:text-lg">
            As-built adatrögzítés a 31/2024. (VIII. 22.) ÉKM rendelethez: helyszíni rögzítés,
            geodéziai ellenőrző mérés és IFC-átadás egy csapattól, egy ajánlatban.
          </p>
          <p className="mt-3 text-sm opacity-80">
            Küldje el a feladat leírását vagy az EIR-t, módszert és árat javasolunk.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/ajanlatkeres"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
            >
              Ajánlatot kérek
            </BimLink>
            <BimLink
              href="/ekm-rendelet"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              A rendelet egy oldalon
            </BimLink>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Miért most?</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted-foreground sm:text-base">
            <li>
              A BIM létrehozása szükséges új állami építési beruházásnál, valamint meglévő
              létesítmény állami beruházás keretében történő átépítésénél, bővítésénél,
              felújításánál vagy bontásánál, és a magyar állam tulajdonában álló vagy tulajdonába
              kerülő létesítmények üzemeltetésénél (9. §).
            </li>
            <li>
              A rendelet hatálybalépésekor már a magyar állam tulajdonában álló, BIM nélküli
              létesítményeknél a modellt legkésőbb 2035. december 31-ig kell létrehozni (22. § (2)).
            </li>
            <li>
              A tervező és a vállalkozó kivitelező szerződésszerű teljesítésének adatállománya IFC,
              BCF és natív formátumot tartalmaz (20. §). A Matterport-export önmagában E57, OBJ, XYZ
              és alaprajz.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold">Négy terület, ahol dolgozunk</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <BimLink
                key={area.href}
                href={area.href}
                className="rounded-md border border-border bg-card p-5 font-semibold hover:border-brand"
              >
                {area.title}
              </BimLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Egy csapat, egy ajánlat</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Matterport-szolgáltató 2016 óta. A pontossági osztályt az EIR rögzíti; ehhez választjuk
            a módszert.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground sm:text-base">
            {roles.map(([task, who, how]) => (
              <li key={task}>
                <strong className="text-foreground">{task}.</strong> {who}. {how}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Igény esetén drónos kollégánkat bevonjuk; elsődlegesen drón nélkül dolgozunk, mert ez
            gyorsabb és olcsóbb módszer.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Mit vállalunk</h2>
          <div className="mt-4 text-sm text-muted-foreground sm:text-base">
            <BimScopeNote />
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Referencia</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Pannon Egyetem, Zalaegerszegi Kampusz: 8 külön modell, egyetlen bejárható modellben
            egyesítve, 891 szkennelési pont, 4 helyszíni munkanap (2024 ősz). A több mint 7 hektár a
            kampusz területe, nem a rögzített alapterület.
          </p>
          <BimLink href="/referenciak" className="mt-4 inline-block text-sm font-semibold text-brand">
            Esettanulmány
          </BimLink>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Cikkek</h2>
          {latest.length > 0 ? (
            <ul className="mt-4 space-y-3 text-sm sm:text-base">
              {latest.map((article) => (
                <li key={article.slug}>
                  <BimLink href={`/cikkek/${article.slug}`} className="font-semibold text-brand">
                    {article.title}
                  </BimLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              A következő cikk a közzétételi napon jelenik meg.
            </p>
          )}
          <BimLink href="/cikkek" className="mt-4 inline-block text-sm font-semibold text-brand">
            Cikkek oldala
          </BimLink>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-section-dark-foreground">Mondja el, melyik épületről van szó.</h2>
          <p className="mt-3 opacity-90">1 munkanapon belül módszert és árat javaslunk.</p>
          <BimLink
            href="/ajanlatkeres"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
          >
            Űrlap
          </BimLink>
        </div>
      </section>
    </>
  );
}
