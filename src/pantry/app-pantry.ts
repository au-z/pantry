import { define, dispatch, html } from 'hybrids'
import { Element } from '../main.js'
import './pantry-search.js'
import './pantry-shelf.js'
import './pantry-item.js'

import styles from './app-pantry.css?inline'
import { store } from '../state/store.js'

const AppPantry: Hybrids<Element> = {
  pantry: () => store.state().pantry,
  results: {
    get: ({ pantry }, val = pantry) => val,
    set: (host, val) => val,
  },
  onsearch:
    () =>
    (host, { detail }) => {
      console.log('onsearch', detail)
      dispatch(host, 'pantryfilter', { detail, bubbles: true, composed: true })
    },
  render: ({ pantry, results, onsearch }) =>
    html`<cam-box class="app-pantry" flex="center start">
      <cam-box class="container" p="4" flex="center" dir="column">
        <header>
          <pantry-search pantry="${pantry}" onsearch="${onsearch}"></pantry-search>
        </header>
        <cam-box class="pantry">
          <pantry-shelf shelf="${pantry}"></pantry-shelf>
        </cam-box>
      </cam-box>
    </cam-box>`.style(styles),
}

define('app-pantry', AppPantry)
export default AppPantry
