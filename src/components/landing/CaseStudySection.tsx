import { cn } from "@/lib/utils";

/** Kompakt referencia-blokk — szám- és történetmentes. */
export function CaseStudySection({ className }: { className?: string }) {
  return (
    <section
      id="kiemelt-referencia"
      className={cn("scroll-mt-20 bg-secondary py-10 sm:py-12", className)}
    >
      <div className="mx-auto max-w-3xl px-4 sm:max-w-4xl sm:px-6">
        <h2 className="text-center text-lg font-semibold sm:text-xl">
          Pannon Egyetem – Zalaegerszegi Kampusz
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Kiemelt referenciánk. Nyissa meg a túrát.
        </p>
        <div className="mt-6">
          <div
            className="relative w-full overflow-hidden rounded-md border border-brand/40 bg-black/40 shadow-lg"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              title="VRGO — Pannon Egyetem Zalaegerszeg bejárható 3D túra"
              src="https://my.matterport.com/show/?m=pruUjt76nQU&ts=1"
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; vr"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
