// @ts-check

const https = require('https')
const fs = require('fs')

const url = 'https://raw.githubusercontent.com/microsoft/TypeScript/master/src/compiler/diagnosticMessages.json'

https.get(url, res => {
  res.pipe(fs.createWriteStream('./data/diagnosticMessages.json'))
}).on('error', err => {
  console.error(err)
  process.exit(1)
})
