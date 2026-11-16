#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

test("bim canonical builder uses constant origin, not Host header", () => {
  const seo = read("src/config/bim-seo.ts");
  const site = read("src/lib/bim-site.ts");
  assert.match(seo, /export const BIM_ORIGIN = "https:\/\/bim\.vrgo\.hu"/);
  assert.match(seo, /export const MAIN_ORIGIN = "https:\/\/vrgo\.hu"/);
  assert.match(site, /export \{ BIM_ORIGIN, MAIN_ORIGIN \}/);
  assert.match(site, /bimCanonical/);
  assert.doesNotMatch(site, /headers\(\).*canonical|host.*canonical/i);
  assert.match(site, /metadataBase: new URL\(BIM_ORIGIN\)/);
});

test("bim layout exports host-scoped icons and OG defaults", () => {
  const layout = read("src/app/bim/layout.tsx");
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /bimLayoutMetadata/);
  const lib = read("src/lib/bim-site.ts");
  const seo = read("src/config/bim-seo.ts");
  assert.match(lib, /\/bim\/favicon\.ico/);
  assert.match(seo, /\/bim\/og-default\.jpg/);
  assert.match(lib, /summary_large_image/);
  assert.match(lib, /bimOgImageAbsoluteUrl/);
  assert.doesNotMatch(lib, /alternates: \{ canonical \},\s*robots,/);
});

test("root vrgo marketing metadata stays on vrgo.hu", () => {
  const rootLayout = read("src/app/layout.tsx");
  assert.match(rootLayout, /Bejárható 3D fotózás/);
  const home = read("src/app/page.tsx");
  assert.match(home, /canonical: "https:\/\/vrgo\.hu\/"/);
  assert.match(home, /title: "Bejárható 3D fotózás és Google Utcakép \| VRGO"/);
  // Visible CTA may mention bim.vrgo.hu; metadata must stay vrgo.hu.
  const metaBlock = home.slice(home.indexOf("export const metadata"), home.indexOf("};") + 2);
  assert.doesNotMatch(metaBlock, /bim\.vrgo\.hu/);
  assert.doesNotMatch(rootLayout, /bim\.vrgo\.hu/);
});

test("bim home title/description match SEO role", () => {
  const seo = read("src/config/bim-seo.ts");
  assert.match(seo, /Ipari és épületfelmérés, pontfelhő \| VRGO BIM/);
  assert.match(seo, /Pontfelhő, egyeztetett dokumentáció/);
  const page = read("src/app/bim/page.tsx");
  assert.match(page, /BIM_SEO\.defaultTitle/);
  assert.match(page, /bimHomeJsonLd/);
});

test("JSON-LD separates WebSite brand from legal Organization", () => {
  const seo = read("src/config/bim-seo.ts");
  const jsonld = read("src/lib/bim-jsonld.ts");
  assert.match(seo, /legalOrganizationId: `\$\{MAIN_ORIGIN\}\/#organization`/);
  assert.match(jsonld, /"@type": "WebSite"/);
  assert.match(jsonld, /legalOrganizationId/);
  assert.match(jsonld, /"@type": "Service"/);
  assert.doesNotMatch(jsonld, /AggregateRating|reviewRating/);
  const article = read("src/components/bim/BimArticle.tsx");
  assert.match(article, /"@type": "Article"/);
  assert.match(article, /BIM_SEO\.legalOrganizationId/);
});

test("bim robots and sitemap assets exist; OG and icons on disk", () => {
  assert.equal(existsSync(join(root, "src/app/bim/robots.ts")), true);
  assert.equal(existsSync(join(root, "src/app/robots.ts")), true);
  for (const name of [
    "public/bim/favicon.ico",
    "public/bim/favicon-16.png",
    "public/bim/favicon-32.png",
    "public/bim/apple-touch-icon.png",
    "public/bim/icon.svg",
    "public/bim/icon-192.png",
    "public/bim/icon-512.png",
    "public/bim/og-default.jpg",
  ]) {
    assert.equal(existsSync(join(root, name)), true, `missing ${name}`);
  }
});

test("indexing gate: production allow, staging disallow, bim-only", () => {
  const seo = read("src/config/bim-seo.ts");
  assert.match(seo, /DISALLOW_PUBLIC_INDEXING/);
  assert.match(seo, /NODE_ENV === "production"/);
  assert.match(seo, /bimIndexingFlagFileAllows/);
  assert.match(read("src/lib/bim-indexing-flag.ts"), /\.bim-allow-public-indexing/);
  const robots = read("src/app/bim/robots.ts");
  assert.match(robots, /bimPublicIndexingAllowed/);
  assert.match(robots, /runtime = "nodejs"/);
  const sitemap = read("src/app/bim/sitemap.ts");
  assert.match(sitemap, /if \(!bimPublicIndexingAllowed\(\)\)/);
  assert.match(sitemap, /runtime = "nodejs"/);
  assert.equal(existsSync(join(root, "ecosystem.config.cjs")), true);
  assert.doesNotMatch(read("src/app/robots.ts"), /bimPublicIndexingAllowed|ALLOW_PUBLIC_INDEXING/);
});

test("main sitemap route remains vrgo.hu-only", () => {
  const api = read("src/app/api/sitemap/route.ts");
  assert.match(api, /https:\/\/vrgo\.hu/);
  assert.doesNotMatch(api, /bim\.vrgo\.hu/);
});

test("bim and main robots stay host-separated", () => {
  const bimRobots = read("src/app/bim/robots.ts");
  const mainRobots = read("src/app/robots.ts");
  assert.match(bimRobots, /BIM_ORIGIN/);
  assert.match(bimRobots, /sitemap\.xml/);
  assert.match(bimRobots, /force-dynamic/);
  assert.match(mainRobots, /https:\/\/vrgo\.hu\/api\/sitemap/);
  assert.doesNotMatch(mainRobots, /bim\.vrgo\.hu/);
  assert.equal(existsSync(join(root, "public/robots.txt")), false);
  const mw = read("src/middleware.ts");
  assert.doesNotMatch(mw, /txt\|xml/);
  assert.match(mw, /robots\.txt \+ sitemap\.xml/);
});

test("default OG image is 1200x630 landscape", async () => {
  const meta = await sharp(join(root, "public/bim/og-default.jpg")).metadata();
  assert.equal(meta.width, 1200);
  assert.equal(meta.height, 630);
});

test("legacy overlapping service URLs permanently redirect to megoldas hubs", () => {
  const redirects = [
    ["src/app/bim/szolgaltatasok/ipari-letesitmenyek/page.tsx", /BIM_INDUSTRIAL_HREF|\/ipari-felmeres/],
    ["src/app/bim/ipari-letesitmenyek/page.tsx", /BIM_INDUSTRIAL_HREF|\/ipari-felmeres/],
    ["src/app/bim/szolgaltatasok/tervezoknek-es-kivitelezoknek/page.tsx", /\/tervezoknek/],
    ["src/app/bim/lakossagnak/page.tsx", /\/lakossagi-felmeres/],
    ["src/app/bim/szolgaltatasok/lakas-es-hazfelmeres/page.tsx", /\/lakossagi-felmeres/],
  ];
  for (const [file, target] of redirects) {
    const src = read(file);
    assert.match(src, /permanentRedirect/);
    assert.match(src, target);
    assert.doesNotMatch(src, /bimMetadata/);
  }
  assert.match(read("src/config/menu.ts"), /BIM_INDUSTRIAL_HREF/);
});
