import {define, html, Hybrids, property} from 'hybrids'
import {Element} from './main'
import Qty from 'js-quantities'

import styles from './app-qty.css'

const AppQty: Hybrids<Element> = {
	qty: property(Qty.parse('1 meter')),
	render: ({qty}) => html`
		<small class="app-qty">${qty.scalar} ${qty._units}</small>
	`.style(styles)
}

define('app-qty', AppQty)
export default AppQty