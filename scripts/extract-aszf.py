"""Extract VRGO ÁSZF DOCX into readable UTF-8 paragraphs (Drive Feltetelek version)."""
from __future__ import annotations

import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

SRC = Path(
    r"D:\Adatmentés\ToTS_2016-2019\honlap\VRgo\SZERZODES\VRGO_Altalanos_Szerzodesi_Feltetelek.docx"
)
OUT = Path(__file__).resolve().parents[1] / "src" / "content" / "aszf.txt"

HEADINGS = [
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
]


def docx_paras(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    paras: list[str] = []
    for p in root.iter(W + "p"):
        parts: list[str] = []
        for t in p.iter(W + "t"):
            if t.text:
                parts.append(t.text)
            if t.tail:
                parts.append(t.tail)
        if parts:
            paras.append("".join(parts).replace("\xa0", " ").strip())
    return paras


def normalize(raw: str) -> str:
    text = raw

    for heading in HEADINGS:
        # Ensure heading sits on its own lines when glued to neighbors
        text = text.replace(heading, f"\n\n{heading}\n\n")

    glued = [
        ("feltételeket.Az ÁSZF-et", "feltételeket.\n\nAz ÁSZF-et"),
        ("szerint.Szolgáltató", "szerint.\n\nSzolgáltató"),
        ("formátumban.A honlapot", "formátumban.\n\nA honlapot"),
        ("ADP-TOP Kft.1096", "ADP-TOP Kft.\n1096"),
        ("33.Számlaszám:", "33.\nSzámlaszám:"),
        ("19591098A Szolgáltató", "19591098\nA Szolgáltató"),
        ("elérhetőségeTelefon:", "elérhetősége\nTelefon:"),
        ("2510Mobil:", "2510\nMobil:"),
        ("706Fax:", "706\nFax:"),
        ("5331Általános", "5331\nÁltalános"),
        ("info@vrgo.huÜzlethelyiség", "info@vrgo.hu\nÜzlethelyiség címe:"),
        ("33.Székhelye:", "33.\nSzékhelye:"),
        ("29.Számlaszám:", "29.\nSzámlaszám:"),
        ("19591098Adószám:", "19591098\nAdószám:"),
        ("13777164-2-43Cégjegyzékszám:", "13777164-2-43\nCégjegyzékszám:"),
        ("MKEH Eng. sz.:C/003", "MKEH Eng. sz.: C/003"),
        ("fizetni.Megrendelő", "fizetni.\n\nMegrendelő"),
        ("fogadja el.Kelt:", "fogadja el.\n\nKelt:"),
        ("napjánADP-TOP", "napján\nADP-TOP"),
        ("előnézetet2.9.2.", "előnézetet.\n\n2.9.2."),
        ("Mobil: (+36-30-941-4 706", "Mobil: +36-30-941-4706"),
        ("7.1.Szolgáltató", "7.1. Szolgáltató"),
        ("7.2.Fizetési", "7.2. Fizetési"),
        ("7.3.A Megrendelő", "7.3. A Megrendelő"),
        ("7.4.Amennyiben", "7.4. Amennyiben"),
        ("7.5.A Megrendelő", "7.5. A Megrendelő"),
    ]
    for a, b in glued:
        text = text.replace(a, b)

    text = re.sub(r"Üzlethelyiség címe:\s*címe:", "Üzlethelyiség címe:", text)

    # Split when a NEW clause starts after a word-ending sentence period:
    # "...ügyfelet.2.1.2. Tekintettel" — period must NOT be part of 2.1.1.
    text = re.sub(
        r"(?<=[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ\)\"»])\.(?=(\d+\.){1,2}\d+\.?\s+[A-ZÁÉÍÓÖŐÚÜŰ])",
        ".\n\n",
        text,
    )
    # "...túrához). 2.2.3. Az" (period + space before clause)
    text = re.sub(
        r"(?<=[^\d\n])\.\s+(?=(\d+\.){1,2}\d+\.?\s+[A-ZÁÉÍÓÖŐÚÜŰ])",
        ".\n\n",
        text,
    )
    # Glued without period: "...előnézetet2.9.2. Amennyiben"
    text = re.sub(
        r"(?<=[a-záéíóöőúüű\)])(?=(\d+\.){1,2}\d+\.?\s+[A-ZÁÉÍÓÖŐÚÜŰ])",
        "\n\n",
        text,
    )
    # a.) b.) list starters after colon/semicolon/period (not digit.)
    text = re.sub(r"(?<=[^\d][\.\:\;])(?=[a-z]\.\))", "\n", text)

    return text


def main() -> None:
    paras = docx_paras(SRC)
    text = normalize("\n\n".join(paras))
    lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
    # collapse accidental duplicate blank-separated headings
    cleaned: list[str] = []
    for line in lines:
        if cleaned and cleaned[-1] == line and line in HEADINGS:
            continue
        cleaned.append(line)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n\n".join(cleaned), encoding="utf-8")
    print(f"Wrote {OUT} ({len(cleaned)} blocks, {OUT.stat().st_size} bytes)")
    for i, line in enumerate(cleaned[:40], 1):
        print(f"{i:03d}|{line[:140]}")
    print("...")
    for i, line in enumerate(cleaned[-6:], len(cleaned) - 5):
        print(f"{i:03d}|{line[:140]}")


if __name__ == "__main__":
    main()
