import { cn } from "@/lib/utils";

export function CaseStudySection({ className }: { className?: string }) {
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
            <strong className="text-foreground">Kihívás:</strong> Több mint 7 hektáros, többépületes
            kampusz — oktatási épületek teljes külső homlokzatokkal, közlekedési útvonalak,
            sportpálya és kiépített napelempark. Egyetlen Matterport-szken léptékben kezelhetetlen,
            ráadásul a beltér és a kültér is egyetlen, összefüggő bejárást igényelt.
          </p>
          <p>
            <strong className="text-foreground">Megoldás:</strong> 4 munkanap alatt 8 különálló,
            gondosan kalibrált Matterport-szken készült a kampusz eltérő zónáiról. Ezeket egyetlen,
            folyamatos <strong className="text-foreground">digitális ikerré</strong> illesztettük
            össze — beleértve a teljes külső homlokzatokat és a napelempark felmérést is. A
            végeredmény a Matterport felhőben mindössze 4 Pro túra tárhelyét foglalja.
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
            Referencia: Pannon Egyetem — Zalaegerszegi Kampusz (8 szken → 1 túra)
          </p>
        </div>
      </div>
    </section>
  );
}
