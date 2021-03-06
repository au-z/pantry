import { Hybrids, property, html } from "hybrids"
import {Element} from '../main'
import styles from './pantry-shelf.css'
import Qty from 'js-quantities/esm'

const isQty = (x) => (x as any).__proto__.constructor === Qty
const categoriesFirst = (a, b) => isQty(a[1]) != isQty(b[1]) ? 1 : -1

export const PantryShelf: Hybrids<Element> = {
	ns: '',
	name: '',
	shelf: property({}),
	render: ({ns, name, shelf}) => html`<div class="pantry-shelf">
		<label title="${ns}">${name}</label>
		${Object.entries(shelf)
			.sort()
			.sort(categoriesFirst)
			.map(([key, value]) => {
			return isQty(value) ?
				html`<pantry-item iid="${ns ? `${ns}.${key}` : key}" name="${key}" qty="${value}"></pantry-item>` :
				html`<pantry-shelf ns="${ns ? `${ns}.${key}` : key}" name="${key}" shelf="${value}"></pantry-shelf>`
		})}
	</div>`.style(styles)
}