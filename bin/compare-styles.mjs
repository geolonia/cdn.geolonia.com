import fetch from "node-fetch"
import fs from 'fs/promises'
import child_process from "child_process"
import util from 'util'
const exec = util.promisify(child_process.exec)

const [, , BRANCH1, BRANCH2] = process.argv
const URL_BASE = "https://raw.githubusercontent.com/geolonia/cdn.geolonia.com"
const LANGS = ['en', 'ja']
const LABELS = {
  updated: ':white_check_mark: updated',
  deleted: ':x: deleted',
  created: ':new: created',
}

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

const getStyleCatCommand = (branchName, path) => {
  if(branchName === process.env.BRANCH_NAME) {
    return `cat "./public/style/${path}"`
  } else {
    return `curl -sL "${URL_BASE}/${branchName}/public/style/${path}"`
  }
}

const getStyleCatCommandMap = async (branch) => {
  const styleIds = await getJSON(branch, 'styles.json')
  const i18nizedStyleIds = styleIds.flatMap(styleId => LANGS.map(lang => `${styleId}/${lang}`))
  const styleCatCommands = await Promise.all(i18nizedStyleIds.map(styleId => getStyleCatCommand(branch, `${styleId}.json`)))
  const styleMap = i18nizedStyleIds.reduce((prev, styleId, index) => {
    prev[styleId] = styleCatCommands[index]
    return prev
  }, {})
  return styleMap
}

const main = async () => {
  const [styleCatCommandMap1, styleCatCommandMap2] = await Promise.all([getStyleCatCommandMap(BRANCH1), getStyleCatCommandMap(BRANCH2)])
  const styleIds = [...new Set([
    ...Object.keys(styleCatCommandMap1),
    ...Object.keys(styleCatCommandMap2),
  ])]

  let comment = ''

  for (const styleId of styleIds) {
    const styleCatCommand1 = styleCatCommandMap1[styleId]
    const styleCatCommand2 = styleCatCommandMap2[styleId]

    const { stdout: style1 } = await exec(`${styleCatCommand1} || true`)
    const { stdout: style2 } = await exec(`${styleCatCommand2} || true`)

    // diff returns exit code 1 and this should be supressed
    const { stdout: diff } = await exec(`diff <(${styleCatCommand1} | jq) <(${styleCatCommand2} | jq) || true`, { shell: '/bin/bash' })

    const status = (style1 && style2 && diff) ? 'updated' : (
      (style1 && !style2 && diff) ? 'deleted' : (
        (!style1 && style2 && diff) ? 'created' : false
      )
    )

    if(status) {
      if(status === 'updated') {
        comment += `- <details><summary><em>${LABELS[status]}</em> <strong>${styleId}.json</strong></summary>\n\n`
        comment += `    \`\`\`diff\n${diff.split('\n').map(l => `    ${l}`).join('\n')}\n    \`\`\`\n</details>\n\n`
      } else {
        comment += `- <em>${LABELS[status]}</em> <strong>${styleId}.json</strong>\n\n`
      }
    }
  }

  if(comment) {
    comment = `### Style update summary\n\n` + comment
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
