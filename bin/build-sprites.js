#!/usr/bin/env node

const fetch = require('node-fetch');
const path = require('node:path');
const fs = require('node:fs');

const baseUrl = 'https://geoloniamaps.github.io/';

const spriteIds = [
  'basic',
  'basic-v1',
  'gsi',
];

const extensions = [
  '.json',
  '.png',
  '@2x.json',
  '@2x.png',
];

const baseDir = path.join(__dirname, '../public/sprites');

const buildSprite = async (style, tgtStyleName = undefined) => {
  if (tgtStyleName === undefined) {
    tgtStyleName = style;
  }

  for (const extension of extensions) {
    const file = `${style}${extension}`;
    const outputFile = `${tgtStyleName}${extension}`;
    const url = `${baseUrl}${style}/${file}`;

    const response = await fetch(url);
    const outputPath = path.join(baseDir, outputFile);

    const data = await response.buffer();
    fs.writeFileSync(outputPath, data);
  }
};

spriteIds.forEach((sprite) => {
  buildSprite(sprite);

  // build alias
  if (sprite === 'basic-v1') {
    buildSprite(sprite, 'basic-world');
  }
});
