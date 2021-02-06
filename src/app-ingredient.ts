import {define, html, Hybrids} from 'hybrids'
import {Element} from './main'

const AppIngredient: Hybrids<Element> = {
	id: '',
	name: '',
	render: ({id, name}) => html`<div data-id="${id}">
		<span><b>${name}</b></span>
		<slot></slot>
	</div>`
}

define('app-ingredient', AppIngredient)
export default AppIngredient