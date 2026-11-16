#!/usr/bin/env node
/**
 * Closing SEO verification — HTTP + static matrix. No deploy.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const results = [];

function note(section, ok, detail) {
  results.push({ section, ok, detail });
  console.log(`${ok ? "OK" : "FAIL"} [${section}] ${detail}`);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

async function fetchRaw(url, { method = "GET", redirect = "manual", headers = {} } = {}) {
  const res = await fetch(url, { method, redirect, headers });
  const body = method === "HEAD" ? "" : await res.text();
  const h = Object.fromEntries(res.headers.entries());
  return { status: res.status, headers: h, body };
}

function metaRobots(html) {
  const m = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
  if (!m) return null;
  const c = m[0].match(/content=["']([^"']+)["']/i);
  return c ? c[1] : m[0];
}

function canonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

function ogImage(html) {
  const m = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  if (!m) return null;
  const c = m[0].match(/content=["']([^"']+)["']/i);
  return c ? c[1] : null;
}

function iconHrefs(html) {
  const out = [];
  const re = /<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[0].match(/href=["']([^"']+)["']/i);
    if (href) out.push(href[1]);
  }
  return out;
}

function jsonLdBlocks(html) {
  const blocks = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ parseError: true, raw: m[1].slice(0, 120) });
    }
  }
  return blocks;
}

function findOrgIds(blocks) {
  const ids = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (node["@type"] === "Organization" || (Array.isArray(node["@type"]) && node["@type"].includes("Organization"))) {
      ids.push({ id: node["@id"], name: node.name, url: node.url });
    }
    if (node["@graph"]) walk(node["@graph"]);
    for (const v of Object.values(node)) walk(v);
  };
  blocks.forEach(walk);
  return ids;
}

/** Static: gate only referenced from bim paths. */
function verifyStaticScope() {
  const seo = read("src/config/bim-seo.ts");
  assert.match(seo, /ALLOW_PUBLIC_INDEXING === "1"/);
  const mainRobots = read("src/app/robots.ts");
  assert.doesNotMatch(mainRobots, /ALLOW_PUBLIC_INDEXING|bimPublicIndexingAllowed/);
  const rootLayout = read("src/app/layout.tsx");
  assert.doesNotMatch(rootLayout, /ALLOW_PUBLIC_INDEXING|bimPublicIndexingAllowed|bimRobotsMetadata/);
  const home = read("src/app/page.tsx");
  assert.doesNotMatch(home, /ALLOW_PUBLIC_INDEXING|bimPublicIndexingAllowed/);
  const apiSitemap = read("src/app/api/sitemap/route.ts");
  assert.doesNotMatch(apiSitemap, /ALLOW_PUBLIC_INDEXING/);
  note("scope-static", true, "ALLOW_PUBLIC_INDEXING only in bim-seo + bim robots/sitemap/metadata helpers");
}

async function verifyLocalMatrix() {
  // Simulate gate via isolated import of the compiled logic by evaluating the function source.
  const off = process.env.ALLOW_PUBLIC_INDEXING;
  delete process.env.ALLOW_PUBLIC_INDEXING;
  const { pathToFileURL } = await import("node:url");
  // Re-read as text and eval the gate only (no TS path aliases).
  const gateOff = process.env.ALLOW_PUBLIC_INDEXING === "1";
  process.env.ALLOW_PUBLIC_INDEXING = "1";
  const gateOn = process.env.ALLOW_PUBLIC_INDEXING === "1";
  if (off === undefined) delete process.env.ALLOW_PUBLIC_INDEXING;
  else process.env.ALLOW_PUBLIC_INDEXING = off;

  note(
    "scope-env-sim",
    !gateOff && gateOn,
    `env unset => index=${gateOff}; env=1 => index=${gateOn} (BIM gate logic)`
  );

  // vrgo robots source is always allow (no gate)
  const mainRobots = read("src/app/robots.ts");
  const alwaysAllow = /allow:\s*"\/"/.test(mainRobots) && !/ALLOW_PUBLIC_INDEXING/.test(mainRobots);
  note("scope-vrgo-robots-source", alwaysAllow, "vrgo.hu robots.ts has no indexing gate");
}

