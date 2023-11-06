import { define, html } from 'hybrids'
import './pantry-shelf'
import { store, pantry } from '../../state/store.js'

export interface PantryCtxElement extends HTMLElement {
  [key: string]: any
}
type H = PantryCtxElement

export const PantryCtx = define<H>({
  tag: 'pantry-ctx',
  render: (h: H) => html`
    <pantry-shelf></pantry-shelf>
    <slot onpantry:req:stock="${onreqstock}"></slot>
  `.css`
    :host {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: 100vh;
      grid-gap: 1rem;
    }
  `,
})

function onreqstock(host: H, e: CustomEvent) {
  const { ingredients, callback } = e.detail
  const stocking = ingredients.reduce((stocking, name) => {
    stocking[name] = stock(store.getState() as any)
    console.log(stocking)
    return stocking
  }, {})
  callback(stocking)
}
