#!/usr/bin/env bash

rm -rf ./public/plugins/geolonia/fixed-map-plugin/latest
mkdir -p ./public/plugins/geolonia/fixed-map-plugin/latest

cp \
  ./node_modules/@geolonia/fixed-map-plugin/dist/* \
  ./public/plugins/geolonia/fixed-map-plugin/latest/
