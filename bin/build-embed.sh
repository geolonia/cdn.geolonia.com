#!/usr/bin/env bash

set -ex

# dev
# npm remove @geolonia/embed2
# npm install @geolonia/embed2@npm:@geolonia/embed@next -D
# rm ./public/dev/embed ./public/dev/embed-chunks || true
# cp -r node_modules/@geolonia/embed2/dist/* ./public/dev/
# mv ./public/dev/embed.js ./public/dev/embed

npm remove @geolonia/embed
npm install @geolonia/embed -D

# v1
rsync -a node_modules/@geolonia/embed/dist/ ./public/v1/
mv ./public/v1/embed.js ./public/v1/embed

# dev
rsync -a node_modules/@geolonia/embed/dist/ ./public/dev/
mv ./public/dev/embed.js ./public/dev/embed
