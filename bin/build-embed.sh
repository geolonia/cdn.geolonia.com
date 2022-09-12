#!/usr/bin/env bash

set -ex

# dev (when dev is @geolonia/embed@next)
npm remove @geolonia/embed2
npm install @geolonia/embed2@npm:@geolonia/embed@next -D
rsync -a node_modules/@geolonia/embed2/dist/ ./public/dev/
mv ./public/dev/embed.js ./public/dev/embed

npm remove @geolonia/embed
npm install @geolonia/embed -D

# v1
rsync -a node_modules/@geolonia/embed/dist/ ./public/v1/
mv ./public/v1/embed.js ./public/v1/embed

# dev (when dev is the same as production @geolonia/embed)
# rsync -a node_modules/@geolonia/embed/dist/ ./public/dev/
# mv ./public/dev/embed.js ./public/dev/embed
