#!/usr/bin/env node

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const baseUrl = 'https://geoloniamaps.github.io/'

const spriteIds =[
  'basic',
  'gsi'
]

const extensions = [
  '.json',
  '.png',
  '@2x.json',
  '@2x.png'
]

const baseDir = path.join(__dirname, '../public/sprites')

const buildSprite = async (style) => {

  for (let i = 0; i < extensions.length; i++) {

    const extension = extensions[i];
    const file = `${style}${extension}`
    const url = `${baseUrl}${style}/${file}`

    const response = await fetch(url)
    const outputDir = path.join(baseDir, file)

    if (extension.match(/\.json$/)) {

      const data = await response.text()
      fs.writeFileSync(outputDir, JSON.stringify(JSON.parse(data), null, 0), 'utf8')

    } else if (extension.match(/\.png$/)) {

      const data = await response.buffer()
      fs.writeFileSync(outputDir, data)

    }
  }
}

spriteIds.forEach((sprite) => {
  buildSprite(sprite)
})
