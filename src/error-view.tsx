import { h } from 'preact'
import Markdown from 'preact-markdown'
import { TSError } from './app.js'

declare const hljs: any

export function makeTitle (error: TSError): string {
  return `TS${error.code}: ${error.message}`
}

const undocumented = `
This error hasn't been documented yet, please open an issue or a PR on [GitHub](https://github.com/gerrit0/ts-compiler-errors).
`

export function ErrorView ({ error }: { error: TSError }) {
  const markdown = error.markdown || undocumented

  return <div>
    <h2>{makeTitle(error)}</h2>
    <Markdown markdown={markdown} markdownOpts={{ highlight: (code: any, lang: any) => hljs.highlight(lang, code).value }} />
  </div>
}
