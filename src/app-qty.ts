import {define, html, Hybrids, property} from 'hybrids'
import Qty from 'js-quantities/esm'
import {Element} from './main'

import styles from './app-qty.css'

export interface hQty extends HTMLElement {
	scalar: number,
	unit: string,
	qty: Qty,
}

export const QtyProperties: Hybrids<hQty> = {
	scalar: 1,
	unit: 'm',
	qty: ({scalar, unit}) => new Qty(scalar, unit),
}

const AppQty: Hybrids<Element> = {
	...QtyProperties,
	render: ({qty}) => html`
		<small class="app-qty">${qty}</small>
	`.style(styles)
}

define('app-qty', AppQty)
export default AppQty