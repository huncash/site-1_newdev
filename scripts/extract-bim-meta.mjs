#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p, acc);
    else if (name.name === "page.tsx") acc.push(p);
  }
  return acc;
}

const pages = walk("src/app/bim");
const rows = [];

for (const file of pages) {
  const text = fs.readFileSync(file, "utf8");
  const rel = file.replace(/\\/g, "/").replace(/^src\/app\/bim/, "") || "/";
  const re =
    /bimMetadata\(\s*["']([^"']+)["']\s*,\s*(?:BIM_SEO\.defaultTitle|["']([^"']+)["'])\s*,\s*(?:BIM_SEO\.defaultDescription|["']([^"']+)["'])/s;
  const m = text.match(re);
  if (m) {
    rows.push({
      path: m[1],
      title: m[2] || "Ipari és épületfelmérés, pontfelhő | VRGO BIM",
      description: (m[3] || "(defaultDescription)").replace(/\s+/g, " ").slice(0, 140),
    });
  } else if (text.includes("generateMetadata")) {
    rows.push({ path: rel, title: "(generateMetadata)", description: "cikk/dinamikus" });
  } else if (text.includes("bimMetadata")) {
    rows.push({ path: rel, title: "(bimMetadata multi-line)", description: "" });
  }
}

rows.sort((a, b) => a.path.localeCompare(b.path));
for (const r of rows) {
  console.log(`${r.path}\t${r.title}\t${r.description}`);
}
