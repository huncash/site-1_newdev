import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/rolunk",
  "Rólunk | VRGO BIM",
  "Lean mérnöki vezetés 2014 óta, családi cég 2024-es átvétele, földmérő kolléga a terepi felmérésekhez."
);

export default function AboutPage() {
  return (
    <article className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Rólunk</h1>

        <div className="mt-6 space-y-4 text-sm text-muted-foreground sm:text-base">
          <p>
            Csapatunk két fő szakmai háttérrel dolgozik. A vezető mérnök 2014 óta foglalkozik lean
            módszertannal az iparban; ezt a folyamatoptimalizáló szemléletet vitte a családi
            vállalkozásba is, amelyet 2024 elején vett át apjától és bátyjától. Azóta is ebben a
            szellemiségben vezeti a céget.
          </p>
          <p>
            A terepi felméréseket földmérő mérnök kollégánk végzi, geodéziai és terepi felmérési
            tapasztalattal. A felmérési munkát folyamatorientáltan végezzük: a mérés, az
            adatkezelés és a műszaki egyeztetés a megrendelő saját folyamataihoz igazodik.
          </p>
          <p>
            A megkeresésekre és az ajánlatkérésekre rövid határidőn belül, írásban válaszolunk. A
            kisebb, jól körülhatárolt feladatokat is vállaljuk. A megrendelő adatait és a projekt
            részleteit bizalmasan kezeljük; titoktartási nyilatkozatot kérésre külön aláírunk. A
            feladat igénye szerint más területen dolgozó szakmérnököket vagy további terepi
            felmérő kollégákat is bevonunk.
          </p>
        </div>

        <div className="mt-12">
          <BimLink
            href="/kapcsolat?forras=rolunk"
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Felmérési feladat egyeztetése
          </BimLink>
        </div>
      </div>
    </article>
  );
}
