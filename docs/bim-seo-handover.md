# bim.vrgo.hu — SEO / szervezeti azonosítás / megosztás átadás

**Állapot:** kódkész, **nincs automatikus deploy**. Helyi / staging alapból **noindex**.  
**Éles indexelés:** csak `ALLOW_PUBLIC_INDEXING=1` a VPS env-ben (lásd `.env.example`).

## 1. Közös kódbázis — hostvédelem

| Elem | bim.vrgo.hu | vrgo.hu |
|------|-------------|---------|
| Projekt | ugyanaz a Next app (`site-1`), middleware `x-vrgo-site=bim` + rewrite `/bim/*` | root `src/app/*` |
| Origin konstans | `src/config/bim-seo.ts` → `BIM_ORIGIN` | hardcode / `VRGO_CONFIG` |
| Meta helper | `bimMetadata` / `bimLayoutMetadata` (`src/lib/bim-site.ts`) | oldal-szintű Metadata |
| Favicon | `/bim/favicon.ico` (+ PNG/SVG/apple) | root / meglévő VRGO ikonok — **nem cserélve** |
| OG | `https://bim.vrgo.hu/bim/og-default.jpg` | vrgo home / meglévő |
| Canonical | mindig `https://bim.vrgo.hu…` (nem Host header) | `https://vrgo.hu…` |
| robots | `src/app/bim/robots.ts` | `src/app/robots.ts` |
| sitemap | `src/app/bim/sitemap.ts` (üres, ha nincs index-gate) | `src/app/api/sitemap` |

**Regresszió:** a vrgo.hu title/description/canonical a `src/app/page.tsx` / `layout.tsx` fájlokban változatlan; SEO tesztek ezt ellenőrzik.

## 2. Keresési szerep és URL-térkép

**Elsődleges szándék:** ipari/épületfelmérés, pontfelhő, egyeztetett Scan-to-BIM felmérési alap, technológia/minőség, referenciák / módszer.

**Fő hubok (indexelendő):**

| URL | Szándék |
|-----|---------|
| `/` | Márka + szakmai belépő |
| `/ipari-felmeres` | Ipari térfelmérés |
| `/tervezoknek` | Tervezői felmérési alap |
| `/scan-to-bim-kapacitas` | Modellezőknek — terepi adat |
| `/lakossagi-felmeres` | Lakás/ház (külön, nem a B2B mag) |
| `/technologia-es-minoseg` | Módszer / minőség |
| `/referenciak` | Bizonyíték / módszer (nem hamis case-lista) |
| `/cikkek/*` | Mély szakmai magyarázat |
| `/megoldasok` + állami hub | Megoldásválasztó |

**301 összevonások (kannibalizáció):**

| Régi | Cél |
|------|-----|
| `/szolgaltatasok/ipari-letesitmenyek` | `/ipari-felmeres` |
| `/ipari-letesitmenyek` | `/ipari-felmeres` |
| `/szolgaltatasok/tervezoknek-es-kivitelezoknek` | `/tervezoknek` |
| `/lakossagnak` | `/lakossagi-felmeres` |
| `/szolgaltatasok/lakas-es-hazfelmeres` | `/lakossagi-felmeres` |
| `/szolgaltatasok/allami-bim-megfeleles` | állami Megoldások hub |

**Nem másolandó** a másik három domain speciális ajánlata; keresztlink csak valódi felhasználói indokkal (pl. vrgo.hu → bim CTA).

## 3. Metaadat (előtte → utána)

| | Előtte (tipikus) | Utána |
|--|------------------|--------|
| Home title | vegyes / sablon | `Ipari és épületfelmérés, pontfelhő \| VRGO BIM` |
| Home description | általános | pontfelhő + egyeztetett dokumentáció + módszertan + referenciák (nincs „minden esetben kész BIM-modell”) |
| Canonical | kockázat: közös host | fix `BIM_ORIGIN` |
| Robots | gyenge staging védelem | gate: csak `ALLOW_PUBLIC_INDEXING=1` |
| Favicon / OG | közös / hiányos | `/public/bim/*` saját |

**Főoldali leírás (aktuális):**  
`Meglévő épületek és ipari terek 3D felmérése tervezéshez és BIM-hez. Pontfelhő, egyeztetett dokumentáció, szakmai módszertan és referenciák.`

## 4. JSON-LD stratégia

