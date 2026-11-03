"use client";

import { Droplets, Fence, FileText, House, MapPin, Menu, Route, Ruler, Thermometer, Trees, X, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import {
  ListingMobileContact,
  ListingPhoneProvider,
  ListingSellerCard,
  trackListingCta,
} from "@/components/listing/ListingContact";
import {
  HERO_IMAGE,
  LISTING_LOGO,
  PHOTO_STATE,
  PHOTOS,
  TOUR_URL,
  UTILITY_PHOTOS,
  VARIANT_OFFER,
} from "@/lib/listing";

const NAV = [
  { href: "#elhelyezkedes", label: "Elhelyezkedés & Mikroklíma" },
  { href: "#tilalom", label: "Övezeti besorolás & Változtatási tilalom" },
  { href: "#kozmuvek-epulet", label: "Közművek & Épület" },
  { href: "#seta", label: "3D Séta" },
  { href: "#galeria", label: "Galéria" },
  { href: "#azaras", label: "Árazás" },
  { href: "#kapcsolat", label: "Kapcsolat" },
] as const;

const facts = [
  { icon: Ruler, label: "Hivatalos telek & parkolás", value: "1046 m² beépíthető magántelek; telken belül 3 autó. Előtte kb. 150 m² önkormányzati/használati sáv (+ lépcsőút) még 1 autónak — a parkolás nem csökkenti a 1046 m²-t." },
  { icon: Trees, label: "Besorolás (Lke-4)", value: "Szabadonálló beépítés, max. 30% beépíthetőség, legfeljebb 4,5 m építménymagasság. Új lakóházra / felújításra / átépítésre alkalmas keret a helyi szabályzat szerint." },
  { icon: House, label: "Felépítmény", value: "Azonnal használható felvonulási épület / hétvégi ház, az ingatlan-nyilvántartásban feltüntetve (kb. 1980). Mellékhelyiség átalakítva (nem a konyhából nyílik); cserépkályha-fűtés előkészítve szakemberrel; belső burkolás és berendezés tiszta lap." },
  { icon: Zap, label: "Villany", value: "Bekötött villany. A mérőhely után a belső rendszer cserélve (új kismegszakítók a mérő felett — a fotón látható). A névleges szerződéses teljesítmény a szolgáltatónál / a mérőn ellenőrizhető." },
  { icon: Droplets, label: "Víz & szennyvíz", value: "Vezetékes vízbekötés, folyó víz a csapokon. Börzsönyligetre vonatkozó részleges közmű; szennyvíz: zárt szennyvíztároló / saját emésztő (HÉSZ 42. § keretében)." },
  { icon: MapPin, label: "Környezet", value: "Duna–Ipoly Nemzeti Park vonzáskörzete, Ipoly Erdő Zrt., ősfás tölgyerdő, gazdag vadállomány. Nyáron 4 °C-kal hűvösebb a Duna-partnál; napos hegyoldal: napelemre és veteményesre is alkalmas." },
  { icon: FileText, label: "Jogi helyzet", value: "Változtatási tilalom nem érinti (8/2025. rendelet tilalmi listáján kívül). Tehermentes, birtokba adás megegyezés szerint." },
  { icon: Route, label: "Megközelítés", value: "Aszfaltozott főútról, szilárd burkolatú úton. Távol a zajos vasúttól." },
  { icon: Fence, label: "Telekhatár", value: "A drótkerítés egy földmérő által kimért telekhatár vonalon húzódik." },
  { icon: Thermometer, label: "Fűtés", value: "A fűtési infrastruktúra előkészítve. A cserépkályha üzembe helyezésére megbeszélt szakember áll rendelkezésre." },
] as const;

type Lightbox =
  | { kind: "gallery"; index: number }
  | { kind: "utility"; index: number }
  | null;

function MapFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex justify-center">
      <div className="w-full max-w-[800px] overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
        {children}
      </div>
    </div>
  );
}

