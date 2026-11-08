import { BimLink } from "@/components/bim/BimChrome";
import { BimTrustBadges } from "@/components/bim/BimTrustBadges";
import { BIM_CONFIG } from "@/config/bim";
import { BIM_INDUSTRIAL_HREF, BIM_MODELER_HREF } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata = bimMetadata(
  "/",
  "Ipari és épületfelmérés, pontfelhő és Scan-to-BIM | VRGO BIM",
  "Országosan gyors lézeres állapotfelmérés, pontfelhő és szükség szerint Scan-to-BIM alap ipari létesítményekhez, rekonstrukciókhoz és BIM-modellezéshez."
);

const AUDIENCES = [
  {
    title: "Ipari létesítmény",
    text: "Csarnok, üzem, raktár vagy technológiai tér állapotfelmérése.",
    cta: "Ipari felmérés",
    href: BIM_INDUSTRIAL_HREF,
  },
  {
    title: "Tervezőiroda vagy kivitelező",
    text: "Pontfelhő, CAD és szükség szerint modellalap a tervezéshez.",
    cta: "Tervezőknek",
    href: "/tervezoknek",
  },
  {
    title: "BIM-modellező cég",
    text: "Terepi felmérés és modellezési kapacitás a saját munkafolyamatába.",
    cta: "BIM-modellezőknek",
    href: BIM_MODELER_HREF,
  },
  {
    title: "Lakás vagy családi ház",
    text: "Felújítás vagy átépítés előtti pontos alaprajz.",
    cta: "Lakossági felmérés",
    href: "/lakossagi-felmeres",
  },
] as const;

const PROCESS = [
  { title: "Igény tisztázása", text: "Feladat, helyszín, kimenet és határidő egyeztetése." },
  { title: "Helyszíni felmérés", text: "Lézeres rögzítés a helyszín korlátaihoz igazítva." },
  { title: "Feldolgozás és ellenőrzés", text: "Regisztráció, tisztítás és minőség-ellenőrzés." },
  { title: "Átadás", text: "A megrendelt kimenetek dokumentált átadása." },
] as const;

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BIM_CONFIG.organizationName,
    url: BIM_CONFIG.organizationUrl,
    description:
      "Ipari és épületfelmérési specialisták: országosan gyors helyszíni lézeres felmérés, mérnöki pontosságú pontfelhő és szükség szerint modellalap.",
    parentOrganization: {
      "@type": "Organization",
      name: "VRGO",
      url: "https://vrgo.hu",
    },
  };
}

export default function BimHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
      />

      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-14 sm:pb-12 sm:pt-20">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-[2.5rem] md:leading-tight">
            Ipari és épületfelmérés, amelyből tervezni lehet
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Országosan gyors lézeres állapotfelmérés, pontfelhő és szükség szerint Scan-to-BIM alap
            ipari létesítményekhez, rekonstrukciókhoz és BIM-modellezéshez.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/kapcsolat?utvonal=ipar&forras=hero"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kérjen ajánlatot
            </BimLink>
            <BimLink
              href={`${BIM_MODELER_HREF}?forras=hero`}
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-5 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark sm:px-6"
            >
              Terepi felmérés modellezőknek
            </BimLink>
          </div>
          <BimTrustBadges />
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Milyen felmérésre van szüksége?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {AUDIENCES.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-md border border-border bg-card p-5"
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.text}</p>
                <BimLink
                  href={item.href}
                  className="mt-4 text-sm font-semibold text-brand hover:underline"
                >
                  {item.cta} →
                </BimLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ipari létesítmények állapotfelmérése
          </h2>
          <p className="mt-4 max-w-3xl text-sm opacity-90 sm:text-base">
            Gyártóüzemek, raktárak, technológiai csarnokok és üzemek felmérése layout-tervezéshez,
            gépbeépítéshez, átépítéshez vagy átadáshoz. Nagyobb ipari projektnél több napig a
            helyszínen dolgozunk, hogy a felmérés a termelési ütemtervhez igazodjon.
          </p>
          <BimLink
            href={`${BIM_INDUSTRIAL_HREF}?forras=fooldal-ipar`}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ipari felmérés kérése
          </BimLink>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Kapacitás BIM-modellezőknek
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
            Terepi felmérést, pontfelhőt, CAD-alapot és szükség szerint modellezést vállalunk a saját
            munkafolyamatába illesztve. Ön tartja az ügyfélkapcsolatot; mi a mérési és modellezési
            kapacitást biztosítjuk.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/kapcsolat?utvonal=kapacitas&forras=fooldal-modellezo"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kapacitásajánlat kérése
            </BimLink>
            <BimLink
              href={BIM_MODELER_HREF}
              className="inline-flex items-center justify-center rounded-md border border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand/10"
            >
              Tovább a BIM-modellezőknek
            </BimLink>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Hogyan dolgozunk</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="rounded-md border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {i + 1}. lépés
                </p>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
          <BimLink
            href="/munkafolyamat"
            className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Részletes munkafolyamat →
          </BimLink>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Nem csak szkennelünk</h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
            Helyszíni felmérést, feldolgozást és szükség szerint modellezést végzünk. A kimenetet a
            megrendelő által kért formátumban adjuk át.
          </p>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Kérjen ajánlatot</h2>
          <p className="mt-4 text-sm opacity-90 sm:text-base">
            Írja le röviden a feladatot, vagy küldje el a rendelkezésre álló dokumentumokat. A
            módszert és az árajánlatot utána egyeztetjük.
          </p>
          <BimLink
            href="/kapcsolat?forras=fooldal-zaras"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Űrlap kitöltése
          </BimLink>
        </div>
      </section>
    </>
  );
}
