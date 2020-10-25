#!/usr/bin/env bash

for STAGE in dev v1
do
cp \
  ./node_modules/@geolonia/fixed-map-plugin/dist/fixed-map-geolonia-plugin.min.js \
  ./public/$STAGE/fixed-map-plugin@latest
done
