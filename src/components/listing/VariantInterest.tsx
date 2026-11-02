import Link from "next/link";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import { VARIANT_OFFER, type ListingVariant } from "@/lib/listing";

const GDPR =
  "Adatvédelem: Semmihez sem gyűjtöm és nem adom át harmadik félnek a megismert adataidat. Azokat kizárólag az érdeklődésed miatti kapcsolattartásra használom a potenciális üzlet reményében. Sikeres vagy sikertelen kimenetel esetén is törlöm az érdeklődők adatait legkésőbb 30 napon belül, ahogy a hirdetésemet is törlöm.";

export function VariantInterest({ variant }: { variant: ListingVariant }) {
  const selected = VARIANT_OFFER[variant];
  const other: ListingVariant = variant === "a" ? "b" : "a";
  const otherOffer = VARIANT_OFFER[other];

  return (
    <div className="min-h-screen bg-[#f3f0e8] text-[#1c1915]">
      <header className="border-b border-[#e4dfd4] bg-[#f3f0e8]/95">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-sm font-semibold tracking-wide">Kismaros · Börzsönyliget</p>
          <Link href="/hirdetes#valtozatok" className="text-sm hover:underline">
            Vissza a hirdetéshez
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.16em] text-[#6b6458]">Érdeklődés · {selected.short}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-medium sm:text-4xl">{selected.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
          Ugyanaz a telek (1046 m²) és ugyanaz a felépítmény. Az alábbi számok a kiválasztott változathoz tartoznak; az összehasonlítás a másik ágat is mutatja.
        </p>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-[#e4dfd4] border-l-4 border-l-[#6d8a5a] bg-white p-5 lg:col-span-2">
            <h2 className="text-xl font-medium">Ajánlat — {selected.short}</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-[#6b6458]">Irányár</dt>
                <dd className="mt-1 text-2xl font-medium">{selected.listPrice}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-[#6b6458]">Padlóár</dt>
                <dd className="mt-1 text-2xl font-medium">{selected.floorPrice}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-[#6b6458]">Telek / négyzetméter</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#4a453c]">
                  {VARIANT_OFFER.plotSqm} m² hivatalos telek. {selected.perSqm}.
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-[#4a453c]">{selected.summary}</p>
          </article>

          <article className="rounded-lg border border-[#e4dfd4] bg-white p-5">
            <h2 className="text-lg font-medium">Rövid adatok</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4a453c]">
              <li>Lke-4, 30% beépíthetőség</li>
              <li>Változtatási tilalom nem érinti</li>
              <li>Natura 2000-es ősfás tölgyes</li>
              <li>Bekötött villany, vezetékes víz</li>
              <li>Azonnal használható felépítmény</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 overflow-hidden rounded-lg border border-[#e4dfd4] bg-white">
          <div className="border-b border-[#e4dfd4] px-5 py-4">
            <h2 className="text-xl font-medium">Árösszehasonlítás</h2>
            <p className="mt-1 text-sm text-[#4a453c]">
              A két változat közötti különbség irányáron és padlón is {VARIANT_OFFER.premiumDiff}.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[#f3f0e8] text-xs uppercase tracking-wide text-[#6b6458]">
                <tr>
                  <th className="px-5 py-3 font-medium">Változat</th>
                  <th className="px-5 py-3 font-medium">Irányár</th>
                  <th className="px-5 py-3 font-medium">Padló</th>
                  <th className="px-5 py-3 font-medium">Használat</th>
                </tr>
              </thead>
              <tbody>
                <tr className={variant === "a" ? "bg-[#eef3ea]" : ""}>
                  <td className="border-t border-[#e4dfd4] px-5 py-3 font-medium">
                    A) korlátozással{variant === "a" ? " · Ön ezt nézi" : ""}
                  </td>
                  <td className="border-t border-[#e4dfd4] px-5 py-3">{VARIANT_OFFER.a.listPrice}</td>
                  <td className="border-t border-[#e4dfd4] px-5 py-3">{VARIANT_OFFER.a.floorPrice}</td>
                  <td className="border-t border-[#e4dfd4] px-5 py-3 text-[#4a453c]">
                    Rövid távú szállás tilos · kötbér {VARIANT_OFFER.penalty}
                  </td>
                </tr>
                <tr className={variant === "b" ? "bg-[#eef3ea]" : ""}>
                  <td className="border-t border-[#e4dfd4] px-5 py-3 font-medium">
                    B) korlátozás nélkül{variant === "b" ? " · Ön ezt nézi" : ""}
                  </td>
                  <td className="border-t border-[#e4dfd4] px-5 py-3">{VARIANT_OFFER.b.listPrice}</td>
                  <td className="border-t border-[#e4dfd4] px-5 py-3">{VARIANT_OFFER.b.floorPrice}</td>
                  <td className="border-t border-[#e4dfd4] px-5 py-3 text-[#4a453c]">Teljes szerződéses szabadság</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="border-t border-[#e4dfd4] px-5 py-3 text-xs leading-relaxed text-[#6b6458]">
            Tájékoztató jellegű számok. A végleges feltételeket ügyvéddel rögzítjük. Felmentés az A változatból: {VARIANT_OFFER.releaseFee}.
          </p>
        </section>

        <p className="mt-4 text-sm text-[#4a453c]">
          A másik ág:{" "}
          <Link href={`/hirdetes/erdeklodes/${other}`} className="font-semibold underline">
            {otherOffer.title}
          </Link>
        </p>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-medium">Kapcsolatfelvétel</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4a453c] sm:text-base">
              Az űrlap a {selected.short.toLowerCase()} érdeklődést jelöli. Helyszíni megtekintés, dokumentumok és a szerződéses részletek egyeztethetők.
            </p>
          </div>
          <div className="rounded-lg border border-[#e4dfd4] bg-white p-5 sm:p-6">
            <EnquiryForm
              variant={variant}
              defaultMessage={`Érdeklődöm a ${variant.toUpperCase()} változatra (${selected.short.toLowerCase()}).`}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e4dfd4] px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center text-xs leading-relaxed text-[#6b6458]">
          <p>Az oldalon szereplő adatok tájékoztató jellegűek, a hivatalos dokumentumok az irányadók.</p>
          <p>{GDPR}</p>
        </div>
      </footer>
    </div>
  );
}
