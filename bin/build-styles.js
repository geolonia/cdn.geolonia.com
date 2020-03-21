#!/usr/bin/env node

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const baseUrl = 'https://raw.githubusercontent.com/:style/master/style.json'
const baseDir = path.join(__dirname, '../public/style')

const styles = [
  'geolonia/basic',
  'geolonia/midnight',
  'geolonia/red-planet',
  'geolonia/notebook',
]

const langs = {
  ja: '["string", ["get", "name:ja"], ["get", "name"]]',
  en: '["string", ["get", "name:en"], ["string", ["get", "name:latin"], ["get", "name"]]]',
}

const buildStyle = async (style) => {
  const url = baseUrl.replace(':style', style)
  const response = await fetch(url)
  const data = await response.text()
  const styleDir = path.join(baseDir, style)
  mkdirp.sync(styleDir)
  for (const lang in langs) {
    const styleJson = data.replace(/"{name}"/g, langs[lang])
    const file = path.join(styleDir, `${lang}.json`)
    fs.writeFileSync(file, styleJson, 'utf8')
  }
}

styles.forEach((style) => {
  buildStyle(style)
})
