import { BimLink } from "@/components/bim/BimChrome";
import { BIM_CONFIG, bimHasSamplePack } from "@/config/bim";
import { BIM_MODELER_HREF, BIM_STATE_HUB_HREF } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata = bimMetadata(
  "/",
  "Ipari és épületfelmérés, georeferált pontfelhő és Scan-to-BIM | VRGO BIM",
  "Országosan gyors lézeres állapotfelmérés, georeferált pontfelhő és tervezésre kész Scan-to-BIM alap ipari létesítményekhez, rekonstrukciókhoz és BIM-modellezéshez."
);

const PROCESS = [
  {
    title: "Igény és EIR tisztázása",
    text: "Felhasználási cél, pontossági szint, kimeneti formátumok és helyszíni korlátok egyeztetése.",
  },
  {
    title: "Helyszíni lézeres felmérés",
    text: "Álló és mobil szkennelés, szükség szerint drón és GNSS — a feladathoz illő módszerrel.",
  },
  {
    title: "Pontfelhő regisztráció és feldolgozás",
    text: "Regisztráció, tisztítás, ellenőrzés — mérhető, átadható pontfelhő.",
  },
  {
    title: "Georeferált CAD és referenciaanyag",
    text: "Alaprajz, metszet, homlokzat és egyéb CAD-dokumentáció a megrendelés szerint.",
  },
  {
    title: "Scan-to-BIM modell, igény szerint",
    text: "Revit, ArchiCAD vagy IFC — külön tételként, a feladat és az LOD szerint.",
  },
  {
    title: "Minőség-ellenőrzés és dokumentált átadás",
    text: "Ellenőrzött kimenetek, átadási lista és — ha releváns — BCF hibajegyzék.",
  },
] as const;

const AUDIENCES = [
  {
    title: "Termelés közben is mérhető állapot",
    audience: "Ipari létesítményeknek",
    text: "Gyártóüzemek, raktárak, technológiai csarnokok és üzemek állapotfelmérése — a lehető legkisebb megszakítással.",
    cta: "Ipari felmérés kérése",
    href: "/ajanlatkeres?utvonal=ipar&forras=fooldal-routing",
  },
  {
    title: "Tervezés megbízható meglévő állapotra",
    audience: "Tervezőknek és rekonstrukcióhoz",
    text: "Georeferált pontfelhő, alaprajz, metszet és Revit/ArchiCAD/IFC-kompatibilis as-built alap.",
    cta: "As-built alap kérése",
    href: "/ajanlatkeres?utvonal=tervezo&forras=fooldal-routing",
  },
  {
    title: "Kapacitás és hiteles terepi adat",
    audience: "BIM-modellezőknek",
    text: "Terepi felmérés, pontfelhő, regisztráció és Scan-to-BIM modell a saját munkafolyamatába illesztve.",
    cta: "Kapacitásajánlat kérése",
    href: `${BIM_MODELER_HREF}?forras=fooldal-routing`,
  },
  {
    title: "Felújítás vagy átépítés előtti pontos alaprajz",
    audience: "Lakossági felmérés",
    text: "Lakások és családi házak pontos, tervezésre használható felmérése.",
    cta: "Lakossági felmérés kérése",
    href: "/szolgaltatasok/lakas-es-hazfelmeres?forras=fooldal-routing",
  },
] as const;

const TECH = [
  {
    name: "Trimble X9",
    text: "Nagy terek, homlokzatok, ipari csarnokok gyors, nagy pontosságú álló lézeres felmérése.",
  },
  {
    name: "Leica BLK2GO",
    text: "Mobil felmérés szűk terekben, folyosókon, gépészeti és nehezen megközelíthető részeknél.",
  },
  {
    name: "DJI drón",
    text: "Homlokzat, tető és telek fotogrammetria.",
  },
  {
    name: "Trimble GNSS és terepi műszerek",
    text: "EOV-bekötés és georeferálás jogosult földmérő közreműködésével.",
  },
] as const;

