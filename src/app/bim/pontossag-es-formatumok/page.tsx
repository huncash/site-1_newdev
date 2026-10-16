import { DECREE_CHECKED, NJT_URL, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/pontossag-es-formatumok",
  "Pontosság és formátumok | VRGO BIM",
  "E57, OBJ, XYZ és alaprajz a szolgáltatás része. IFC, RVT, DWG és BCF modellezéssel, partnerrel. Általános pontossági ígéret nincs."
);

const formats = [
  ["E57, OBJ, XYZ, alaprajz", "A rögzítésből átadható, ha a megrendelés tartalmazza."],
  ["IFC, RVT, DWG", "Modellezéssel, partnerrel, külön ajánlati tétel."],
  ["BCF", "A modellezési fázis része, nem a nyers Matterport-export."],
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
          <h2 className="text-xl font-semibold text-foreground">Ajánlati szintek</h2>
          <p className="mt-2">
            Gyors felmérés, standard, pontos. A szintet a feladat pontossági igénye és az EIR
            határozza meg; ezt az ajánlat előtt közösen tisztázzuk. A szintekhez tartozó eltérést
            és feldolgozási időt csak az összehasonlító mérés után közöljük.
          </p>
          <p className="mt-2">Matterport rendszert is használunk.</p>
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
          <h2 className="text-xl font-semibold text-foreground">Mikor ajánlunk más módszert</h2>
          <p className="mt-2">
            Földmérői ellenőrző mérés, drón, ha a feladat pontossági osztálya vagy a bekötés ezt
            kéri.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Geodéziai ellenőrző mérés</h2>
          <p className="mt-2">
            A szkennelés nem helyettesíti a 11. § (2) szerinti geodéziai ellenőrző mérést. Ha a
            megrendelőnek nincs saját földmérője, tudunk földmérőt ajánlani, és a mérést vele
            projekt alapon együtt végezni.
          </p>
          <h3 className="mt-4 font-semibold text-foreground">Vállaljuk</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Bejárható 3D és pontfelhő. Matterport rendszert is használunk.</li>
            <li>
              Az EIR szerinti ellenőrző mérés és bekötés, ha földmérővel projekt alapon együtt dolgozunk: E57, OBJ,
              XYZ, alaprajz, mérési jegyzőkönyv.
            </li>
            <li>IFC-modell modellezési partnerrel, külön ajánlati tétel.</li>
          </ul>
          <h3 className="mt-4 font-semibold text-foreground">Jelenleg nem vállaljuk</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Ingatlan-nyilvántartási földmérést, változási vázrajzot, telekalakítást, kitűzést.</li>
            <li>Geodéziai tervezést és geodéziai szakvéleményt.</li>
            <li>A közbeszerzési EIR elkészítését és a jogi tanácsadást.</li>
          </ul>
        </section>
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
