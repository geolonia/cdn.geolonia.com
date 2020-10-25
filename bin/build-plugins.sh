#!/usr/bin/env bash

for STAGE in dev v1
do

  VERSION=$(cat < ./node_modules/@geolonia/fixed-map-plugin/package.json | jq -r .version)
  for VERSION in latest $VERSION
  do
    cp \
      ./node_modules/@geolonia/fixed-map-plugin/dist/fixed-map-geolonia-plugin.min.js \
      "./public/$STAGE/fixed-map-plugin@$VERSION"
  done

done
