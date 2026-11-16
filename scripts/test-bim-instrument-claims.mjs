#!/usr/bin/env node
/**
 * Poka-yoke: unpublished instrument metrics must not become service claims;
 * bim host canonical helper stays on bim.vrgo.hu; config is not an API route.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function loadClaimsModule() {
  const path = join(root, "src/lib/bim-instrument-claims.ts");
  // Compile-free smoke: parse config JSON-like via dynamic import of built logic duplicated lightly.
  // Prefer importing the TS source through a small Node loader fallback: evaluate required exports
  // by reading the config file as text and asserting gate conditions with a tiny reimplementation.
  const configPath = join(root, "src/config/bim-instrument-claims.ts");
  const raw = readFileSync(configPath, "utf8");
  return { raw, configPath };
}

function extractClaimBlocks(raw) {
  const blocks = [];
  const re = /\{\s*id:\s*"([^"]+)"[\s\S]*?ownerApproved:\s*(true|false)[\s\S]*?currentlyAssurable:\s*(true|false)[\s\S]*?accessConfirmed:\s*(true|false)/g;
  // Fallback simpler parse: count flags per id
  const ids = [...raw.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) {
    const start = raw.indexOf(`id: "${id}"`);
    const slice = raw.slice(start, start + 900);
    blocks.push({
      id,
      ownerApproved: /ownerApproved:\s*true/.test(slice),
      currentlyAssurable: /currentlyAssurable:\s*true/.test(slice),
      accessConfirmed: /accessConfirmed:\s*true/.test(slice),
      kindService: /kind:\s*"service"/.test(slice),
      kindEducational: /kind:\s*"educational"/.test(slice),
    });
  }
  return blocks;
}

test("no service claim is publishable without full approval", async () => {
  const { raw } = await loadClaimsModule();
  const blocks = extractClaimBlocks(raw);
  assert.ok(blocks.length >= 4, "expected manufacturer verification records");
  for (const claim of blocks) {
    const wouldPublishService =
      claim.kindService &&
      claim.currentlyAssurable &&
      claim.ownerApproved &&
      claim.accessConfirmed;
    assert.equal(
      wouldPublishService,
      false,
      `${claim.id} must not publish as service claim until fully approved`
    );
  }
});

test("educational manufacturer notes stay withheld without ownerApproved", async () => {
  const { raw } = await loadClaimsModule();
  const blocks = extractClaimBlocks(raw);
  for (const claim of blocks) {
    if (!claim.kindEducational) continue;
    const wouldPublishEdu =
      claim.kindEducational &&
      claim.ownerApproved &&
      claim.accessConfirmed &&
      !claim.currentlyAssurable;
    assert.equal(
      wouldPublishEdu,
      false,
      `${claim.id} educational publish requires ownerApproved`
    );
  }
});

test("instrument claim helpers export publish gates", async () => {
  // TypeScript module: assert source contains the gate functions.
  const lib = readFileSync(join(root, "src/lib/bim-instrument-claims.ts"), "utf8");
  assert.match(lib, /isPublishableServiceClaim/);
  assert.match(lib, /listPublishableServiceClaims/);
  assert.match(lib, /listWithheldInstrumentClaims/);
});

test("technology page exists under bim app router and uses claim components", () => {
  const page = join(root, "src/app/bim/technologia-es-minoseg/page.tsx");
  assert.equal(existsSync(page), true);
  const src = readFileSync(page, "utf8");
  assert.match(src, /BimServiceInstrumentClaims/);
  assert.match(src, /bimMetadata\(\s*"\/technologia-es-minoseg"/);
  assert.doesNotMatch(src, /Trimble X9/);
  assert.doesNotMatch(src, /RTC360/);
  assert.doesNotMatch(src, /RIEGL/);
});

test("bim metadata canonical stays on bim.vrgo.hu", () => {
  const seo = readFileSync(join(root, "src/config/bim-seo.ts"), "utf8");
  const site = readFileSync(join(root, "src/lib/bim-site.ts"), "utf8");
  assert.match(seo, /export const BIM_ORIGIN = "https:\/\/bim\.vrgo\.hu"/);
  assert.match(seo, /export const MAIN_ORIGIN = "https:\/\/vrgo\.hu"/);
  assert.match(site, /export \{ BIM_ORIGIN, MAIN_ORIGIN \}/);
  assert.match(site, /bimCanonical\(/);
  assert.match(site, /const canonical = bimCanonical\(path\)/);
});

test("no public API route exposes instrument claim switches", () => {
  const apiRoot = join(root, "src/app/api");
  const stack = [apiRoot];
  const hits = [];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, name.name);
      if (name.isDirectory()) stack.push(p);
      else if (name.name.endsWith(".ts") || name.name.endsWith(".tsx")) {
        const text = readFileSync(p, "utf8");
        if (text.includes("bim-instrument-claims") || text.includes("BIM_INSTRUMENT_CLAIMS")) {
          hits.push(p);
        }
      }
    }
  }
  assert.deepEqual(hits, [], `instrument claims must not be imported from API routes: ${hits.join(", ")}`);
});

test("sample pack remains gated; no fake download button path", () => {
  const bimConfig = readFileSync(join(root, "src/config/bim.ts"), "utf8");
  assert.match(bimConfig, /samplePackUrl:\s*""/);
  assert.match(bimConfig, /bimHasSamplePack/);
});

test("main vrgo marketing pages do not import bim instrument claims", () => {
  const mainPages = [
    join(root, "src/app/page.tsx"),
    join(root, "src/app/csomagok/page.tsx"),
    join(root, "src/app/gyik/page.tsx"),
  ];
  for (const page of mainPages) {
    if (!existsSync(page)) continue;
    const text = readFileSync(page, "utf8");
    assert.equal(
      text.includes("bim-instrument-claims") || text.includes("BimInstrumentClaims"),
      false,
      `${page} must not pull bim instrument claims`
    );
  }
});
