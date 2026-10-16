import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata, MAIN_ORIGIN } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/tervezoknek",
  "Szkennelés alvállalkozóként tervezőknek | VRGO BIM",
  "Helyszíni rögzítés tervezőirodáknak és BIM-modellezőknek. E57, OBJ, XYZ és alaprajz. Az átfutási idő és az ár az ajánlatban van."
);

export default function DesignersPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Szkennelés alvállalkozóként tervezőknek és BIM-modellezőknek
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">
            Tervezőirodák, BIM-managerek, generáltervezők, akik meglévő épületre készítenek modellt.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kapnak</h2>
          <p className="mt-2">
            Helyszíni rögzítés a megadott szempontok szerint. Ha az EIR tartalmazza, a
            koordináta-rendszert és a fájlnevezést az 1. melléklet 3.3–3.4 pontjai szerint vesszük
            figyelembe. Átadjuk az E57, OBJ, XYZ fájlt és az alaprajzot, ha a megrendelés
            tartalmazza. Az átfutási időt az ajánlat rögzíti; általános napra szóló ígéretet nem
            teszünk.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Üzleti modell</h2>
          <p className="mt-2">
            Alvállalkozói szerződés. Az ár négyzetméter-alapú vagy projektár, a végleges összeget
            az épület jellege szerint az ajánlat tartalmazza. Díjtételt ezen az oldalon nem
            közlünk. A szkennelés és az EIR szerinti ellenőrző mérés egy ajánlatban kérhető: ha
            nincs saját földmérője, projekt alapon tudunk földmérőt ajánlani.
          </p>
        </section>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`${MAIN_ORIGIN}/partner/login`}
            className="inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand"
          >
            Partner belépés
          </a>
          <BimLink
            href="/ajanlatkeres"
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
          >
            Beszélgessünk egy közös pilotról
          </BimLink>
        </div>
        <p className="text-xs">A partnerbelépés a vrgo.hu oldalon van.</p>
      </div>
    </article>
  );
}
