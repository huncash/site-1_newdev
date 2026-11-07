#!/usr/bin/env node
/**
 * Nyilvános szöveg lint — forrásfájlok + (ha van) .next HTML.
 * Kilépési kód 1, ha bármely szabály sérül.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const rules = JSON.parse(readFileSync(join(root, "scripts", "copy-rules.json"), "utf8"));

const errors = [];

function err(file, route, finding) {
  errors.push({ file: relative(root, file).replace(/\\/g, "/"), route: route || "—", finding });
}

function isExcepted(rel) {
  const n = rel.replace(/\\/g, "/");
  return rules.exceptionPaths.some((p) => n.includes(p));
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Idézett / template stringek kinyerése (egyszerű). */
function extractStrings(source) {
  const strings = [];
  const re = /(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  let m;
  while ((m = re.exec(source))) {
    const s = m[2]
      .replace(/\\n/g, "\n")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, "`");
    if (s.length >= 4) strings.push(s);
  }
  // JSX szövegcsomók
  const jsx = source.matchAll(/>([^<>{}\n][^<>{}]*)</g);
  for (const x of jsx) {
    const t = x[1].trim();
    if (t.length >= 4 && !/^[0-9./]+$/.test(t)) strings.push(t);
  }
  return strings;
}

function stripTestimonials(text) {
  // content.ts testimonials blokk — idézetek kivétele
  return text.replace(/testimonials\s*:\s*\{[\s\S]*?\n\s*\},/m, "testimonials: {},");
}

const scanRoots = [
  join(root, "src", "app"),
  join(root, "src", "components"),
  join(root, "src", "data"),
  join(root, "src", "config"),
  join(root, "src", "lib"),
  join(root, "src", "templates"),
];

const files = scanRoots.flatMap((d) => walk(d)).filter((p) => {
  const ext = extname(p);
  if (![".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"].includes(ext)) return false;
  const rel = relative(root, p);
  if (isExcepted(rel)) return false;
  // bim cikk markdown: kivétel a törzsre, de a rhythm lib nem
  if (rel.includes("bim-cikkek")) return false;
  return true;
});

const scopeHits = [];
const sentenceMap = new Map(); // normalized 8+ word sentence -> [files]

for (const file of files) {
  const rel = relative(root, file).replace(/\\/g, "/");
  let raw = readFileSync(file, "utf8");
  // kommentek elhagyása (rough)
  raw = raw.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/.*$/gm, "$1");
  if (rel.endsWith("content.ts")) raw = stripTestimonials(raw);

  const routeGuess =
    rel.startsWith("src/app/bim/")
      ? rel.replace("src/app/bim", "").replace(/\/page\.tsx$/, "/") || "/"
      : rel.startsWith("src/app/")
        ? rel.replace("src/app", "").replace(/\/page\.tsx$/, "/") || "/"
        : "—";

  const strings = extractStrings(raw);
  const blob = strings.join("\n");

  for (const sub of rules.forbiddenSubstrings) {
    if (blob.toLowerCase().includes(sub.toLowerCase())) {
      // YouTube / Hetente: csak bim host fájlok
      if ((sub === "YouTube" || sub === "Hetente kétszer") && !rel.includes("/bim") && !rel.includes("bim-")) {
        continue;
      }
      // Pro3 csak bim
      if (sub === "Pro3" && !rel.includes("bim")) continue;
      // konfigur: csak ha magyar szóként jelenik meg
      if (sub === "konfigur") {
        if (!/konfiguráci|konfigurál/i.test(blob)) continue;
      }
      err(file, routeGuess, `Tiltott: „${sub}”`);
    }
  }

  for (const pattern of rules.forbiddenRegex) {
    const re = new RegExp(pattern, "i");
    if (re.test(blob)) {
      err(file, routeGuess, `Tiltott regex: /${pattern}/`);
    }
  }

  for (const w of rules.tegezoWords) {
    const re = new RegExp(`(?:^|[^\\p{L}])${w}(?:[^\\p{L}]|$)`, "iu");
    if (re.test(blob)) {
      err(file, routeGuess, `Tegező: „${w}”`);
    }
  }

  for (const w of rules.onokFamily) {
    if (blob.includes(w)) {
      err(file, routeGuess, `Önök-család: „${w}”`);
    }
  }

  const plainRaw = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (
    (blob.includes(rules.scopeParagraphMustAppearOnce) ||
      plainRaw.includes(rules.scopeParagraphMustAppearOnce)) &&
    !scopeHits.includes(rel)
  ) {
    scopeHits.push(rel);
  }

  // 8+ szavas mondatok
  for (const s of strings) {
    const sentences = s.split(/(?<=[.!?])\s+/);
    for (const sent of sentences) {
      const words = sent
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .split(/\s+/)
        .filter(Boolean);
      if (words.length < 8) continue;
      const key = words.join(" ");
      const wl = rules.whitelistExactSentences.some(
        (w) => w.text.toLowerCase() === sent.trim().toLowerCase()
      );
      if (wl) continue;
      if (!sentenceMap.has(key)) sentenceMap.set(key, []);
      sentenceMap.get(key).push(rel);
    }
  }

  // bim → vrgo.hu/blog
  if (rel.includes("bim") && /vrgo\.hu\/blog|MAIN_ORIGIN.*\/blog/.test(raw)) {
    err(file, routeGuess, "bim → vrgo.hu/blog link");
  }
}

if (scopeHits.length !== 1) {
  err(
    join(root, "src/components/bim/BimScopeNote.tsx"),
    "bim",
    `„Három dolgot vállalunk…” előfordulás: ${scopeHits.length}× (${scopeHits.join(", ") || "0"}) — pontosan 1 kell`
  );
}

// getPublishedArticles / jövőbeli cikkek a meta listában (forrásellenőrzés)
try {
  const articlesDir = join(root, "src", "content", "bim-cikkek");
  if (existsSync(articlesDir)) {
    // csak figyelmeztetés a lintben: a runtime 404 a kód felelőssége
  }
} catch {
  /* ignore */
}

// .next HTML opcionális
const nextHtml = join(root, ".next", "server", "app");
if (existsSync(nextHtml)) {
  for (const file of walk(nextHtml).filter((p) => p.endsWith(".html") || p.endsWith(".rsc"))) {
    const text = readFileSync(file, "utf8");
    if (/\bundefined\b|\bnull\b|\[object Object\]/i.test(text) && text.includes("Bejárható")) {
      // túl zajos lehet — csak erős jelek
    }
    if (text.includes("← vrgo.hu") || text.includes("vrgo.hu főoldal")) {
      err(file, "build", "Tiltott vissza-link a build kimenetben");
    }
  }
}

if (errors.length) {
  console.error(`lint-copy: ${errors.length} hiba\n`);
  for (const e of errors) {
    console.error(`- [${e.file}] ${e.route}: ${e.finding}`);
  }
  process.exit(1);
}

console.log("lint-copy: OK (0 hiba)");
