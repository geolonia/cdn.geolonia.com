#!/bin/bash -e

echo "Extracting $1 to $2"

OUTPUT_DIR=./public/tiles/"$2"/

if [[ -d "$OUTPUT_DIR" ]]; then
  rm -rf "$OUTPUT_DIR"
fi

MBTILES_MD5=$(md5sum "$1" | awk '{print $1}')

jq --arg vhash "$MBTILES_MD5" '. + {version: ("2.0.0+" + $vhash), tiles: (.tiles | map((. | split("?"))[0] + "?v=2.0.0%2B" + $vhash))}' ./public/tiles/"$2".json > ./public/tiles/"$2".json.tmp
mv ./public/tiles/"$2".json.tmp ./public/tiles/"$2".json

mb-util --image_format=pbf "$1" "$OUTPUT_DIR"
find "$OUTPUT_DIR" -name '*.pbf' -print0 | rename -0 -s '.pbf' '.mvt.gz'
find "$OUTPUT_DIR" -name '*.mvt.gz' -exec gunzip '{}' +
