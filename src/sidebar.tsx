import { h } from 'preact'
import { makeTitle } from './error-view'
import { TSError } from './app'

export function Sidebar (props: { errors: TSError[], selected?: TSError, onSelect: (selected: TSError) => void }) {
  const items = props.errors.map(err => {
    return <li className={err === props.selected ? 'selected' : ''} onClick={() => props.onSelect(err)}>{makeTitle(err)}</li>
  })

  return <div className='sidebar'>
    <ul>
      {items}
    </ul>
  </div>
}
