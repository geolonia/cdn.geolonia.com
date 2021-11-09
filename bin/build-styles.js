#!/usr/bin/env node

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const baseUrl = 'https://raw.githubusercontent.com/:style/master/style.json'
const baseDir = path.join(__dirname, '../public/style')

const styles = require(path.join(__dirname, '../styles.json'))

const getNameExpressionMap = {
  ja: '["string", ["get", "name:ja"], ["get", "name"]]',
  en: '["string", ["get", "name:en"], ["string", ["get", "name:latin"], ["get", "name"]]]',
}

const buildStyle = async (style) => {
  const url = baseUrl.replace(':style', style)
  const response = await fetch(url)
  const data = JSON.stringify((await response.json()))
  const styleDir = path.join(baseDir, style)
  mkdirp.sync(styleDir)
  for (const lang in getNameExpressionMap) {
    const styleJson = data
      .replace(/("{name}")/g, getNameExpressionMap[lang])
      .replace(/\["to-string",\["get","name"\]\]/g, getNameExpressionMap[lang])
    const file = path.join(styleDir, `${lang}.json`)
    fs.writeFileSync(file, JSON.stringify(JSON.parse(styleJson), null, 0), 'utf8')
  }
}

styles.forEach((style) => {
  buildStyle(style)
})
