# BIM site restructure plan (bim.vrgo.hu only)

## Audit snapshot
- Stack: Next.js 15 App Router under `src/app/bim/*`; host rewrite via `middleware.ts` (bim.vrgo.hu / bim.localhost).
- Nav: `BIM_MENU` in `src/config/menu.ts` + `BimChrome` / `Navbar`.
- Content: MD frontmatter articles in `src/content/bim-cikkek/`; static TSX pages.
- Forms: `BimQuoteForm` (B2B), `BimResidentialForm` (4 field); API `/api/bim-ajanlat`.
- SEO: `bimMetadata()` canonicals; Article JSON-LD; no dedicated bim sitemap yet (`robots.txt` → vrgo.hu sitemap).
- Analytics: `trackConversion` → `dataLayer`.

## Principles
- No content deletion; old URLs stay (no 404). New IA URLs added; decree pages keep paths.
- Decree = side funnel at `/szolgaltatasok/allami-bim-megfeleles` (+ existing `/ekm-rendelet` etc.).
- No invented prices/refs; empty config → hide section.

## New / changed surfaces
| URL | Action |
|-----|--------|
| `/` | Full section rewrite (hero…CTA); decree only as small card |
| `/szolgaltatasok` | Grouped overview linking to subpages |
| `/szolgaltatasok/lakas-es-hazfelmeres` | New (old `/lakossagnak` kept) |
| `/szolgaltatasok/tervezoknek-es-kivitelezoknek` | New (old `/tervezoknek` kept) |
| `/szolgaltatasok/ipari-letesitmenyek` | New (old `/ipari-letesitmenyek` kept) |
| `/szolgaltatasok/dronos-felmeres` | New |
| `/szolgaltatasok/georeferalas-eov` | New |
| `/szolgaltatasok/bim-modellezes` | New |
| `/szolgaltatasok/allami-bim-megfeleles` | Hub: Miért most? + Négy terület + teaser |
| `/megoldasok` (+ anchors/pages) | Use-case solutions |
| `/arak-es-folyamat` | Keep; numbers only from config |
| `/cikkek` | Category filter |
| Existing decree URLs | Breadcrumb + short intro only |

## Redirects
- None required for existing paths (kept live).
- Optional later: soft canonical preference toward new service URLs (no hard 301 unless decided).

## Implemented (2026-11-07)
- Config: `src/config/bim.ts`, catalog `src/lib/bim-catalog.ts`
- Nav + homepage rewrite; decree hub; service + solution pages
- Article category filter; `docs/blog-topics.md`; bim `sitemap.ts`
- Forms: UTM + `forras` in source; conversion events

## Config
- `src/config/bim.ts`: phone, from-prices, sample pack URL, reply SLA text, surveyor license display.
