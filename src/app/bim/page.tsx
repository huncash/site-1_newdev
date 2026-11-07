import { BimLink, BimPhoneLink } from "@/components/bim/BimChrome";
import { BimScopeNote, BimSurveyorNote } from "@/components/bim/BimScopeNote";
import { BIM_CONFIG } from "@/config/bim";
import { BIM_STATE_HUB_HREF } from "@/config/menu";
import { BIM_AUDIENCES, BIM_SERVICES, BIM_SOLUTIONS } from "@/lib/bim-catalog";
import { normalizeBimArticleCategory } from "@/lib/bim-article-categories";
import { listPublishedBimArticles } from "@/lib/bim-articles";
import { BIM_ORIGIN, bimMetadata } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata = bimMetadata(
  "/",
  "3D lézerszkennelés és EOV georeferálás | VRGO BIM",
  "Georeferált lézerszkennelés Trimble és Leica szkennerekkel, DJI drónnal és terepi műszerekkel. Alaprajz, pontfelhő, BIM-modell. Kérjen ajánlatot."
);

const workflow = [
  ["Igényfelmérés", "Cél: pontfelhő, CAD, dokumentáció vagy BIM-modell — a workflow-t az Ön kéréséhez igazítjuk."],
  [
    "Helyszíni adatgyűjtés",
    "Trimble és Leica 3D lézerszkennerek, DJI drón, Trimble GNSS és terepi mérőműszerek (EOV-bekötés).",
  ],
  [
    "Feldolgozás",
    "Pontfelhő regisztrációja és tisztítása, 2D alaprajz és metszet. BIM-modell Revitben vagy ArchiCAD-ben külön tételként, a feladat igénye szerint.",
  ],
  ["Átadás", "Szabványos formátumok: E57, DWG, IFC — a megrendelés szerint."],
] as const;

const homeFaqs = [
  {
    q: "Mennyibe kerül egy lakás vagy ház felmérése?",
    a: "A díj a mérettől, a bonyolultságtól, a kiszállástól és a leadott anyagtól függ. A végleges összeget az ajánlat tartalmazza.",
  },
  {
    q: "Mit kapok a felmérés végén?",
    a: "Alaprajz és metszet (PDF, DWG), kérésre pontfelhő. BIM-modell külön tétel.",
  },
  {
    q: "Kell-e georeferálás EOV-ban?",
    a: "Tervezői és beruházási feladatoknál gyakran igen. A bekötést jogosult földmérő közreműködésével végezzük.",
  },
  {
    q: "Érint engem az állami beruházások témája?",
    a: "Csak meghatározott állami beruházásoknál és üzemeltetésnél. Ha igen, lásd a kapcsolódó megoldást — a fő szolgáltatásunk ettől függetlenül a georeferált felmérés.",
  },
] as const;

function pickLatestDiverse(articles: ReturnType<typeof listPublishedBimArticles>) {
  const sorted = [...articles].reverse();
  const picked: typeof sorted = [];
  const usedCats = new Set<string>();
  for (const article of sorted) {
    if (picked.length >= 3) break;
    const cat = normalizeBimArticleCategory(article.category);
    if (!usedCats.has(cat)) {
      picked.push(article);
      usedCats.add(cat);
    }
  }
  for (const article of sorted) {
    if (picked.length >= 3) break;
    if (!picked.some((item) => item.slug === article.slug)) picked.push(article);
  }
  return picked;
}

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BIM_CONFIG.organizationName,
    url: BIM_CONFIG.organizationUrl,
    ...(BIM_CONFIG.phoneDisplay
      ? { telephone: BIM_CONFIG.phoneDisplay }
      : {}),
    parentOrganization: {
      "@type": "Organization",
      name: "VRGO",
      url: "https://vrgo.hu",
    },
  };
}

