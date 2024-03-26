import { define, html } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import styles from './pantry-item.css?inline'

export const PantryItem = define<any>({
  tag: 'pantry-item',
  iid: '',
  name: '',
  qty: getset({}),
  render: ({ iid, name, qty }) =>
    html`<div class="pantry-item">
      <label title="${iid}">${name.replace('_', ' ')}</label>
      &nbsp;<app-chip slot>${qty}</app-chip>
    </div>`.style(styles),
})
