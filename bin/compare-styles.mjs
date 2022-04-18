// スタイルを比較する

import fetch from "node-fetch"
import fs from 'fs/promises'
import child_process from "child_process"
import util from 'util'

const exec = util.promisify(child_process.exec)

const [, , BRANCH1, BRANCH2] = process.argv
const URL_BASE = "https://raw.githubusercontent.com/geolonia/cdn.geolonia.com"
const LANGS = ['en', 'ja']

const getJSON = async (branchName, path) => {
  if(branchName === process.env.BRANCH_NAME) {
    const buf = await fs.readFile(`./public/style/${path}`)
    return JSON.parse(buf.toString('utf-8'))
  } else {
    const url = `${URL_BASE}/${branchName}/public/style/${path}`
    const resp = await fetch(url)
    return resp.json()
  }
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

  let comment = `## Style Diff\n\n`

  for (const styleId of styleIds) {
    const style1 = styleMap1[styleId]
    const style2 = styleMap2[styleId]
    comment += `### ${styleId}.json\n\n`
    if(!style1) {

    } else if(!style2) {

    } else {
      const { stdout: diff } = await exec(`diff <(echo '${style1}') <(echo '${style2}')`)
      if(diff) {
        comment += `\`\`\`diff\n${diff}\n\`\`\`\n\n`
      } else {
        comment += 'No diffs.\n\n'
      }
    }
  }
  process.stdout.write(comment)
  process.exit(0)
}

try {
  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
