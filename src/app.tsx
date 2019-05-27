import { h, Component } from 'preact'
import errors from '../data/errors.json'
import lunr from 'lunr'
import { ErrorView } from './error-view'
import { debounce } from './utils'

export class App extends Component<{}, { search: string, results: lunr.Index.Result[] }> {
  readonly index: lunr.Index

  constructor () {
    super()

    this.index = lunr(function () {
      this.field('code', { boost: 5 })
      this.field('message')

      errors.forEach((err, i) => this.add({ id: i, ...err }))
    })

    this.state = {
      search: '',
      results: this.index.search('')
    }
  }

  render () {
    return <div>
      <input value={this.state.search} onInput={debounce(this.updateSearch, 250)}/>
      {this.state.results.map(r => <ErrorView error={errors[+r.ref]} />)}
    </div>
  }

  updateSearch = (e: Event) => {
    const search: string = (e.target as any).value
    const results = this.index.search(search)
    console.log(search, results)
    this.setState({ search, results })
  }
}
