#!/usr/bin/env bash

set -ex

# Download UMD bundle from GitHub Release
REPO="geolonia/maps-core"
TAG="${MAPS_CORE_VERSION:-latest}"

mkdir -p ./public/maps-core

if [ "$TAG" = "latest" ]; then
  gh release download --repo "$REPO" --pattern 'maps-core-umd.tar.gz' --dir /tmp --clobber
else
  gh release download "$TAG" --repo "$REPO" --pattern 'maps-core-umd.tar.gz' --dir /tmp --clobber
fi

tar -xzf /tmp/maps-core-umd.tar.gz -C ./public/maps-core/

# CSS is distributed via npm package
npm install @geolonia/maps-core --ignore-scripts 2>/dev/null || true
cp node_modules/@geolonia/maps-core/src/assets/style.css ./public/maps-core/style.css