const DELIVERABLES = [
  "E57 pontfelhő",
  "DWG alaprajz, metszet, homlokzat",
  "IFC",
  "Revit",
  "ArchiCAD",
  "BCF hibajegyzék, ha releváns",
  "Fotódokumentáció",
] as const;

const HOME_FAQS = [
  {
    q: "Milyen projekteket érdemes lézeres felméréssel rögzíteni?",
    a: "Ipari létesítményeket, rekonstrukciókat, felújításokat, as-built dokumentációt és minden olyan feladatot, ahol a meglévő állapot a tervezés kiindulópontja.",
  },
  {
    q: "Milyen formátumban kapom meg a pontfelhőt?",
    a: "A megrendelés szerint tipikusan E57 formátumban. További formátumokat az ajánlat rögzít.",
  },
  {
    q: "Kell-e EOV-bekötés?",
    a: "Ha a felhasználási cél vagy az EIR georeferálást kér, igen. A bekötést jogosult földmérő közreműködésével végezzük; a megrendelő saját földmérőjével is együttműködünk.",
  },
  {
    q: "Milyen modellformátumban készül a Scan-to-BIM modell?",
    a: "Igény szerint Revit, ArchiCAD vagy IFC — külön tételként, a feladat és az LOD szerint.",
  },
  {
    q: "Hogyan minimalizálják az ipari üzem megszakítását?",
    a: "A helyszíni munkát a termelési és üzemeltetési korlátokhoz igazítjuk. Nagyobb projektnél helyszíni tartózkodással csökkentjük az ismételt kiszállások miatti zavarokat.",
  },
  {
    q: "Hogyan lehet kapacitást kérni BIM-modellezőként?",
    a: "Az ajánlatkérő űrlapon válassza a „BIM-modellező kapacitás” útvonalat, vagy nyissa meg a Scan-to-BIM kapacitás oldalt.",
  },
] as const;

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BIM_CONFIG.organizationName,
    url: BIM_CONFIG.organizationUrl,
    description:
      "Ipari és épületfelmérési specialisták: lézeres felmérés, georeferált pontfelhő és Scan-to-BIM alap.",
    ...(BIM_CONFIG.phoneDisplay ? { telephone: BIM_CONFIG.phoneDisplay } : {}),
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

      {/* 1. Hero */}
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-[2.5rem] md:leading-tight">
            Ipari és épületfelmérés, amelyből tervezni lehet
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Országosan gyors lézeres állapotfelmérés, georeferált pontfelhő és Scan-to-BIM alap
            ipari létesítményekhez, rekonstrukciókhoz és BIM-modellezéshez.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/ajanlatkeres?utvonal=ipar&forras=hero"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kérjen helyszíni felmérési ajánlatot
            </BimLink>
            <BimLink
              href={`${BIM_MODELER_HREF}?forras=hero`}
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              BIM-modellezőknek: kapacitás és együttműködés
            </BimLink>
          </div>
          <p className="mt-6 text-xs opacity-75 sm:text-sm">
            10+ év térszkennelési tapasztalat · napi több ezer négyzetméternyi tér szkennelési
            kapacitás · georeferált EOV-adat · jogosult földmérő közreműködésével
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-4">
            {["Lézeres felmérés", "Pontfelhő", "CAD / szelvény", "Revit · ArchiCAD · IFC"].map(
              (step, i) => (
                <li
                  key={step}
                  className="rounded-md border border-white/15 bg-white/5 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                >
                  <span className="block text-brand">{i + 1}</span>
                  {step}
                </li>
              )
            )}
          </ol>
        </div>
      </section>

      {/* 2. Probléma */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            A pontatlan meglévő állapot drága tervezési hibákat okoz
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li>A meglévő dokumentáció gyakran nem tükrözi a valós épületet.</li>
            <li>A hibás kiindulási adat később ütközésekhez, visszaméréshez és módosításhoz vezet.</li>
            <li>
              A modellező csapatnak nem szabad találgatnia: a tervnek a tényleges állapotra kell
              épülnie.
            </li>
            <li>
              Ipari környezetben a felmérésnek a termelési és üzemeltetési korlátokhoz kell
              alkalmazkodnia.
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Megoldás / folyamat */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            A valós állapottól a tervezésre kész modellig
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="rounded-md border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {i + 1}. lépés
                </p>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Célcsoport routing */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Kinek dolgozunk</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {AUDIENCES.map((item) => (
              <article
                key={item.audience}
                className="flex flex-col rounded-md border border-border bg-card p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {item.audience}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.text}</p>
                <BimLink
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-brand underline-offset-2 hover:underline"
                >
                  {item.cta} →
                </BimLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ipari blokk — legerősebb */}
      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ipari létesítmények felmérése, ahol a pontosság és az üzemfolytonosság számít
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium text-brand">
            Ahol a leállás drága, a felmérésnek a termeléshez kell alkalmazkodnia.
          </p>
          <ul className="mt-6 grid gap-3 text-sm opacity-90 sm:grid-cols-2 sm:text-base">
            <li>Gyártóüzemek, raktárak, technológiai csarnokok és üzemek állapotfelmérése.</li>
            <li>Új gép vagy technológia beépítéséhez szükséges térbeli alap.</li>
            <li>Csővezeték-, gépészeti és szerkezeti állapot rögzítése.</li>
            <li>Layout-tervezéshez és ütközésvizsgálathoz használható pontfelhő.</li>
            <li>Átépítések, bővítések és átadások as-built alapja.</li>
            <li>
              Nagyobb projektnél helyszíni tartózkodás, a termelési megszakítás minimalizálására
              optimalizált munkavégzés.
            </li>
            <li>Országos kiszállás és gyors helyszíni reakció.</li>
            <li>Akár 1 ha fölötti kültéri felületek, napi több ezer m² belső tér kapacitással.</li>
          </ul>
          <BimLink
            href="/szolgaltatasok/ipari-letesitmenyek"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ipari felmérés részletei
          </BimLink>
        </div>
      </section>

      {/* 6. Modellezők */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Scan-to-BIM kapacitás és hiteles terepi adat
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
            BIM-modellező cégek, tervezőirodák és kivitelezők számára vállaljuk a terepi lézeres
            felmérést, georeferált pontfelhő készítését, CAD-dokumentációt és igény szerint a
            Scan-to-BIM modellezést. Nem vesszük el az ügyfelét: Ön tartja az ügyfélkapcsolatot, mi
            a hiteles terepi adatot biztosítjuk.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href={`/ajanlatkeres?utvonal=kapacitas&forras=fooldal-modellezo`}
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kérjen kapacitás- vagy projektajánlatot
            </BimLink>
            <BimLink
              href={BIM_MODELER_HREF}
              className="inline-flex items-center justify-center rounded-md border border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand/10"
            >
              Tovább a modellezőknek szóló oldalra
            </BimLink>
          </div>
        </div>
      </section>

      {/* 7. Technológia */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            A feladathoz illő technológia, nem egységes módszer
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TECH.map((item) => (
              <article key={item.name} className="rounded-md border border-border bg-card p-5">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Napi több ezer négyzetméter szkennelési kapacitás. 10+ év fotogrammetriás és ipari
            térszkennelési tapasztalat. Két fős terepi mérnöki csapat, Duna-kanyari kiindulópontból —
            Budapest és a Duna-kanyar környékén akár azonos napi kiszállás.
          </p>
        </div>
      </section>

      {/* 8. Kimenetek */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Mérhető alap, dokumentált folyamat</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A folyamat végén a megrendelés szerinti kimeneteket adjuk át:
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-card px-4 py-3 text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Pontosság */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Mérhető, ellenőrzött és georeferált alap
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground sm:text-base">
            <li>
              A pontossági követelményt az EIR, a felhasználási cél vagy a megrendelés határozza meg.
            </li>
            <li>A georeferálás jogosult földmérő közreműködésével történik.</li>
            <li>EOV-bekötés és dokumentált geodéziai kontroll.</li>
            <li>A megrendelő saját földmérőjével is együttműködünk.</li>
            <li>A módszert és a pontossági szintet előre egyeztetjük.</li>
          </ul>
          <BimLink
            href="/pontossag-es-formatumok"
            className="mt-6 inline-flex text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            Pontosság és formátumok →
          </BimLink>
        </div>
      </section>

      {/* 10. Bizonyíték — referencia nélkül */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Nem csak szkennelünk — mérnöki alapot adunk a tervezéshez
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-md border border-border bg-card p-4 text-sm">
              Terepi felmérés, regisztráció és minőség-ellenőrzés.
            </li>
            <li className="rounded-md border border-border bg-card p-4 text-sm">
              Georeferált, tervezésre kész pontfelhő.
            </li>
            <li className="rounded-md border border-border bg-card p-4 text-sm">
              Revit, ArchiCAD és IFC kompatibilis átadás.
            </li>
            <li className="rounded-md border border-border bg-card p-4 text-sm">
              Ipari környezetben optimalizált munkavégzés.
            </li>
            <li className="rounded-md border border-border bg-card p-4 text-sm">
              Országos kiszállás és helyszíni tartózkodás nagyobb projektek esetén.
            </li>
            <li className="rounded-md border border-border bg-card p-4 text-sm">
              Élelmiszeripari és folyamatfejlesztési mérnöki háttér.
            </li>
          </ul>
          {bimHasSamplePack() ? (
            <a
              href={BIM_CONFIG.samplePackUrl}
              className="mt-6 inline-flex text-sm font-semibold text-brand underline-offset-2 hover:underline"
            >
              Minta átadási standard letöltése →
            </a>
          ) : null}
        </div>
      </section>

      {/* 11. Rövid GYIK */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Gyakori kérdések</h2>
          <div className="mt-6 space-y-3">
            {HOME_FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-md border border-border bg-card p-5 open:border-brand/50"
              >
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="mr-2 text-brand transition group-open:rotate-90">›</span>
                  {item.q}
                </summary>
                <p className="mt-3 pl-5 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
          <BimLink
            href="/gyik"
            className="mt-6 inline-flex text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            Teljes GYIK →
          </BimLink>
        </div>
      </section>

      {/* Mellék: állami hub — nem domináns */}
      <section className="bg-background py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Állami beruházás vagy üzemeltetés? Összefoglaló a kapcsolódó előírásokról.
          </p>
          <BimLink
            href={BIM_STATE_HUB_HREF}
            className="text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            Állami BIM-előírások →
          </BimLink>
        </div>
      </section>

      {/* 12. Záró CTA — két útvonal */}
      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90">
            {BIM_CONFIG.replySlaText}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <BimLink
              href="/ajanlatkeres?utvonal=ipar&forras=fooldal-cta"
              className="rounded-md border border-white/20 bg-white/5 px-5 py-6 text-left transition hover:border-brand"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Ipari vagy épületfelmérési projekt
              </p>
              <p className="mt-2 text-sm opacity-90">
                Helyszíni lézeres felmérés, pontfelhő, CAD és igény szerinti Scan-to-BIM.
              </p>
            </BimLink>
            <BimLink
              href="/ajanlatkeres?utvonal=kapacitas&forras=fooldal-cta"
              className="rounded-md border border-white/20 bg-white/5 px-5 py-6 text-left transition hover:border-brand"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                BIM-modellezőknek: kapacitás
              </p>
              <p className="mt-2 text-sm opacity-90">
                Terepi adat és Scan-to-BIM kapacitás a saját munkafolyamatába illesztve.
              </p>
            </BimLink>
          </div>
        </div>
      </section>
    </>
  );
}