- **WebSite** `@id`: `https://bim.vrgo.hu/#website` — név: VRGO BIM  
- **Jogi Organization** `@id`: `https://vrgo.hu/#organization` — név: ADP-TOP Kft. (`COMPANY_INFO`) — **javasolt közös azonosító** a vrgo.hu ellenőrzött szervezettel  
- **Brand Organization** `@id`: `https://bim.vrgo.hu/#brand` — parent → jogi org  
- **Service** `@id`: `https://bim.vrgo.hu/#service-survey`  
- **BreadcrumbList** — `BimBreadcrumb`  
- **Article** — cikkoldalak (`BimArticle`); szerző a frontmatter `author` (jelenleg „VRGO” szerkesztőségi név, nem kitalált képesítés)  
- **Nincs:** AggregateRating, fake review, fiktív cím/nyitvatartás/díj  
- **sameAs / GBP URL:** üres a configban → tulajdonosi jóváhagyás után tölthető (`BIM_SEO.sameAs`, `googleBusinessProfileUrl`)

## 5. Ikonok és OG

| Fájl | Szerep |
|------|--------|
| `public/bim/favicon.ico` | böngésző |
| `favicon-16/32.png`, `icon-192/512.png` | PNG |
| `apple-touch-icon.png` | 180×180 |
| `icon.svg` | vektor |
| `og-default.jpg` | **1200×630**, VRGO BIM + „3D téradatok tervezéshez és BIM-hez”, háttér: meglévő pontfelhő/gépészet vizual (`scan-to-bim-gepeszet.jpg`) |

Újragenerálás: `node scripts/build-bim-og.mjs`

## 6. Tesztek

```bash
npm run test:bim-seo
npm run test:bim-claims
npm run lint:copy
```

Ellenőrzik: host-konstans canonical, ikon/OG, vrgo meta nem keveredik, JSON-LD szétválasztás, indexing gate, sitemap/robots szétválasztás, OG 1200×630.

## 7. Search Console / Bing — tulajdonosi lépések

1. **Google Search Console:** ha van **vrgo.hu Domain property** (DNS), az lefedi a `bim.vrgo.hu` subdomain-t is — **ne** hozz létre felesleges második Domain property-t. Opcionális: külön **URL-prefix** `https://bim.vrgo.hu/` a BIM-mérés elkülönítésére.  
2. Meglévő verification tokeneket **ne töröld**.  
3. Élesítés után: sitemap `https://bim.vrgo.hu/sitemap.xml` beküldése; URL Inspection a fő hubokra; canonical / indexelési jelentés felülvizsgálata.  
4. **Bing Webmaster Tools:** ugyanazzal a szervezettel igazolás + sitemap.  
5. **IndexNow:** csak ha a támogatott endpoint/kulcs ténylegesen be van kötve — jelenleg nincs kötelező bevezetés.  
6. **Google Indexing API:** általános oldalakra **ne**.

Nincs garantált indexelés / helyezés.

## 8. Google Cégprofil — jóváhagyandó javaslat

**Alap:** a meglévő vrgo.hu vállalkozási profil — **ne** készüljön külön BIM-profil.

**Ne írd felül automatikusan:** fő weboldallink, név, kategória, cím, nyitvatartás.  
A H–P 8:00–19:00 telefonos időszak **ne** legyen személyes „nyitva” jelölésként átírva kódoldalról.

**Javaslat (külön jóváhagyás után):**

1. Profilszöveg rövid BIM/felmérési bekezdés (pontfelhő, egyeztetett felmérési alap — nem „kész BIM minden esetben”).  
2. Céloldal a profilból: `https://bim.vrgo.hu/` vagy `/ipari-felmeres` (UTM csak bejegyzés-linkben, pl. `utm_source=google_business&utm_medium=profile&utm_campaign=bim`).  
3. Strukturált adatban / sameAs-ban UTM **nélkül** az ellenőrzött Maps/profil URL.  
4. Publikálható valódi fotók (helyszín/eszköz — nem hamis referencia); **GBP fotó ≠ OG-borító**.  
5. Profiladat-pontosítás csak tulajdonosi checklist alapján.

Hitelesítő adatot ne kérj chatben; külső fiókban csak jóváhagyott módosítási terv után.

## 9. Éles checklist (deploy külön utasításra)

- [ ] VPS: `ALLOW_PUBLIC_INDEXING=1`  
- [ ] Deploy a szokásos „mehet fel” után  
- [ ] `https://bim.vrgo.hu/robots.txt` → allow + sitemap  
- [ ] `https://bim.vrgo.hu/sitemap.xml` nem üres  
- [ ] View-source: title/canonical/OG/favicon bim host  
- [ ] `https://vrgo.hu/` meta változatlan  
- [ ] GSC/Bing sitemap + Inspection  
- [ ] GBP javaslat külön jóváhagyás

## 10. Helyi vs éles

| | Helyi / staging | Éles (gate ON) |
|--|-----------------|----------------|
| robots | disallow / | allow + sitemap |
| meta robots | noindex | index |
| sitemap | `[]` | HTTPS canonical URL-ek + lastmod (`BIM_SEO.sitemapLastmod`) |
| Port | **3000** | infra változatlan |
