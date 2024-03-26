import { define, html } from 'hybrids'

import styles from './app-main.css?inline'

define<any>({
  tag: 'recipe-viewer',
  store: () => ({}),
  id: 0,
  recipe: ({ id, store }) => store.recipes[id],
  render: ({ recipe }) => recipe && html` <app-recipe recipe="${recipe}"></app-recipe> `,
})

define<any>({
  tag: 'app-text',
  text: '',
  render: ({ text }) => html`${text}`,
})

export const AppMain = define<any>({
  tag: 'app-main',
  store: () => ({}),
  render: ({ store, activeRoute }) =>
    html`
      <header class="flex">
        ${JSON.stringify(activeRoute)}
        <nav></nav>
      </header>

      <main></main>
    `.style(styles),
})
