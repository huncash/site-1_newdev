import { BimLink } from "@/components/bim/BimChrome";
import { DECREE_CHECKED, NJT_URL, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/pontossag-es-formatumok",
  "Pontosság és formátumok | VRGO BIM",
  "Egy csapat, egy ajánlat: helyszíni rögzítés, geodéziai ellenőrző mérés és IFC. A pontossági osztályt az EIR rögzíti."
);

const formats = [
  ["E57, OBJ, XYZ, alaprajz", "A rögzítésből átadható, ha a megrendelés tartalmazza."],
  ["IFC, RVT, DWG", "Modellezési partnerünktől, az EIR szerint."],
  ["BCF", "Modellezési partnerünktől, a modellezési fázisban."],
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
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <p className="mt-2">
            Egy csapat, egy ajánlat: a helyszíni rögzítést mi végezzük (Matterport Pro3, Leica
            BLK360, beltéren Pro1), a geodéziai ellenőrző mérést és a bekötést jogosultsággal
            rendelkező földmérő partnerünk, az IFC-modellt modellezési partnerünk készíti. Igény
            esetén drónos kollégánkat is bevonjuk; elsődlegesen drón nélkül dolgozunk, mert ez
            gyorsabb és olcsóbb módszer.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Rögzítés, VRGO: Pro3 bel- és kültér, gyors. BLK360 bel- és kültér, lassabb, részletes. Pro1 csak beltér, a leggyorsabb beltéri rögzítés.</li>
            <li>Geodéziai ellenőrző mérés, bekötés, mérési jegyzőkönyv: földmérő partnerünk, az EIR szerinti pontossági osztályban (11. § (3)).</li>
            <li>Pontfelhő, E57, OBJ, XYZ, alaprajz: VRGO, ha a megrendelés tartalmazza.</li>
            <li>IFC, BCF és natív formátum: modellezési partnerünk, az EIR szerint, külön ajánlati tétel.</li>
          </ul>
          <h3 className="mt-4 font-semibold text-foreground">Első körben nem vállalt</h3>
          <p className="mt-2">
            Ingatlan-nyilvántartási földmérés, telekalakítás, kitűzés, geodéziai tervezés és
            szakvélemény, a közbeszerzési EIR megírása, jogi tanácsadás.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Ajánlati szintek</h2>
          <p className="mt-2">
            Gyors, standard, pontos. A szintet a feladat pontossági igénye és az EIR határozza meg;
            ezt az ajánlat előtt közösen tisztázzuk. A szintekhez tartozó eltérést és feldolgozási
            időt csak az összehasonlító mérés után közöljük.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Formátumok</h2>
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
        <section>
          <h2 className="text-xl font-semibold text-foreground">Geodéziai ellenőrző mérés</h2>
          <p className="mt-2">
            A 11. § (2) szerinti digitális geodéziai ellenőrző mérést földmérő partnerünk végzi; a
            rögzítéssel egy ajánlatban, egy ütemben.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Drón</h2>
          <p className="mt-2">
            Először drón nélkül dolgozunk, ez gyorsabb és olcsóbb. Ha a feladat légi felvételt
            kíván, drónos kollégánkat bevonjuk.
          </p>
        </section>
        <p>
          Küldje el az EIR-t vagy a feladat leírását, 1 munkanapon belül módszert és árat
          javaslunk.{" "}
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
