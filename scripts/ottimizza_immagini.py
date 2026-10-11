"""Genera le immagini di public/immagini dagli originali in immagini/.

Ritaglia la parte davvero visibile nel layout mobile (max 448px CSS), applica
bianco e nero, contrasto e luminosità (prima erano filtri CSS) e salva in AVIF
monocromatico.

    uv run --with pillow --with numpy python scripts/ottimizza_immagini.py
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "immagini"
OUT = ROOT / "public" / "immagini"
QUALITA = 40


def bianco_nero(im: Image.Image, brightness: float, contrast: float) -> Image.Image:
    """Stesso ordine dei filtri Tailwind: brightness -> contrast -> grayscale."""
    a = np.asarray(im.convert("RGB"), dtype=np.float32) / 255
    a = np.clip((a * brightness - 0.5) * contrast + 0.5, 0, 1)
    g = a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722
    return Image.fromarray((np.clip(g, 0, 1) * 255 + 0.5).astype(np.uint8), "L")


# Hero 980x593, object-cover object-right su 448x416: si vede al massimo il 65% a destra
hero = Image.open(SRC / "Hero_Jacopo.avif")
hero = bianco_nero(hero.crop((340, 0, 980, 593)), 0.90, 1.15)
hero.save(OUT / "Hero_Jacopo.avif", quality=QUALITA, speed=0)

# Foto premio 1056x1448, object-cover object-top su 448x288: serve solo la parte alta
jacopo = Image.open(SRC / "Jacopo.avif")
jacopo = bianco_nero(jacopo.crop((0, 0, 1056, 900)), 0.95, 1.10)
jacopo.resize((896, 764), Image.LANCZOS).save(OUT / "Jacopo.avif", quality=QUALITA, speed=0)

for f in ("Hero_Jacopo.avif", "Jacopo.avif"):
    print(f, (OUT / f).stat().st_size, "byte")
