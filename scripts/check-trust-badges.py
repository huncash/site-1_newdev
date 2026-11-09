#!/usr/bin/env python3
"""Poka-yoke: trust badges must keep the grey inner ring (plecsni2uj), never the old ringless seal."""

from __future__ import annotations

import hashlib
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Canonical grey-ring source (plecsni2uj). Do not replace with ringless plecsni2.
REQUIRED_ORSZAGOS_SOURCE_SHA256 = (
    "e2001349b2c74c5f93482aefa537e1458a488186824c434346c4427c946d1ee7"
)

# Known-bad ringless országos seal (old plecsni2). Never ship this content.
FORBIDDEN_SHA256 = {
    "8388afe17cb2e25ea382117b73fbbb74fab515edfc55b34812a3c0439c113cd5",
}

CHECKS = [
    {
        "label": "orszagos source",
        "path": ROOT / "assets" / "badges" / "orszagos-kiszallas.source.png",
        "min_grey_frac": 0.15,
        "required_sha256": REQUIRED_ORSZAGOS_SOURCE_SHA256,
    },
    {
        "label": "orszagos public v2",
        "path": ROOT / "public" / "badges" / "orszagos-kiszallas-v2.png",
        "min_grey_frac": 0.08,
    },
    {
        "label": "10ev public v2",
        "path": ROOT / "public" / "badges" / "10-ev-terepi-tapasztalat-v2.png",
        "min_grey_frac": 0.08,
    },
]


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

    for item in CHECKS:
        path: Path = item["path"]
        if not path.exists():
            errors.append(f"missing {item['label']}: {path.relative_to(ROOT)}")
            continue
        digest = sha256(path)
        if digest in FORBIDDEN_SHA256:
            errors.append(
                f"{item['label']}: forbidden ringless plecsni2 hash ({digest[:16]}…)"
            )
            continue
        required = item.get("required_sha256")
        if required and digest != required:
            errors.append(
                f"{item['label']}: source hash mismatch "
                f"(got {digest[:16]}…, want {required[:16]}…). "
                "Use plecsni2uj (grey inner ring), not old plecsni2."
            )
            continue
        frac = grey_ring_frac(path)
        min_frac = float(item["min_grey_frac"])
        if frac < min_frac:
            errors.append(
                f"{item['label']}: grey inner ring too weak "
                f"(score={frac:.3f}, need ≥ {min_frac}). "
                "Likely the old ringless plecsni2 — replace from "
                "assets/badges/orszagos-kiszallas.source.png"
            )
        else:
            print(f"OK {item['label']}: grey_ring={frac:.3f} sha={digest[:12]}…")

    # Legacy unversioned paths must not reintroduce the bad seal.
    for legacy in (
        ROOT / "public" / "badges" / "orszagos-kiszallas.png",
        ROOT / "public" / "badges" / "orszagos-kiszallas-v1.png",
    ):
        if legacy.exists() and sha256(legacy) in FORBIDDEN_SHA256:
            errors.append(f"legacy file is forbidden ringless seal: {legacy.name}")

    if errors:
        print("check-trust-badges: FAILED", file=sys.stderr)
        for err in errors:
            print(f"- {err}", file=sys.stderr)
        return 1

    print("check-trust-badges: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
