"use client";

import { ChevronDown, ChevronLeft, ChevronRight, FileText, House, MapPin, Menu, Ruler, Thermometer, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState, type MouseEvent, type ReactNode } from "react";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import {
  ListingMobileContact,
  ListingPhoneProvider,
  ListingSellerCard,
  trackListingCta,
} from "@/components/listing/ListingContact";
import {
  FAQ_ITEMS,
  HERO_IMAGE,
  LISTING_LOGO,
  PHOTO_STATE,
  PHOTOS,
  PROCESS_STEPS,
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#241f18] sm:text-base">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#0f2e1f] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId} className="border-t border-[#d4c9b5] px-5 py-4 text-sm leading-relaxed text-[#5a5146]">
          {answer}
        </div>
      ) : null}
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
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
      <div id="teteje" className="overflow-x-clip bg-[#efe8db] text-[#241f18]">
        <header className="sticky top-0 z-40 border-b border-[#d4c9b5] bg-[#efe8db]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
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
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[48%_42%]"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(15, 46, 31, 0.58)" }} aria-hidden />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10, 33, 22, 0.92) 0%, rgba(15, 46, 31, 0.55) 45%, rgba(15, 46, 31, 0.35) 100%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-12 md:min-h-[75vh] md:px-6 md:py-16 lg:min-h-[78vh]">
            <div className="max-w-3xl rounded-lg bg-[#0f2e1f]/88 p-5 shadow-[0_8px_40px_rgba(15,46,31,0.45)] md:p-7">
              <h1 className="text-3xl font-medium leading-tight text-[#f7f1e6] md:text-4xl lg:text-5xl">
                Erdei faház a Börzsönyben, 1046&nbsp;m² privát telken
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#f7f1e6]/95 sm:text-lg">
                Kismaros-Börzsönyliget, zsákutca vége, a Duna–Ipoly Nemzeti Park szélén. Csend, árnyék, nyugalom, fix
                áron, jutalék nélkül.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="#azaras"
                  onClick={() => trackListingCta("hero_price_2027")}
                  className="rounded-md border border-[#e8b84a]/70 bg-[#1a4530]/55 px-4 py-3 text-left"
                >
                  <p className="text-xl font-medium text-[#e8b84a]">{VARIANT_OFFER.a.listPrice}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#f7f1e6]/90">{VARIANT_OFFER.a.bandNote}</p>
                </a>
                <a
                  href="#azaras"
                  onClick={() => trackListingCta("hero_price_2026")}
                  className="rounded-md border border-[#e8b84a]/70 bg-[#1a4530]/55 px-4 py-3 text-left"
                >
                  <p className="text-xl font-medium text-[#e8b84a]">{VARIANT_OFFER.b.listPrice}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#f7f1e6]/90">{VARIANT_OFFER.b.bandNote}</p>
                </a>
              </div>
              <a
                href="#kapcsolat"
                onClick={() => trackListingCta("hero_viewing")}
                className="mt-6 inline-flex rounded-md bg-[#e8b84a] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
              >
                Megtekintést kérek
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:px-6 md:py-16 lg:py-20" id="elhelyezkedes">
          <h2 className="text-3xl font-medium">Miről szól ez a hely?</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#6b6154]">Mikroklíma &amp; szomszédság</p>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-[#5a5146] sm:text-base">
            <p>
              Itt nincs szomszéd az ablakban és nincs átmenő forgalom. A telek a Hörcsög utca végén áll, az erdő
              szélén. Nyáron az erdei mikroklíma átlagosan 4&nbsp;°C-kal hűvösebb, mint a Duna-parton, télen a
              cserépkályha tölti be a házat melegével.
            </p>
            <p>
              A Hörcsög utcában ezen az oldalon az elhelyezkedés ideális: az előtted lévő szomszédban állandó lakó él,
              míg a telek után lévő további két ingatlan tulajdonosai csak évente néhány alkalommal tartózkodnak kint.
              Ez biztosítja a zavartalan nyugalmat, de elkerüli az izolációt.
            </p>
            <p>
              A ház egyszerű és szerényen berendezett felvonulási épület / hétvégi ház. Azonnal használható, de nem
              kész luxuslakás: a belső hangulatot te alakítod ki saját ízlésedre.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-medium">Ország, régió és mikroklíma</h3>
            <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Térségi térkép">
              <button
                type="button"
                role="tab"
                aria-selected={macro === "orszag"}
                onClick={() => setMacro("orszag")}
                className={`rounded-md px-4 py-2 text-sm font-medium ${macro === "orszag" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}
              >
                Magyarország
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={macro === "duna"}
                onClick={() => setMacro("duna")}
                className={`rounded-md px-4 py-2 text-sm font-medium ${macro === "duna" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}
              >
                Dunakanyar
              </button>
            </div>
            <MapFrame>
              <img
                src={macro === "orszag" ? "/hirdetes/makro-orszag.jpg" : "/hirdetes/makro-duna.jpg"}
                alt={
                  macro === "orszag"
                    ? "Magyarország térképe. A jelölés Kismarost mutatja, Budapesttől északra."
                    : "A Dunakanyar térképe. A jelölés Kismarost mutatja, a Börzsöny lábánál, a Duna-parttól beljebb."
                }
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
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-medium">Az utca és a telek</h3>
            <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Helyi térkép">
              <button
                type="button"
                role="tab"
                aria-selected={micro === "utca"}
                onClick={() => setMicro("utca")}
                className={`rounded-md px-4 py-2 text-sm font-medium ${micro === "utca" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}
              >
                Hörcsög utca
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={micro === "foldhivatal"}
                onClick={() => setMicro("foldhivatal")}
                className={`rounded-md px-4 py-2 text-sm font-medium ${micro === "foldhivatal" ? "bg-[#1a4530] text-[#f7f1e6]" : "border border-[#d4c9b5] bg-[#f7f1e6] text-[#241f18]"}`}
              >
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
                    Földhivatali térképmásolat, Kismaros belterület 2705, méretarány 1:1000, kiadva 2024. május 8-án.
                  </figcaption>
                </figure>
              )}
            </MapFrame>
          </div>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16 lg:py-20" id="tilalom">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">Ingatlan adatai &amp; jogi tisztaság</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
              Röviden a helyszínről, a telekről, a tilalom alóli mentességről és a közművekről — majd a rendelet
              térképei.
            </p>

            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <MapPin className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">Helyszín &amp; besorolás</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                  Kismaros-Börzsönyliget, Lke-4 övezet (max. 30% beépíthetőség, 4,5&nbsp;m építménymagasság). Mivel a
                  telek 1046&nbsp;m², a hatályos HÉSZ keretei érvényesek.
                </p>
              </li>
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <Ruler className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">Telek &amp; parkolás</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                  1046&nbsp;m² saját, rendezett telek Y-alakú beállóval.{" "}
                  <strong className="font-semibold text-[#2f4a38]">Telken belül bőségesen 3 autó számára</strong> van
                  hely, emellett a telek előtt lévő kb. 150&nbsp;m²-es önkormányzati/használati sávban még 1 autó
                  kényelmesen megállhat — így a beállás egyáltalán nem vesz el helyet a beépíthető privát telekből.
                </p>
              </li>
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <FileText className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">Jogi státusz — változtatási tilalom alól mentes</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                  Kismaros Önkormányzata a 8/2025. (IV. 14.) számú rendeletével a HÉSZ felülvizsgálata miatt
                  változtatási tilalmat rendelt el Börzsönyliget egyes ingatlanaira (várhatóan 2027 júniusáig).{" "}
                  <strong className="font-semibold text-[#2f4a38]">
                    Ez az ingatlan nincs a tilalmi listán
                  </strong>
                  , így tiszta jogi státusszal azonnal mozgásteret és biztonságot nyújt.
                </p>
                <a href="#tilalom-terkepek" className="mt-3 inline-flex text-sm font-semibold text-[#0f2e1f] underline-offset-2 hover:underline">
                  Önkormányzati rendelet / térképek megtekintése
                </a>
              </li>
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <Thermometer className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">Fűtés &amp; közmű</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                  Cserépkályha (szakemberrel előkészített fűtési infrastruktúra), HÉSZ 42. § szerinti zárt
                  szennyvíztároló, villany.
                </p>
              </li>
            </ul>

            <div id="tilalom-terkepek" className="scroll-mt-28 mt-12">
              <h3 className="text-2xl font-medium">Övezeti besorolás &amp; változtatási tilalom — bizonyíték</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
                A rendelet mellékletén a kékkel jelölt telkek esnek a tilalom alá.{" "}
                <strong className="font-semibold text-[#241f18]">Ez az Lke-4 ingatlan nincs a listán</strong> (sárga
                jelölés).
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
                    alt="Az önkormányzati rendelet 1. számú melléklete. A kékkel jelölt telkek a melléklet területe. A sárga jelölés a hirdetett telek."
                    className="mx-auto max-h-[450px] w-full bg-white object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                    Az önkormányzati rendelet 1. számú melléklete. A sárga jelölés a hirdetett telek, a kék területen
                    kívül.
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
                    Kismaros szabályozási térképe: belterület 2705, Hörcsög utca, Lke-4 kertvárosias lakóövezet.
                  </figcaption>
                </figure>
              </MapFrame>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#5a5146]">
                A helyi építési szabályzat és a településképi előírások idővel módosulhatnak. Az oldalon szereplő
                övezeti adatok tájékoztató jellegűek; a hivatalos dokumentumok és az illetékes hatóság az irányadók.
                Tulajdoni lap kérésre vagy megtekintéskor áttekinthető.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:px-6 md:py-16" id="kozmuvek-epulet">
          <h2 className="text-3xl font-medium">Őszintén az állapotról</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
            A belső terek egyszerűek és eklektikusak. A ház azonnal használható és lakható, de ha szeretnéd a saját
            hangulatodra formálni, számolj kisebb ráfordítással: festés, burkolat, berendezés. Nem kész, igényesen
            berendezett luxusházat kínálunk, hanem egy tiszta jogi háttérrel rendelkező, kivételes adottságú erdei
            alapot.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <House className="h-5 w-5 text-[#e8b84a]" aria-hidden />
              <h3 className="mt-3 text-lg font-medium">Felépítmény</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                Azonnal használható felvonulási épület / hétvégi ház (kb. 1980), az ingatlan-nyilvántartásban
                feltüntetve. Mellékhelyiség átalakítva — már nem a konyhából nyílik.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <Thermometer className="h-5 w-5 text-[#e8b84a]" aria-hidden />
              <h3 className="mt-3 text-lg font-medium">Fűtés előkészítve</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                Cserépkályha-üzembe helyezésre megbeszélt szakember áll rendelkezésre. A belső burkolás és berendezés
                tiszta lap.
              </p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h3 className="text-lg font-medium">Közműfotók</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                Villany, víz, fürdő — kis méretben; kattintásra nagyítódnak. Galéria alapállapot: {PHOTO_STATE}
              </p>
            </article>
          </div>
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
                    <span className="mt-2 block text-xs font-medium text-[#d4a017]">Nagyítás</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16" id="seta">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">Bejárható 3D fotózás</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
              Járja körbe az ingatlant és a felépítményt lépésről lépésre, közvetlenül a böngészőből.
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

        <section className="scroll-mt-24 bg-[#0f2e1f] py-14 text-white md:py-16" id="galeria">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium text-[#f7f1e6]">Képgaléria</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#f7f1e6]/90">
              Külső és belső felvételek a {PHOTO_STATE.replace(/\.$/, "")}-i alapállapotról. Kattintásra nagyobb
              méretben nyílnak meg.
            </p>
            <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
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

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16" id="azaras">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">Árazás és birtokbaadási konstrukciók</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
              {VARIANT_OFFER.premiumNote}
            </p>

            {/* Tablet+: összehasonlító tábla; keskenyebb nézetben a kártyák elég */}
            <div className="mt-8 hidden overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#efe8db] md:block">
              <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-[#0f2e1f] text-xs uppercase tracking-wide text-[#e8b84a]">
                    <tr>
                      <th className="px-4 py-3 font-medium md:px-5">Paraméter</th>
                      <th className="px-4 py-3 font-medium md:px-5">{VARIANT_OFFER.a.optionLabel}</th>
                      <th className="px-4 py-3 font-medium md:px-5">{VARIANT_OFFER.b.optionLabel}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5a5146]">
                    <tr>
                      <th className="border-t border-[#d4c9b5] px-4 py-3 font-semibold text-[#241f18] md:px-5">Vételár</th>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 text-lg font-medium text-[#d4a017] md:px-5">
                        {VARIANT_OFFER.a.listPrice}
                      </td>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 text-lg font-medium text-[#d4a017] md:px-5">
                        {VARIANT_OFFER.b.listPrice}
                      </td>
                    </tr>
                    <tr className="bg-[#f7f1e6]/60">
                      <th className="border-t border-[#d4c9b5] px-4 py-3 font-semibold text-[#241f18] md:px-5">Foglaló</th>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 md:px-5">{VARIANT_OFFER.a.deposit}</td>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 md:px-5">{VARIANT_OFFER.b.deposit}</td>
                    </tr>
                    <tr>
                      <th className="border-t border-[#d4c9b5] px-4 py-3 font-semibold text-[#241f18] md:px-5">
                        Birtokbaadás
                      </th>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 md:px-5">{VARIANT_OFFER.a.possession}</td>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 md:px-5">{VARIANT_OFFER.b.possession}</td>
                    </tr>
                    <tr className="bg-[#f7f1e6]/60">
                      <th className="border-t border-[#d4c9b5] px-4 py-3 font-semibold text-[#241f18] md:px-5">
                        Berendezés
                      </th>
                      <td className="border-t border-[#d4c9b5] px-4 py-3 md:px-5" colSpan={2}>
                        {VARIANT_OFFER.fixturesNote}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">
              {VARIANT_OFFER.marketNote}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="flex flex-col rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[#6b6154]">{VARIANT_OFFER.a.optionLabel}</p>
                <p className="mt-2 text-3xl font-medium text-[#d4a017]">{VARIANT_OFFER.a.listPrice}</p>
                <dl className="mt-3 space-y-2 text-sm text-[#5a5146] md:hidden">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Foglaló</dt>
                    <dd>{VARIANT_OFFER.a.deposit}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Birtokbaadás</dt>
                    <dd>{VARIANT_OFFER.a.possession}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Berendezés</dt>
                    <dd>{VARIANT_OFFER.fixturesNote}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{VARIANT_OFFER.a.summary}</p>
                <Link
                  href="/hirdetes/erdeklodes/a"
                  onClick={() => trackListingCta("variant_a")}
                  className="mt-6 inline-flex justify-center rounded-md bg-[#e8b84a] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
                >
                  Érdeklődöm a 2027-es opcióra
                </Link>
              </article>
              <article className="flex flex-col rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#d4a017] bg-[#efe8db] p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[#6b6154]">{VARIANT_OFFER.b.optionLabel}</p>
                <p className="mt-2 text-3xl font-medium text-[#d4a017]">{VARIANT_OFFER.b.listPrice}</p>
                <dl className="mt-3 space-y-2 text-sm text-[#5a5146] md:hidden">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Foglaló</dt>
                    <dd>{VARIANT_OFFER.b.deposit}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Birtokbaadás</dt>
                    <dd>{VARIANT_OFFER.b.possession}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-[#6b6154]">Berendezés</dt>
                    <dd>{VARIANT_OFFER.fixturesNote}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{VARIANT_OFFER.b.summary}</p>
                <Link
                  href="/hirdetes/erdeklodes/b"
                  onClick={() => trackListingCta("variant_b")}
                  className="mt-6 inline-flex justify-center rounded-md bg-[#d4a017] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
                >
                  Érdeklődöm a 2026-os opcióra
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16" id="folyamat">
          <h2 className="text-3xl font-medium">Hogyan zajlik a folyamat?</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d4a017]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16" id="kinek">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">Kinek szól — és kinek nem?</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#e8b84a] bg-[#efe8db] p-6">
                <h3 className="text-xl font-medium">Neked szól</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">
                  Ha erdei nyugalmat szeretnél korrekt áron, örülsz a saját ízlésedre alakítható belső tereknek,
                  fontos a tiszta jogi háttér, és értékelted a transzparens felállást.
                </p>
              </article>
              <article className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#6b6154] bg-[#efe8db] p-6">
                <h3 className="text-xl font-medium">Nem neked szól</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">
                  Ha kulcsrakész, berendezett luxusingatlant vársz, vagy az alku számodra a fő szempont (az árak
                  fixek, nem tartalmaznak alkupuffert).
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16" id="gyik">
          <h2 className="text-3xl font-medium">Gyakori kérdések</h2>
          <div className="mt-8 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>

        <section className="scroll-mt-24 bg-[#0f2e1f] py-14 text-white md:py-16" id="kapcsolat">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:gap-10 md:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-medium text-[#f7f1e6]">Kapcsolatfelvétel</h2>
              <p className="mt-3 text-lg font-medium text-[#e8b84a]">Megtekintést egyeztetünk.</p>
              <p className="mt-3 text-sm leading-relaxed text-[#f7f1e6]/90 sm:text-base">
                Írj az űrlapon, vagy — adatkezelés elfogadása után — hívd a védett számot, illetve küldj közvetlen
                emailt. Ha már tudod az időzítést, válaszd a 2027-es vagy a 2026-os konstrukciót az árazásnál.
              </p>
              <ListingSellerCard tone="dark" />
            </div>
            <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 text-[#241f18] sm:p-6">
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
          <div
            className="fixed inset-0 z-[70] flex flex-col bg-[#0f2e1f]"
            role="dialog"
            aria-modal="true"
            aria-label="Nagyított képnézet"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#e8b84a]/35 px-3 py-3 md:px-5">
              <p className="truncate text-sm font-medium text-[#f7f1e6]/90">
                {open?.kind === "gallery"
                  ? `${(open.index ?? 0) + 1} / ${PHOTOS.length}`
                  : lightboxSrc.alt}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#e8b84a] bg-[#e8b84a] px-3 py-2 text-sm font-semibold text-[#241f18] shadow-[0_2px_12px_rgba(0,0,0,0.35)] hover:bg-[#f0c45c]"
                aria-label="Kilépés a nagyított nézetből"
              >
                <X className="h-5 w-5" aria-hidden />
                Bezárás
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center gap-1 px-1 py-3 sm:gap-2 sm:px-3 md:px-4">
              {open?.kind === "gallery" ? (
                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#e8b84a] bg-[#1a4530] text-[#e8b84a] shadow-[0_2px_14px_rgba(0,0,0,0.4)] hover:bg-[#243f30] md:h-12 md:w-12"
                  onClick={() =>
                    setOpen({ kind: "gallery", index: (open.index - 1 + PHOTOS.length) % PHOTOS.length })
                  }
                  aria-label="Előző kép"
                >
                  <ChevronLeft className="h-7 w-7" aria-hidden />
                </button>
              ) : (
                <span className="w-11 shrink-0 md:w-12" aria-hidden />
              )}

              <img
                src={lightboxSrc.src}
                alt={lightboxSrc.alt}
                className="max-h-[calc(100dvh-7.5rem)] max-w-[min(100%,calc(100vw-6.5rem))] object-contain md:max-w-[min(100%,calc(100vw-8rem))]"
              />

              {open?.kind === "gallery" ? (
                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#e8b84a] bg-[#1a4530] text-[#e8b84a] shadow-[0_2px_14px_rgba(0,0,0,0.4)] hover:bg-[#243f30] md:h-12 md:w-12"
                  onClick={() => setOpen({ kind: "gallery", index: (open.index + 1) % PHOTOS.length })}
                  aria-label="Következő kép"
                >
                  <ChevronRight className="h-7 w-7" aria-hidden />
                </button>
              ) : (
                <span className="w-11 shrink-0 md:w-12" aria-hidden />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </ListingPhoneProvider>
  );
}
