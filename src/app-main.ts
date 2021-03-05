import {define, html, Hybrids, store} from 'hybrids'
import {Element} from './main'
import {PantryStore} from './store'

import styles from './app-main.css'
import Router from './router'

define('recipe-viewer', {
	store: store(PantryStore),
	id: 0,
	recipe: ({id, store}) => store.recipes[id],
	render: ({recipe}) => recipe && html`
		<app-recipe recipe="${recipe}"></app-recipe>
	`,
} as Hybrids<Element>)

define('app-text', {
	text: '',
	render: ({text}) => html`${text}`,
} as Hybrids<Element>)

const {RouterOutlet, push} = Router([
	{path: '/pantry', template: () => html`
		<app-text text="pantry"></app-text>
	`},
	{path: '/recipe/:id', template: ({id}) => html`
		<recipe-viewer></recipe-viewer>
	`},
])

const AppMain: Hybrids<Element> = {
	store: store(PantryStore),
	render: ({store, activeRoute}) => html`
		<header class="flex">
			${JSON.stringify(activeRoute)}
			<nav>
				<a onclick="${push('/pantry', {text: 'clicked'})}">
					<h3>Pantry</h3>
				</a>
				<a onclick="${push('/recipe', {id: 0})}">
					<h3>Recipe</h3>
				</a>
			</nav>
		</header>

		<main>
			<router-outlet></router-outlet>
		</main>
	`.define({RouterOutlet}).style(styles)
}

define('app-main', AppMain)
export default AppMain
