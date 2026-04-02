#!/usr/bin/env bash

set -ex

npm remove @geolonia/maps-core 2>/dev/null || true
npm install @geolonia/maps-core -D

mkdir -p ./public/maps-core

rsync -av --exclude '*.d.ts' --exclude '*.d.cts' node_modules/@geolonia/maps-core/dist/ ./public/maps-core/
cp node_modules/@geolonia/maps-core/src/assets/style.css ./public/maps-core/style.css
