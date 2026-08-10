import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Egyetem és kampusz digitális ikre — VRGO Matterport megoldás',
  description: 'Teljes kampusz egyetlen virtuális túrában az Összefűzés kiegészítő szolgáltatással. Pannon Egyetem Zalaegerszeg: 7+ ha, 8 szken → 1 túra.',
};

const usecases = [
  {
    title: "Felvételi és nyílt nap online",
    desc: "A jelentkezők bárhonnan bejárhatják a kampuszt — többszörös konverzió a hagyományos fotó-galériához képest.",
  },
  {
    title: "Labor- és műhelybemutató",
    desc: "Mérőműszerek, eszközök Mattertaggel jelölve: jegyzetek, videók, PDF-ek és linkek a 3D pontján.",
  },
  {
    title: "Akkreditációs és pályázati dokumentáció",
    desc: "Mérhető alaprajz (E57/OBJ/floorplan) és időbélyegzett digitális iker — ellenőrizhető, megosztható, archiválható.",
  },
  {
    title: "Alumni és nemzetközi kapcsolatok",
    desc: "Külföldi hallgatók, partneregyetemek, ERASMUS jelentkezők számára full-immersion bemutató — angol nyelvű címkékkel.",
  },
  {
    title: "Facility és karbantartás",
    desc: "Tantermek, gépészet és infrastruktúra állapotrögzítés — átadás-átvétel és kárrendezés gyorsítva.",
  },
  {
    title: "Időszaki rendezvények, kiállítások",
    desc: "Konferencia, projektzáró, hallgatói kiállítás digitális dokumentációja — örökre megőrizve.",
  },
];

const proof = [
  { metric: "7+ ha", label: "Egyetlen összefűzött túra — Pannon Egyetem, Zalaegerszegi Kampusz" },
  { metric: "8 → 1", label: "Nyolc különálló szken egyetlen hivatkozással bejárható túrává fűzve" },
  { metric: "4 Pro slot", label: "Felhő-tárhely, 0–24 elérhető" },
];

export default function OktatasPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Oktatás · Felsőoktatás · Kampusz
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Egész kampusz egyetlen virtuális túrában
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            A Pannon Egyetem Zalaegerszegi Kampusza, az ELTE LRG és a MATE Budai Campus már így
            használja. Az „Összefűzés" kiegészítő szolgáltatással több különálló Matterport-szken
            egyetlen, folyamatos digitális ikerré olvad — egy hivatkozás, egy bejárás: felvételi,
            akkreditáció, alumni és nemzetközi együttműködés.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kampusz felmérés igénylése
            </Link>
            <Link
              href="/egyesitett-tura"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              Egyesített túra részletei
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto max-w-6xl px-4">
          <figure className="relative overflow-hidden rounded-md border border-border shadow-sm">
            <img
              src="/media/lab.jpg"
              alt="Laboratórium — bejárható dokumentáció Matterport túrával"
              loading="lazy"
              className="h-[260px] w-full object-cover sm:h-[420px]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Labor · QA — bejárható, Mattertaggel jelölt eszközpark
            </figcaption>
          </figure>
        </div>
      </section>


      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-3">
            {proof.map((p) => (
              <div key={p.label} className="rounded-md border border-border bg-card p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-brand">{p.metric}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">Hat tipikus felhasználás</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {usecases.map((u) => (
              <article key={u.title} className="rounded-md border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Bizonyított: 7+ hektár, 8 szken, 1 hivatkozás</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            A Pannon Egyetem Zalaegerszegi Kampuszán 2024 őszén, 4 munkanap alatt 8 különálló
            Matterport-szken készült, amelyeket az „Összefűzés" kiegészítő szolgáltatással egyetlen,
            több mint 7 hektáros összefüggő digitális ikerré fűztem össze. A felhőben mindössze
            4 Pro túra tárhelyét foglalja — 0–24 elérhető a felvételi, FM, akkreditáció és
            nemzetközi kommunikáció számára.
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Az intézménynek hivatkozható, mérhető, bővíthető digitális vagyontárgya lesz. Más
            egyetemeknek is érdemes megfontolniuk.
          </p>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Kérje árajánlatát</h2>
          <p className="mt-3 opacity-90">
            Töltse ki a strukturált csomag-űrlapot 3 időpontjavaslattal. 24 órán belül visszaigazolunk.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Időpont és csomag igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
