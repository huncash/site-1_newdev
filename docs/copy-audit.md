# Copy audit — vrgo.hu + bim.vrgo.hu

Forrás: repo + ismert útvonalak. Javítás előtt, 2026-11-07.  
Produkciós bim.vrgo.hu eltérés: lásd 4.1 (deploy / gyorsítótár gyanú — a forrás már georeferált pozicionálású).

## A) Tiltott / hibás szövegek

| Host | Útvonal | Fájl | Találat |
|------|---------|------|---------|
| vrgo | `/` | `src/data/content.ts` | Hero: „2016 óta csináljuk…” |
| vrgo | `/` | `src/app/page.tsx` | Külön Google 3 lépéses szekció (`#google-terkep`) |
| vrgo | `/` | `src/app/page.tsx` | Főoldali GYIK (`#rovid-gyik`) |
| vrgo | `/` | `CaseStudySection.tsx` | 7 hektár, 4 munkanap, 8 modell, 891 pont, Kihívás/Megoldás |
| vrgo | `/csomagok` | `csomagok/page.tsx` | „4 munkanap” a Pannon-sorban; badge „2016 óta” |
| vrgo | `/megoldasok/oktatas` | `oktatas/page.tsx` | 4 munkanap, 8 modell, 7 hektár (meta + törzs) |
| vrgo | `/megoldasok/kampusz` | `kampusz/page.tsx` | ugyanezek a számok + történet |
| vrgo | footer | `Footer.tsx` | „Kérdésed van?” |
| vrgo | `/` services | `content.ts` | „Tükrözd…”, „honlapodra” |
| vrgo | űrlapok | `QuoteOrderForm`, `ContactForm` | tegező hibák/címkék (próbáld, Írd, veled, te kérsz) |
| vrgo | `/gyik` | `gyik/page.tsx` | „Töltsd ki…”; badge „2016 óta” |
| vrgo | blog | `private_data/posts/*` | `category: News`, `author: VRGO blog (eredeti WP cikk)` |
| bim | `/cikkek` | `cikkek/page.tsx` | „A vrgo.hu blog…”, link `vrgo.hu/blog` |
| bim | `/cikkek` | `bim-publish-rhythm.ts` | „Hetente kétszer… YouTube…” |
| bim | `/szolgaltatasok/bim-modellezes` | `bim-modellezes/page.tsx` | „nem a főcím”, „órabér”, „nem közlünk”, „húzóágazat” |
| bim | `/arak-es-folyamat` | `arak-es-folyamat/page.tsx` | „Órabér nincs közzétéve” |
| bim | `/tervezoknek` | `tervezoknek/page.tsx` | „Frissebb szolgáltatáslap”, „hamarosan”, Önök |
| bim | szolgáltatás/meta | több | „workflow”, „Önöknél”, „modellezési partnerünk” |
| bim | lakás | `lakas-es-hazfelmeres`, `lakossagnak` | „Érdeklődés — 4 mező”, „ígéretet nem teszünk”, „nem közlünk” |
| bim | scope | `BimScopeNote` × ~10 oldal | „Három dolgot vállalunk…” ismétlés |
| bim | config | `bim.ts` | „Átlagosan 24 órán belül…” |
| bim | cikkek slug | `cikkek/[slug]` | jövőbeli cikk teaser oldal (robots noindex) — 404 kell |
| bim | főoldal | `page.tsx` | „Hamarosan új cikkek…”, „workflow” |

## B) Hangnem

- Tegező: footer, hero-kártyák, űrlap hibák (vrgo + bim QuoteForm).
- Önök-család: bim tervezői oldalak + `bim-catalog.ts`.
- Kivételek (nem javítandók): archív blog törzs, ügyfélvélemények.

## C) Ismétlések / szerkezet (vrgo főoldal)

- Google állítás: hero + külön szekció + kártya (túl sok).
- Tapasztalat a csomagok előtt; experience szöveg „ár/érték” extra mondattal.
- SLA szöveg több helyen (config + CTA-k + megoldások oldalak).

## D) bim produkció vs forrás (4.1)

- Forrás: georeferált pozicionálás, nincs „Rendelet” menüpont, nincs ← vrgo.hu a BimChrome-ban.
- Éles (korábbi megfigyelés): régi menü / Matterport Pro3 / vissza-gomb — valószínű: elakadt SSH deploy vagy nginx/cache. Ellenőrizendő deploy után.

## E) Nyitott döntések

1. `/csomagok` 12–24 órás átadási mondat — ne módosítsuk, csak auditáljuk.
2. 2016-os Matterport-állítás külső forrás nélkül — a Tapasztalat blokkban marad a megadott mondat.
3. Minta-adatcsomag fájl (`BIM_CONFIG.samplePackUrl` üres) — UI rejtve.
4. CLASSIC „-tól” ár (`classicFromPriceHuf` null) — rejtve.
5. **vrgo.hu válaszidő:** a feladat zárósora szerint **„48 órán belül”** (felülírja a 8. pont általános „1 munkanap” szövegét a vrgo hoston). bim: „1 munkanapon belül”.
