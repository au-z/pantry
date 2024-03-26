import { define, html } from 'hybrids'
import { pantrySlice, shelf } from './pantrySlice.js'
import { store } from '../../state/store.js'
import Qty from 'js-quantities'

export interface PantryShelf extends HTMLElement {
  shelf: Record<string, { scalar: number; unit: string }>
  [key: string]: any
}

type H = PantryShelf

export const PantryShelf = define<H>({
  tag: 'pantry-shelf',
  slice: () => pantrySlice,
  shelf: () => shelf(store.getState() as any),
  render: (h: H) =>
    html`<section class="shelf">
      ${Object.entries(h.shelf).map(
        ([name, { scalar, unit }]) => html`<div class="shelf-item">
          <label>${name}</label>
          <input value="${scalar}" type="number" oninput="${updateStock}" />
          <b>${unit}</b>
        </div>`
      )}
    </section>`.css`
      section.shelf {
        height: 100%;
        border-right: 1px solid #aaa;
        overflow-y: scroll;
      }
      .shelf-item {
        display: grid;
        grid-template-columns: 1fr auto 3rem;
        grid-gap: 0.75rem;
        align-items: center;
        just-content: space-between;
        padding: 0.25rem 0.5rem;
        border-bottom: 1px solid #aaa;
      }
      .shelf-item:last-child {
        border-bottom: none;
      }
      input {
        width: 2rem;
        background: rgba(255, 255, 255, 0.1);
        color: inherit;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 0.5rem;
      }
    `,
})

function updateStock(host: H, e: CustomEvent) {
  const { name } = e.target
}
