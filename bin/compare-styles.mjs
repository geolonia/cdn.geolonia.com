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

const getStyleLocation = (branchName, path) => {
  if(branchName === process.env.BRANCH_NAME) {
    return `<(cat "./public/style/${path}" | jq)`
  } else {
    return `<(curl -sL "${URL_BASE}/${branchName}/public/style/${path}" | jq)`
  }
}

const getStyleLocationMap = async (branch) => {
  const styleIds = await getJSON(branch, 'styles.json')
  const i18nizedStyleIds = styleIds.flatMap(styleId => LANGS.map(lang => `${styleId}/${lang}`))
  const styleLocations = await Promise.all(i18nizedStyleIds.map(styleId => getStyleLocation(branch, `${styleId}.json`)))
  const styleMap = i18nizedStyleIds.reduce((prev, styleId, index) => {
    prev[styleId] = styleLocations[index]
    return prev
  }, {})
  return styleMap
}

const main = async () => {
  const [styleLocationMap1, styleLocationMap2] = await Promise.all([getStyleLocationMap(BRANCH1), getStyleLocationMap(BRANCH2)])
  const styleIds = [...new Set([
    ...Object.keys(styleLocationMap1),
    ...Object.keys(styleLocationMap2),
  ])]

  let comment = `## Style Diff\n\n`

  for (const styleId of styleIds) {
    const styleLocation1 = styleLocationMap1[styleId]
    const styleLocation2 = styleLocationMap2[styleId]
    comment += `### ${styleId}.json\n\n`
    if(!styleLocation1) {
      comment += 'Created.\n\n'
    } else if(!styleLocation2) {
      comment += 'Deleted.\n\n'
    } else {
      // supress diff exit code 1
      const { stdout: diff } = await exec(`diff ${styleLocation1} ${styleLocation2} || true`, { shell: '/bin/bash' })
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
