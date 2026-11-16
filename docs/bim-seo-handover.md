# bim.vrgo.hu — SEO / szervezeti azonosítás / megosztás átadás

**Állapot (2026-11-16 lezáró ellenőrzés):** kódjavítások a repo working tree-ben; **új deploy most nincs**.  
Éles (`cfd65c1`) HTTP-ellenőrizve; a robots/sitemap/indexing gate hibái ott még látszanak. A javítások a következő „mehet fel” után érvényesülnek.

---

## A) Indexelési kapcsoló — tesztmátrix

`ALLOW_PUBLIC_INDEXING` **csak** a BIM útvonalakon olvasott (`bim-seo.ts` → bim robots / sitemap / layout metadata). A `vrgo.hu` `robots.ts`, root layout és home **nem** hivatkozza.

| Host | Env | Meta robots (HTML) | X-Robots-Tag | robots.txt | Megjegyzés |
|------|-----|--------------------|--------------|------------|------------|
| bim.vrgo.hu | nincs / ≠1 | `noindex, nofollow` (+ googlebot) | nincs | *(élesen még a régi static)* | **Éles 2026-11-16:** ezt mértük — gate gyakorlatilag OFF |
| bim.vrgo.hu | `=1` | indexelhető (layout `generateMetadata`) | nincs ellentmondás tervezetten | Allow + `https://bim.vrgo.hu/sitemap.xml` | **Élesen nem igazolt** a robots rewrite hiba + bake miatt; kódban javítva |
| vrgo.hu | nincs | nincs robots meta (index alap) | nincs | Allow + `https://vrgo.hu/api/sitemap` | **Éles OK** — a változó nem befolyásolja |
| vrgo.hu | `=1` | változatlan (nincs gate) | nincs | ugyanaz | **Éles OK** (VPS-en a var be lehet kapcsolva; vrgo nem olvassa) |

**Ellentmondás meta vs X-Robots-Tag:** egyik hoston sem volt X-Robots-Tag → nincs konfliktus.

### Élesen talált blokkolók (javítva a kódban, deploy nélkül)

1. **Middleware** kizárta a `.txt` / `.xml` kéréseket → bim hoston `/robots.txt` és `/sitemap.xml` **nem** íródott át `/bim/robots` / `/bim/sitemap` alá.  
2. **`public/robots.txt`** a vrgo sitemapre mutatott, és a bim App Router robotsot felülírta. **Törölve.**  
3. **Build-time bake:** `export const metadata = bimLayoutMetadata()` a gate-et buildkor beégette → élesen `noindex` maradt. **Javítás:** bim layout `generateMetadata` + `headers()`; oldal-`bimMetadata` nem állít `robots`-ot; bim robots/sitemap `force-dynamic`.

### Hatókör

A kapcsoló **nem** túl általános a forrásszinten (csak BIM). A VPS `.env.local`-ban közös a process, de a vrgo kód nem olvassa → viselkedés megőrzött. További szűkítés nem szükséges.

---

## B) Átirányítások — éles HTTP (2026-11-16)

Minden sor: `https://bim.vrgo.hu` + path, `redirect: manual`.

| Forrás | Státusz | Location | Cél státusz | Cél canonical | Lánc |
|--------|---------|----------|-------------|---------------|------|
| `/szolgaltatasok/ipari-letesitmenyek` | **301** | `/ipari-felmeres` | 200 | `https://bim.vrgo.hu/ipari-felmeres` | nincs |
| `/ipari-letesitmenyek` | **301** | `/ipari-felmeres` | 200 | `https://bim.vrgo.hu/ipari-felmeres` | nincs |
| `/szolgaltatasok/tervezoknek-es-kivitelezoknek` | **301** | `/tervezoknek` | 200 | `https://bim.vrgo.hu/tervezoknek` | nincs |
| `/lakossagnak` | **301** | `/lakossagi-felmeres` | 200 | `https://bim.vrgo.hu/lakossagi-felmeres` | nincs |
| `/szolgaltatasok/lakas-es-hazfelmeres` | **301** | `/lakossagi-felmeres` | 200 | `https://bim.vrgo.hu/lakossagi-felmeres` | nincs |
| `/szolgaltatasok/allami-bim-megfeleles` | **301** | `/megoldasok/allami-beruhazasok-es-bim-eloirasok` | 200 | …/megoldasok/allami-beruhazasok-es-bim-eloirasok | nincs |

**Belső linkek:** `/megoldasok` a végleges hubokra mutat; legacy ipari href nincs.  
**Sitemap legacy URL:** a (hibásan 404 HTML-ként jövő) válaszban sem szerepeltek a régi pathok. A **helyes** bim sitemap a következő deploy után ellenőrizendő.

---

