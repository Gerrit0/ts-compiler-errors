import { h, Component } from 'preact'
import errors from '../data/errors.json'
import { debounce } from './utils'
import Fuse from 'fuse.js'
import { ErrorView } from './error-view'
import { Sidebar } from './sidebar'

const statusMessage = `${errors.filter(e => e.markdown !== '').length}/${errors.length} errors documented.`

export type TSError = typeof errors[number]

export class App extends Component<{}, { search: string, results: TSError[], selected?: TSError }> {
  readonly index: Fuse<TSError, Fuse.FuseOptions<TSError>>

  constructor () {
    super()

    this.index = new Fuse(errors, { keys: ['code', 'message'] })

    this.search('101')
  }

  render () {
    return <div>
      <div className='search'>
        <input
          placeholder='TS error code or message'
          value={this.state.search}
          onInput={debounce(this.updateSearch, 250)}
        />
        <span className='pull-right'>{statusMessage}</span>
      </div>
      <div className='main'>
        <Sidebar errors={this.state.results} selected={this.state.selected} onSelect={s => this.setState({ selected: s }) }/>
        <div className='error'>
          {this.state.selected !== void 0 && <ErrorView error={this.state.selected} />}
        </div>
      </div>
    </div>
  }

  updateSearch = (e: Event) => {
    this.search((e.target as any).value)
  }

  search (search: string) {
    const results = this.index.search(search, { limit: 15 })
    this.setState({ search, results, selected: results.length > 0 ? results[0] : void 0 })
  }
}
