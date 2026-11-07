import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimLink, BimPhoneLink } from "@/components/bim/BimChrome";
import { BimResidentialForm } from "@/components/bim/BimResidentialForm";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/lakossagnak",
  "Lakás- és házfelmérés lézerszkennerrel | VRGO BIM",
  "Tetőtér-beépítés, felújítás vagy átépítés előtt pontos alaprajz lézerszkennerrel. Egy bejárás, tervezőnek használható anyag."
);

/**
 * Legacy URL — tartalom megmarad.
 * A menü a /szolgaltatasok/lakas-es-hazfelmeres oldalt preferálja.
 */
export default function ResidentialLegacyPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/szolgaltatasok", label: "Szolgáltatások" },
              { label: "Lakosságnak" },
            ]}
          />
          <h1 className="text-3xl font-bold sm:text-4xl">
            Lakás, ház, telek felmérése lézerszkennerrel – pontos alaprajz felújításhoz és
            tervezéshez
          </h1>
          <p className="mt-4 max-w-3xl text-sm opacity-90 sm:text-base">
            A részletes szolgáltatáslap:{" "}
            <BimLink
              href="/szolgaltatasok/lakas-es-hazfelmeres"
              className="underline underline-offset-2"
            >
              Lakás- és házfelmérés
            </BimLink>
            .
          </p>
          <BimPhoneLink
            forras="lakossagnak"
            className="mt-5 inline-flex rounded-md border-2 border-white px-5 py-2.5 text-sm font-semibold"
          />
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor jó ez?</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>felújítás előtt</li>
            <li>tetőtér-beépítésnél</li>
            <li>régi házhoz, amelynek nincs meg a terve</li>
            <li>belsőépítészeti vagy gépészeti tervezéshez</li>
            <li>bővítés, átalakítás előtt</li>
            <li>telek, kert, tető drónos felméréséhez</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kap?</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Alaprajz és metszet (PDF, DWG)</li>
            <li>Bejárható pontfelhő-nézet kérésre</li>
            <li>Mért méretek, amelyeket a tervező használni tud</li>
            <li>Kérésre 3D modell (külön tételként)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Hogyan zajlik?</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Megadja a címet, a célt és a méretet.</li>
            <li>Egyeztetünk időpontot; a helyszínen jellemzően egy bejárás elég.</li>
            <li>Átadjuk az anyagot a megbeszélt formátumban.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mennyibe kerül?</h2>
          <p className="mt-2">
            Kérjen ajánlatot a méret alapján. A díjszerkezet magyarázata:{" "}
            <BimLink href="/arak-es-folyamat" className="font-semibold text-brand">
              Árak és folyamat
            </BimLink>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Fontos tudni</h2>
          <p className="mt-2">
            Ha a felmérést hatósági eljáráshoz vagy földhivatali ügyintézéshez szeretné használni,
            jelezze előre: ez földmérői feladat, és külön egyeztetjük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Érdeklődés — 4 mező</h2>
          <p className="mt-2 mb-4">
            Mondja el, melyik ingatlanról van szó, és megmondjuk, mit érdemes felmérni, mennyiért.
          </p>
          <BimResidentialForm sourceDefault="lakossagnak" />
        </section>
      </div>
    </article>
  );
}
