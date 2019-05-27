//@ts-check

const glob = require('fast-glob')
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const messages = require('../data/diagnosticMessages.json')

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

/** @type {Record<number, { message: string, category: string }>} */
const messagesByCodes = {}
for (const [message, data] of Object.entries(messages)) {
  messagesByCodes[data.code] = { message, category: data.category }
}

async function main() {
  const files = /** @type {string[]} */ (await glob('errors/*.md'))

  /** @type {{ markdown: string, code: number, message: string, category: string }[]} */
  const errors = await Promise.all(files.map(async file => {
    const code = +path.basename(file).replace('.md', '')
    const data = messagesByCodes[code]
    if (!data) {
      throw new Error(`File ${file} does not document a compiler message`)
    }
    return {
      markdown: await read(file, 'utf-8'),
      code: code,
      ...data
    }
  }))

  console.log(`${files.length}/${Object.keys(messagesByCodes).length} compiler messages documented`)

  await write('./data/errors.json', JSON.stringify(errors), { encoding: 'utf-8' })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
