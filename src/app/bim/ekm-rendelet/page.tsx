import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { DECREE_CHECKED, NJT_URL, USE_CASES, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ekm-rendelet",
  "A 31/2024. ÉKM rendelet egy oldalon | VRGO BIM",
  "Kire vonatkozik a 31/2024. ÉKM rendelet, mikor kell BIM, mit kell átadni, és melyek a felhasználási esetek. Tájékoztató, nem jogi tanácsadás."
);

const deadlines = [
  ["Magasépítés és útépítés", "A 4. § és a 8. § (1) a rendelet hatálybalépése után indult tervezési beszerzésre és közbeszerzésre vonatkozik (22. § (1) a))."],
  ["Vasútépítés", "2026. július 1. után indult eljárások (22. § (1) b))."],
  ["Vízépítés", "2027. július 1. után indult eljárások (22. § (1) c))."],
  ["Közműépítés", "2028. július 1. után indult eljárások (22. § (1) d))."],
  ["Meglévő, BIM nélküli állami létesítmény", "A rendelet hatálybalépésekor már a magyar állam tulajdonában álló, BIM nélküli létesítménynél a modellt legkésőbb 2035. december 31-ig kell létrehozni (22. § (2))."],
];

export default function EkmPage() {
  const general = USE_CASES.filter(([code]) => Number(code) < 230);
  const highrise = USE_CASES.filter(([code]) => Number(code) >= 230);

  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">A 31/2024. ÉKM rendelet egy oldalon</h1>
          <p className="mt-4 opacity-90">
            Az építményinformációs modell (BIM) alapú tervezés és műszaki megvalósítás
            feltételrendszeréről. Az összefoglaló a Nemzeti Jogszabálytár 2026. január 1-jén
            hatályos szövegét követi.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kire vonatkozik</h2>
          <p className="mt-3">
            A rendelet hatálya — jogszabályban meghatározott kivétellel — az állami építési
            beruházásokra, azok építtetőire és résztvevőire, az érintett engedélyező hatóságokra,
            valamint az állami létesítmények tulajdonosaira, tulajdonosi joggyakorlóira,
            vagyonkezelőire és üzemeltetőire terjed ki (2. § (1)).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor kell BIM</h2>
          <p className="mt-3">
            BIM létrehozása szükséges új, állami építési beruházásban megvalósuló létesítménynél,
            valamint meglévő létesítmény állami beruházás keretében történő átépítésénél,
            bővítésénél, felújításánál vagy bontásánál. Kell a magyar állam tulajdonában álló vagy
            tulajdonába kerülő létesítmények üzemeltetésénél is (9. § (1)).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kell átadni</h2>
          <p className="mt-3">
            A tervező és a vállalkozó kivitelező teljesítése akkor fogadható el, ha a további
            felhasználásra alkalmas teljes adatállományt átadja. Ez IFC-ben mentett modellt, BCF
            nyílt adatcsere-formátumú projektet és az eredeti natív fájlformátumokat jelenti, az
            EIR-ben meghatározott további adatokkal (20. §).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Határidők</h2>
          <p className="mt-3">
            A 22. § (1) a 4. § és a 8. § (1) alkalmazását ütemezi. Ez nem azonos a 9. § szerinti
            BIM-létrehozási kötelezettség minden esetével.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {deadlines.map(([label, text]) => (
                  <tr key={label} className="border-t border-border">
                    <th className="w-1/3 py-3 pr-4 align-top font-semibold text-foreground">{label}</th>
                    <td className="py-3">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <p className="mt-3">2. melléklet. A 230–250 kód a magasépítési állami beruházások további esetei.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th className="py-2 pr-4">Kód</th>
                  <th className="py-2">Megnevezés</th>
                </tr>
              </thead>
              <tbody>
                {general.map(([code, name]) => (
                  <tr key={code} className="border-t border-border">
                    <td className="py-2 pr-4 font-semibold text-foreground">{code}</td>
                    <td className="py-2">{name}</td>
                  </tr>
                ))}
                {highrise.map(([code, name]) => (
                  <tr key={code} className="border-t border-border">
                    <td className="py-2 pr-4 font-semibold text-foreground">{code}</td>
                    <td className="py-2">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Amit ebből a VRGO vállal</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Bejárható 3D rögzítés és E57, OBJ, XYZ, alaprajz, ha a megrendelés tartalmazza.</li>
            <li>A 11. § (2) szerinti geodéziai ellenőrző mérés és bekötés: dedikált, hivatalban eljárásra jogosult földmérő partnerrel, mérési jegyzőkönyvvel. A 3D rögzítés ezt nem helyettesíti.</li>
            <li>IFC, BCF és natív formátum: a pontfelhőből precíz modellezéssel, az EIR szerinti részletezettségben.</li>
          </ul>
          <div className="mt-4">
            <BimScopeNote />
          </div>
          <BimLink
            href="/ajanlatkeres"
            className="mt-6 inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
          >
            Küldje el az EIR-t
          </BimLink>
        </section>

        <footer className="border-t border-border pt-6 text-xs">
          <p>
            Forrás:{" "}
            <a href={NJT_URL} className="underline" target="_blank" rel="noopener noreferrer">
              Nemzeti Jogszabálytár
            </a>
            , hatályos szöveg 2026.01.01. Az oldal tájékoztató, nem jogi tanácsadás.
          </p>
          <p className="mt-2">Utolsó ellenőrzés: {DECREE_CHECKED}</p>
          <p className="mt-2">
            A 4. § az egységes tételrend negyedévenkénti közzétételéről szól, nem ennek az
            összefoglalónak a kötelező frissítéséről. A szöveget a jogszabálytár változásakor
            ellenőrizzük újra.
          </p>
        </footer>
      </div>
    </article>
  );
}
