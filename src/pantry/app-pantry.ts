import {define, html, Hybrids, store} from 'hybrids'
import {Element} from '../main'
import { PantryStore } from '../store'
import {PantrySearch} from './pantry-search'
import {PantryShelf} from './pantry-shelf'
import {PantryItem} from './pantry-item'

import styles from './app-pantry.css'

const AppPantry: Hybrids<Element> = {
	store: store(PantryStore),
	pantry: ({store}) => store.pantry,
	results: {
		get: ({pantry}, val = pantry) => val,
		set: (host, val) => val,
	},
	onsearch: () => ({pantry}, {detail}) => {
		console.log('onsearch', pantry, detail)
	},
	render: ({pantry, results, onsearch}) => html`<section class="app-pantry">
		<header>
			<pantry-search index="${pantry}" onsearch="${onsearch}"></pantry-search>
		</header>
		<div class="pantry">
			<pantry-shelf shelf="${results}"></pantry-shelf>
		</div>
	</section>`.define({PantryShelf, PantryItem, PantrySearch}).style(styles),
}

define('app-pantry', AppPantry)
export default AppPantry
