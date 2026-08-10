"""Dedupe lead/body and lightly break dense paragraphs in blog posts.

Safe to re-run: only trims truncated (…) descriptions to complete sentences,
strips leading body text that still duplicates the description, and splits
paragraphs longer than MAX_PARA.
"""

from __future__ import annotations

import os
import re

POSTS = os.path.join(os.path.dirname(__file__), "..", "private_data", "posts")
MAX_PARA = 420


def split_frontmatter(raw: str) -> tuple[str, str, str]:
    if not raw.startswith("---"):
        return "", "", raw
    parts = raw.split("---", 2)
    if len(parts) < 3:
        return "", "", raw
    return "---", parts[1], parts[2]


def get_description_raw(fm: str) -> str | None:
    m = re.search(r'^description:\s*"(.*)"\s*$', fm, re.M)
    return m.group(1) if m else None


def clean_description(desc: str) -> str:
    """If excerpt ends with …, keep only complete sentences (do not invent ends)."""
    d = desc.strip()
    if not (d.endswith("…") or d.endswith("...")):
        return d
    d = re.sub(r"(…|\.\.\.)$", "", d).rstrip()
    parts = re.findall(r".+?[.!?]", d)
    if parts:
        return " ".join(p.strip() for p in parts)
    # No complete sentence — leave original truncated form for manual edit
    return desc.strip()


def set_description(fm: str, desc: str) -> str:
    # Preserve curly/inner quotes; only wrap with double quotes
    safe = desc.replace("\\", "\\\\").replace('"', '\\"')
    return re.sub(
        r'^description:\s*".*"\s*$',
        f'description: "{safe}"',
        fm,
        count=1,
        flags=re.M,
    )


def normalize_plain(s: str) -> str:
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
    s = re.sub(r"[*_`]+", "", s)
    s = re.sub(r"\s+", " ", s).strip().lower()
    return s


def drop_leading_sentences_matching_desc(text: str, desc: str) -> str:
    desc_n = normalize_plain(desc)
    if len(desc_n) < 20:
        return text

    remaining = text.lstrip()

    bold = re.match(r"^\*\*(.+?)\*\*\s*", remaining, re.S)
    if bold:
        bold_n = normalize_plain(bold.group(1))
        if bold_n.startswith(desc_n[:50]) or desc_n.startswith(bold_n[:50]):
            if abs(len(bold_n) - len(desc_n)) < 40 or bold_n.startswith(desc_n):
                rest = remaining[bold.end() :].lstrip()
                if len(bold_n) > len(desc_n) + 40 and bold_n.startswith(desc_n[:40]):
                    inner = bold.group(1).strip()
                    covered = 0
                    while covered < len(desc_n) - 15:
                        m = re.match(r"^(.+?[.!?])(\s+|$)", inner)
                        if not m:
                            break
                        covered += len(normalize_plain(m.group(1)))
                        inner = inner[m.end() :].lstrip()
                    if inner:
                        return (inner + ("\n\n" + rest if rest else "")).strip()
                return rest

    covered = 0
    working = remaining
    while covered < len(desc_n) - 10:
        m = re.match(r"^(.+?[.!?])(\s+|$)", working)
        if not m:
            break
        sent_n = normalize_plain(m.group(1))
        if sent_n[:40] in desc_n or desc_n[covered : covered + 40] in sent_n:
            covered += len(sent_n)
            working = working[m.end() :].lstrip()
            continue
        break

    return working if working != remaining else text


def split_long_paragraph(p: str) -> list[str]:
    p = re.sub(r"[ \t]+", " ", p.strip())
    if len(p) <= MAX_PARA:
        return [p] if p else []

    sentences = re.split(r"(?<=[.!?])\s+", p)
    chunks: list[str] = []
    buf = ""
    for s in sentences:
        if not s:
            continue
        trial = (buf + " " + s).strip() if buf else s
        if len(trial) > MAX_PARA and buf:
            chunks.append(buf)
            buf = s
        else:
            buf = trial
    if buf:
        chunks.append(buf)
    return chunks


def format_body(body: str) -> str:
    lines = body.strip().split("\n")
    blocks: list[str] = []
    para_buf: list[str] = []

    def flush_para() -> None:
        nonlocal para_buf
        if not para_buf:
            return
        text = " ".join(x.strip() for x in para_buf if x.strip())
        para_buf = []
        for chunk in split_long_paragraph(text):
            blocks.append(chunk)

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush_para()
            continue
        if (
            stripped.startswith("#")
            or stripped.startswith("- ")
            or stripped.startswith("* ")
            or stripped.startswith(">")
            or stripped.startswith("![")
            or stripped.startswith("|")
            or stripped.startswith("```")
            or re.match(r"^\d+\.\s", stripped)
        ):
            flush_para()
            blocks.append(stripped)
        else:
            para_buf.append(stripped)
    flush_para()

    out: list[str] = []
    for i, b in enumerate(blocks):
        if i > 0:
            prev = blocks[i - 1]
            if b.startswith("- ") and prev.startswith("- "):
                out.append(b)
                continue
            out.append("")
        out.append(b)
    return "\n".join(out).strip() + "\n"


def process_file(path: str) -> bool:
    raw = open(path, encoding="utf-8").read()
    fence, fm, body = split_frontmatter(raw)
    if not fence:
        return False

    desc_raw = get_description_raw(fm)
    if desc_raw is None:
        return False

    desc_clean = clean_description(desc_raw)
    fm2 = set_description(fm, desc_clean)
    new_body = drop_leading_sentences_matching_desc(body, desc_clean)
    new_body = format_body(new_body)

    new_raw = f"---{fm2}---\n\n{new_body}"
    if new_raw != raw:
        open(path, "w", encoding="utf-8", newline="\n").write(new_raw)
        return True
    return False


def main() -> None:
    changed = []
    for name in sorted(os.listdir(POSTS)):
        if not name.endswith(".md") or name.startswith("_"):
            continue
        path = os.path.join(POSTS, name)
        if process_file(path):
            changed.append(name)
            print("updated", name)
        else:
            print("unchanged", name)
    print(f"DONE {len(changed)} files")


if __name__ == "__main__":
    main()