## C) Szervezeti azonosító

| Állítás | Eredmény |
|---------|----------|
| Közös `@id` | `https://vrgo.hu/#organization` — BIM JSON-LD használja; **külön oldal/HTML szekció nincs** |
| WebSite | `https://bim.vrgo.hu/#website` / VRGO BIM |
| Service | `https://bim.vrgo.hu/#service-survey` → provider = jogi org |
| Review / fake cím | nincs |

**Eltérés (flag, főoldal nem módosítva):**  
ugyanarra az `@id`-re a **vrgo.hu** `name: "VRGO"` (`VRGO_CONFIG`), a **bim** `name: "ADP-TOP Kft."` (`COMPANY_INFO`). Stabil ID OK; a **névmező ütközik**. Javaslat későbbi, külön jóváhagyott egyeztetésre (pl. vrgo Organization legal name + brand külön, vagy BIM csak `@id` hivatkozás saját name nélkül).

---

## D) Megosztás és ikonok (éles HTTP)

| Ellenőrzés | Eredmény |
|------------|----------|
| OG 1200×630 (disk + live) | OK |
| `/bim/og-default.jpg` `image/jpeg` | OK |
| favicon.ico / PNG / SVG Content-Type | OK |
| localhost / :3000 metaadatban | nincs |
| BIM ikonkészlet `/bim/…` | OK |
| vrgo.hu nem kap `/bim/` ikont | OK |

Home canonical élesen: `https://bim.vrgo.hu` (trailing slash nélkül a renderben) — host helyes.

---

## E) Élesítéshez szükséges változók

| Változó | Hol | Szerep |
|---------|-----|--------|
| `ALLOW_PUBLIC_INDEXING=1` | VPS `.env.local` (deploy workflow synceli) | BIM index + nem üres sitemap |
| `PORT=3000` | változatlan | — |
| Egyéb SMTP/reCAPTCHA | meglévő | nem SEO |

**Staging / local:** a var **ne** legyen `1`.

---

## F) Élesítés utáni checklist (következő „mehet fel”)

1. Deploy a robots/middleware/generateMetadata javításokkal.  
2. `curl -sI https://bim.vrgo.hu/robots.txt` → Allow + `Sitemap: https://bim.vrgo.hu/sitemap.xml` (nem vrgo api/sitemap).  
3. `curl -s https://bim.vrgo.hu/sitemap.xml` → XML, `https://bim.vrgo.hu/…` hubok.  
4. View-source `/`: **nincs** noindex, ha gate ON; van, ha OFF.  
5. `https://vrgo.hu/robots.txt` → továbbra is vrgo sitemap; title/canonical változatlan.  
6. Ismételt 301 mátrix a fenti 6 URL-re.  
7. GSC/Bing: csak tulajdonosi lépés — **ez a feladat nem nyúlt hozzájuk**.

---

## G) Visszaállítási terv

| Változás | Rollback |
|----------|----------|
| Index gate ON | `ALLOW_PUBLIC_INDEXING` törlése / ≠1 a VPS `.env.local`-ból + PM2 restart (vagy deploy env nélkül) |
| robots/middleware javítás | előző `main` commit / `public/robots.txt` vissza + matcher `.txt\|xml` kizárás (nem ajánlott) |
| 301 legacy oldalak | a redirect `page.tsx` fájlok visszaállítása a tartalmi commitból |
| OG/favicon | `public/bim/*` törlése / előző asset commit |

---

## H) Közös kódbázis (rövid)

| Elem | bim.vrgo.hu | vrgo.hu |
|------|-------------|---------|
| Origin | `BIM_ORIGIN` konstans | `https://vrgo.hu` |
| robots | `src/app/bim/robots.ts` | `src/app/robots.ts` |
| sitemap | `src/app/bim/sitemap.ts` | `/api/sitemap` |
| Favicon/OG | `/public/bim/*` | meglévő, nem cserélve |

---

## I) Tesztek (repo)

```bash
npm run test:bim-seo
npm run test:bim-claims
node scripts/verify-bim-seo-closing.mjs   # éles HTTP + static scope
```

Nyers eredmények: `docs/_bim-seo-closing-results.json` (generált).

---

## J) Keresési hubok / 301 lista (tartalom)

Fő hubok: `/`, `/ipari-felmeres`, `/tervezoknek`, `/scan-to-bim-kapacitas`, `/lakossagi-felmeres`, `/technologia-es-minoseg`, `/referenciak`, `/cikkek/*`, `/megoldasok` + állami hub.  
301-ek: lásd B. táblázat.

---

## K) GSC / Bing / GBP

Tulajdonosi lépések változatlanok (Domain property lefedheti a subdomain-t; ne duplikált GBP). **Ebben a körben nem módosítva.**
