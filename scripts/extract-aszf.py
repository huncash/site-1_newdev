"""Extract VRGO ÁSZF DOCX into readable UTF-8 paragraphs."""
from __future__ import annotations

import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

# Drive source: VRGO_Altalanos_Szerzodesi_Feltetelek.pdf
SRC = Path(
    r"D:\Adatmentés\ToTS_2016-2019\honlap\VRgo\SZERZODES\VRGO_Altalanos_Szerzodesi_Feltetelek.docx"
)
OUT = Path(__file__).resolve().parents[1] / "src" / "content" / "aszf.txt"


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
    replacements = [
        (r"Bevezető(?=\S)", "Bevezető\n\n"),
        (r"(?<!\n)(A SZOLGÁLTATÓ NEVE, CÍME, ELÉRHETŐSÉGEI:)", r"\n\n\1\n\n"),
        (r"(?<!\n)(A szolgáltatás tárgya, a szerződés tartalma)", r"\n\n\1\n\n"),
        (r"(?<!\n)(Alapszolgáltatás \(valamennyi csomag tartalmazza\):)", r"\n\n\1\n\n"),
        (r"(?<!\n)\s*(A Szolgáltató jogai és kötelezettségei)", r"\n\n\1\n\n"),
        (r"(?<!\n)(A Megrendelő jogai és kötelezettségei)", r"\n\n\1\n\n"),
        (r"(?<!\n)(4\. Szerződés módosítása)", r"\n\n\1\n\n"),
        (r"(?<!\n)(5\. Az ÁSZF hatálya)", r"\n\n\1\n\n"),
        (r"(?<!\n)(6\. Egyéb rendelkezések)", r"\n\n\1\n\n"),
        (r"(?<!\n)(7\. Számlázás és fizetési feltételek)", r"\n\n\1\n\n"),
        (r"(?<!\n)(8\. Felelősség)", r"\n\n\1\n\n"),
        (r"(?<!\n)(Az ADP-TOP Kft\.-vel szerződő)", r"\n\n\1"),
        (r"(?<!\n)(Kelt: Budapest)", r"\n\n\1"),
    ]
    for pat, repl in replacements:
        text = re.sub(pat, repl, text)

    # Split after sentence end before clause numbers (2.1.1. / 4.6.1 / 5.10.)
    text = re.sub(r"(?<=[\.\!\?\:\;])\s+(?=(\d+\.){1,3}\d*\.?\s)", "\n\n", text)

    glued = [
        ("ADP-TOP Kft.1096", "ADP-TOP Kft.\n1096"),
        ("33.Számlaszám:", "33.\nSzámlaszám:"),
        ("19591098A Szolgáltató", "19591098\nA Szolgáltató"),
        ("elérhetőségeTelefon:", "elérhetősége\nTelefon:"),
        ("2510Mobil:", "2510\nMobil:"),
        ("2329Hotline:", "2329\nHotline:"),
        ("706Fax:", "706\nFax:"),
        ("5331Általános", "5331\nÁltalános"),
        ("info@vrgo.huÜzlethelyiség", "info@vrgo.hu\nÜzlethelyiség címe:"),
        ("33.Székhelye:", "33.\nSzékhelye:"),
        ("29.Számlaszám:", "29.\nSzámlaszám:"),
        ("19591098Adószám:", "19591098\nAdószám:"),
        ("13777164-2-43Cégjegyzékszám:", "13777164-2-43\nCégjegyzékszám:"),
        ("fizetni.Megrendelő", "fizetni.\n\nMegrendelő"),
        ("szerint.Szolgáltató", "szerint.\n\nSzolgáltató"),
        ("formátumban.A honlapot", "formátumban.\n\nA honlapot"),
        ("formájában.Az online", "formájában.\n\nAz online"),
        ("formájában.A Szolgáltató", "formájában.\n\nA Szolgáltató"),
        ("következőképpen:", "következőképpen:\n\n"),
        ("fogadja el.Kelt:", "fogadja el.\n\nKelt:"),
        ("napjánADP-TOP", "napján\nADP-TOP"),
        ("tartalmakat.Az ÁSZF", "tartalmakat.\n\nAz ÁSZF"),
        ("szerint.A Szolgáltató", "szerint.\n\nA Szolgáltató"),
        ("elfogadják el.", "elfogadják el.\n"),
        ("igazolás lappal együtt", "igazolás lappal együtt"),
    ]
    for a, b in glued:
        text = text.replace(a, b)

    text = re.sub(r"Üzlethelyiség címe:\s*címe:", "Üzlethelyiség címe:", text)
    return text


def main() -> None:
    paras = docx_paras(SRC)
    text = normalize("\n\n".join(paras))
    lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT} ({len(lines)} blocks, {OUT.stat().st_size} bytes)")
    for i, line in enumerate(lines[:35], 1):
        print(f"{i:03d}|{line[:140]}")


if __name__ == "__main__":
    main()
