#!/usr/bin/env node
/**
 * Unit-szerű ellenőrzés: jövőbeli cikk ne jelenjen meg a listában.
 * Hamis „óra”: publishedAt a jövőben.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const dir = join(root, "src", "content", "bim-cikkek");

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) return {};
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

function isPublished(article, now) {
  const time = article.time && article.time !== "00:00" ? article.time : "00:00";
  return `${article.date}T${time}` <= now;
}

function listPublished(now) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const slug = basename(f, ".md");
      const data = parseFrontmatter(readFileSync(join(dir, f), "utf8"));
      return { slug, date: data.date, time: data.time || "00:00" };
    })
    .filter((a) => a.date && isPublished(a, now));
}

test("jövőbeli cikk nem jelenik meg (hamis óra: 2010-01-01)", () => {
  const published = listPublished("2010-01-01T00:00");
  assert.equal(published.length, 0, "2010-ben még semminek sem szabadna publikáltnak lennie");
});

test("jelenlegi időpontban csak publishedAt <= now cikkek", () => {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const v = (t) => parts.find((p) => p.type === t)?.value ?? "";
  const stamp = `${v("year")}-${v("month")}-${v("day")}T${v("hour")}:${v("minute")}`;
  const published = listPublished(stamp);
  for (const a of published) {
    assert.ok(isPublished(a, stamp), `${a.slug} jövőbeli a listában`);
  }
});
