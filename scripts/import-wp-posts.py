"""Import published posts from the 2016-12-25 WordPress WXR export."""

from __future__ import annotations

import html
import os
import re

OUT = os.path.join(os.path.dirname(__file__), "..", "private_data", "posts")
WXR = (
    r"D:\Adatmentés\ToTS_2016-2019\honlap\biztonsági mentés chid theme"
    r"\360VRMarketing\360vrmarketing.wordpress.2016-12-25.xml"
)


def tag(item: str, name: str) -> str:
    m = re.search(
        rf"<{re.escape(name)}(?:\s[^>]*)?>"
        rf"(?:<!\[CDATA\[(.*?)\]\]>|(.*?))</{re.escape(name)}>",
        item,
        re.S,
    )
    if not m:
        return ""
    return (m.group(1) if m.group(1) is not None else m.group(2) or "").strip()


def strip_shortcodes(s: str) -> str:
    prev = None
    while prev != s:
        prev = s
        s = re.sub(r"\[/?[a-zA-Z0-9_-]+(?:\s[^\]]*)?\]", "", s)
    return s


def html_to_md(s: str) -> str:
    s = strip_shortcodes(s)
    s = html.unescape(s)
    s = re.sub(
        r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>',
        r"\n\n![](\1)\n\n",
        s,
        flags=re.I,
    )
    s = re.sub(
        r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
        r"[\2](\1)",
        s,
        flags=re.I | re.S,
    )
    for i in range(1, 7):
        s = re.sub(
            rf"<h{i}[^>]*>(.*?)</h{i}>",
            lambda m, level=i: "\n\n"
            + ("#" * level)
            + " "
            + re.sub("<[^>]+>", "", m.group(1)).strip()
            + "\n\n",
            s,
            flags=re.I | re.S,
        )
    s = re.sub(r"<li[^>]*>(.*?)</li>", r"- \1\n", s, flags=re.I | re.S)
    s = re.sub(r"</?(ul|ol)[^>]*>", "\n", s, flags=re.I)
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"<p[^>]*>", "\n\n", s, flags=re.I)
    s = re.sub(r"</p>", "\n\n", s, flags=re.I)
    s = re.sub(
        r"<(strong|b)[^>]*>(.*?)</\1>", r"**\2**", s, flags=re.I | re.S
    )
    s = re.sub(r"<(em|i)[^>]*>(.*?)</\1>", r"*\2*", s, flags=re.I | re.S)
    s = re.sub(
        r"<blockquote[^>]*>(.*?)</blockquote>",
        r"\n> \1\n",
        s,
        flags=re.I | re.S,
    )
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    s = re.sub(r"[ \t]+\n", "\n", s)
    return s.strip()


def first_para(md: str, n: int = 220) -> str:
    for line in md.split("\n"):
        t = line.strip()
        if t and not t.startswith("#") and not t.startswith("!") and not t.startswith("["):
            t = re.sub(r"\*\*|__|\*|_|\`", "", t)
            if len(t) > n:
                return t[:n].rsplit(" ", 1)[0] + "…"
            return t
    return ""


def yaml_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    text = open(WXR, encoding="utf-8", errors="replace").read()
    items = re.findall(r"<item>(.*?)</item>", text, re.S)
    written = []
    for item in items:
        if tag(item, "wp:post_type") != "post":
            continue
        if tag(item, "wp:status") != "publish":
            continue
        title = tag(item, "title")
        slug = tag(item, "wp:post_name")
        if not slug:
            slug = re.sub(r"[^a-z0-9-]+", "-", title.lower())[:60].strip("-")
        date = tag(item, "wp:post_date")[:10]
        content = tag(item, "content:encoded")
        if len(content) < 100:
            continue
        body = html_to_md(content)
        desc = first_para(body)
        fm = (
            "---\n"
            f'title: "{yaml_escape(title)}"\n'
            f'description: "{yaml_escape(desc)}"\n'
            f'date: "{date}"\n'
            'author: "VRGO blog (eredeti WP cikk)"\n'
            'category: "News"\n'
            "aiDisclosure: none\n"
            "editorialReview: true\n"
            "---\n\n"
            f"{body}\n"
        )
        out_path = os.path.join(OUT, f"{slug}.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(fm)
        written.append((date, slug, title, len(body)))

    print(f"WROTE {len(written)}")
    for row in written:
        print(f"{row[0]} {row[1]} | {row[2][:60]} | chars {row[3]}")


if __name__ == "__main__":
    main()
