import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/meglevo-allami-epuletek",
  "Meglévő állami épületek felmérése a 2035-ös határidőhöz | VRGO BIM",
  "Bejárható digitális iker, E57 pontfelhő és partneres IFC meglévő állami épületekhez. A geodéziai ellenőrző mérést a szkennelés nem helyettesíti."
);

export default function ExistingBuildingsPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Meglévő állami épületek: gyors, bejárható alapfelmérés a 2035-ös határidőhöz
          </h1>
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
            kell létrehozni (22. § (2)). A megvalósulási dokumentációhoz a rendelet digitális
            geodéziai ellenőrző mérést ír elő (11. § (2)); azt ez a felmérés nem helyettesíti.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Amit szállítunk</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Bejárható modell, belső és külső terekkel, ha a helyszíni rögzítés mindkettőt magában foglalja.</li>
            <li>E57 pontfelhő, OBJ, XYZ, méretezett alaprajz, ha a csomag tartalmazza.</li>
            <li>IFC a modellező partnerünkkel, az EIR szerinti részletezettségben. Külön ajánlati tétel.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <p className="mt-2">
            010 Meglévő állapot és környezet rögzítése · 190 Megvalósulási dokumentáció előállítása
            · 200 Üzemeltetés és karbantartás. A 190-es eset dokumentációjának geodéziai részét nem
            mi állítjuk ki.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Része, ha kérik</h2>
          <p className="mt-2">
            Az EIR szerinti geodéziai ellenőrző mérés és bekötés, mérési jegyzőkönyvvel. Ha nincs
            saját földmérője, projekt alapon tudunk földmérőt ajánlani, és a mérést vele együtt
            végezni. Állandó földmérő partnerünk jelenleg nincs.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Nem része</h2>
          <p className="mt-2">
            Ingatlan-nyilvántartási földmérés, telekalakítás, kitűzés, geodéziai tervezés és
            szakvélemény. A közbeszerzési EIR megírása és a jogi tanácsadás sem része.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Referencia</h2>
          <p className="mt-2">
            Egyetemi kampusz szkennelt részei egy modellben, 8 külön rögzített modellből, 4
            munkanap.{" "}
            <BimLink href="/referenciak" className="font-semibold text-brand">
              Részletek
            </BimLink>
          </p>
        </section>
        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
        >
          Pilot épület felmérése
        </BimLink>
        <p>A pilot feltételeit az ajánlatban közöljük. Százalékos kedvezményt ezen az oldalon nem hirdetünk.</p>
      </div>
    </article>
  );
}