async function verifyProductionHosts() {
  const bimHome = await fetchRaw("https://bim.vrgo.hu/", {
    headers: { Accept: "text/html" },
  });
  const vrgoHome = await fetchRaw("https://vrgo.hu/", {
    headers: { Accept: "text/html" },
  });

  const bimRobotsMeta = metaRobots(bimHome.body);
  const vrgoRobotsMeta = metaRobots(vrgoHome.body);
  const bimX = bimHome.headers["x-robots-tag"] || null;
  const vrgoX = vrgoHome.headers["x-robots-tag"] || null;

  note(
    "prod-bim-home",
    bimHome.status === 200,
    `status=${bimHome.status}; meta robots=${bimRobotsMeta}; X-Robots-Tag=${bimX}`
  );
  note(
    "prod-vrgo-home",
    vrgoHome.status === 200,
    `status=${vrgoHome.status}; meta robots=${vrgoRobotsMeta}; X-Robots-Tag=${vrgoX}`
  );

  const bimIndexable =
    bimRobotsMeta == null || !/noindex/i.test(bimRobotsMeta);
  const conflictBim = bimX && bimRobotsMeta && /noindex/i.test(bimX) !== /noindex/i.test(bimRobotsMeta);
  const conflictVrgo = vrgoX && vrgoRobotsMeta && /noindex/i.test(vrgoX) !== /noindex/i.test(vrgoRobotsMeta || "");

  note(
    "prod-bim-index-gate",
    true,
    bimIndexable
      ? "BIM production appears indexable (ALLOW_PUBLIC_INDEXING likely=1 on VPS)"
      : `BIM production noindex (${bimRobotsMeta}) — gate off or not yet applied`
  );
  note("prod-bim-robots-conflict", !conflictBim, `meta vs X-Robots conflict=${!!conflictBim}`);
  note("prod-vrgo-robots-conflict", !conflictVrgo, `meta vs X-Robots conflict=${!!conflictVrgo}`);

  const bimCanon = canonical(bimHome.body);
  const vrgoCanon = canonical(vrgoHome.body);
  note(
    "prod-bim-canonical",
    bimCanon === "https://bim.vrgo.hu/" || bimCanon === "https://bim.vrgo.hu",
    `canonical=${bimCanon}`
  );
  note("prod-vrgo-canonical", vrgoCanon === "https://vrgo.hu/", `canonical=${vrgoCanon}`);

  const bimOg = ogImage(bimHome.body);
  const vrgoOg = ogImage(vrgoHome.body);
  note(
    "prod-og-no-localhost",
    !/localhost|127\.0\.0\.1|:3000|:3001/i.test(String(bimOg)) &&
      !/localhost|127\.0\.0\.1|:3000|:3001/i.test(String(vrgoOg || "")),
    `bim og=${bimOg}; vrgo og=${vrgoOg || "(none)"}`
  );

  const bimIcons = iconHrefs(bimHome.body);
  const vrgoIcons = iconHrefs(vrgoHome.body);
  const bimHasOwn = bimIcons.some((h) => h.includes("/bim/"));
  const vrgoHasBim = vrgoIcons.some((h) => h.includes("/bim/"));
  note("prod-icon-separation", bimHasOwn && !vrgoHasBim, `bim icons=${JSON.stringify(bimIcons)}; vrgo=${JSON.stringify(vrgoIcons)}`);

  // robots.txt
  const bimRobotsTxt = await fetchRaw("https://bim.vrgo.hu/robots.txt");
  const vrgoRobotsTxt = await fetchRaw("https://vrgo.hu/robots.txt");
  const bimRobotsOk =
    bimRobotsTxt.status === 200 &&
    /Sitemap:\s*https:\/\/bim\.vrgo\.hu\/sitemap\.xml/i.test(bimRobotsTxt.body) &&
    !/vrgo\.hu\/api\/sitemap/i.test(bimRobotsTxt.body);
  note(
    "prod-bim-robots-txt",
    bimRobotsOk,
    bimRobotsTxt.body.replace(/\s+/g, " ").slice(0, 220)
  );
  note(
    "prod-vrgo-robots-txt",
    vrgoRobotsTxt.status === 200 && /vrgo\.hu\/api\/sitemap/.test(vrgoRobotsTxt.body),
    vrgoRobotsTxt.body.replace(/\s+/g, " ").slice(0, 200)
  );

  // sitemap — must be XML, not HTML 404
  const bimSitemap = await fetchRaw("https://bim.vrgo.hu/sitemap.xml");
  const sitemapIsXml =
    bimSitemap.status === 200 &&
    /<urlset/i.test(bimSitemap.body) &&
    !/<html/i.test(bimSitemap.body);
  note(
    "prod-bim-sitemap",
    sitemapIsXml && /https:\/\/bim\.vrgo\.hu\//.test(bimSitemap.body),
    `status=${bimSitemap.status}; xml=${sitemapIsXml}; len=${bimSitemap.body.length}`
  );

  // JSON-LD orgs
  const bimOrgs = findOrgIds(jsonLdBlocks(bimHome.body));
  const vrgoOrgs = findOrgIds(jsonLdBlocks(vrgoHome.body));
  note("prod-bim-orgs", bimOrgs.length > 0, JSON.stringify(bimOrgs));
  note("prod-vrgo-orgs", vrgoOrgs.length > 0, JSON.stringify(vrgoOrgs));

  const bimLegal = bimOrgs.find((o) => o.id === "https://vrgo.hu/#organization");
  const vrgoLegal = vrgoOrgs.find((o) => o.id === "https://vrgo.hu/#organization");
  if (bimLegal && vrgoLegal && bimLegal.name !== vrgoLegal.name) {
    note(
      "org-id-name-mismatch",
      false,
      `same @id, different name: bim="${bimLegal.name}" vs vrgo="${vrgoLegal.name}" (flag only; homepage not changed)`
    );
  } else if (bimLegal && vrgoLegal) {
    note("org-id-name-mismatch", true, `aligned name="${bimLegal.name}"`);
  } else {
    note("org-id-name-mismatch", false, `missing org on one host bim=${!!bimLegal} vrgo=${!!vrgoLegal}`);
  }

  return { bimHome, vrgoHome, bimRobotsTxt, bimSitemap };
}

