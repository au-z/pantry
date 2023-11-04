import { define, html, Hybrids, property } from 'hybrids'
import Qty from 'js-quantities/esm'
import { Element } from './main.js'

import styles from './app-qty.css?inline'

export interface hQty extends HTMLElement {
  scalar: number
  unit: string
  qty: Qty
}

export const QtyProperties: Hybrids<hQty> = {
  scalar: 1,
  unit: 'm',
  qty: ({ scalar, unit }) => new Qty(scalar, unit),
}

export const AppQty = define<any>('app-qty', {
  ...QtyProperties,
  render: ({ qty }) => html` <small class="app-qty">${qty}</small> `.style(styles),
})
