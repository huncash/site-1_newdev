import Link from "next/link";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import { ListingPhoneProvider, ListingSellerCard } from "@/components/listing/ListingContact";
import { VARIANT_OFFER, type ListingVariant } from "@/lib/listing";

const GDPR =
  "Adatvédelem: Semmihez sem gyűjtöm és nem adom át harmadik félnek a megismert adataidat. Azokat kizárólag az érdeklődésed miatti kapcsolattartásra használom a potenciális üzlet reményében. Sikeres vagy sikertelen kimenetel esetén is törlöm az érdeklődők adatait legkésőbb 30 napon belül, ahogy a hirdetésemet is törlöm.";

export function VariantInterest({ variant }: { variant: ListingVariant }) {
  const selected = VARIANT_OFFER[variant];
  const other: ListingVariant = variant === "a" ? "b" : "a";
  const otherOffer = VARIANT_OFFER[other];

  return (
    <ListingPhoneProvider>
      <div className="min-h-screen bg-[#efe8db] text-[#241f18]">
        <header className="border-b border-[#d4c9b5] bg-[#efe8db]/95">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm font-semibold tracking-wide">Kismaros · Börzsönyliget</p>
            <Link href="/hirdetes#valtozatok" className="text-sm hover:underline">
              Vissza a hirdetéshez
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm uppercase tracking-[0.16em] text-[#6b6154]">Érdeklődés · {selected.short}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-medium sm:text-4xl">{selected.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            Ugyanaz a telek ({VARIANT_OFFER.plotSqm} m²) és ugyanaz a felépítmény. Pozitív keret: nyugalom kedvezményes
            irányárral, vagy szabadabb / üzleti út standard áron.
          </p>

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#f7f1e6] p-5 lg:col-span-2">
              <h2 className="text-xl font-medium">Ajánlat — {selected.short}</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Irányár</dt>
                  <dd className="mt-1 text-2xl font-medium text-[#d4a017]">{selected.listPrice}</dd>
                  <dd className="mt-1 text-xs text-[#6b6154]">{selected.bandNote}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Irányár / m²</dt>
                  <dd className="mt-1 text-lg font-medium leading-snug text-[#d4a017]">{selected.perSqm}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Telek</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#5a5146]">
                    {VARIANT_OFFER.plotSqm} m² hivatalos telekterület, plusz kb. 150 m² önkormányzati/használati sáv.
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#5a5146]">{selected.summary}</p>
            </article>

            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h2 className="text-lg font-medium">Rövid adatok</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5a5146]">
                <li>Lke-4 · max. 30% · max. 4,5 m</li>
                <li>Változtatási tilalom nem érinti (8/2025.)</li>
                <li>Részleges közmű / zárt szennyvíztároló</li>
                <li>Bekötött villany, vezetékes víz</li>
                <li>Azonnal használható felépítmény</li>
              </ul>
            </article>
          </section>

          <section className="mt-8 overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
            <div className="border-b border-[#d4c9b5] px-5 py-4">
              <h2 className="text-xl font-medium">A két út számszerűen</h2>
              <p className="mt-1 text-sm text-[#5a5146]">{VARIANT_OFFER.premiumNote}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-[#efe8db] text-xs uppercase tracking-wide text-[#6b6154]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Út</th>
                    <th className="px-5 py-3 font-medium">Irányár</th>
                    <th className="px-5 py-3 font-medium">Lényeg</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={variant === "a" ? "bg-[#f5edd4]" : ""}>
                    <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium">
                      A) magáncél · nyugalom{variant === "a" ? " · Ön ezt nézi" : ""}
                    </td>
                    <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium text-[#d4a017]">
                      {VARIANT_OFFER.a.listPrice}
                    </td>
                    <td className="border-t border-[#d4c9b5] px-5 py-3 text-[#5a5146]">
                      Kedvezményes · {VARIANT_OFFER.discountNote} a standardhoz képest · zsákutca csendje
                    </td>
                  </tr>
                  <tr className={variant === "b" ? "bg-[#f5edd4]" : ""}>
                    <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium">
                      B) üzleti · szabadabb{variant === "b" ? " · Ön ezt nézi" : ""}
                    </td>
                    <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium text-[#d4a017]">
                      {VARIANT_OFFER.b.listPrice}
                    </td>
                    <td className="border-t border-[#d4c9b5] px-5 py-3 text-[#5a5146]">
                      +{VARIANT_OFFER.premiumDiff} · szabadabb használat ellenértéke (vételár része)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="border-t border-[#d4c9b5] px-5 py-3 text-xs leading-relaxed text-[#6b6154]">
              Tájékoztató irányárak. A végleges feltételeket ügyvéddel rögzítjük.
            </p>
          </section>

          <section className="mt-8 rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 sm:p-6">
            <h2 className="text-xl font-medium">Környéki kontextus</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">{VARIANT_OFFER.marketNote}</p>
          </section>

          <p className="mt-4 text-sm text-[#5a5146]">
            A másik ág:{" "}
            <Link href={`/hirdetes/erdeklodes/${other}`} className="font-semibold underline">
              {otherOffer.title} ({otherOffer.listPrice})
            </Link>
          </p>

          <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-2xl font-medium">Kapcsolatfelvétel</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">
                Az űrlap a {selected.short.toLowerCase()} érdeklődést jelöli. Vagy jelenítse meg a telefonszámot
                spamvédelemmel, illetve írjon emailt.
              </p>
              <ListingSellerCard />
            </div>
            <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 sm:p-6">
              <EnquiryForm
                variant={variant}
                defaultMessage={`Érdeklődöm a ${variant.toUpperCase()} változatra (${selected.short.toLowerCase()}, irányár ${selected.listPrice}).`}
              />
            </div>
          </section>
        </main>

        <footer className="border-t border-[#d4c9b5] px-4 py-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center text-xs leading-relaxed text-[#6b6154]">
            <p>Az oldalon szereplő adatok tájékoztató jellegűek, a hivatalos dokumentumok az irányadók.</p>
            <p>{GDPR}</p>
          </div>
        </footer>
      </div>
    </ListingPhoneProvider>
  );
}
