import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/referenciak",
  "Referencia: Pannon Egyetem, Zalaegerszeg | VRGO BIM",
  "Saját projekt: több mint 7 hektár, 8 szkennelés, egy összefüggő modell, 4 helyszíni munkanap, 2024 ősz. Független mérés nem készült."
);

export default function ReferencesPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Referenciák</h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <h2 className="text-2xl font-semibold text-foreground">
          Pannon Egyetem, Zalaegerszegi Kampusz
        </h2>
        <p>
          2024 ősz, 4 helyszíni munkanap, 8 különálló szkennelés, egy összefüggő modell, több mint
          7 hektár. A számok a VRGO saját projektadatai. Független mérés nem készült.
        </p>
        <p>
          A név azért szerepel, mert ugyanez a munka a vrgo.hu főoldalán is névvel, beágyazott
          túrával látható. További megbízót csak a jóváhagyása után nevezünk meg.
        </p>
        <div
          className="relative w-full overflow-hidden rounded-md border border-border bg-black"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            title="Pannon Egyetem Zalaegerszeg — Matterport túra"
            src="https://my.matterport.com/show/?m=pruUjt76nQU&ts=1"
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; vr"
            allowFullScreen
            loading="lazy"
            className="absolute left-0 top-0 h-full w-full border-0"
          />
        </div>
      </div>
    </article>
  );
}
