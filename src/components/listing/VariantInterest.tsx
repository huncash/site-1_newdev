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
          Ugyanaz a telek ({VARIANT_OFFER.plotSqm} m²) és ugyanaz a felépítmény. Az oldalon a kétágú konstrukció elve
          szerepel; vételár vagy belső számítás nincs.
        </p>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#f7f1e6] p-5 lg:col-span-2">
            <h2 className="text-xl font-medium">A konstrukció — {selected.short}</h2>
            <dl className="mt-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Telek</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#5a5146]">
                  {VARIANT_OFFER.plotSqm} m² hivatalos telekterület, plusz kb. 150 m² használati rész a beállóhoz.
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-[#5a5146]">{selected.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#5a5146]">
              Az ajánlati feltételeket és a végleges vételárat személyes egyeztetésen, ügyvéddel rögzítjük.
            </p>
          </article>

          <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
            <h2 className="text-lg font-medium">Rövid adatok</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5a5146]">
              <li>Lke-4, 30% beépíthetőség</li>
              <li>Változtatási tilalom nem érinti</li>
              <li>Natura 2000-es ősfás tölgyes</li>
              <li>Bekötött villany, vezetékes víz</li>
              <li>Azonnal használható felépítmény</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
          <div className="border-b border-[#d4c9b5] px-5 py-4">
            <h2 className="text-xl font-medium">A két út elve</h2>
            <p className="mt-1 text-sm text-[#5a5146]">
              Ugyanaz a telek, két szerződéses keret — összeg, ársáv vagy belső számítás nélkül.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-[#efe8db] text-xs uppercase tracking-wide text-[#6b6154]">
                <tr>
                  <th className="px-5 py-3 font-medium">Út</th>
                  <th className="px-5 py-3 font-medium">Lényeg</th>
                </tr>
              </thead>
              <tbody>
                <tr className={variant === "a" ? "bg-[#f5edd4]" : ""}>
                  <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium">
                    A) magáncél, nyugalom{variant === "a" ? " · Ön ezt nézi" : ""}
                  </td>
                  <td className="border-t border-[#d4c9b5] px-5 py-3 text-[#5a5146]">
                    Szerződéses vállalás: nincs rövid távú / kereskedelmi szállásadás; lakhatás, pihenés, home office és
                    hosszú távú bérbeadás szabad
                  </td>
                </tr>
                <tr className={variant === "b" ? "bg-[#f5edd4]" : ""}>
                  <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium">
                    B) korlátozás nélkül{variant === "b" ? " · Ön ezt nézi" : ""}
                  </td>
                  <td className="border-t border-[#d4c9b5] px-5 py-3 text-[#5a5146]">
                    Nincs eladói használati korlátozás a szerződésben; a hatályos jogszabályok és a helyi építési
                    szabályzat továbbra is érvényesek
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="border-t border-[#d4c9b5] px-5 py-3 text-xs leading-relaxed text-[#6b6154]">
            A végleges feltételeket ügyvéddel rögzítjük. Nyilvános oldalon vételár vagy belső számítás nem szerepel.
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 sm:p-6">
          <h2 className="text-xl font-medium">Környéki kontextus</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">{VARIANT_OFFER.marketNote}</p>
        </section>

        <p className="mt-4 text-sm text-[#5a5146]">
          A másik ág:{" "}
          <Link href={`/hirdetes/erdeklodes/${other}`} className="font-semibold underline">
            {otherOffer.title}
          </Link>
        </p>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-medium">Kapcsolatfelvétel</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">
              Az űrlap a {selected.short.toLowerCase()} érdeklődést jelöli. Helyszíni megtekintés, dokumentumok és a
              szerződéses részletek egyeztethetők.
            </p>
          </div>
          <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 sm:p-6">
            <EnquiryForm
              variant={variant}
              defaultMessage={`Érdeklődöm a ${variant.toUpperCase()} változatra (${selected.short.toLowerCase()}).`}
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
  );
}
