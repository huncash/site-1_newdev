import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { listPublishedBimArticles } from "@/lib/bim-articles";
import { bimMetadata } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata = bimMetadata(
  "/",
  "Pontos térbeli adatok és BIM modellek | VRGO BIM",
  "Professzionális Leica 3D lézerszkennelés a tervezéshez, kivitelezéshez és üzemeltetéshez: pontfelhő, BIM-modell és a feladathoz igazított mérnöki workflow."
);

const areas = [
  { href: "/meglevo-allami-epuletek", title: "Meglévő állami épületek rögzítése" },
  { href: "/kivitelezes", title: "Kivitelezés dokumentálása" },
  { href: "/uzemeltetes", title: "Üzemeltetés, éves digitális iker" },
  { href: "/tervezoknek", title: "Partnerség tervezőknek" },
] as const;

const workflow = [
  ["Igényfelmérés és stratégia", "A projekt céljának meghatározása: BIM, CAD, vizualizáció vagy dokumentáció."],
  ["Helyszíni adatgyűjtés", "Professzionális lézerszkennelés Leica 3D lézerszkenner eszközökkel, geodéziai kontrollal."],
  ["Feldolgozás és modellalkotás", "Pontfelhők regisztrációja és tisztítása, BIM-modell Revitben vagy ArchiCAD-ben, illetve 2D alaprajz és metszet."],
  ["Átadás", "Használatra kész, szabványos formátumok a tervezők, kivitelezők és üzemeltetők számára."],
] as const;

export default function BimHomePage() {
  const latest = listPublishedBimArticles().slice(-3).reverse();

  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Pontos térbeli adatok, mérnöki pontosságú BIM modellek és 3D valóságmodellek az
            építőipar és az ipari létesítmények számára.
          </h1>
          <p className="mt-4 text-base opacity-90 sm:text-lg">
            Professzionális Leica mérőműszerekkel és optimalizált workflow-val támogatjuk a
            tervezési, kivitelezési és üzemeltetési folyamatokat a felméréstől a pontfelhő
            feldolgozásig.
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
          <h2 className="text-2xl font-semibold">Rólunk</h2>
          <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
            <p>
              A mai építőipari és létesítménygazdálkodási projektek alapja a milliméter pontos
              téradat. A vrgo.hu szakmai hátterével és több mint egy évtizedes térszkennelési
              tapasztalatunkkal a feladat bonyolultságához és pontossági igényéhez leginkább
              illeszkedő technológiai workflow-t választjuk meg.
            </p>
            <p>
              Ipari szintű 3D lézerszkennelést végzünk professzionális Leica 3D lézerszkenner
              eszközökkel. A pontossági szintet az EIR határozza meg.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12">
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
              BCF és natív formátumot tartalmaz (20. §). A helyszíni felmérésből E57 és XYZ
              pontfelhő, georeferált CAD alaprajz és metszet készül. A BIM-modell a pontfelhőből,
              precíz modellezéssel áll elő.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-background py-12">
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

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Technológiai alapok</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Ipari szintű 3D lézerszkennelés professzionális Leica 3D lézerszkenner eszközökkel:
            komplex ipari létesítmények, épülethomlokzatok, nagyméretű belső terek és szűkebb
            építészeti felmérések.
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <p>
              A költséghatékony, nagy tömegű 3D lézerszkennelés (volumen- és téradatgyűjtés) és a
              hivatalos geodéziai hitelesítés kombinációjával biztosítjuk a tökéletes mérnöki
              pontosságot. A 3D szkenner gyűjti össze a részletes térbeli adatokat a
              modellalkotáshoz, míg a dedikált, eljárásra jogosult földmérő partnerünk biztosítja a
              szabványos georeferálást és a hivatalos ellenőrző méréseket.
            </p>
            <p>
              A projektjeinket ezen az optimalizált, bejáratott mérnöki workflow-kon keresztül
              szállítjuk. Természetesen, amennyiben a megrendelő saját földmérővel rendelkezik,
              készséggel és rugalmasan együttműködünk vele is.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Mit vállalunk</h2>
          <div className="mt-4 text-sm text-muted-foreground sm:text-base">
            <BimScopeNote />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Munkafolyamat</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Minden projekt egyedi. Szakértő csapatunk az Ön céljainak, a helyszín adottságainak és
            a megkövetelt pontossági szintnek megfelelően választja ki az optimalizált felmérési
            workflow-t.
          </p>
          <ol className="mt-6 space-y-4 text-sm text-muted-foreground sm:text-base">
            {workflow.map(([title, text], index) => (
              <li key={title}>
                <strong className="text-foreground">
                  {index + 1}. {title}.
                </strong>{" "}
                {text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Referencia</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Ipari létesítmények, homlokzatok és nagyméretű belső terek felmérése professzionális
            Leica 3D lézerszkenner eszközökkel. A helyszíni adat georeferált pontfelhővé és
            BIM-kompatibilis modellé áll össze.
          </p>
          <BimLink href="/referenciak" className="mt-4 inline-block text-sm font-semibold text-brand">
            Részletek
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
          <p className="mt-3 opacity-90">
            Küldje el a feladat leírását vagy az EIR-t, módszert és árat javasolunk.
          </p>
          <BimLink
            href="/ajanlatkeres"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
          >
            Ajánlatot kérek
          </BimLink>
        </div>
      </section>
    </>
  );
}
