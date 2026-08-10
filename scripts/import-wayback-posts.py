"""Fetch additional VRGO 2017 posts from Wayback Machine into private_data/posts."""

from __future__ import annotations

import html
import os
import re
import ssl
import urllib.request

SSL_CTX = ssl._create_unverified_context()

OUT = os.path.join(os.path.dirname(__file__), "..", "private_data", "posts")

# Known published URLs (live site now 404; Wayback still has captures).
URLS = [
    "https://vrgo.hu/2017/05/19/megujultak-szovegbuborekjaink-de-miert-jo-egyaltalan-hogy-van-ilyenunk/",
    "https://vrgo.hu/2017/07/12/hatekonyabb-ingatlan-eladas-vr-al/",
    "https://vrgo.hu/2017/07/19/igy-hozhatsz-letre-kreativ-online-hirdetest-vr-es-ar-reklam-otletek/",
    "https://vrgo.hu/2017/08/04/virtualis-valosag-az-osztalyteremben-az-oktatas-jovoje/",
    "https://vrgo.hu/2017/09/22/mit-var-el-az-atlag-fogyaszto-virtualis-vasarlas-soran/",
    "https://vrgo.hu/2017/09/29/egy-ujabb-kreativ-vr-marketing-kampany-digitalis-csavargas-az-atlas-obscura-vr-ral/",
    "https://vrgo.hu/2017/10/06/egy-rendezvenyhelyszin-kereso-honlap-vr-ral-konnyitette-meg-ugyfelei-eletet/",
]


def fetch(url: str) -> str | None:
    candidates = [
        "https://web.archive.org/web/2018/" + url,
        "https://web.archive.org/web/2019/" + url,
        "https://web.archive.org/web/2020/" + url,
        "https://web.archive.org/web/2022/" + url,
        "https://web.archive.org/web/20220120023556/" + url,
        "https://web.archive.org/web/20240619125745/" + url,
    ]
    for wb in candidates:
        req = urllib.request.Request(wb, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(req, timeout=60, context=SSL_CTX) as r:
                data = r.read().decode("utf-8", errors="replace")
                if "Virtuális" in data or "VR" in data or "post-content" in data:
                    print("OK", wb)
                    return data
        except Exception as e:
            print("try fail", wb.split("/web/")[1][:20], e)
            continue
    print("FAIL", url)
    return None


def extract_main(page: str) -> tuple[str, str, str]:
    # title
    tm = re.search(r"<h1[^>]*>(.*?)</h1>", page, re.I | re.S)
    title = re.sub("<[^>]+>", "", tm.group(1)).strip() if tm else ""
    title = html.unescape(title)
    # date from URL fallback
    # content: prefer article / post-content
    cm = re.search(
        r'(?:class="[^"]*post-content[^"]*"|class="[^"]*entry-content[^"]*")[^>]*>(.*?)</div>',
        page,
        re.I | re.S,
    )
    if not cm:
        cm = re.search(r"<article[^>]*>(.*?)</article>", page, re.I | re.S)
    body_html = cm.group(1) if cm else ""
    # strip scripts/styles
    body_html = re.sub(r"<script[^>]*>.*?</script>", "", body_html, flags=re.I | re.S)
    body_html = re.sub(r"<style[^>]*>.*?</style>", "", body_html, flags=re.I | re.S)
    # remove author bio / share blocks if present
    body_html = re.sub(
        r"(?:About the Author|Tetszik az oldal).*",
        "",
        body_html,
        flags=re.I | re.S,
    )
    return title, body_html, page


def html_to_md(s: str) -> str:
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
    s = re.sub(r"<(strong|b)[^>]*>(.*?)</\1>", r"**\2**", s, flags=re.I | re.S)
    s = re.sub(r"<(em|i)[^>]*>(.*?)</\1>", r"*\2*", s, flags=re.I | re.S)
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    # drop wayback toolbar leftovers
    s = re.sub(r"https://web\.archive\.org/web/\d+/", "", s)
    return s.strip()


def first_para(md: str, n: int = 220) -> str:
    for line in md.split("\n"):
        t = line.strip()
        if t and not t.startswith("#") and not t.startswith("!") and len(t) > 40:
            t = re.sub(r"\*\*|__|\*|_|\`", "", t)
            if len(t) > n:
                return t[:n].rsplit(" ", 1)[0] + "…"
            return t
    return ""


def yaml_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for url in URLS:
        slug = url.rstrip("/").split("/")[-1]
        date_m = re.search(r"/(\d{4})/(\d{2})/(\d{2})/", url)
        date = (
            f"{date_m.group(1)}-{date_m.group(2)}-{date_m.group(3)}"
            if date_m
            else "2017-01-01"
        )
        out_path = os.path.join(OUT, f"{slug}.md")
        if os.path.exists(out_path):
            print("SKIP exists", slug)
            continue
        page = fetch(url)
        if not page:
            continue
        title, body_html, _ = extract_main(page)
        if not title:
            title = slug.replace("-", " ")
        body = html_to_md(body_html)
        if len(body) < 200:
            print("SKIP short", slug, len(body))
            continue
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
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(fm)
        print("WROTE", slug, "chars", len(body))


if __name__ == "__main__":
    main()
