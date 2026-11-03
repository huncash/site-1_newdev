/**
 * Nyilvános listing: fix vételárak birtokbaadási időzítés szerint.
 * Belső padlóár / eladási kényszer / deadline soha nem szerepelhet szövegként.
 */

export const TOUR_URL = "https://my.matterport.com/show/?m=92EPXPjr6gR&ts=1";
export const PHOTO_STATE = "2026. szeptember 2.";

/** Barna faház, fehér ablakok, betonlépcső, középső beépítési szint. */
export const HERO_IMAGE = {
  src: "/hirdetes/20260902-02.jpg",
  alt: "Barna faház fehér ablakokkal, betonlépcsővel és a középső beépítési szinttel a tölgyesben",
} as const;

export const LISTING_LOGO = {
  src: "/hirdetes/logo-tolgyes.png",
  alt: "Kismaros–Börzsönyliget — ősfás tölgyes és kabin sziluett",
} as const;

/**
 * Személyes kapcsolat — a telefonszám NEM itt van plain textben.
 * Összerakás: ListingContact (csak megjelenítés után). Nincs avatar / WhatsApp.
 */
export const LISTING_SELLER = {
  name: "Patrik",
  role: "Tulajdonos · közvetlen kapcsolat",
} as const;

export type ListingVariant = "a" | "b";

/** a = 2027-es birtokbaadás · b = 2026 végéig tartó birtokbaadás */
export const VARIANT_OFFER = {
  a: {
    code: "a" as const,
    optionLabel: "2027-es birtokbaadás",
    title: "2027-es birtokbaadás — 32,2 M Ft",
    short: "2027. január",
    listPrice: "32,2 M Ft",
    deposit: "10% (3,22 M Ft) a szerződéskötéskor",
    possession: "2027. január",
    bandNote: "2027-es birtokbaadással, 10% foglalóval a szerződéskötéskor",
    perSqm: "kb. 30,8 ezer Ft/m² az irányárból",
    summary:
      "Ugyanaz az ingatlan, későbbi birtokbaadással. A kedvezményes ár a későbbi ütemezésért jár: ha nem sürgős a költözés, a tulajdonátruházás későbbre kerülhet.",
  },
  b: {
    code: "b" as const,
    optionLabel: "2026 végéig tartó birtokbaadás",
    title: "2026 végéig tartó birtokbaadás — 33 M Ft",
    short: "2026. december 31-ig",
    listPrice: "33 M Ft",
    deposit: "Szerződés szerint",
    possession: "2026. december 31-ig",
    bandNote: "2026 végéig tartó birtokbaadással",
    perSqm: "kb. 31,5 ezer Ft/m² az irányárból",
    summary:
      "Ugyanaz az ingatlan, korábbi birtokbaadással. A ház azonnal használható; a birtokbaadás 2026 végéig megtörténik.",
  },
  plotSqm: 1046,
  priceDiff: "0,8 M Ft",
  fixturesNote: "A jelenlegi egyszerű berendezéssel együtt",
  premiumNote:
    "Az árak fixek, közvetítői jutalék nincs. A két ár közötti különbség nem alku tárgya: ugyanaz az ingatlan, a különbség kizárólag a birtokbaadás időpontja.",
  marketNote:
    "Ha nem sürgős a költözés, a tulajdonátruházás későbbi ütemezése a tulajdonosnak kedvezőbb — és ezt az előnyt az árban megosztja. A foglaló szabályait az adásvételi előszerződés rögzíti, ügyvéd közreműködésével.",
} as const;

export const FAQ_ITEMS = [
  {
    q: "Alkudható az ár?",
    a: "Nem, az árak fixek. Ezért korrekt: nincs mesterségesen felfújt alkupuffer.",
  },
  {
    q: "Mi marad a házban?",
    a: "A jelenlegi egyszerű berendezés a házban marad. (A tárolókból a személyes tárgyak elszállításra kerülnek).",
  },
  {
    q: "Miért olcsóbb a 2027-es opció?",
    a: "Ha nem kell azonnal költöznöd, a tulajdonátruházás későbbre kerülhet, ami számomra kedvezőbb ütemezést jelent, és ezt az árban megosztom veled.",
  },
  {
    q: "Azonnal beköltözhetek?",
    a: "A ház azonnal használható. A 33 M Ft-os opciónál a birtokbaadás 2026 végéig megtörténik.",
  },
  {
    q: "Van közvetítői jutalék?",
    a: "Nincs, közvetlenül a tulajdonostól vásárolsz.",
  },
  {
    q: "Honnan tudom, hogy a jogi háttér tiszta?",
    a: "Az ingatlan Lke-4 övezeti besorolású, és a Kismaros 8/2025. önkormányzati rendelet szerinti változtatási tilalom nem érinti. Tulajdoni lap és igazolás kérésre elérhető, vagy a megtekintéskor áttekinthető.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Megtekintés",
    body: "Egyeztetett időpontban személyesen megnézed a faházat és a telket.",
  },
  {
    title: "Döntés",
    body: "Kiválasztod az időzítést (2027-es kedvezményes vagy 2026 végéig tartó birtokbaadás).",
  },
  {
    title: "Szerződéskötés",
    body: "Ügyvéd előtt, a választott konstrukciónak megfelelő feltételekkel.",
  },
  {
    title: "Fizetés és birtokbaadás",
    body: "Az előszerződésben és adásvételiben rögzített ütemezés szerint.",
  },
] as const;

