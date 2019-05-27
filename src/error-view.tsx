import { h } from 'preact'
import Markdown from 'preact-markdown'

export function ErrorView ({ error }: { error: typeof import('../data/errors.json')[number] }) {
  return <div>
    <h2>TS{error.code}: {error.message}</h2>
    <Markdown markdown={error.markdown} />
  </div>
}