export default function BimHomePage() {
  const latest = pickLatestDiverse(listPublishedBimArticles());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
      />

      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Georeferált 3D lézerszkennelés – EOV-ban, földmérői hitelesítéssel
          </h1>
          <p className="mt-4 text-base opacity-90 sm:text-lg">
            Épületek, telkek és ipari létesítmények pontos, mérhető digitális mása. DJI drónnal,
            Leica és Trimble 3D lézerszkennerekkel, valamint terepi mérőműszerekkel (EOV-bekötés)
            optimalizáljuk a workflow-t az ügyfél kérésének megfelelően. Alaprajz, pontfelhő és –
            igény szerint – BIM-modell, egyetlen ajánlatban.
          </p>
          <p className="mt-3 text-sm opacity-80">
            10+ év térszkennelés · EOV-ba kötött adat · jogosult földmérő közreműködésével · E57,
            DWG, IFC átadás (modellezés esetén)
            {BIM_CONFIG.replySlaText ? ` · ${BIM_CONFIG.replySlaText}` : ""}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BimLink
              href="/ajanlatkeres"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
            >
              Ajánlatot kérek
            </BimLink>
            <BimLink
              href="/szolgaltatasok"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              Szolgáltatásaink
            </BimLink>
          </div>
          <p className="mt-4 text-sm opacity-90">
            <BimLink
              href="/szolgaltatasok/lakas-es-hazfelmeres"
              className="underline underline-offset-2"
            >
              Lakást vagy házat szeretne felmérni? →
            </BimLink>
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold">Kinek dolgozunk</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BIM_AUDIENCES.map((item) => (
              <div key={item.href} className="rounded-md border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                <BimLink href={item.href} className="mt-3 inline-block text-sm font-semibold text-brand">
                  {item.cta} →
                </BimLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12" id="megoldasaink">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Megoldásaink</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Felhasználási eset szerint — felújítástól az üzemeltetésig.
              </p>
            </div>
            <BimLink href="/megoldasok" className="text-sm font-semibold text-brand">
              Összes megoldás →
            </BimLink>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIM_SOLUTIONS.map((item) => (
              <BimLink
                key={item.href + item.title}
                href={item.href}
                className="rounded-md border border-border bg-card p-5 hover:border-brand"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              </BimLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12" id="szolgaltatasaink">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Szolgáltatásaink</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Georeferált rögzítés, drón, EOV-bekötés és — igény szerint — modellezés.
              </p>
            </div>
            <BimLink href="/szolgaltatasok" className="text-sm font-semibold text-brand">
              Összes szolgáltatás →
            </BimLink>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIM_SERVICES.map((item) => (
              <BimLink
                key={item.href}
                href={item.href}
                className="rounded-md border border-border bg-card p-5 hover:border-brand"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              </BimLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Technológia</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            DJI drón, Leica és Trimble 3D lézerszkennerek, valamint terepi mérőműszerek
            (EOV-bekötés) segítségével állítjuk össze a feladatnak megfelelő workflow-t.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li>
              <strong className="text-foreground">Trimble X9</strong> állványos szkenner — nagy
              terek, homlokzatok.
            </li>
            <li>
              <strong className="text-foreground">Leica BLK2GO</strong> mobil szkenner — szűk terek,
              lépcsőház, pince.
            </li>
            <li>
              <strong className="text-foreground">DJI drón</strong> — tető, homlokzat, telek
              fotogrammetria.
            </li>
            <li>
              <strong className="text-foreground">Trimble GNSS</strong> és terepi mérőműszerek —
              EOV-bekötés.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Munkafolyamat</h2>
          <ol className="mt-6 space-y-4 text-sm text-muted-foreground sm:text-base">
            {workflow.map(([title, text], index) => (
              <li key={title}>
                <strong className="text-foreground">
                  {index + 1}. {title}.
                </strong>{" "}
                {text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Pontosság és hitelesség</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <BimScopeNote />
            <div className="text-sm">
              <BimSurveyorNote />
            </div>
          </div>
          <BimLink
            href="/pontossag-es-formatumok"
            className="mt-4 inline-block text-sm font-semibold text-brand"
          >
            Pontosság és formátumok →
          </BimLink>
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Referencia</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Ipari létesítmények, homlokzatok és nagyméretű belső terek felmérése. A helyszíni adat
            georeferált pontfelhővé és — igény szerint — BIM-kompatibilis modellé áll össze.
          </p>
          <BimLink href="/referenciak" className="mt-4 inline-block text-sm font-semibold text-brand">
            Referenciák
          </BimLink>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Cikkek</h2>
          {latest.length > 0 ? (
            <ul className="mt-4 space-y-3 text-sm sm:text-base">
              {latest.map((article) => (
                <li key={article.slug}>
                  <BimLink href={`/cikkek/${article.slug}`} className="font-semibold text-brand">
                    {article.title}
                  </BimLink>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {normalizeBimArticleCategory(article.category)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Hamarosan új cikkek jelennek meg.</p>
          )}
          <BimLink href="/cikkek" className="mt-4 inline-block text-sm font-semibold text-brand">
            Összes cikk →
          </BimLink>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-md border border-border bg-card p-5 text-sm sm:text-base">
            <p className="font-semibold text-foreground">Állami beruházás vagy üzemeltetés?</p>
            <p className="mt-2 text-muted-foreground">
              Mit jelent Önnek az állami BIM-szabályozás →
            </p>
            <BimLink
              href={BIM_STATE_HUB_HREF}
              className="mt-3 inline-block text-sm font-semibold text-brand"
            >
              Állami beruházások és BIM-előírások →
            </BimLink>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Gyakori kérdések</h2>
          <dl className="mt-6 space-y-5">
            {homeFaqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-foreground">{item.q}</dt>
                <dd className="mt-1 text-sm text-muted-foreground sm:text-base">{item.a}</dd>
              </div>
            ))}
          </dl>
          <BimLink href="/gyik" className="mt-4 inline-block text-sm font-semibold text-brand">
            Teljes GYIK →
          </BimLink>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-section-dark-foreground">
            Mondja el, melyik épületről vagy ingatlanról van szó.
          </h2>
          <p className="mt-3 opacity-90">
            Magánszemély: rövid űrlap vagy telefon. Vállalkozás: teljes ajánlatkérés, EIR
            feltöltéssel.
            {BIM_CONFIG.replySlaText ? ` ${BIM_CONFIG.replySlaText}` : null}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BimLink
              href="/szolgaltatasok/lakas-es-hazfelmeres#ajanlat"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold"
            >
              Magánszemély — rövid űrlap
            </BimLink>
            <BimLink
              href="/ajanlatkeres"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
            >
              Vállalkozás — ajánlatkérés
            </BimLink>
            <BimPhoneLink
              forras="home-cta"
              className="inline-flex items-center justify-center rounded-md border-2 border-white/70 px-6 py-3 text-sm font-semibold"
            />
          </div>
          <p className="mt-4 text-xs opacity-70">
            <a href={BIM_ORIGIN} className="underline">
              bim.vrgo.hu
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
