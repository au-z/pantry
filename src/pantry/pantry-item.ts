import { define, html, property } from 'hybrids'
import styles from './pantry-item.css?inline'

export const PantryItem = define<any>('pantry-item', {
  iid: '',
  name: '',
  qty: property({}),
  render: ({ iid, name, qty }) =>
    html`<div class="pantry-item">
      <label title="${iid}">${name.replace('_', ' ')}</label>
      &nbsp;<app-chip slot>${qty}</app-chip>
    </div>`.style(styles),
})
