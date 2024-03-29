#!/usr/bin/env node

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const baseUrl = 'https://raw.githubusercontent.com/geoloniamaps/:style/gh-pages/style.json'
const baseDir = path.join(__dirname, '../public/style')

const styles = require(path.join(__dirname, '../styles.json'))

const langs = {
  ja: '["string", ["get", "name:ja"], ["get", "name"]]',
  en: '["string", ["get", "name:en"], ["string", ["get", "name:latin"], ["get", "name"]]]',
}

const customSpriteStyles = [
  'basic',
  'basic-v1',
  'gsi',
]

const buildStyle = async (style) => {
  // スタイルをホストしている GitHub Organization を geolonia → geoloniamaps に変更したので下の処理を追加。
  // https://github.com/geolonia/cdn.geolonia.com/pull/37
  style = style.replace('geolonia/', '')

  const url = baseUrl.replace(':style', style)
  const response = await fetch(url)
  let data = await response.text()

  // 独自のスプライトを使用しているスタイルは、スプライト URL を置き換える
  if (customSpriteStyles.includes(style)) {
    data = JSON.parse(data)
    data.sprite = `https://api.geolonia.com/v1/sprites/${style}`
    data = JSON.stringify(data)
  }

  const styleDirs = [path.join(baseDir, 'geolonia', style)];
  if (style === 'basic-v1') {
    // alias for basic-world
    styleDirs.push(path.join(baseDir, 'geolonia', 'basic-world'));
  }
  for (const styleDir of styleDirs) {
    mkdirp.sync(styleDir);
    for (const lang in langs) {
      const styleJson = data.replace(/"{name}"/g, langs[lang])
      const file = path.join(styleDir, `${lang}.json`)
      fs.writeFileSync(file, JSON.stringify(JSON.parse(styleJson), null, 0), 'utf8')
    }
  }
}

styles.forEach((style) => {
  buildStyle(style)
})
