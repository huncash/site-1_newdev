"""Generate src/content/aszf-data.ts from aszf.txt."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "src" / "content" / "aszf.txt"
OUT = ROOT / "src" / "content" / "aszf-data.ts"

HEADINGS = {
    "ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK",
    "Bevezető",
    "A SZOLGÁLTATÓ NEVE, CÍME, ELÉRHETŐSÉGEI:",
    "A szolgáltatás tárgya, a szerződés tartalma",
    "Alapszolgáltatás (valamennyi csomag tartalmazza):",
    "A Szolgáltató jogai és kötelezettségei",
    "A Megrendelő jogai és kötelezettségei",
    "4. Szerződés módosítása",
    "5. Az ÁSZF hatálya",
    "6. Egyéb rendelkezések",
    "7. Számlázás és fizetési feltételek",
    "8. Felelősség",
}


def main() -> None:
    blocks = [b.strip() for b in RAW.read_text(encoding="utf-8").split("\n\n") if b.strip()]
    items: list[dict[str, str]] = []
    in_list = False
    for b in blocks:
        if b == "ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK":
            items.append({"kind": "h1", "text": b})
            in_list = False
            continue
        if b in HEADINGS:
            items.append({"kind": "h2", "text": b.rstrip(":")})
            in_list = b.startswith("Alapszolgáltatás")
            continue
        if in_list and not re.match(r"^\d+\.", b) and not b.startswith("A Szolgáltató"):
            items.append({"kind": "li", "text": b})
            continue
        in_list = False
        items.append({"kind": "p", "text": b})

    body = json.dumps(items, ensure_ascii=False, indent=2)
    OUT.write_text(
        "\n".join(
            [
                "// Generated from VRGO_Altalanos_Szerzodesi_Feltetelek.docx",
                "// Re-run: python scripts/extract-aszf.py && python scripts/generate-aszf-data.py",
                "export const ASZF_SOURCE = {",
                '  title: "Általános Szerződési Feltételek",',
                '  effectiveDate: "2017.04.01",',
                '  pdfHref: "/legal/VRGO_Altalanos_Szerzodesi_Feltetelek.pdf",',
                '  driveUrl: "https://drive.google.com/file/d/1tdY2rRn3Fy5kJf8jfDdRO0HGO4n3iEI7/view",',
                "} as const;",
                "",
                'export type AszfBlock = { kind: "h1" | "h2" | "p" | "li"; text: string };',
                "",
                f"export const ASZF_BLOCKS: AszfBlock[] = {body};",
                "",
            ]
        ),
        encoding="utf-8",
    )
    print(
        f"Wrote {OUT} — {len(items)} blocks "
        f"(h2={sum(1 for i in items if i['kind']=='h2')}, li={sum(1 for i in items if i['kind']=='li')})"
    )


if __name__ == "__main__":
    main()
