import type { Metadata } from "next";
import Link from "next/link";

import { bimLink } from "@/lib/links";

export const metadata: Metadata = {
  title: 'Ipari digitális iker — gyár, csarnok, IoT integráció | VRGO',
  description: 'Gyártócsarnokok, raktárak, ipari telephelyek 3D digitális ikre. E57, OBJ és XYZ export, ha a csomag tartalmazza. Kész IoT-csatlakozót nem szállítunk.',
};

const usecases = [
  {
    title: "BIM koordináció és as-built dokumentáció",
    desc: "E57, OBJ, XYZ pontfelhő export — Revit, ArchiCAD, Navisworks workflow. Tervezett és a megvalósult állapot összehasonlítása.",
    href: bimLink("/", "ipar-csempe"),
  },
  {
    title: "Állapot és hibajelölés",
    desc: "Időbélyegzett szken. Repedés, korrózió vagy szivárgás a modellen kézi Mattertaggel jelölhető. Automatikus hibafelismerés nincs a csomagban.",
  },
  {
    title: "Property Intelligence és mérhetőség",
    desc: "Terület, magasság és távolság a 3D-modellből mérhető. Geodéziai pontossági tanúsítvány csak akkor készül, ha az ajánlat külön kéri.",
  },
  {
    title: "Beüzemelés és átadás-átvétel",
    desc: "Generálkivitelező és megrendelő közös referencia: mit, hol, milyen állapotban adtunk át.",
  },
  {
    title: "Karbantartás, üzemeltetés (CMMS)",
    desc: "Mattertaggel jelölt eszközök, kézi karbantartási megjegyzés és csatolt dokumentum. Élő szenzor-adatfolyamot nem szállítunk.",
  },
  {
    title: "Biztosítási kárrendezés",
    desc: "Káresemény előtti állapot rögzítése, időbélyeggel. A kárrendezés menetét a biztosító eljárása határozza meg.",
  },
];

const exports = [
  "E57 pontfelhő — ha a megrendelt Matterport-csomag tartalmazza",
  "XYZ pontfelhő",
  "OBJ mesh",
  "Méretezett alaprajz PDF-ben, ha a csomag tartalmazza",
  "Bejárható túra URL-je, külső rendszerbe linkelhető",
  "Mattertag: kézi jelölés szöveggel, fotóval vagy hivatkozással",
];

export default function IpariPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Ipar · Gyártás · IoT · BIM
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Gyár, csarnok, telephely — digitális ikerben
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            3D-felmérés és BIM-export (E57, OBJ, XYZ), ha a csomag tartalmazza. A pontfelhő
            fájlként átadható. Kész Azure- vagy AWS-csatlakozót nem szállítunk.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Helyszín-felmérés igénylése
            </Link>
            <Link
              href="/csomagok"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              ENTERPRISE csomag
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2">
          <figure className="relative overflow-hidden rounded-md border border-border bg-black shadow-sm">
            <video
              src="/media/long-intro.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-[220px] w-full object-cover sm:h-[300px]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Ipari bemutató · részletes bejárás
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-md border border-border shadow-sm">
            <img
              src="/media/retail-shelves.jpg"
              alt="Kiskereskedelmi polcrendszer — Property Intelligence pontmérés"
              loading="lazy"
              className="h-[220px] w-full object-cover sm:h-[300px]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Polctérkép · Property Intelligence
            </figcaption>
          </figure>
        </div>
      </section>


      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">Hat ipari felhasználás</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {usecases.map((u) => {
              const body = (
                <>
                  <h3 className="text-lg font-semibold">{u.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
                  {"href" in u && u.href ? (
                    <span className="mt-3 block text-xs font-semibold text-brand">Részletek a BIM-oldalon →</span>
                  ) : null}
                </>
              );
              if ("href" in u && u.href) {
                return (
                  <a
                    key={u.title}
                    href={u.href}
                    className="block rounded-md border border-border bg-card p-6 shadow-sm transition hover:border-brand hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {body}
                  </a>
                );
              }
              return (
                <article key={u.title} className="rounded-md border border-border bg-card p-6 shadow-sm">
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">Amit a szkenből átadunk</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exports.map((i) => (
              <li key={i} className="rounded-md border border-border bg-card px-4 py-3 text-sm font-medium">
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Revit, ArchiCAD vagy más BIM-szoftver akkor tudja beolvasni a fájlt, ha az adott
            program az exportált formátumot fogadja. Tanúsított csatlakozót nem szállítunk.
          </p>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">ENTERPRISE projekt</h2>
          <p className="mt-3 opacity-90">
            Ipari terület, BIM-export és kézi hibajelölés. Strukturált űrlapon
            kérheti.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            ENTERPRISE igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
