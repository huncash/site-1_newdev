import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "blog", "bim");
const ua = "VRGO-site-editorial/1.0 (vrgo.hu; contact info@vrgo.hu)";

const jobs = [
  ["epiteszeti-bim-modell", "File:Architectural BIM 3D Modeling.jpg"],
  ["kozepulet-homlokzat", "File:Osaka City Central Public Hall main facade 2026 dllu.jpg"],
  ["szakagi-bim-koordinacio", "File:Multidiscipline MEP BIM Coordination & Constructability Review.webp"],
  ["scan-to-bim-gepeszet", "File:Scan-to-BIM Mechanical Room.jpg"],
  ["as-built-gepeszet", "File:As-Built Scan to BIM for Mechanical Room Documentation & Coordination.webp"],
  ["viztisztito-telep", "File:Deer Island Waste Water Treatment Plant.jpg"],
  ["kampusz-illusztracio", "File:Campus WU EA DSC 1571w.jpg"],
  ["tetoi-gepeszet", "File:130420-F-ZZ999-101 (15718415681), rooftop HVAC.jpg"],
];

async function api(params) {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", ...params });
  const res = await fetch(url, { headers: { "User-Agent": ua, "Api-User-Agent": ua } });
  if (!res.ok) throw new Error(`API ${res.status} ${url}`);
  return res.json();
}

function plain(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function infoFor(titles) {
  const data = await api({
    action: "query",
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime|size",
    iiurlwidth: "1600",
    titles: titles.join("|"),
  });
  return Object.values(data.query.pages);
}

async function download(page, outBase) {
  if (!page || page.missing !== undefined || page.pageid < 0) {
    console.log("MISSING", outBase, page?.title);
    return null;
  }
  const info = page.imageinfo?.[0];
  const src = info.thumburl || info.url;
  const res = await fetch(src, { headers: { "User-Agent": ua } });
  if (!res.ok) throw new Error(`GET ${res.status} ${src}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = extname(new URL(src).pathname).toLowerCase() || ".jpg";
  const file = `${outBase}${ext}`;
  await writeFile(join(root, file), buf);
  const meta = info.extmetadata ?? {};
  const credit = {
    file,
    bytes: buf.length,
    title: page.title,
    author: plain(meta.Artist?.value),
    license: plain(meta.LicenseShortName?.value),
    licenseUrl: plain(meta.LicenseUrl?.value),
    source: info.descriptionurl,
  };
  console.log(JSON.stringify(credit));
  return credit;
}

await mkdir(root, { recursive: true });
const pages = await infoFor(jobs.map(([, title]) => title));
const byTitle = new Map(pages.map((page) => [page.title, page]));
for (const [out, title] of jobs) {
  await download(byTitle.get(title), out);
}

const search = await api({
  action: "query",
  list: "search",
  srsearch: 'air handling unit building services',
  srnamespace: "6",
  srlimit: "8",
});
console.log("SEARCH", JSON.stringify(search.query.search.map((row) => row.title)));
