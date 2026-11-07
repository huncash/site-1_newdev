import { bimLink } from "@/lib/links";
import { VRGO_CONFIG } from "@/config/vrgo";

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
  asideLabel?: string;
  asideHref?: string;
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
  cta: string;
  image: string;
  secondaryCta?: string;
  secondaryHref?: string;
  footnote?: string;
}

/** vrgo.hu főoldal — bejárható 3D túra + Google Térkép / Utcakép. */
export const CONTENT = {
  hero: {
    title: "Bejárható 3D túra, amit a Google Térképen is megtalálnak",
    subtitle:
      "Gyors helyszíni felvétel, megosztható és beágyazható 3D túra, méretezett alaprajz, és megjelenés a Google Térképen és Utcaképen, belső gömbpanorámákkal. 2016 óta csináljuk, Magyarországon az elsők között.",
    ctaPrimary: { label: "Ajánlatot kérek", href: "/ajanlat?forras=hero" },
    ctaSecondary: { label: "Csomagok megnézése", href: "/csomagok" },
  },

  services: {
    heading: "Mit kap a bejárható 3D túrával",
    items: [
      {
        title: "Valódi 3D séta",
        description: "Tükrözd a valóságot egy 3D sétával, akár külső és belső helyszínekről is.",
        image: "/icons/3d-valoban.png",
        icon: "3D",
      },
      {
        title: "Google-ból is bejárható",
        description:
          "A felvételből a Google Térképen és az Utcaképen is bejárható túra készül, belső gömbpanorámákkal.",
        image: "/icons/gsv.png",
        icon: "GSV",
      },
      {
        title: "Méretezett alaprajz",
        description: "A 3D modellből méretezett alaprajz is kérhető, ha a csomag tartalmazza.",
        image: "/icons/alaprajz.png",
        icon: "2D",
      },
      {
        title: "Beágyazható a honlapra",
        description: "Online elérhető, könnyedén megosztható, vagy beágyazható a honlapodra.",
        image: "/icons/embed.svg",
        icon: "EMBED",
      },
      {
        title: "Bármilyen eszközön, VR-ban is",
        description:
          "Asztalon, mobilon és virtuális valóságban is megnyitható — a környezetet a megrendelés szerint rekonstruáljuk.",
        image: "/icons/vr-mode.svg",
        icon: "VR",
      },
      {
        title: "Gyors felvétel, kedvező ár",
        description:
          "Helyszíni felvétel Matterport-alapú eszközzel — ebben a kategóriában kedvező ár/érték arány.",
        image: "/icons/360.svg",
        icon: "360",
      },
    ] satisfies ContentService[],
  },

  audiences: {
    heading: "Kinek?",
    items: [
      {
        title: "Ingatlan eladás és bérbeadás",
        description: "A potenciális vevő vagy bérlő a találkozó előtt bejárhatja a teret.",
        href: "/csomagok",
      },
      {
        title: "Üzlet, szalon, galéria, kiállítótér",
        description: "Online bemutató, amit a Google-ből is megtalálnak.",
        href: "/csomagok",
      },
      {
        title: "Szálloda, apartman, panzió",
        description: "Valódi bejárás a foglalás előtt — fotók helyett.",
        href: "/csomagok",
      },
      {
        title: "Iroda, coworking, retail",
        description: "Megosztható túra a helyszíni mutatás előtt.",
        href: "/csomagok",
      },
      {
        title: "Oktatás és kampusz",
        description: "Több épület egy összefüggő, bejárható túrában.",
        href: "/megoldasok/oktatas",
      },
      {
        title: "Üzemeltetés és portfólió",
        description: "Portfólió-szintű digitális iker facility célokra.",
        href: "/megoldasok/facility",
      },
    ] satisfies ContentSegment[],
  },

  experience: {
    heading: "Tapasztalat",
    text: "2016-ban, két másik magyar céggel egyidejűleg elsőként hoztuk be Magyarországra a Matterport technológiát. Azóta a gyors, kedvező árú, nem ipari projektekre specializálódtunk: üzletekre, galériákra, szállásokra, irodákra, ingatlanokra. Ebben a kategóriában ma is ez a legjobb ár/érték arányú megoldás.",
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
    heading: "A helyszíni rögzítéstől a megosztható túráig",
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
    cta: { label: "3D fotózás csomagjaink", href: "/csomagok" },
  },

  packages: {
    heading: "Három csomag — három üzleti probléma, megoldva",
    disclaimer: VRGO_CONFIG.replySlaText
      ? `${VRGO_CONFIG.replySlaText} A digitális iker átadási határidejét az ajánlat tartalmazza; ha külön határidő nincs benne, az ÁSZF szerinti határidő érvényes.`
      : "A digitális iker átadási határidejét az ajánlat tartalmazza; ha külön határidő nincs benne, az ÁSZF szerinti határidő érvényes.",
    items: [
      {
        tier: "CLASSIC",
        title: "Bérbeadás- és értékesítés-bemutató",
        audience:
          "Iroda-, retail-, raktár- és prémium szálláshely portfóliókat kezelő üzemeltetők, ingatlanforgalmazók, franchise-hálózatok.",
        cta: "CLASSIC igénylése",
        image: "/packages/csomag-a.jpg",
      },
      {
        tier: "TWIN",
        title: "Létesítmény-üzemeltetés és portfólió-iker",
        audience:
          "Facility management cégek, irodaház- és bevásárlóközpont-üzemeltetők, többtelephelyes vállalatok, biztosítók, ESG-jelentésre kötelezett cégek.",
        cta: "TWIN igénylése",
        image: "/packages/csomag-b.jpg",
      },
      {
        tier: "ENTERPRISE",
        title: "Kampusz, ipari telephely, több épület egy digitális ikerben",
        audience:
          "Egyetemek és kutatóhelyek, gyártó- és logisztikai vállalatok, energetikai és infrastruktúra-üzemeltetők, generálkivitelezők.",
        cta: "ENTERPRISE igénylése",
        image: "/packages/csomag-c.jpg",
        secondaryCta: "Mérnöki pontosságú felmérés kell? → bim.vrgo.hu",
        secondaryHref: bimLink("/", "enterprise"),
      },
    ] satisfies ContentPackage[],
  },

  homeFaqs: [
    {
      q: "Hogyan tudok időpontot kérni — kell telefonálni?",
      a: "Nem. Az ajánlatkérő űrlap kitöltése után e-mailben küldünk árajánlatot. A helyszíni felvétel időpontját egyeztetjük.",
    },
    {
      q: "Hogyan jelenik meg a túra a Google-ben?",
      a: "A felvételből a Google Térképen és az Utcaképen is bejárható túra készül. Az érdeklődő az utcáról indul, és a belső terekben tovább sétál gömbpanorámákon.",
    },
    {
      q: "Matterport 3D túra vagy lézerszkennelés: mikor melyik?",
      a: "Online bemutatásra, marketingre, gyors dokumentálásra a bejárható 3D túra. Mérnöki pontossághoz, nagy területekhez, tervezéshez vagy hatósági adatátadáshoz: bim.vrgo.hu.",
    },
    {
      q: "Mennyire pontos a méretezett alaprajz?",
      a: "A modellből tájékoztató méretek mérhetők. Geodéziai tanúsítványt vagy mérnöki pontosságot a bim.vrgo.hu lézerszkennelése nyújt.",
    },
  ],
} as const;