export function PropertyLanding() {
  const [open, setOpen] = useState<Lightbox>(null);
  const [macro, setMacro] = useState<"orszag" | "duna">("orszag");
  const [micro, setMicro] = useState<"utca" | "foldhivatal">("utca");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const lightboxSrc =
    open?.kind === "gallery"
      ? PHOTOS[open.index]
      : open?.kind === "utility"
        ? UTILITY_PHOTOS[open.index]
        : null;

  function closeMenu() {
    setMenuOpen(false);
  }

  function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  }

  return (
    <ListingPhoneProvider>
    <div id="teteje" className="bg-[#efe8db] text-[#241f18]">
      <header className="sticky top-0 z-40 border-b border-[#d4c9b5] bg-[#efe8db]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a
            href="#teteje"
            onClick={scrollToTop}
            className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-wide text-[#0f2e1f] hover:opacity-90"
            aria-label="Vissza az oldal tetejére"
          >
            <img
              src={LISTING_LOGO.src}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 object-contain"
              decoding="async"
            />
            <span className="truncate">Kismaros · Börzsönyliget</span>
          </a>
          <nav className="hidden max-w-4xl flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm lg:flex" aria-label="Főmenü">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  item.href === "#kapcsolat"
                    ? "rounded-md bg-[#e8b84a] px-3 py-1.5 font-semibold text-[#241f18]"
                    : "hover:underline"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-[#d4c9b5] bg-[#f7f1e6] p-2 text-[#241f18] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="listing-mobile-nav"
            aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
        {menuOpen ? (
          <nav
            id="listing-mobile-nav"
            className="border-t border-[#d4c9b5] bg-[#efe8db] px-4 py-3 lg:hidden"
            aria-label="Mobilmenü"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={
                      item.href === "#kapcsolat"
                        ? "mt-1 block rounded-md bg-[#e8b84a] px-3 py-2.5 text-sm font-semibold text-[#241f18]"
                        : "block rounded-md px-3 py-2.5 text-sm hover:bg-[#f7f1e6]"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ListingMobileContact onNavigate={closeMenu} />
          </nav>
        ) : null}
      </header>

      <section className="relative min-h-[78vh] overflow-hidden bg-[#0f2e1f] text-white">
        <img
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[42%_38%]"
          fetchPriority="high"
          decoding="async"
        />
        {/* Erdei zöld sötétítő — nincs fekete */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15, 46, 31, 0.62)" }} aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 33, 22, 0.9) 0%, rgba(15, 46, 31, 0.55) 45%, rgba(15, 46, 31, 0.38) 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 py-16">
          <div className="max-w-3xl rounded-lg bg-[#0f2e1f]/88 p-5 shadow-[0_8px_40px_rgba(15,46,31,0.45)] sm:p-7">
            <p className="text-sm uppercase tracking-[0.18em] text-[#e8b84a]">Keresem jövőbeni szomszédomat</p>
            <h1 className="mt-3 text-4xl font-medium leading-tight text-[#f7f1e6] sm:text-5xl">
              Építési telek Börzsönyligeten, meglévő épülettel
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#f7f1e6]/95 sm:text-lg">
              Lke-4 kertvárosias lakóövezet a Börzsöny kapujában, ősfás tölgyesben. Nyáron 4 °C-kal
              hűvösebb, mint a Duna-parton, mégis a Börzsönyliget naposabb oldala. Az elvonulni
              vágyóknak: nyugodt telek, jó szomszédság, azonnal használható felépítmény — felújításra,
              átépítésre vagy új lakóházra, telken belüli autóbeállókkal.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <li>
                <p className="text-2xl font-medium text-[#e8b84a]">1046 m²</p>
                <p className="text-sm text-[#f7f1e6]/90">hivatalos telekterület</p>
              </li>
              <li>
                <p className="text-2xl font-medium text-[#e8b84a]">Lke-4</p>
                <p className="text-sm text-[#f7f1e6]/90">30% beépíthetőség, új lakóházra alkalmas</p>
              </li>
              <li>
                <p className="text-2xl font-medium text-[#e8b84a]">4 °C</p>
                <p className="text-sm text-[#f7f1e6]/90">hűvösebb nyáron, napos hegyoldalon</p>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#seta"
                onClick={() => trackListingCta("hero_tour")}
                className="rounded-md bg-[#e8b84a] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
              >
                Bejárható 3D fotózás megtekintése
              </a>
              <a
                href="#galeria"
                onClick={() => trackListingCta("hero_gallery")}
                className="rounded-md border border-[#e8b84a]/80 bg-[#1a4530]/50 px-5 py-3 text-center text-sm font-semibold text-[#f7f1e6]"
              >
                Képgaléria
              </a>
              <a
                href="#kapcsolat"
                onClick={() => trackListingCta("hero_contact")}
                className="rounded-md border border-[#e8b84a]/80 bg-[#1a4530]/50 px-5 py-3 text-center text-sm font-semibold text-[#f7f1e6]"
              >
                Kapcsolatfelvétel
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20" id="elhelyezkedes">
        <h2 className="text-3xl font-medium">Elhelyezkedés &amp; Mikroklíma</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
          Kismaros-Börzsönyliget, a Börzsöny kapuja: ősfás tölgyes, gazdag vadállomány, a Duna–Ipoly Nemzeti Park
          vonzáskörzete. A kettős előny: nyáron hűvösebb a Duna-partnál, mégis a Börzsönyliget naposabb oldala.
          Előbb az országban, aztán a térségben, végül az utcában.
        </p>

        <div className="mt-10">
          <h3 className="text-2xl font-medium">Ország, régió és mikroklíma</h3>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Térségi térkép">
            <button type="button" role="tab" aria-selected={macro === "orszag"} onClick={() => setMacro("orszag")} className={`rounded-md px-4 py-2 text-sm font-medium ${macro === "orszag" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}>
              Magyarország
            </button>
            <button type="button" role="tab" aria-selected={macro === "duna"} onClick={() => setMacro("duna")} className={`rounded-md px-4 py-2 text-sm font-medium ${macro === "duna" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}>
              Dunakanyar
            </button>
          </div>
          <MapFrame>
            <img
              src={macro === "orszag" ? "/hirdetes/makro-orszag.jpg" : "/hirdetes/makro-duna.jpg"}
              alt={macro === "orszag"
                ? "Magyarország térképe. A jelölés Kismarost mutatja, Budapesttől északra."
                : "A Dunakanyar térképe. A jelölés Kismarost mutatja, a Börzsöny lábánál, a Duna-parttól beljebb."}
              className="mx-auto max-h-[450px] w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </MapFrame>
          <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
            {macro === "orszag"
              ? "Kismaros a Dunakanyarban van, Budapesttől északra, a Börzsöny lábánál."
              : "A Dunakanyar térsége. Kismaros a folyókanyar Börzsöny felőli oldalán fekszik, a Duna-parttól beljebb."}
          </p>
          <p className="mt-1 text-xs text-[#6b6154]">Térképadat: OpenStreetMap közreműködők.</p>
          <article className="mt-6 rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#f7f1e6] p-5 sm:p-6">
            <h3 className="text-lg font-medium">Klíma-előny: hűvösebb nyár, napos hegyoldal</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">
              Nyáron itt 4 °C-kal hűvösebb van, mint a Duna-parton vagy a betondzsungelben: a fokozódó hőségek idején
              ez a nyári pihenéshez felbecsülhetetlen. Ezzel párhuzamosan ez a Börzsönyliget naposabb oldala — a déli
              fekvés kedvez a napelemeknek és a kertnek is.
            </p>
          </article>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Ipoly Erdő &amp; Nemzeti Park</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A környéken az Ipoly Erdő Zrt. gazdálkodik; a terület a Duna–Ipoly Nemzeti Park vonzáskörzetébe tartozik.
                Natura 2000-es ősfás tölgyerdő: igazi béke a Börzsöny kapujában.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Vadállomány &amp; természet</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                Gazdag helyi vadállomány, ősfás tölgyerdő, csendes erdei környezet. Távol a zajos vasútvonalaktól és a
                turisták tömegétől — az elvonulni vágyóknak, akik értékelik a jó szomszédságot és a nyugodt lakóövezeti telket.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Off-grid életvitel / önfenntartás</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A helyszín ideális terep az off-grid életvitel kialakítására. Bár a telek ősfás, a hegyoldali dőlésszög
                és a tisztább, nyitottabb foltok biztosítják a napelemek számára a fénymennyiséget — az utcában már van
                sikeres példa —, miközben a lombsátor nyáron hűvösebb mikroklímát ad. Hegyoldali veteményes vagy
                wallipini-szerű, fedett kert is kialakítható.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Ősfás tölgyes &amp; lakóövezet</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                Kismaros-Börzsönyliget, Lke-4 kertvárosias lakóövezet meglévő felépítménnyel: nyaraló felújítására,
                átépítésére vagy új lakóház építésére, telken belüli autóbeállókkal.
              </p>
            </article>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-medium">Az utca és a telek</h3>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Helyi térkép">
            <button type="button" role="tab" aria-selected={micro === "utca"} onClick={() => setMicro("utca")} className={`rounded-md px-4 py-2 text-sm font-medium ${micro === "utca" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}>
              Hörcsög utca
            </button>
            <button type="button" role="tab" aria-selected={micro === "foldhivatal"} onClick={() => setMicro("foldhivatal")} className={`rounded-md px-4 py-2 text-sm font-medium ${micro === "foldhivatal" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}>
              Földhivatali térkép
            </button>
          </div>
          <MapFrame>
            {micro === "utca" ? (
              <iframe
                title="Hörcsög utca közepe, Kismaros"
                src="https://maps.google.com/maps?q=47.844736,19.000447&z=17&hl=hu&output=embed"
                className="aspect-[16/10] h-auto max-h-[450px] min-h-[280px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <figure>
                <img
                  src="/hirdetes/foldhivatal.jpg"
                  alt="Földhivatali térkép: Kismaros belterület 2705, a telken álló épülettel és a szomszédos telkekkel"
                  className="mx-auto max-h-[450px] w-full bg-white object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                  Földhivatali térképmásolat, Kismaros belterület 2705, méretarány 1:1000, kiadva 2024. május 8-án. A rajzon a telek, a rajta álló épület és a szomszédos telkek. A másolat a kiadás időpontjában egyezik a nyilvántartási térképpel, méretek levételére nem használható.
                </figcaption>
              </figure>
            )}
          </MapFrame>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Ideális egyensúly a szomszédságban</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A Hörcsög utcában ezen az oldalon ez az ingatlan kiváló elhelyezkedésű: az előtte lévő szomszédban
                állandó lakó él, míg a telek után lévő további két ingatlan tulajdonosai tartózkodnak csak kint évente
                néhány alkalommal, főleg nyáron. Ez a felállás ideális egyensúlyt teremt: biztosítja a nyugalmat és a
                privát szférát, nem jelent izolációt.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Közvetlen természetkapcsolat</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                Az utca végén egy árok fut, amely mellett ösvény vezet le a völgybe és fel a dombtetőre, a Kukorica utca melletti rétre. A kapun kilépve 500 méteren belül elérhetőek a Börzsöny túraútvonalai.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Kényelmes parkolás telken belül és kívül</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A hivatalos telekterület 1046 m², amelyen{" "}
                <strong className="font-semibold text-[#2f4a38]">telken belül bőségesen, 3 autó számára</strong> van
                kialakítva parkolóhely. Ezen felül a telek előtt, a kiskapuhoz/lépcsőhöz vezető útnál lévő kb. 150
                m²-es önkormányzati/használati sávban még egy további autó kényelmesen elfér — így a parkolás
                elsősorban a privát telken belül történik, de extra hely is rendelkezésre áll.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-20" id="tilalom">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Övezeti besorolás (Lke-4) &amp; Változtatási tilalom</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            Kismaros Önkormányzat <strong className="font-semibold text-[#241f18]">8/2025. (IV. 14.)</strong> számú
            rendelete — a HÉSZ teljes körű felülvizsgálata és a börzsönyligeti üdülőövezet beerdősödése miatt —
            változtatási tilalmat rendelt el egyes ingatlanokra (várhatóan 2027 júniusáig). A rendelet mellékletén a
            kékkel jelölt telkek esnek ebbe a körbe.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            <strong className="font-semibold text-[#241f18]">Ez az Lke-4 ingatlan nincs a tilalmi listán</strong> (sárga
            jelölés a térképen): tiszta jogi státusz, azonnali mozgástér — miközben a környéken sok olcsóbbnak tűnő
            portát épp ez a tilalom blokkol.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3 text-sm" aria-label="Térkép jelmagyarázat">
            <li className="inline-flex items-center gap-2 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2">
              <span className="h-3.5 w-3.5 rounded-sm bg-[#3b6ea5]" aria-hidden />
              <span>Kék: változtatási tilalom alá eső övezet</span>
            </li>
            <li className="inline-flex items-center gap-2 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2">
              <span className="h-3.5 w-3.5 rounded-sm bg-[#e6c84a]" aria-hidden />
              <span>Sárga: a hirdetett telek (tilalmon kívül)</span>
            </li>
          </ul>
          <MapFrame>
            <figure>
              <img
                src="/hirdetes/tilalom-reszlet.jpg"
                alt="A melléklet kinagyított része. A sárga telek a kékkel jelölt tömbök mellett, azokon kívül látszik."
                className="mx-auto max-h-[450px] w-full bg-white object-contain"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                Kinagyított részlet: a sárga telek a kék tömbök mellett, azokon kívül áll — tiszta jogi státusz.
              </figcaption>
            </figure>
          </MapFrame>
          <MapFrame>
            <figure>
              <img
                src="/hirdetes/tilalom.jpg"
                alt="Az önkormányzati rendelet 1. számú melléklete. A kékkel jelölt telkek a melléklet területe. A sárga jelölés a hirdetett telek, a kék területen kívül."
                className="mx-auto max-h-[450px] w-full bg-white object-contain"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                Az önkormányzati rendelet 1. számú melléklete, a 2022. februári földhivatali alaptérkép alapján. A kék fedés a melléklet területe. A sárga jelölés a hirdetett telek, a lap jobb szélén, a kék területen kívül.
              </figcaption>
            </figure>
          </MapFrame>
          <MapFrame>
            <figure>
              <img
                src="/hirdetes/szabalyozas.jpg"
                alt="Kismaros szabályozási térképe. A kiemelt telek a hirdetett ingatlan, Hörcsög utca, belterület 2705, Lke-4 övezet."
                className="mx-auto max-h-[450px] w-full bg-white object-contain"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                Kismaros szabályozási térképe. A jelölés a hirdetett telket mutatja: belterület 2705, Hörcsög utca, Lke-4 kertvárosias lakóövezet.
              </figcaption>
            </figure>
          </MapFrame>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
              <h3 className="text-lg font-medium">HÉSZ — Lke-4 keretek</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5a5146]">
                <li>Szabadonálló beépítés, max. 30% beépíthetőség, legfeljebb 4,5 m építménymagasság.</li>
                <li>Hivatalos telek 1046 m²; a helyi szabályzat változásait érdemes követni.</li>
                <li>Részleges közmű / zárt szennyvíztároló a Börzsönyligetre vonatkozó HÉSZ 42. § szerint.</li>
                <li>
                  Parkolás: telken belül 3 autó; előtte kb. 150 m² önkormányzati/használati sáv (+ lépcsőút) még 1
                  autónak — nem terheli a 1046 m² beépíthető területet.
                </li>
              </ul>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
              <h3 className="text-lg font-medium">Neutrális megjegyzés</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A helyi építési szabályzat és a településképi előírások idővel módosulhatnak. Az oldalon szereplő
                övezeti adatok tájékoztató jellegűek; a hivatalos dokumentumok és az illetékes hatóság az irányadók.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-16" id="seta">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Bejárható 3D fotózás</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            Járja körbe az ingatlant és a felépítményt lépésről lépésre, közvetlenül a böngészőből. A felvétel a rögzítéskori állapotot mutatja. A galéria alapállapota óta elvégzett korszerűsítéseket a Felépítmény és belső állapot szekcióban találja.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#0f2e1f]">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="Bejárható 3D fotózás"
                src={TOUR_URL}
                className="absolute inset-0 h-full w-full"
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16" id="kozmuvek-epulet">
        <h2 className="text-3xl font-medium">Közművek &amp; Épület</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
          Az adatok a tulajdoni lapon és a hatósági dokumentumokban szereplő értékekkel egyeznek. A hivatalos telekterület 1046 m². A közműfotók kis méretben vannak; kattintásra nagyítódnak.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <li key={fact.label} className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <fact.icon className="h-5 w-5 text-[#e8b84a]" aria-hidden />
              <p className="mt-3 text-xs uppercase tracking-wide text-[#6b6154]">{fact.label}</p>
              <p className="mt-1 text-sm font-medium leading-snug">{fact.value}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UTILITY_PHOTOS.map((photo, index) => (
            <li key={photo.src} className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <button
                type="button"
                onClick={() => setOpen({ kind: "utility", index })}
                className="flex w-full items-start gap-4 text-left"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-16 w-16 shrink-0 rounded-md border border-[#d4c9b5] bg-[#efe8db] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-[#6b6154]">{photo.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#5a5146]">{photo.caption}</span>
                  <span className="mt-2 block text-xs font-medium text-[#e8b84a]">Nagyítás</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-16" id="belso">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Felépítmény és belső állapot</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            A felvonulási épület / hétvégi ház azonnal használható, az ingatlan-nyilvántartásban feltüntetve (épült kb.
            1980 körül). A galéria a {PHOTO_STATE.replace(/\.$/, "")}-i alapállapotot mutatja; az azóta elvégzett
            funkcionális korszerűsítések alább.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
              <h3 className="text-lg font-medium">Mellékhelyiség átalakítva</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A mellékhelyiség átalakításra került: már nem közvetlenül a konyhából nyílik. Ez kulturáltabb és élhetőbb belső elrendezést ad. A fürdőfotón a mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
              <h3 className="text-lg font-medium">Fűtés előkészítve</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A fűtési infrastruktúra előkészítve. A cserépkályha üzembe helyezésére megbeszélt szakember áll rendelkezésre, így a téli időszakban azzal is hatékonyan fűthető az ingatlan.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
              <h3 className="text-lg font-medium">Tiszta lap a belsőhöz</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                A belső burkolatok frissítése és a berendezés tiszta lapként az új tulajdonosra vár. Mindenki a saját igényei és ízlése szerint alakíthatja ki a belső teret.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 bg-[#0f2e1f] py-16 text-white" id="galeria">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium text-[#f7f1e6]">Képgaléria</h2>
          <p className="mt-3 max-w-2xl text-sm text-[#f7f1e6]/90">
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
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
          Annak, aki elvonulna, és értékeli a jó szomszédságot: nyugodt, természetközeli lakóövezeti telek. A meglévő nyaraló felújítható vagy átépíthető, és új lakóház is építhető, telken belüli autóbeállókkal. A felépítmény az építkezés idejére felvonulási épület.
        </p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          <li className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#e8b84a] bg-[#f7f1e6] p-5">
            <h3 className="text-lg font-medium">Tiszta jogi státusz</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">Változtatási tilalom nem érinti. Az Lke-4 lakóövezet 30% beépíthetőséget ad, új lakóházra is.</p>
          </li>
          <li className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#e8b84a] bg-[#f7f1e6] p-5">
            <h3 className="text-lg font-medium">Csendesebb hely</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">Távol a zajos vasútvonalaktól és a turisták tömegétől. Nyugodt lakóövezeti telek, jó szomszédsági viszonyokkal.</p>
          </li>
          <li className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#e8b84a] bg-[#f7f1e6] p-5">
            <h3 className="text-lg font-medium">Hűvös és napos</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
              Nyáron 4 °C-kal hűvösebb, mint a Duna-parton; a hegyoldali dőlésszög és a nyitottabb foltok mégis
              biztosítják a napelemek fénymennyiségét (utcai példával), miközben a lombsátor hűvösebb mikroklímát ad.
            </p>
          </li>
        </ul>
      </section>

      <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-16" id="azaras">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-medium">Két használati konstrukció</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            Ugyanaz a telek, két csomag: magáncélú nyugalom kedvezményes irányárral, vagy szabadabb / üzleti hasznosítás
            standard áron. {VARIANT_OFFER.premiumNote}
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="flex flex-col rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[#6b6154]">
                {VARIANT_OFFER.a.optionLabel} · kedvezményes irányár
              </p>
              <h3 className="mt-1 text-xl font-medium">Magáncélú, nyugalmat őrző használat</h3>
              <p className="mt-2 text-3xl font-medium text-[#d4a017]">{VARIANT_OFFER.a.listPrice}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#6b6154]">{VARIANT_OFFER.a.bandNote}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{VARIANT_OFFER.a.summary}</p>
              <Link
                href="/hirdetes/erdeklodes/a"
                onClick={() => trackListingCta("variant_a")}
                className="mt-6 inline-flex rounded-md bg-[#e8b84a] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
              >
                Érdeklődöm az 1. opcióra
              </Link>
            </article>
            <article className="flex flex-col rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#d4a017] bg-[#efe8db] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[#6b6154]">
                {VARIANT_OFFER.b.optionLabel} · standard piaci ár
              </p>
              <h3 className="mt-1 text-xl font-medium">Szabad felhasználású / üzleti hasznosítás</h3>
              <p className="mt-2 text-3xl font-medium text-[#d4a017]">{VARIANT_OFFER.b.listPrice}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#6b6154]">{VARIANT_OFFER.b.bandNote}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{VARIANT_OFFER.b.summary}</p>
              <Link
                href="/hirdetes/erdeklodes/b"
                onClick={() => trackListingCta("variant_b")}
                className="mt-6 inline-flex rounded-md bg-[#d4a017] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
              >
                Érdeklődöm a 2. opcióra
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 bg-[#0f2e1f] py-16 text-white" id="kapcsolat">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-medium text-[#f7f1e6]">Kapcsolatfelvétel</h2>
            <p className="mt-3 text-lg font-medium text-[#e8b84a]">Keresem jövőbeni szomszédomat.</p>
            <p className="mt-3 text-sm leading-relaxed text-[#f7f1e6]/90 sm:text-base">
              Általános kérdéshez ez az űrlap. Ha már tudja, melyik konstrukciót nézi, válassza az 1. vagy 2. opciót.
              Közvetlen telefon és email az adatkezelés elfogadása után érhető el.
            </p>
            <ListingSellerCard tone="dark" />
          </div>
          <div className="rounded-lg bg-[#f7f1e6] p-5 text-[#241f18] border border-[#d4c9b5] sm:p-6">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d4c9b5] px-4 py-8">
        <div className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#6b6154]">
          <p>Az oldalon szereplő adatok tájékoztató jellegűek, a hivatalos dokumentumok az irányadók.</p>
        </div>
      </footer>

      {lightboxSrc ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2e1f]/92 p-4" role="dialog" aria-modal="true">
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
    </ListingPhoneProvider>
  );
}
