import { BimLink } from "@/components/bim/BimChrome";
import { DECREE_CHECKED, NJT_URL, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/pontossag-es-formatumok",
  "Pontosság és formátumok | VRGO BIM",
  "Pontfelhő (E57, XYZ), georeferált CAD és szabványos BIM (IFC, natív). A pontossági szintet az EIR-hez mérjük."
);

const formats = [
  ["Pontfelhő exportok", "E57, XYZ."],
  ["CAD", "Georeferált alaprajzok és metszetek."],
  ["BIM", "IFC és natív formátumok, pontfelhő alapú precíz modellezéssel."],
];

export default function AccuracyPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Pontosság és formátumok</h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit mond a rendelet a pontosságról</h2>
          <p className="mt-2">
            A modellelemek részletezettségét és a felhasználási esetekhez tartozó szinteket az EIR
            határozza meg (11. § (1)). Az átlagos fejlettségi szinthez tartozó pontosságot az
            ágazati műszaki szabályozás és az EIR rögzíti, modellelemenként (11. § (3)). A
            megvalósulási dokumentáció digitális geodéziai felmérések ellenőrző mérései alapján
            készül (11. § (2)).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Technológiai alapok</h2>
          <p className="mt-2">
            Ipari szintű 3D lézerszkennelés professzionális Leica 3D lézerszkenner eszközökkel.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Komplex ipari létesítmények, épülethomlokzatok és nagyméretű belső terek milliméter pontos rögzítése.</li>
            <li>Szűkebb terek és gyorsabb átfutású építészeti felmérések ugyanazzal az eszközparkkal.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Geodéziai háttér</h2>
          <div className="mt-2 space-y-3">
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
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Ajánlati szintek és EIR</h2>
          <p className="mt-2">
            A pontossági szintet minden projektnél szigorúan az EIR (Employer&apos;s Information
            Requirements) követelményeihez mérjük. Előre egyeztetett, transzparens mérnöki szintekkel
            és dedikált feldolgozási ütemezéssel dolgozunk.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Adatok és formátumok</h2>
          <p className="mt-2">A projekthez igazodó, szabványos kimeneti formátumok.</p>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <tbody>
              {formats.map(([name, note]) => (
                <tr key={name} className="border-t border-border">
                  <th className="w-1/3 py-3 pr-4 align-top font-semibold text-foreground">{name}</th>
                  <td className="py-3">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <p>
          Küldje el a feladat leírását vagy az EIR-t, módszert és árat javasolunk.{" "}
          <BimLink href="/ajanlatkeres" className="font-semibold text-brand">
            Ajánlatkérés
          </BimLink>
        </p>
        <p className="text-xs">
          Forrás a jogszabályi mondatokhoz:{" "}
          <a href={NJT_URL} className="underline" target="_blank" rel="noopener noreferrer">
            Nemzeti Jogszabálytár
          </a>
          , 2026.01.01. Utolsó ellenőrzés: {DECREE_CHECKED}. Az oldal tájékoztató, nem jogi
          tanácsadás.
        </p>
      </div>
    </article>
  );
}
