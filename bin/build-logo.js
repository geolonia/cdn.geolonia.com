#!/usr/bin/env node

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const fileNames = [
  'geolonia-symbol_1.png',
  'geolonia-300x46.png',
  'geolonia-logo_a1.png',
  'geolonia-logo_b2.jpg'
]

const baseDir = 'https://geolonia.github.io/logo/'
const baseDirOutput = path.join(__dirname, '../public/logo/')

const buildLogo = async (file) => {

  const url = `${baseDir}${file}`
  const outputDir = path.join(baseDirOutput, file)

  const response = await fetch(url)
  const data = await response.buffer()

  fs.writeFileSync(outputDir, data)

}

fileNames.forEach((file) => {
  buildLogo(file)
})
