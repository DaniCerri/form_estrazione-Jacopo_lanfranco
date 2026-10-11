#!/usr/bin/env bash
# Rigenera i font di src/assets/fonts: latino + punteggiatura italiana, pesi 400-700.
# Sorgenti: file "latin" di @fontsource-variable (npx o npm pack in una cartella temporanea).
#   scripts/ritaglia_font.sh <outfit-latin-wght-normal.woff2> <playfair-latin-wght-normal.woff2> <playfair-latin-wght-italic.woff2>
set -euo pipefail
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
FT="uvx --from fonttools[woff] fonttools"
UNICODES="U+0020-007E,U+00A0-00FF,U+0152-0153,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+20AC,U+2122"

$FT varLib.instancer "$1" wght=400:700 -o "$TMP/outfit.ttf" -q
$FT varLib.instancer "$2" wght=400:700 -o "$TMP/playfair.ttf" -q
$FT varLib.instancer "$3" wght=400:400 -o "$TMP/playfair-italic.ttf" -q

subset() {
  $FT subset "$1" --unicodes="$UNICODES" --flavor=woff2 --layout-features='kern,liga,calt' \
    --no-hinting --desubroutinize --output-file="$2"
}
subset "$TMP/outfit.ttf" src/assets/fonts/outfit-latin-wght.woff2
subset "$TMP/playfair.ttf" src/assets/fonts/playfair-latin-wght.woff2
subset "$TMP/playfair-italic.ttf" src/assets/fonts/playfair-latin-italic-400.woff2
rm -r "$TMP"
ls -l src/assets/fonts
