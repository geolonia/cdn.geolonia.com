// スタイルを比較する

import fetch from "node-fetch"
import * as Diff from 'diff'

const [, , BRANCH1, BRANCH2] = process.argv
const URL_BASE = "https://raw.githubusercontent.com/geolonia/cdn.geolonia.com"
const LANGS = ['en', 'ja']

const getJSON = async (branchName, path) => {
  const url = `${URL_BASE}/${branchName}/public/style/${path}`
  const resp = await fetch(url)
  return resp.json()
}

const getStyleMap = async (branch) => {
  const styleIds = await getJSON(branch, 'styles.json')
  const i18nizedStyleIds = styleIds.flatMap(styleId => LANGS.map(lang => `${styleId}/${lang}`))
  const styles = await Promise.all(i18nizedStyleIds.map(styleId => getJSON(branch, `${styleId}.json`)))
  const styleMap = i18nizedStyleIds.reduce((prev, styleId, index) => {
    prev[styleId] = JSON.stringify(styles[index], null, 2)
    return prev
  }, {})
  return styleMap
}
const main = async () => {
  const styleMap1 = await getStyleMap(BRANCH1)
  const styleMap2 = await getStyleMap(BRANCH2)
  const styleIds = [...new Set([
    ...Object.keys(styleMap1),
    ...Object.keys(styleMap2),
  ])]
  const sections = []
  for (const styleId of styleIds) {
    const style1 = styleMap1[styleId]
    const style2 = styleMap2[styleId]
    const diffLines = Diff.diffLines(style1, style2, { ignoreWhitespace: true })
      .map(({ added, removed, value }) => {
        if(added || removed) {
          const operator = added ? '+' : '-'
          return value.split('\n').filter(x => x).map(line => `${operator} ${line}`).join('\n')
        } else {
          return ''
        }
      }).filter(x => x)
      const section = `### ${styleId}.json\n\n\`\`\`diff\n${diffLines.join('\n')}\n\`\`\``
      diffLines.length > 0 && sections.push(section)
  }

  process.stdout.write(`## Style Diff\n\n${sections.join('\n')}\n`)
}

main()