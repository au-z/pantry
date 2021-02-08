import {define, html, Hybrids, store} from 'hybrids'
import styles from './app-recipe.css'
import AppRecipeDirection from './app-recipe-direction'
import {Element} from './main'
import { PantryStore } from './store';

const AppRecipe: Hybrids<Element> = {
	recipe: {},
	pantry: store(PantryStore),
	stock: ({pantry, recipe}) => recipe.ingredients.map(({iid}) => pantry.stock(iid)),
	render: ({recipe, stock}) => html`<article class="recipe">
		${JSON.stringify(stock)}
		<h1>${recipe.name}</h1>
		<p>${recipe.description}</p>
		<hr>
		<h2>Ingredients</h2>
		<ul>
			${recipe.ingredients.map((i) => html`<li>
				<app-ingredient id="${i.iid}"
					name="${i.name}">
					<app-qty qty="${i.qty}"></app-qty>
				</app-ingredient>
			</li>`)}
		</ul>
		<hr>
		<h2>Directions</h2>
		<ol>
			${recipe.directions.map((text) => html`<li>
				<app-recipe-direction text="${text}"
					ingredients="${recipe.ingredients}"></app-recipe-direction>
			</li>`)}
		</ol>
	</article>`.style(styles).define({AppRecipeDirection}),
};

define('app-recipe', AppRecipe)
export default AppRecipe