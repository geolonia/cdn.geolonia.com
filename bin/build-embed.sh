#!/usr/bin/env bash

set -ex

# dev
npm remove @geolonia/embed2
npm install @geolonia/embed2@npm:@geolonia/embed@next -D
rm ./public/dev/embed ./public/dev/embed-chunks || true
cp -r node_modules/@geolonia/embed2/dist/* ./public/dev/
mv ./public/dev/embed.js ./public/dev/embed

# v1
npm remove @geolonia/embed
npm install @geolonia/embed -D
rm ./public/v1/embed ./public/v1/embed-chunks || true
cp -r node_modules/@geolonia/embed/dist/* ./public/v1/
mv ./public/v1/embed.js ./public/v1/embed
