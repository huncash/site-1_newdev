#!/usr/bin/env python3
"""Poka-yoke: size-exact trust badges with grey ring; never ship old ringless plecsni2."""

from __future__ import annotations

import hashlib
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Known-bad ringless országos seal (old large plecsni2). Never ship this content.
FORBIDDEN_SHA256 = {
    "8388afe17cb2e25ea382117b73fbbb74fab515edfc55b34812a3c0439c113cd5",
}

# Byte-identical copies of the owner-supplied web PNGs (no re-encode).
REQUIRED = [
    {
        "label": "10év 80",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-80.png",
        "size": (80, 80),
        "sha256": "03708ed499a7a92d0072aa5bb234759c1773a63e60879ead489f486079f906be",
    },
    {
        "label": "10év 84",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-84.png",
        "size": (84, 84),
        "sha256": "ea5c0675dfc70f622f940679d896dcde6d7caac71af7773460ecf594e3d78b1a",
    },
    {
        "label": "10év 104",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-104.png",
        "size": (104, 104),
        "sha256": "dab303c5ba62593629231dd3f3d53a201d826fd3d4de6f9598bc6e4241504692",
    },
    {
        "label": "orszagos 80",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-80.png",
        "size": (80, 80),
        "sha256": "08a6247af4d1b2f1f8b62c3825784c967664f9d5e1d9de6827dcc1696075ae9a",
        "min_grey_frac": 0.05,
    },
    {
        "label": "orszagos 84",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-84.png",
        "size": (84, 84),
        "sha256": "de53b9052c4b57851c8b04154f1d583652739c2d48d1f9d29f1fa0e466b4ff3b",
        "min_grey_frac": 0.05,
    },
    {
        "label": "orszagos 104",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-104.png",
        "size": (104, 104),
        "sha256": "94c2705614442cd351d9d7561f5f81b68d4f53dbd3507fd1134b1abdcc5c1e62",
        "min_grey_frac": 0.05,
    },
]

FORBIDDEN_NAMES = (
    "orszagos-kiszallas.png",
    "orszagos-kiszallas-v1.png",
    "orszagos-kiszallas-v2.png",
    "orszagos-kiszallas.source.png",
    "10-ev-terepi-tapasztalat.png",
    "10-ev-terepi-tapasztalat-v2.png",
    "10-ev-terepi-tapasztalat.source.png",
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def grey_ring_frac(path: Path) -> float:
    try:
        from PIL import Image
    except ImportError as exc:  # pragma: no cover
        raise SystemExit("Pillow required: pip install Pillow") from exc

    im = Image.open(path).convert("RGBA")
    w, h = im.size
    cx, cy = w / 2.0, h / 2.0
    radii: list[int] = []
    for ang in range(0, 360, 3):
        for r in range(int(min(cx, cy)) - 1, 0, -1):
            x = int(round(cx + r * math.cos(math.radians(ang))))
            y = int(round(cy + r * math.sin(math.radians(ang))))
            if 0 <= x < w and 0 <= y < h and im.getpixel((x, y))[3] > 200:
                radii.append(r)
                break
    if not radii:
        return 0.0
    outer = sorted(radii)[len(radii) // 2]
    grey = n = 0
    for ang in range(0, 360, 1):
        for frac in (0.845, 0.855, 0.865, 0.875):
            r = outer * frac
            x = int(round(cx + r * math.cos(math.radians(ang))))
            y = int(round(cy + r * math.sin(math.radians(ang))))
            if not (0 <= x < w and 0 <= y < h):
                continue
            rr, g, b, a = im.getpixel((x, y))
            if a < 200:
                continue
            n += 1
            if abs(rr - g) < 20 and abs(g - b) < 20 and 55 <= rr <= 145:
                grey += 1
    return grey / max(n, 1)


def main() -> int:
    errors: list[str] = []

    try:
        from PIL import Image
    except ImportError as exc:  # pragma: no cover
        raise SystemExit("Pillow required: pip install Pillow") from exc

    for item in REQUIRED:
        path: Path = item["path"]
        if not path.exists():
            errors.append(f"missing {item['label']}: {path.relative_to(ROOT)}")
            continue
        digest = sha256(path)
        if digest in FORBIDDEN_SHA256:
            errors.append(f"{item['label']}: forbidden ringless plecsni2 hash")
            continue
        if digest != item["sha256"]:
            errors.append(
                f"{item['label']}: file changed (got {digest[:16]}…). "
                "Replace only with the owner-supplied size-exact PNG; do not re-encode."
            )
            continue
        with Image.open(path) as im:
            if im.size != item["size"]:
                errors.append(f"{item['label']}: size {im.size}, want {item['size']}")
                continue
        min_grey = item.get("min_grey_frac")
        if min_grey is not None:
            frac = grey_ring_frac(path)
            if frac < float(min_grey):
                errors.append(
                    f"{item['label']}: grey inner ring too weak (score={frac:.3f})"
                )
            else:
                print(f"OK {item['label']}: {item['size'][0]}px grey_ring={frac:.3f}")
        else:
            print(f"OK {item['label']}: {item['size'][0]}px")

    for name in FORBIDDEN_NAMES:
        legacy = ROOT / "public" / "badges" / name
        if legacy.exists():
            errors.append(f"legacy badge must be deleted: public/badges/{name}")
        legacy_src = ROOT / "assets" / "badges" / name
        if legacy_src.exists():
            errors.append(f"legacy badge must be deleted: assets/badges/{name}")

    if errors:
        print("check-trust-badges: FAILED", file=sys.stderr)
        for err in errors:
            print(f"- {err}", file=sys.stderr)
        return 1

    print("check-trust-badges: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
