import { budapestToday } from "@/lib/bim-articles";
import { bimLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export function CaseStudySection({ className }: { className?: string }) {
  const studyHref =
    budapestToday() >= "2027-01-14"
      ? bimLink("/cikkek/esettanulmany-pannon-egyetem-zalaegerszeg", "fooldal-esettanulmany")
      : bimLink("/referenciak", "fooldal-esettanulmany");

  return (
    <section
      id="esettanulmany"
      className={cn("scroll-mt-20 bg-secondary py-12 sm:py-16", className)}
    >
      <div className="mx-auto max-w-3xl px-4 sm:max-w-4xl sm:px-6">
        <h2 className="max-w-2xl text-xl font-semibold sm:text-2xl md:text-3xl">
          Esettanulmány — Pannon Egyetem, Zalaegerszegi Kampusz
        </h2>
        <div className="section-rule mx-0" />

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            <strong className="text-foreground">Megrendelő:</strong> Pannon Egyetem — Zalaegerszegi
            Kampusz. <span className="text-foreground">Helyszíni munka:</span> 2024 ősz, 4 munkanap.
          </p>
          <p>
            <strong className="text-foreground">Kihívás:</strong> Több épületből és külső területből
            álló kampusz — oktatási épületek, külső homlokzatok, közlekedési útvonalak, sportpálya
            és napelempark. A kampusz területe több mint 7 hektár. Egyetlen felvételi egységben nem
            rögzíthető, a beltér és a kültér egy összefüggő bejárást igényelt.
          </p>
          <p>
            <strong className="text-foreground">Megoldás:</strong> 4 munkanap alatt 8 külön modell
            készült a kampusz eltérő zónáiról. Ezeket egyetlen, folyamatos{" "}
            <strong className="text-foreground">túrává</strong> illesztettük össze — a külső
            homlokzatokkal és a napelempark látható felületével együtt. Az összefűzött modell 891
            szkennelési pontot tartalmaz. A túra alább megnyitható.
          </p>
        </div>

        <div className="mt-8">
          <div
            className="relative w-full overflow-hidden rounded-md border border-brand/40 bg-black/40 shadow-lg"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              title="VRGO — Matterport bemutató túra (Pannon Egyetem Zalaegerszeg)"
              src="https://my.matterport.com/show/?m=pruUjt76nQU&ts=1"
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; vr"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full border-0"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Referencia: Pannon Egyetem — Zalaegerszegi Kampusz (8 külön modell, egy túra).{" "}
            <a
              href={studyHref}
              className="font-semibold text-brand underline underline-offset-2"
            >
              Részletes esettanulmány →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
