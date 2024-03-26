import { define, html, Component } from 'hybrids'
import Qty from 'js-quantities/esm'

import styles from './app-qty.css?inline'

export interface hQty extends HTMLElement {
  scalar: number
  unit: string
  qty: Qty
}

export const QtyProperties: Component<hQty> = {
  tag: '',
  scalar: 1,
  unit: 'm',
  qty: ({ scalar, unit }) => new Qty(scalar, unit),
}

export const AppQty = define<any>({
  ...QtyProperties,
  tag: 'app-qty',
  render: ({ qty }) => html` <small class="app-qty">${qty}</small> `.style(styles),
})
