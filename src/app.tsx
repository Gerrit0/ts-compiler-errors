import { h } from 'preact'
import { ErrorView } from './error-view'
import errors from '../data/errors.json'

export function App () {
  return <div>
    {errors.map(err => <ErrorView error={err} />)}
  </div>
}