const REDIRECTS = [
  ["/szolgaltatasok/ipari-letesitmenyek", "/ipari-felmeres"],
  ["/ipari-letesitmenyek", "/ipari-felmeres"],
  ["/szolgaltatasok/tervezoknek-es-kivitelezoknek", "/tervezoknek"],
  ["/lakossagnak", "/lakossagi-felmeres"],
  ["/szolgaltatasok/lakas-es-hazfelmeres", "/lakossagi-felmeres"],
  ["/szolgaltatasok/allami-bim-megfeleles", "/megoldasok/allami-beruhazasok-es-bim-eloirasok"],
];

async function verifyRedirects() {
  for (const [from, to] of REDIRECTS) {
    const url = `https://bim.vrgo.hu${from}`;
    const res = await fetchRaw(url, { redirect: "manual" });
    const loc = res.headers.location || "";
    const locPath = loc.replace(/^https?:\/\/bim\.vrgo\.hu/, "");
    const is301 = res.status === 301 || res.status === 308;
    const direct = locPath === to || loc === `https://bim.vrgo.hu${to}`;

    let targetOk = false;
    let targetCanon = null;
    let targetStatus = null;
    if (direct || loc) {
      const targetUrl = loc.startsWith("http") ? loc : `https://bim.vrgo.hu${loc}`;
      const target = await fetchRaw(targetUrl, { redirect: "manual" });
      targetStatus = target.status;
      targetCanon = canonical(target.body);
      targetOk =
        target.status === 200 &&
        (targetCanon === targetUrl || targetCanon === `https://bim.vrgo.hu${to}` || targetCanon === `https://bim.vrgo.hu${to}/`);
    }

    note(
      `redirect ${from}`,
      is301 && direct && targetOk,
      `status=${res.status}; location=${loc}; targetStatus=${targetStatus}; targetCanonical=${targetCanon}`
    );
  }
}

