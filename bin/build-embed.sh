#!/usr/bin/env bash

set -ex

# dev
npm remove @geolonia/embed2
npm install @geolonia/embed2@npm:@geolonia/embed@next -D
cp node_modules/@geolonia/embed2/dist/* ./public/dev/
cp ./public/dev/embed.js ./public/dev/embed

# v1
npm remove @geolonia/embed
npm install @geolonia/embed -D
cp node_modules/@geolonia/embed/dist/* ./public/v1/
cp ./public/v1/embed.js ./public/v1/embed
