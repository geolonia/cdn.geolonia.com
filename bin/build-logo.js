#!/usr/bin/env node

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const url = 'https://geolonia.github.io/logo/geolonia-symbol_1.png'
const outputDir = path.join(__dirname, '../public/logo/geolonia-symbol_1.png')

const buildLogo = async () => {

  const response = await fetch(url)
  const data = await response.buffer()
  fs.writeFileSync(outputDir, data)

}

buildLogo()
