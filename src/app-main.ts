import { define, html, Hybrids, store } from 'hybrids'
import { Element } from './main.js'
import { PantryStore } from './store.js'

import styles from './app-main.css?inline'

define('recipe-viewer', {
  store: store(PantryStore),
  id: 0,
  recipe: ({ id, store }) => store.recipes[id],
  render: ({ recipe }) => recipe && html` <app-recipe recipe="${recipe}"></app-recipe> `,
} as Hybrids<Element>)

define('app-text', {
  text: '',
  render: ({ text }) => html`${text}`,
} as Hybrids<Element>)

export const AppMain = define<any>('app-main', {
  store: store(PantryStore),
  render: ({ store, activeRoute }) =>
    html`
      <header class="flex">
        ${JSON.stringify(activeRoute)}
        <nav>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    `
      .style(styles),
})
