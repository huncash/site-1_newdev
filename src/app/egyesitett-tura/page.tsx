import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Extra nagy egyesített túra — több hektár, egy bejárás | VRGO",
  description:
    "Több különálló Matterport-szken egyetlen, folytonosan bejárható túrává illesztve — akár fizikailag elkülönülő helyszínek összekapcsolásával. Pannon Egyetem Zalaegerszeg: 8 szken → 1 túra, 7+ hektár.",
};

const facts = [
  {
    metric: "7+ ha",
    label: "Egybefüggő, bejárható kampuszterület — beltér + kültér",
  },
  {
    metric: "8 → 1",
    label: "Nyolc különálló szken egyetlen egyesített túrává illesztve",
  },
  {
    metric: "4 Pro slot",
    label: "Tárhely-igény a felhőben, 0–24 elérhető",
  },
] as const;

const useCases = [
  {
    title: "Egyetemi kampusz vagy iskolaegyüttes",
    text: "Több épület, beltér + külső homlokzatok, parkoló, sportpálya, akár napelempark egyetlen bejárható túrában.",
  },
  {
    title: "Gyártócsarnok és telephely",
    text: "Összefüggő ipari terület BIM és Property Intelligence szempontból egységesen kezelve.",
  },
  {
    title: "Ingatlanportfólió FM-célra",
    text: "Több önálló épület, közös karbantartási és bérbeadási platform.",
  },
  {
    title: "Fizikailag különálló helyszínek",
    text: "Két-három, akár utca-, város- vagy országhatárral elválasztott telephely egyetlen, kontextusban tartott digitális ikerként.",
  },
  {
    title: "Múzeum, kulturális örökség, rendezvényhelyszín",
    text: "Összetett, sok teremes látogatói élmény egy linken.",
  },
  {
    title: "Energetikai infrastruktúra",
    text: "Napelempark, transzformátor-állomás, tetőfelület-felmérés a kapcsolódó épületekkel egy összefüggő digitális ikerben.",
  },
] as const;

export default function EgyesitettTuraPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand sm:text-xs">
            Extra nagy egyesített túra · Multi-scan workflow
          </span>
          <h1 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-snug sm:text-3xl md:text-4xl">
            Több szken. Egy túra. Hektáros lépték.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-90 sm:text-base md:text-lg">
            Több, külön rögzített Matterport-szken egyetlen, folytonosan bejárható{" "}
            <strong className="font-semibold text-brand">egyesített túrává</strong> olvasztható
            össze — épületek, külső homlokzatok, parkolók, sportpálya és akár napelempark is egyben.
            Akár fizikailag különálló helyszínek (pl. két telephely) is egyetlen URL alatt
            megjeleníthetők. Magyarországon ezt a képességet kevesen kínálják professzionálisan; a
            VRGO 2016 óta dolgozik a Matterporttal és bizonyítottan használja kampusz-léptékben.
          </p>
        </div>
      </section>

      {/* Matterport bemutató — Pannon Egyetem zalaegerszegi kampusza */}
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
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
          <p className="mt-3 text-center text-xs opacity-70">
            Referencia: Pannon Egyetem — Zalaegerszegi Kampusz (8 szken → 1 egyesített túra)
          </p>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-md border border-border bg-card p-5 text-center shadow-sm sm:p-6"
              >
                <div className="text-2xl font-bold text-brand sm:text-3xl">{f.metric}</div>
                <div className="mt-2 text-xs text-muted-foreground sm:text-sm">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10 sm:py-14">
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
            <p>
              <strong className="text-foreground">Eredmény:</strong> Egyetlen URL, 0–24 elérhető,
              amit a kampusz felvételi, nyílt nap, akkreditációs dokumentáció, létesítménygazdálkodás
              (FM), valamint a napelempark műszaki és energetikai dokumentációja céljából egyaránt
              használhat. Hallgatók, partnerek, szakértők és külföldi érdeklődők is megnyithatják —
              utazás nélkül.
            </p>
            <p className="rounded-md border border-border bg-card p-4 text-foreground">
              <strong>Miért érdemes ezt minden egyetemnek megfontolnia?</strong> Az intézmény 0–24
              elérhető, mérhető, hivatkozható és tovább bővíthető digitális vagyontárgyat kap.
              Dokumentáció, kommunikáció és FM egyetlen eszközben.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:max-w-4xl sm:px-6">
          <h2 className="mx-auto max-w-xl text-center text-xl font-semibold sm:text-2xl md:text-3xl">
            Mikor érdemes egyesített túrát kérni?
          </h2>
          <div className="section-rule" />
          <ul className="mt-8 space-y-3 sm:space-y-4">
            {useCases.map((item) => (
              <li
                key={item.title}
                className="rounded-md border border-border bg-card p-4 text-sm sm:text-base"
              >
                <strong className="text-foreground">{item.title}</strong>
                <span className="text-muted-foreground"> — {item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-14">
        <div className="mx-auto max-w-xl px-4 text-center sm:max-w-2xl sm:px-6">
          <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">Egyesített túra igénylése</h2>
          <p className="mt-3 text-sm opacity-90 sm:text-base">
            Több helyszín, több szken — egyetlen összefüggő túra. Az ajánlatkérő űrlapon kérhető, TWIN
            vagy ENTERPRISE csomag keretében.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles?csomag=TWIN"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
            >
              Időpont és csomag igénylése
            </Link>
            <Link
              href="/csomagok"
              className="text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              Csomagok megtekintése
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
