import {define, html, Hybrids, store} from 'hybrids'
import {Element} from './main'
import {PantryStore} from './store'

const AppMain: Hybrids<Element> = {
	pantry: store(PantryStore),
	render: ({pantry}) => html`<div class="flex">
		Recipes: ${pantry.recipes.length}<br>
		<app-recipe recipe="${pantry.recipes[0]}"></app-recipe>
	</div>`
}

define('app-main', AppMain)
export default AppMain