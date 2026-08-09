export interface ContentLink {
  label: string;
  href: string;
}

export interface ContentService {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface ContentSegment {
  title: string;
  description: string;
  href: string;
}

export interface ContentTestimonial {
  name: string;
  company: string;
  text: string;
}

export interface ContentProcessStep {
  text: string;
  image: string;
}

export interface ContentPackage {
  tier: string;
  title: string;
  audience: string;
  priceOnce: string;
  priceRecurring: string;
  cta: string;
  image: string;
}

export const CONTENT = {
  hero: {
    badge: "Bejárható 3D fotózás",
    title: "Növeld hatékonyságodat a VR segítségével",
    subtitle:
      "Immerzív 3D bemutató belső és külső terekről — babaház nézet, belső séta, felülnézeti kép, megosztható link és beágyazható kód. Üzleti felhasználásra, akár 48 órás átfutással.",
    proof: "Alapszolgáltatás: 3D épületszkennelés, gömbpanoráma, 12 havi online elérés.",
    ctaPrimary: { label: "Ajánlatot kérek", href: "mailto:info@vrgo.hu?subject=Aj%C3%A1nlatk%C3%A9r%C3%A9s" },
    ctaSecondary: { label: "Csomagok megnézése", href: "/#csomagok" },
  },

  segments: {
    heading: "Hol használható a VRGO",
    items: [
      {
        title: "Ingatlan · Ügynökségek",
        description: "Lakás, ház, iroda — virtuális bemutató az érdeklődőknek, kevesebb felesleges helyszíni megtekintéssel.",
        href: "/#szegmensek",
      },
      {
        title: "Lakóparkok · Szállás",
        description: "Típuslakások, közösségi terek, apartmanok és szállodák bejárható 3D bemutatója.",
        href: "/#szegmensek",
      },
      {
        title: "Iroda · Kereskedelem",
        description: "Irodaházak és üzlethelyiségek — több helyszín bemutatása egyetlen VR élményben.",
        href: "/#szegmensek",
      },
      {
        title: "Ipar · Nagyvállalat",
        description: "Üzembejárás, belső oktatás, munkakörnyezet bemutatása távoli partnereknek és munkavállalóknak.",
        href: "/#szolgaltatasok",
      },
    ] satisfies ContentSegment[],
  },

  services: {
    heading: "Hatékony üzleti megoldás a virtuális túra segítségével",
    items: [
      {
        title: "Valódi 3D túrázás",
        description: "Tükrözd a valóságot egy 3D sétával, akár külső és belső helyszínekről is.",
        image: "/icons/3d-valoban.svg",
        icon: "3D",
      },
      {
        title: "Virtuális valóság (VR)",
        description:
          "Rekonstruáljuk a környezeteket az augmentált és virtuális valóság használatához, bármilyen eszközön.",
        image: "/icons/vr-mode.svg",
        icon: "VR",
      },
      {
        title: "Google Utcakép",
        description: "Az ingatlanod a Google keresőjéből és térképéből is bejárható lesz.",
        image: "/icons/gsv.png",
        icon: "GSV",
      },
      {
        title: "2D-s sematikus alaprajzok",
        description: "Az ingatlan 3D fotói alapján pontos műszaki rajz is kérhető.",
        image: "/icons/felulnezet.svg",
        icon: "2D",
      },
      {
        title: "360° panoráma képek",
        description: "A kimagasló, nagy felbontás miatt a 3 dimenziós fotók felnagyíthatóak.",
        image: "/icons/360.svg",
        icon: "360",
      },
      {
        title: "Beágyazható",
        description: "Online elérhető, könnyedén megosztható, vagy beágyazható honlapodra.",
        image: "/icons/embed.svg",
        icon: "EMBED",
      },
    ] satisfies ContentService[],
  },

  testimonials: {
    heading: "Mit mondanak ügyfeleink",
    items: [
      {
        name: "Bering Dorottya",
        company: "Home Design Buda",
        text: "A VRGO-tól egy olyan profi szolgáltatást kaptunk, aminek köszönhetően üzletünk online jelenléte jóval színvonalasabb lett. Megbízhatóságuk, profizmusuk és lelkiismeretességük miatt bátran ajánljuk őket bárkinek!",
      },
      {
        name: "Paróczay László",
        company: "Galéria Optika",
        text: "Mindenkinek ajánljuk a VRGO virtuális felvétel szolgáltatását. Gyors, zökkenőmentes volt a felvételek elkészítése, profi munkát végeztek, minden kérésünket megvalósították. A szolgáltatás ár-érték aránya a legjobb.",
      },
      {
        name: "Marton Nemes",
        company: "Deák Erika Galéria",
        text: "A VRGO által készített 3D-s bemutató teljesen új dimenziót nyit a kiállítások dokumentálásában. A művészet online bemutatása soha nem volt még ennyire pontos, átélhető, és bárki számára hozzáférhető. Fantasztikus!",
      },
    ] satisfies ContentTestimonial[],
  },

  process: {
    heading: "Gyors munkavégzés akár 48 órás átfutási idővel",
    steps: [
      {
        text: "Egyeztetett időpontban a helyszíni munkálatok elvégzése.",
        image: "/process/fotozas.jpg",
      },
      {
        text: "Kívánt tartalmakkal a túra feltöltése a felhőbe.",
        image: "/process/upload.jpg",
      },
      {
        text: "Kész túra megosztási linkjének átadása.",
        image: "/process/megosztas.jpg",
      },
    ] satisfies ContentProcessStep[],
    cta: { label: "3D fotózás csomagjaink", href: "/#csomagok" },
  },

  packages: {
    heading: "Három csomag — három üzleti probléma, megoldva",
    disclaimer:
      "Az árak nettó, tájékoztató jellegű B2B sávok. A pontos ajánlat a terület (m² / ha), helyszínszám és kiegészítő igények alapján készül.",
    items: [
      {
        tier: "CLASSIC",
        title: "Bérbeadás- és értékesítés-gyorsító",
        audience:
          "Iroda-, retail-, raktár- és prémium szálláshely portfóliókat kezelő üzemeltetők, ingatlanforgalmazók, franchise-hálózatok.",
        priceOnce: "350 – 700 eFt egyszeri",
        priceRecurring: "Hosting opcionálisan, ~30–80 eFt / év",
        cta: "CLASSIC igénylése",
        image: "/packages/csomag-a.jpg",
      },
      {
        tier: "TWIN",
        title: "Létesítmény-üzemeltetés és portfólió-iker",
        audience:
          "Facility management cégek, irodaház- és bevásárlóközpont-üzemeltetők, többtelephelyes vállalatok, biztosítók, ESG-jelentésre kötelezett cégek.",
        priceOnce: "1,2 – 3,5 M Ft egyszeri",
        priceRecurring: "Felhő-fenntartás ~80 – 250 eFt / év",
        cta: "TWIN igénylése",
        image: "/packages/csomag-b.jpg",
      },
      {
        tier: "ENTERPRISE",
        title: "Kampusz, ipari telephely, hektáros digitális iker",
        audience:
          "Egyetemek és kutatóhelyek, gyártó- és logisztikai vállalatok, energetikai és infrastruktúra-üzemeltetők, generálkivitelezők.",
        priceOnce: "3,5 – 12 M Ft egyszeri (m²-arányos)",
        priceRecurring: "Felhő-fenntartás ~200 – 600 eFt / év",
        cta: "ENTERPRISE igénylése",
        image: "/packages/csomag-c.jpg",
      },
    ] satisfies ContentPackage[],
  },
} as const;
