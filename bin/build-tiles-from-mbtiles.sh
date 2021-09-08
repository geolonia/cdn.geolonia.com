#!/bin/bash -e

echo "Extracting $1 to $2"

OUTPUT_DIR=./public/tiles/"$2"/

if [[ -d "$OUTPUT_DIR" ]]; then
  rm -rf "$OUTPUT_DIR"
fi

mb-util --image_format=pbf "$1" "$OUTPUT_DIR"
find "$OUTPUT_DIR" -name '*.pbf' -print0 | rename -0 -s '.pbf' '.mvt.gz'
find "$OUTPUT_DIR" -name '*.mvt.gz' -exec gunzip '{}' +