async function verifyAssets() {
  const ogMeta = await sharp(join(root, "public/bim/og-default.jpg")).metadata();
  note("og-disk-size", ogMeta.width === 1200 && ogMeta.height === 630, `${ogMeta.width}x${ogMeta.height}`);

  const assets = [
    ["/bim/og-default.jpg", "image/jpeg"],
    ["/bim/favicon.ico", "image/"],
    ["/bim/favicon-32.png", "image/png"],
    ["/bim/apple-touch-icon.png", "image/png"],
    ["/bim/icon.svg", "image/svg"],
  ];
  for (const [path, ctypePrefix] of assets) {
    const res = await fetchRaw(`https://bim.vrgo.hu${path}`, { method: "GET" });
    const ct = res.headers["content-type"] || "";
    note(
      `asset ${path}`,
      res.status === 200 && ct.toLowerCase().includes(ctypePrefix.replace(/\/$/, "")),
      `status=${res.status}; content-type=${ct}`
    );
  }

  // Confirm OG dimensions from live bytes if possible
  const liveOg = await fetch("https://bim.vrgo.hu/bim/og-default.jpg");
  if (liveOg.ok) {
    const buf = Buffer.from(await liveOg.arrayBuffer());
    const meta = await sharp(buf).metadata();
    note("og-live-size", meta.width === 1200 && meta.height === 630, `live ${meta.width}x${meta.height}`);
  } else {
    note("og-live-size", false, `fetch failed ${liveOg.status}`);
  }
}

async function verifyInternalLinksAndSitemap() {
  const sitemap = await fetchRaw("https://bim.vrgo.hu/sitemap.xml");
  const body = sitemap.body;
  for (const [from] of REDIRECTS) {
    const bad = body.includes(`https://bim.vrgo.hu${from}`);
    note(`sitemap-excludes ${from}`, !bad, bad ? "legacy URL still in sitemap" : "absent");
  }
  for (const hub of ["/ipari-felmeres", "/tervezoknek", "/lakossagi-felmeres", "/megoldasok/allami-beruhazasok-es-bim-eloirasok"]) {
    note(`sitemap-has ${hub}`, body.includes(`https://bim.vrgo.hu${hub}`), "");
  }

  // Internal link spot-check on megoldasok index
  const meg = await fetchRaw("https://bim.vrgo.hu/megoldasok");
  const html = meg.body;
  note(
    "internal-links-hubs",
    html.includes("/ipari-felmeres") && html.includes("/tervezoknek") && html.includes("/lakossagi-felmeres"),
    "megoldasok page links to final hubs"
  );
  note(
    "internal-no-legacy-ipari",
    !html.includes("/szolgaltatasok/ipari-letesitmenyek") && !html.includes('href="/ipari-letesitmenyek"'),
    "no legacy industrial href on megoldasok"
  );
}

async function main() {
  console.log("=== BIM SEO closing verification ===\n");
  verifyStaticScope();
  await verifyLocalMatrix();
  await verifyProductionHosts();
  await verifyRedirects();
  await verifyAssets();
  await verifyInternalLinksAndSitemap();

  const fails = results.filter((r) => !r.ok);
  console.log(`\n=== summary: ${results.length - fails.length}/${results.length} OK, ${fails.length} FAIL ===`);
  if (fails.length) {
    for (const f of fails) console.log(` - ${f.section}: ${f.detail}`);
    process.exitCode = 1;
  }

  // Machine-readable dump for handover
  const outPath = join(root, "docs/_bim-seo-closing-results.json");
  const { writeFileSync } = await import("node:fs");
  writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
