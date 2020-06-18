#!/usr/bin/env bash

set -ex

rm -fr ./.cache
mkdir -p ./.cache

curl -L https://raw.githubusercontent.com/geolonia/prefecture-tiles/master/prefectures.geojson -o ./.cache/prefectures.geojson
curl -L https://raw.githubusercontent.com/geolonia/prefecture-tiles/master/prefectural-capital.geojson -o ./.cache/admins.geojson

tippecanoe -o ./.cache/prefectures.mbtiles -Z3 -z10 --drop-densest-as-needed --no-tile-compression ./.cache/admins.geojson ./.cache/prefectures.geojson

# tile-join -f -o ./.cache/out.mbtiles ./.cache/prefectures.mbtiles ./.cache/admins.mbtiles
mb-util --image_format=pbf ./.cache/prefectures.mbtiles ./.cache/tiles
find ./.cache/tiles -name "*.pbf" -exec bash -c 'mv "$1" "${1%.pbf}".mvt' - '{}' \;

rsync -avz ./.cache/tiles/ ./public/tiles/japanese-prefectures/
