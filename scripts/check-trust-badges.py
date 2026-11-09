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

# Size-exact web PNGs derived from owner-supplied seals (80 / 84 / 104).
REQUIRED = [
    {
        "label": "10év 80",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-80.png",
        "size": (80, 80),
        "sha256": "24e65357ff1d4065c53a147114d5bea9408b61811a7e0d8247720599843ac517",
    },
    {
        "label": "10év 84",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-84.png",
        "size": (84, 84),
        "sha256": "f8f4455cbe7670f8d03075e39bcdc9fac3e5057a21db2ebb9e0ac6504659aec2",
    },
    {
        "label": "10év 104",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-104.png",
        "size": (104, 104),
        "sha256": "668bc50376665597587b08ebe429b2690aa45370ed371784ac72a39716dfa9d7",
    },
    {
        "label": "orszagos 80",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-80.png",
        "size": (80, 80),
        "sha256": "636ddd9c0b442b12dad4f8eccb79559d5aef88025b099739035f35edc0cee469",
        "min_grey_frac": 0.05,
    },
    {
        "label": "orszagos 84",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-84.png",
        "size": (84, 84),
        "sha256": "91b9abb2d8600ed80ea5fa960a97e84914cfdb6da1d909e3ddecc4e1090e07e0",
        "min_grey_frac": 0.05,
    },
    {
        "label": "orszagos 104",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-104.png",
        "size": (104, 104),
        "sha256": "cee9065a5ba53ed4c4114c29fa765a02458c4fa7907ab7c161ba491a3adc9b14",
        # Thinner ring after downscale to 104px; still present, just below 80/84 density.
        "min_grey_frac": 0.04,
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
        # Thin grey ring sits ~0.87–0.91 of outer radius on the current seals.
        for frac in (0.845, 0.855, 0.865, 0.875, 0.885, 0.895):
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
                "Replace only via the owner-supplied seals resized to 80/84/104."
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