export const PHOTOS = [
  { src: "/hirdetes/20260902-01.jpg", alt: "A meglévő épület a tölgyesben, 2026. szeptember 2.", tall: true },
  { src: "/hirdetes/20260902-02.jpg", alt: "Lépcső a felépítményhez", tall: false },
  { src: "/hirdetes/20260902-03.jpg", alt: "A kocsibejáró kapuja", tall: true },
  { src: "/hirdetes/20260902-04.jpg", alt: "Kőkosaras támfal és drótkerítés", tall: false },
  { src: "/hirdetes/20260902-05.jpg", alt: "Kapu a kerítésben", tall: false },
  { src: "/hirdetes/20260902-06.jpg", alt: "Kavicsos kocsibeálló a telek előtt", tall: true },
  { src: "/hirdetes/20260902-07.jpg", alt: "Ösvény a fák között", tall: false },
  { src: "/hirdetes/20260902-08.jpg", alt: "Kiskapu az erdei ösvényen", tall: false },
  { src: "/hirdetes/20260902-09.jpg", alt: "A kapu az utca felől", tall: false },
  { src: "/hirdetes/20260902-10.jpg", alt: "A kerítés és a kapu a telek felől", tall: false },
  { src: "/hirdetes/20260902-11.jpg", alt: "A beálló a kapu mellett", tall: false },
  { src: "/hirdetes/20260902-12.jpg", alt: "A nappali fa burkolattal", tall: true },
  { src: "/hirdetes/20260902-13.jpg", alt: "A cserépkályha és az átjáró a konyha felé", tall: false },
  { src: "/hirdetes/20260902-14.jpg", alt: "A szoba az ajtóból", tall: false },
  { src: "/hirdetes/20260902-15.jpg", alt: "Átnézet a konyhából", tall: false },
  { src: "/hirdetes/20260902-16.jpg", alt: "A konyha tűzhellyel és mosogatóval", tall: false },
  { src: "/hirdetes/20260902-17.jpg", alt: "Kilátás az erdőre az ablakból", tall: true },
  { src: "/hirdetes/20260902-18.jpg", alt: "A konyha sarka", tall: false },
  { src: "/hirdetes/20260902-19.jpg", alt: "A ház oldala az erdő felé", tall: false },
  { src: "/hirdetes/20260902-20.jpg", alt: "A bejárat", tall: false },
  { src: "/hirdetes/20260902-21.jpg", alt: "A felépítmény homlokzata", tall: true },
  { src: "/hirdetes/20260902-22.jpg", alt: "Kavicsos rész a fák között", tall: false },
  { src: "/hirdetes/20260902-23.jpg", alt: "Az épület a lejtőről", tall: false },
  { src: "/hirdetes/20260902-24.jpg", alt: "Az épület oldala", tall: false },
  { src: "/hirdetes/20260902-25.jpg", alt: "A telek erdős része", tall: false },
  { src: "/hirdetes/20260902-26.jpg", alt: "Melléképület a lejtőn", tall: false },
  { src: "/hirdetes/20260902-27.jpg", alt: "Kilátás a fák között a völgy felé", tall: true },
  { src: "/hirdetes/20260902-28.jpg", alt: "A lejtős telekrész", tall: false },
  { src: "/hirdetes/20260902-29.jpg", alt: "A telek a fák alatt", tall: false },
  { src: "/hirdetes/20260902-30.jpg", alt: "Ősfás rész a telken", tall: false },
] as const;

export const UTILITY_PHOTOS = [
  { src: "/hirdetes/20260902-mero.jpg", alt: "A mérőhely, felette a cserélt kismegszakítók", title: "Áram", caption: "A mérőhely. A mérő után a rendszer cserélve." },
  { src: "/hirdetes/20260902-viz.jpg", alt: "Folyó víz a konyhai csapon", title: "Víz", caption: "Folyó víz a vezetékes bekötésen." },
  {
    src: "/hirdetes/20260902-furdo.jpg",
    alt: "A csempézett fürdő. A mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.",
    title: "Csempe és vezetékes víz",
    caption:
      "A fürdő csempézve van, vezetékes vízzel. Már nem a konyhából nyílik: a mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.",
  },
] as const;
