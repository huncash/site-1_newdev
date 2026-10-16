import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const articlesDir = resolve(process.cwd(), "src", "content", "bim-cikkek");

export interface BimArticleMeta {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  /** Közzététel napja, Europe/Budapest, YYYY-MM-DD. */
  date: string;
  /** Közzététel órája, Europe/Budapest, HH:mm. Üres vagy 00:00: a nap elején. */
  time: string;
  author: string;
  category: string;
  keywords: string[];
  readingTime: number;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageAuthor: string;
  imageSourceUrl: string;
  imageLicense: string;
  imageLicenseUrl: string;
}

export interface BimArticle extends BimArticleMeta {
  contentHtml: string;
}

function asString(value: unknown, field: string, slug: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`A ${slug} cikkben hiányzik a(z) ${field} mező.`);
  }
  return value.trim();
}

function asIsoDate(value: unknown, slug: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value.trim())) {
    return value.trim().slice(0, 10);
  }
  throw new Error(`A ${slug} cikk dátuma nem YYYY-MM-DD.`);
}

function asClock(value: unknown, slug: string): string {
  if (value == null || value === "") return "00:00";
  const text = String(value).trim();
  const match = /^(\d{1,2}):(\d{2})$/.exec(text);
  if (!match) throw new Error(`A ${slug} cikk időpontja nem HH:mm.`);
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) throw new Error(`A ${slug} cikk időpontja nem HH:mm.`);
  return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/[#>*_[\]()`|]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function metaFromFile(slug: string, raw: string): { meta: BimArticleMeta; content: string } {
  const { data, content } = matter(raw);
  const keywords = asString(data.keywords, "keywords", slug)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const title = asString(data.title, "title", slug);

  return {
    content,
    meta: {
      slug,
      title,
      seoTitle: asString(data.seoTitle, "seoTitle", slug),
      description: asString(data.description, "description", slug),
      date: asIsoDate(data.date, slug),
      time: asClock(data.time, slug),
      author: asString(data.author, "author", slug),
      category: asString(data.category, "category", slug),
      keywords,
      readingTime: readingMinutes(content),
      image: asString(data.image, "image", slug),
      imageAlt: asString(data.imageAlt, "imageAlt", slug),
      imageCaption: asString(data.imageCaption, "imageCaption", slug),
      imageAuthor: asString(data.imageAuthor, "imageAuthor", slug),
      imageSourceUrl: asString(data.imageSourceUrl, "imageSourceUrl", slug),
      imageLicense: asString(data.imageLicense, "imageLicense", slug),
      imageLicenseUrl: typeof data.imageLicenseUrl === "string" ? data.imageLicenseUrl.trim() : "",
    },
  };
}

export function budapestToday(now = new Date()): string {
  return budapestNow(now).slice(0, 10);
}

/** YYYY-MM-DDTHH:mm, Europe/Budapest. */
export function budapestNow(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}`;
}

export function isBimArticlePublished(
  article: { date: string; time?: string },
  now = budapestNow()
): boolean {
  const time = article.time && article.time !== "00:00" ? article.time : "00:00";
  return `${article.date}T${time}` <= now;
}

export function formatHuDate(isoDate: string, time = "00:00"): string {
  const day = new Date(`${isoDate}T12:00:00`).toLocaleDateString("hu-HU", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (!time || time === "00:00") return day;
  const [hour, minute] = time.split(":");
  return `${day}, ${Number(hour)}:${minute}`;
}

export function bimArticleSlugs(): string[] {
  if (!existsSync(articlesDir)) return [];
  return readdirSync(articlesDir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => basename(file, ".md"));
}

export function getBimArticleMeta(slug: string): BimArticleMeta | null {
  const fullPath = join(articlesDir, `${slug}.md`);
  if (!existsSync(fullPath)) return null;
  return metaFromFile(slug, readFileSync(fullPath, "utf8")).meta;
}

export function listBimArticles(): BimArticleMeta[] {
  return bimArticleSlugs()
    .map((slug) => getBimArticleMeta(slug))
    .filter((article): article is BimArticleMeta => article !== null)
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || a.slug.localeCompare(b.slug)
    );
}

export function listPublishedBimArticles(now = budapestNow()): BimArticleMeta[] {
  return listBimArticles().filter((article) => isBimArticlePublished(article, now));
}

function holdUnpublishedArticleLinks(html: string, now = budapestNow()): string {
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs: string, inner: string) => {
    const href = /\bhref="([^"]+)"/i.exec(attrs)?.[1] ?? "";
    const match = href.match(/^(?:https?:\/\/(?:www\.)?bim\.vrgo\.hu)?\/cikkek\/([a-z0-9-]+)\/?(?:[?#].*)?$/i);
    if (!match) return full;
    const target = getBimArticleMeta(match[1]);
    if (!target || isBimArticlePublished(target, now)) return full;
    return inner;
  });
}

const OWN_SITE_HOSTS = new Set(["vrgo.hu", "www.vrgo.hu", "bim.vrgo.hu"]);

function isExternalReference(href: string): boolean {
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return false;
  }
  try {
    const url = new URL(href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    return !OWN_SITE_HOSTS.has(host) && !host.endsWith(".vrgo.hu");
  } catch {
    return false;
  }
}

/** Külső, szükséges hivatkozás új lapon nyílik, a saját oldal linkjei nem. */
export function openExternalLinksInNewTab(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (full, attrs: string) => {
    const hrefMatch = /\bhref="([^"]*)"/i.exec(attrs);
    if (!hrefMatch || /\btarget=/i.test(attrs) || !isExternalReference(hrefMatch[1])) {
      return full;
    }
    const withRel = /\brel="/i.test(attrs)
      ? attrs.replace(/\brel="([^"]*)"/i, (_match, rel: string) => {
          const parts = new Set(rel.split(/\s+/).filter(Boolean));
          parts.add("noopener");
          parts.add("noreferrer");
          return `rel="${[...parts].join(" ")}"`;
        })
      : `${attrs} rel="noopener noreferrer"`;
    return `<a${withRel} target="_blank">`;
  });
}

export async function getBimArticle(slug: string): Promise<BimArticle | null> {
  const fullPath = join(articlesDir, `${slug}.md`);
  if (!existsSync(fullPath)) return null;
  const { meta, content } = metaFromFile(slug, readFileSync(fullPath, "utf8"));
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const html = holdUnpublishedArticleLinks(openExternalLinksInNewTab(processed.toString()));
  return { ...meta, contentHtml: html };
}

/** Local /bim prefix: article links stay on the BIM routes. */
export function prefixInternalHrefs(html: string, prefix: boolean): string {
  if (!prefix) return html;
  return html.replace(/href="\/(?!\/)/g, 'href="/bim/');
}

export function splitAfterFirstParagraph(html: string): { lead: string; rest: string } {
  const marker = "</p>";
  const index = html.indexOf(marker);
  if (index === -1) return { lead: html, rest: "" };
  const end = index + marker.length;
  return { lead: html.slice(0, end), rest: html.slice(end) };
}
