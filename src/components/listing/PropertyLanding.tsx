"use client";

import { Fence, FileText, House, MapPin, Route, Ruler, Thermometer, Trees, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import { PHOTO_STATE, PHOTOS, TOUR_URL, UTILITY_PHOTOS } from "@/lib/listing";

const facts = [
  { icon: Ruler, label: "Hivatalos telek", value: "1046 m². A telek előtt, az utcáig, kb. 150 m² önkormányzati, használati rész ad helyet a tágas kocsibeállónak és a kiskapuhoz vezető lépcsőnek." },
  { icon: Trees, label: "Besorolás", value: "Lke-4, kertvárosias lakóterület. 30% beépíthetőség, új lakóház építésére alkalmas." },
  { icon: House, label: "Felépítmény", value: "Azonnal használható felvonulási épület, az ingatlan-nyilvántartásban feltüntetve. Épült 1980 körül. A belső burkolatok és a berendezés tiszta lapként az új tulajdonosra várnak." },
  { icon: Zap, label: "Infrastruktúra", value: "Bekötött villany, a mérőhely után a rendszer cserélve. Biztosított vízellátás. Szennyvíz: saját emésztő." },
  { icon: MapPin, label: "Környezet", value: "Natura 2000, ősfás tölgyerdő. Nyáron 4 °C-kal hűvösebb, mint a Duna-parton, mégis a Börzsönyliget naposabb oldala: napelemre és veteményesre is alkalmas." },
  { icon: FileText, label: "Jogi helyzet", value: "Tiszta státusz: változtatási tilalom nem érinti. Tehermentes, birtokba adás megegyezés szerint." },
  { icon: Route, label: "Megközelítés", value: "Aszfaltozott főútról, szilárd burkolatú úton. Távol a zajos vasúttól." },
  { icon: Fence, label: "Telekhatár", value: "A 2026. szeptember 2-i képeken drótkerítés, kőkosaras támfal és kapuk látszanak." },
  { icon: Thermometer, label: "Fűtés", value: "A fűtési infrastruktúra előkészítve. A cserépkályha üzembe helyezésére megbeszélt szakember áll rendelkezésre, így télen azzal is hatékonyan fűthető." },
] as const;

type Lightbox =
  | { kind: "gallery"; index: number }
  | { kind: "utility"; index: number }
  | null;

export function PropertyLanding() {
  const [open, setOpen] = useState<Lightbox>(null);
  const [macro, setMacro] = useState<"orszag" | "duna">("orszag");
  const [micro, setMicro] = useState<"utca" | "foldhivatal">("utca");

  useEffect(() => {
    if (open === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
      if (open?.kind !== "gallery") return;
      if (event.key === "ArrowRight") {
        setOpen({ kind: "gallery", index: (open.index + 1) % PHOTOS.length });
      }
      if (event.key === "ArrowLeft") {
        setOpen({ kind: "gallery", index: (open.index - 1 + PHOTOS.length) % PHOTOS.length });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const lightboxSrc =
    open?.kind === "gallery"
      ? PHOTOS[open.index]
      : open?.kind === "utility"
        ? UTILITY_PHOTOS[open.index]
        : null;

  return (
    <div className="bg-[#f3f0e8] text-[#1c1915]">
      <header className="sticky top-0 z-30 border-b border-[#e4dfd4] bg-[#f3f0e8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
          <p className="text-sm font-semibold tracking-wide">Kismaros · Börzsönyliget</p>
          <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm">
            <a href="#elhelyezkedes" className="hover:underline">Elhelyezkedés</a>
            <a href="#seta" className="hover:underline">Bejárható 3D fotózás</a>
            <a href="#galeria" className="hover:underline">Galéria</a>
            <a href="#kapcsolat" className="rounded-md bg-[#1f4d3a] px-3 py-1.5 font-semibold text-white">Kapcsolat</a>
          </nav>
        </div>
      </header>

      <section className="relative min-h-[78vh] overflow-hidden bg-[#0c1611] text-white">
        <img
          src={PHOTOS[0].src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1611] via-[#0c1611]/85 to-[#0c1611]/55" />
        <div className="absolute inset-0 bg-[#0c1611]/25" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 py-16">
          <p className="text-sm uppercase tracking-[0.18em] text-white/90 drop-shadow">Keresem jövőbeni szomszédomat</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-5xl">
            Építési telek Börzsönyligeten, meglévő épülettel
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white drop-shadow sm:text-lg">
            Lke-4 kertvárosias lakóövezet, Natura 2000-es ősfás tölgyesben. Nyáron 4 °C-kal hűvösebb,
            mint a Duna-parton, mégis a Börzsönyliget naposabb oldala. Az elvonulni vágyóknak:
            nyugodt telek, jó szomszédság, azonnal használható felépítmény. Meglévő nyaraló
            felújítására, átépítésére vagy új lakóház építésére, telken belüli autóbeállókkal.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <li>
              <p className="text-2xl font-medium text-white">1046 m²</p>
              <p className="text-sm text-white/85">hivatalos telekterület</p>
            </li>
            <li>
              <p className="text-2xl font-medium text-white">Lke-4</p>
              <p className="text-sm text-white/85">30% beépíthetőség, új lakóházra alkalmas</p>
            </li>
            <li>
              <p className="text-2xl font-medium text-white">4 °C</p>
              <p className="text-sm text-white/85">hűvösebb nyáron, napos hegyoldalon</p>
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#seta" className="rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-[#0c1611]">
              Bejárható 3D fotózás megtekintése
            </a>
            <a href="#galeria" className="rounded-md border border-white/80 px-5 py-3 text-center text-sm font-semibold text-white">
              Képgaléria
            </a>
            <a href="#kapcsolat" className="rounded-md border border-white/80 px-5 py-3 text-center text-sm font-semibold text-white">
              Kapcsolatfelvétel
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20" id="elhelyezkedes">
        <h2 className="text-3xl font-medium">Elhelyezkedés</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
          Kismaros-Börzsönyliget, Natura 2000-es ősfás tölgyes. A kettős előny: nyáron hűvösebb a Duna-partnál, mégis a Börzsönyliget naposabb oldala. Előbb az országban, aztán a térségben, végül az utcában.
        </p>

        <div className="mt-10">
          <h3 className="text-2xl font-medium">Ország, régió és mikroklíma</h3>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Térségi térkép">
            <button type="button" role="tab" aria-selected={macro === "orszag"} onClick={() => setMacro("orszag")} className={`rounded-md px-4 py-2 text-sm font-medium ${macro === "orszag" ? "bg-[#14221b] text-white" : "border border-[#e4dfd4] bg-white"}`}>
              Magyarország
            </button>
            <button type="button" role="tab" aria-selected={macro === "duna"} onClick={() => setMacro("duna")} className={`rounded-md px-4 py-2 text-sm font-medium ${macro === "duna" ? "bg-[#14221b] text-white" : "border border-[#e4dfd4] bg-white"}`}>
              Dunakanyar
            </button>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-[#e4dfd4] bg-white">
            <img
              src={macro === "orszag" ? "/hirdetes/makro-orszag.jpg" : "/hirdetes/makro-duna.jpg"}
              alt={macro === "orszag"
                ? "Magyarország térképe. A jelölés Kismarost mutatja, Budapesttől északra."
                : "A Dunakanyar térképe. A jelölés Kismarost mutatja, a Börzsöny lábánál, a Duna-parttól beljebb."}
              className="w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
            {macro === "orszag"
              ? "Kismaros a Dunakanyarban van, Budapesttől északra, a Börzsöny lábánál."
              : "A Dunakanyar térsége. Kismaros a folyókanyar Börzsöny felőli oldalán fekszik, a Duna-parttól beljebb."}
          </p>
          <p className="mt-1 text-xs text-[#6b6458]">Térképadat: OpenStreetMap közreműködők.</p>
          <article className="mt-6 rounded-lg border border-[#e4dfd4] border-l-4 border-l-[#6d8a5a] bg-white p-5 sm:p-6">
            <h3 className="text-lg font-medium">A kettős előny: hűvösebb nyár, napos hegyoldal</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a453c] sm:text-base">
              Nyáron itt 4 °C-kal hűvösebb van, mint a Duna-parton vagy a betondzsungelben: a fokozódó hőségek idején ez a nyári pihenéshez felbecsülhetetlen. Ezzel párhuzamosan ez a Börzsönyliget naposabb oldala. A déli, naposabb fekvés kedvez a napelemeknek: az utcában már van rá működő példa. Ugyanez a hegyoldal veteményesre vagy wallipini-szerű, fedett kertre is alkalmas.
            </p>
          </article>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <h3 className="text-lg font-medium">Ősfás tölgyes</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Kismaros-Börzsönyliget, Natura 2000-es terület, ősfás tölgyerdő.</p>
            </article>
            <article className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <h3 className="text-lg font-medium">Csend és szomszédság</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Távol a zajos vasútvonalaktól és a turisták tömegétől. Az elvonulni vágyóknak ajánlott, akik értékelik a jó szomszédsági viszonyokat, a nyugodt lakóövezeti telket: nyaraló felújítására, átépítésére vagy új lakóház építésére, telken belüli autóbeállókkal.</p>
            </article>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-medium">Az utca és a telek</h3>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Helyi térkép">
            <button type="button" role="tab" aria-selected={micro === "utca"} onClick={() => setMicro("utca")} className={`rounded-md px-4 py-2 text-sm font-medium ${micro === "utca" ? "bg-[#14221b] text-white" : "border border-[#e4dfd4] bg-white"}`}>
              Hörcsög utca
            </button>
            <button type="button" role="tab" aria-selected={micro === "foldhivatal"} onClick={() => setMicro("foldhivatal")} className={`rounded-md px-4 py-2 text-sm font-medium ${micro === "foldhivatal" ? "bg-[#14221b] text-white" : "border border-[#e4dfd4] bg-white"}`}>
              Földhivatali térkép
            </button>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-[#e4dfd4] bg-white">
            {micro === "utca" ? (
              <iframe
                title="Hörcsög utca közepe, Kismaros"
                src="https://maps.google.com/maps?q=47.844736,19.000447&z=17&hl=hu&output=embed"
                className="h-[420px] w-full sm:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <figure>
                <img src="/hirdetes/foldhivatal.jpg" alt="Földhivatali térkép: Kismaros belterület 2705, a telken álló épülettel és a szomszédos telkekkel" className="w-full bg-white" loading="lazy" decoding="async" />
                <figcaption className="border-t border-[#e4dfd4] px-4 py-3 text-sm leading-relaxed text-[#4a453c]">
                  Földhivatali térképmásolat, Kismaros belterület 2705, méretarány 1:1000, kiadva 2024. május 8-án. A rajzon a telek, a rajta álló épület és a szomszédos telkek. A másolat a kiadás időpontjában egyezik a nyilvántartási térképpel, méretek levételére nem használható.
                </figcaption>
              </figure>
            )}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <h3 className="text-lg font-medium">Az utca végén</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Az utcában, az adott oldalon ez a hirdetett ingatlan az utolsó állandóan lakott épület. A további két szomszédos telek tulajdonosai évente csak párszor, főleg nyáron vannak kint.</p>
            </article>
            <article className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <h3 className="text-lg font-medium">Ösvény a kaputól</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Az utca végén, a ház mellett árok fut, mellette ösvény vezet le a völgybe, és fel a dombtetőre, a Kukorica utca melletti rétre. A kapun kilépve 500 méteren belül kirándulóhelyeken van az ember.</p>
            </article>
            <article className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <h3 className="text-lg font-medium">1046 m², plusz a beálló</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">A hivatalos telekterület 1046 m². A telek előtt, az utcáig, kb. 150 m² önkormányzati, használati rész található: ez ad helyet a kocsibeállónak és a kiskapuhoz vezető lépcsőnek.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-20 border-t border-[#e4dfd4] bg-white py-20" id="tilalom">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Változtatási tilalom és jogi biztonság</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
            A környéken egyes olcsóbb hirdetések azért nyomottak vagy bizonytalanok, mert a helyi rendezési és változtatási korlátozások érintik őket. A rendelet mellékletén a kékkel jelölt telkek esnek ebbe a körbe. A sárga jelölés ez az ingatlan: a kék területen kívül van, változtatási tilalom nem érinti.
          </p>
          <figure className="mt-8 overflow-hidden rounded-lg border border-[#e4dfd4]">
            <img src="/hirdetes/tilalom.jpg" alt="Az önkormányzati rendelet 1. számú melléklete. A kékkel jelölt telkek a melléklet területe. A sárga jelölés a hirdetett telek, a kék területen kívül." className="w-full bg-white" loading="lazy" decoding="async" />
            <figcaption className="border-t border-[#e4dfd4] px-4 py-3 text-sm leading-relaxed text-[#4a453c]">
              Az önkormányzati rendelet 1. számú melléklete, a 2022. februári földhivatali alaptérkép alapján. A kék fedés a melléklet területe. A sárga jelölés a hirdetett telek, a lap jobb szélén, a kék területen kívül.
            </figcaption>
          </figure>
          <figure className="mt-4 overflow-hidden rounded-lg border border-[#e4dfd4]">
            <img src="/hirdetes/tilalom-reszlet.jpg" alt="A melléklet kinagyított része. A sárga telek a kékkel jelölt tömbök mellett, azokon kívül látszik." className="w-full bg-white" loading="lazy" decoding="async" />
            <figcaption className="border-t border-[#e4dfd4] px-4 py-3 text-sm leading-relaxed text-[#4a453c]">
              Ugyanaz a lap kinagyítva. A sárga telek a kék tömbök mellett, azokon kívül áll.
            </figcaption>
          </figure>
          <figure className="mt-4 overflow-hidden rounded-lg border border-[#e4dfd4]">
            <img src="/hirdetes/szabalyozas.jpg" alt="Kismaros szabályozási térképe. A kiemelt telek a hirdetett ingatlan, Hörcsög utca, belterület 2705, Lke-4 övezet." className="w-full bg-white" loading="lazy" decoding="async" />
            <figcaption className="border-t border-[#e4dfd4] px-4 py-3 text-sm leading-relaxed text-[#4a453c]">
              Kismaros szabályozási térképe. A jelölés a hirdetett telket mutatja: belterület 2705, Hörcsög utca, Lke-4 kertvárosias lakóövezet.
            </figcaption>
          </figure>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
            Az Lke-4 kertvárosias lakóövezeti besorolás és a 30%-os beépíthetőség alkalmassá teszi a meglévő nyaraló felújítására vagy új lakóház építésére is, telken belüli autóbeállókkal.
          </p>
        </div>
      </section>

      <section className="scroll-mt-20 border-t border-[#e4dfd4] bg-white py-16" id="seta">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Bejárható 3D fotózás</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
            Járja körbe az ingatlant és a felépítményt lépésről lépésre, közvetlenül a böngészőből. A felvétel a rögzítéskori állapotot mutatja. A galéria alapállapota óta elvégzett korszerűsítéseket a Felépítmény és belső állapot szekcióban találja.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-[#e4dfd4] bg-[#14221b]">
            <iframe
              title="Bejárható 3D fotózás"
              src={TOUR_URL}
              className="h-[70vh] min-h-[420px] w-full"
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" id="adatok">
        <h2 className="text-3xl font-medium">Az ingatlan adatai</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
          Az adatok a tulajdoni lapon és a hatósági dokumentumokban szereplő értékekkel egyeznek. A hivatalos telekterület 1046 m². A közműfotók kis méretben vannak; kattintásra nagyítódnak.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <li key={fact.label} className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <fact.icon className="h-5 w-5 text-[#1f4d3a]" aria-hidden />
              <p className="mt-3 text-xs uppercase tracking-wide text-[#6b6458]">{fact.label}</p>
              <p className="mt-1 text-sm font-medium leading-snug">{fact.value}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UTILITY_PHOTOS.map((photo, index) => (
            <li key={photo.src} className="rounded-lg border border-[#e4dfd4] bg-white p-5">
              <button
                type="button"
                onClick={() => setOpen({ kind: "utility", index })}
                className="flex w-full items-start gap-4 text-left"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-16 w-16 shrink-0 rounded-md border border-[#e4dfd4] bg-[#f3f0e8] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-[#6b6458]">{photo.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#4a453c]">{photo.caption}</span>
                  <span className="mt-2 block text-xs font-medium text-[#1f4d3a]">Nagyítás</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="scroll-mt-20 border-t border-[#e4dfd4] bg-white py-16" id="belso">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Felépítmény és belső állapot</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
            A hirdetési galéria a {PHOTO_STATE.replace(/\.$/, "")}-i alapállapotot mutatja. Az azóta elvégzett korszerűsítések a funkcionális élhetőséget szolgálják.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-[#e4dfd4] bg-[#f3f0e8] p-5">
              <h3 className="text-lg font-medium">Mellékhelyiség átalakítva</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                A mellékhelyiség átalakításra került: már nem közvetlenül a konyhából nyílik. Ez kulturáltabb és élhetőbb belső elrendezést ad. A fürdőfotón a mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.
              </p>
            </article>
            <article className="rounded-lg border border-[#e4dfd4] bg-[#f3f0e8] p-5">
              <h3 className="text-lg font-medium">Fűtés előkészítve</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                A fűtési infrastruktúra előkészítve. A cserépkályha üzembe helyezésére megbeszélt szakember áll rendelkezésre, így a téli időszakban azzal is hatékonyan fűthető az ingatlan.
              </p>
            </article>
            <article className="rounded-lg border border-[#e4dfd4] bg-[#f3f0e8] p-5">
              <h3 className="text-lg font-medium">Tiszta lap a belsőhöz</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                A belső burkolatok frissítése és a berendezés tiszta lapként az új tulajdonosra vár. Mindenki a saját igényei és ízlése szerint alakíthatja ki a belső teret.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-20 bg-[#0c1611] py-16 text-white" id="galeria">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium text-white drop-shadow">Képgaléria</h2>
          <p className="mt-3 max-w-2xl text-sm text-white/90">
            Külső és belső felvételek a {PHOTO_STATE.replace(/\.$/, "")}-i alapállapotról. Az azóta elvégzett korszerűsítések a Felépítmény és belső állapot szekcióban. Kattintásra nagyobb méretben nyílnak meg.
          </p>
          <ul className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">
            {PHOTOS.map((photo, index) => (
              <li key={photo.src} className="mb-3 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen({ kind: "gallery", index })}
                  className="block w-full overflow-hidden rounded-md"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={`w-full object-cover ${photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" id="hely">
        <h2 className="text-3xl font-medium">Kinek való</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
          Annak, aki elvonulna, és értékeli a jó szomszédságot: nyugodt, természetközeli lakóövezeti telek. A meglévő nyaraló felújítható vagy átépíthető, és új lakóház is építhető, telken belüli autóbeállókkal. A felépítmény az építkezés idejére felvonulási épület.
        </p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          <li className="rounded-lg border border-[#e4dfd4] border-t-4 border-t-[#6d8a5a] bg-white p-5">
            <h3 className="text-lg font-medium">Tiszta jogi státusz</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Változtatási tilalom nem érinti. Az Lke-4 lakóövezet 30% beépíthetőséget ad, új lakóházra is.</p>
          </li>
          <li className="rounded-lg border border-[#e4dfd4] border-t-4 border-t-[#6d8a5a] bg-white p-5">
            <h3 className="text-lg font-medium">Csendesebb hely</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Távol a zajos vasútvonalaktól és a turisták tömegétől. Nyugodt lakóövezeti telek, jó szomszédsági viszonyokkal.</p>
          </li>
          <li className="rounded-lg border border-[#e4dfd4] border-t-4 border-t-[#6d8a5a] bg-white p-5">
            <h3 className="text-lg font-medium">Hűvös és napos</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">Nyáron 4 °C-kal hűvösebb, mint a Duna-parton, mégis a Börzsönyliget naposabb oldala: napelemre és veteményesre is alkalmas.</p>
          </li>
        </ul>
      </section>

      <section className="border-t border-[#e4dfd4] bg-white py-16" id="valtozatok">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Két adásvételi változat</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a453c] sm:text-base">
            Ugyanaz a telek és ugyanaz az épület, két szerződéses változatban. A vételár a választott ág érdeklődő oldalán jelenik meg, árösszehasonlítással. A különbség a használatban van.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="flex flex-col rounded-lg border border-[#e4dfd4] border-l-4 border-l-[#6d8a5a] bg-[#f3f0e8] p-6">
              <h3 className="text-xl font-medium">A változat: korlátozással</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                A lakóövezeti nyugalom védelmét szolgálja. A szerződés tiltja a rövid távú szálláshely-szolgáltatást és a kereskedelmi célú szállásadást. A lakhatás, a pihenés, a home office és a hosszú távú bérbeadás szabad marad.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                Megszegés esetén minden érintett évre 4 millió forint kötbér jár. A kötbér megfizetése nem mentesít a tilalom alól: a tevékenység abbahagyása továbbra is követelhető. Felmentés egyszeri 4 millió forintért kérhető.
              </p>
              <Link
                href="/hirdetes/erdeklodes/a"
                className="mt-6 inline-flex rounded-md bg-[#1f4d3a] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Érdeklődöm az A változatra
              </Link>
            </article>
            <article className="flex flex-col rounded-lg border border-[#e4dfd4] border-l-4 border-l-[#7a5a3c] bg-[#f3f0e8] p-6">
              <h3 className="text-xl font-medium">B változat: korlátozás nélkül</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                Teljes használati szabadságot biztosít a vevőnek. A magasabb vételár a szabad felhasználás ellenértéke, a vételár része. Aki a használatot szabadon akarja, ezt a változatot választja a vételkor.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4a453c]">
                A hatályos jogszabályok és a helyi építési szabályzat mindkét változatban érvényesek. Az Lke-4 övezetben megengedett használatot a helyi szabályzatban és az illetékes hatóságnál lehet ellenőrizni.
              </p>
              <Link
                href="/hirdetes/erdeklodes/b"
                className="mt-6 inline-flex rounded-md bg-[#7a5a3c] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Érdeklődöm a B változatra
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-20 bg-[#0c1611] py-16 text-white" id="kapcsolat">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-medium text-white">Kapcsolatfelvétel</h2>
            <p className="mt-3 text-lg font-medium text-white">Keresem jövőbeni szomszédomat.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              Általános kérdéshez ez az űrlap. Ha már tudja, melyik szerződéses ágat nézi, válassza az A vagy B gombot a változatoknál: ott megjelenik az ajánlat és az árösszehasonlítás is.
            </p>
          </div>
          <div className="rounded-lg bg-[#f3f0e8] p-5 text-[#1c1915] sm:p-6">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e4dfd4] px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center text-xs leading-relaxed text-[#6b6458]">
          <p>Az oldalon szereplő adatok tájékoztató jellegűek, a hivatalos dokumentumok az irányadók.</p>
          <p>
            Adatvédelem: Semmihez sem gyűjtöm és nem adom át harmadik félnek a megismert adataidat. Azokat kizárólag az érdeklődésed miatti kapcsolattartásra használom a potenciális üzlet reményében. Sikeres vagy sikertelen kimenetel esetén is törlöm az érdeklődők adatait legkésőbb 30 napon belül, ahogy a hirdetésemet is törlöm.
          </p>
        </div>
      </footer>

      {lightboxSrc ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true">
          <button type="button" className="absolute right-4 top-4 text-sm text-white" onClick={() => setOpen(null)}>
            Bezárás
          </button>
          {open?.kind === "gallery" ? (
            <button
              type="button"
              className="px-3 text-2xl text-white"
              onClick={() => setOpen({ kind: "gallery", index: (open.index - 1 + PHOTOS.length) % PHOTOS.length })}
              aria-label="Előző kép"
            >
              ‹
            </button>
          ) : null}
          <img src={lightboxSrc.src} alt={lightboxSrc.alt} className="max-h-[85vh] max-w-[80vw] object-contain" />
          {open?.kind === "gallery" ? (
            <button
              type="button"
              className="px-3 text-2xl text-white"
              onClick={() => setOpen({ kind: "gallery", index: (open.index + 1) % PHOTOS.length })}
              aria-label="Következő kép"
            >
              ›
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
