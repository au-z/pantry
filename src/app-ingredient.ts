import { define, dispatch, html } from 'hybrids'
import styles from './app-ingredient.css'
import { QtyProperties } from './app-qty.js'
import { pantry } from './state/store.js'

export const AppIngredient = define<any>({
  tag: 'app-ingredient',
  iid: '',
  name: '',
  frac: 1,
  inline: false,
  ...QtyProperties,
  remaining: {
    get: ({ iid, store, qty }) => {
      const stock = store.get(pantry.select.stock, iid)
      return stock?.qty?.sub(qty)
    },
    observe: (host, detail) =>
      detail.scalar < 0 && dispatch(host, 'out-of-stock', { detail, bubbles: true, composed: true }),
  },
  inStock: ({ remaining }) => remaining?.scalar > 0,
  render: ({ iid, name, inline, qty, remaining }) =>
    html` <div class="${{ inline, 'app-ingredient': true }}" data-id="${iid}">
      <span>${name}</span>
      <div class="info">
        <app-chip slot><small>${qty}</small></app-chip>
        ${!inline && remaining?.scalar === 0 && html`<app-chip warn></app-chip>`}
        ${!inline && remaining?.scalar < 0 && html`<app-chip error></app-chip>`}
      </div>
    </div>`.style(styles),
})
