"""Port TanStack route pages from vrgo-main into Next.js app router pages."""

from __future__ import annotations

import re
from pathlib import Path

SRC = Path(r"C:\Users\patri\DEVELOPMENT\inspiration old\vrgo-main\src\routes")
DST = Path(__file__).resolve().parents[1] / "src" / "app"

# route file -> app path relative to src/app
MAP = {
    "megoldasok.oktatas.tsx": "megoldasok/oktatas/page.tsx",
    "megoldasok.ipari-iot.tsx": "megoldasok/ipari-iot/page.tsx",
    "megoldasok.facility.tsx": "megoldasok/facility/page.tsx",
    "megoldasok.kampusz.tsx": "megoldasok/kampusz/page.tsx",
    "megoldasok.bim-as-built.tsx": "megoldasok/bim-as-built/page.tsx",
    "megoldasok.esg.tsx": "megoldasok/esg/page.tsx",
    "megoldasok.property-intelligence.tsx": "megoldasok/property-intelligence/page.tsx",
    "megoldasok.minosegbiztositas.tsx": "megoldasok/minosegbiztositas/page.tsx",
    "csomagok.tsx": "csomagok/page.tsx",
    "gyik.tsx": "gyik/page.tsx",
}


def extract_meta(src: str) -> tuple[str, str]:
    m = re.search(
        r"buildMeta\(\{\s*title:\s*\"([^\"]+)\",\s*description:\s*\"([^\"]+)\"",
        src,
        re.S,
    )
    if not m:
        return "VRGO", ""
    return m.group(1), m.group(2)


def strip_route_wrapper(src: str) -> str:
    # Drop route import/export block
    src = re.sub(
        r"import \{[^}]*createFileRoute[^}]*\} from \"@tanstack/react-router\";\s*",
        "",
        src,
    )
    src = re.sub(r'import \{ buildMeta \} from "[^"]+";\s*', "", src)
    src = re.sub(
        r"export const Route = createFileRoute\([^\)]+\)\(\{.*?\n\}\);\n*",
        "",
        src,
        count=1,
        flags=re.S,
    )
    return src


def convert(src: str, title: str, description: str) -> str:
    src = strip_route_wrapper(src)

    # Link imports
    src = src.replace(
        'import { Link } from "@tanstack/react-router";',
        'import Link from "next/link";',
    )
    # leftover Link in multi-import already stripped with createFileRoute

    # if Term / KPI imports use relative paths, fix
    src = src.replace('from "../components/Term"', 'from "@/components/Term"')
    src = src.replace(
        'from "../components/PropertyKpiLeaderboard"',
        'from "@/components/PropertyKpiLeaderboard"',
    )

    # package images — use public paths
    src = re.sub(
        r'import csomagA from "[^"]+";\s*import csomagB from "[^"]+";\s*import csomagC from "[^"]+";\s*',
        "",
        src,
    )
    src = src.replace("img: csomagA,", 'img: "/packages/csomag-a.jpg",')
    src = src.replace("img: csomagB,", 'img: "/packages/csomag-b.jpg",')
    src = src.replace("img: csomagC,", 'img: "/packages/csomag-c.jpg",')

    # to= -> href=
    src = re.sub(r"\bto=\{", "href={", src)
    src = re.sub(r'\bto="', 'href="', src)

    # Find default component name: function XxxPage
    m = re.search(r"function (\w+)\(", src)
    if not m:
        raise RuntimeError("no component function")
    comp = m.group(1)

    # Make page default export
    src = src.replace(f"function {comp}(", f"export default function {comp}(")

    # FAQ schema helper for gyik — keep as is
    # Add metadata export at top
    header = (
        'import type { Metadata } from "next";\n'
        'import Link from "next/link";\n'
    )
    # Avoid duplicate Link import
    if 'import Link from "next/link"' in src:
        header = 'import type { Metadata } from "next";\n'

    meta = f'''
export const metadata: Metadata = {{
  title: {title!r},
  description: {description!r},
}};
'''
    # Ensure client not needed unless hooks — these are server components OK with Term client children

    # Prepend Term/KPI imports that remain
    imports_keep = []
    for line in src.splitlines():
        if line.startswith("import "):
            imports_keep.append(line)
    body_lines = [ln for ln in src.splitlines() if not ln.startswith("import ")]
    body = "\n".join(body_lines).lstrip("\n")

    # Deduplicate Link
    final_imports = ['import type { Metadata } from "next";']
    seen = set()
    for line in imports_keep:
        if "next/link" in line or "Metadata" in line:
            continue
        if line in seen:
            continue
        seen.add(line)
        final_imports.append(line)
    if "Link" in body or "href=" in body:
        final_imports.insert(1, 'import Link from "next/link";')

    return "\n".join(final_imports) + "\n" + meta + "\n" + body + "\n"


def main() -> None:
    for src_name, dest_rel in MAP.items():
        src_path = SRC / src_name
        raw = src_path.read_text(encoding="utf-8")
        title, desc = extract_meta(raw)
        out = convert(raw, title, desc)
        dest = DST / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(out, encoding="utf-8", newline="\n")
        print("wrote", dest_rel)


if __name__ == "__main__":
    main()
