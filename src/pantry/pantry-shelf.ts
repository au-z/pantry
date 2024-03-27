import { define, html } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import Qty from 'js-quantities/esm'
import styles from './pantry-shelf.css?inline'

const isQty = (x) => (x as any).__proto__.constructor === Qty
const categoriesFirst = (a, b) => (isQty(a[1]) != isQty(b[1]) ? 1 : -1)

const shouldFilter = (id, { detail }) => detail.indexOf(id) < 0

export const PantryShelf = define<any>({
  tag: 'pantry-shelf',
  ns: '',
  name: '',
  shelf: getset({}),
  render: ({ ns, name, shelf }) =>
    html`<div class="pantry-shelf">
      ${ns &&
      html`<cam-box class="header" flex="start">
        <cam-icon icon="expand_more"></cam-icon>
        <label title="${ns}">${name}</label>
      </cam-box>`}
      ${Object.entries(shelf)
        .sort(categoriesFirst)
        .map(([key, value]) => {
          return isQty(value)
            ? html`<app-filterable event="pantryfilter" match="${ns ? `${ns}.${key}` : key}">
                <pantry-item iid="${ns ? `${ns}.${key}` : key}" name="${key}" qty="${value}"></pantry-item>
              </app-filterable>`
            : html`<app-filterable event="pantryfilter" match="${ns ? `${ns}.${key}` : key}">
                <pantry-shelf ns="${ns ? `${ns}.${key}` : key}" name="${key}" shelf="${value}"></pantry-shelf>
              </app-filterable>`
        })}
    </div>`.style(styles),
})
