import {define, html, Hybrids} from 'hybrids'
import styles from './app-recipe.css'
import AppRecipeDirection from './app-recipe-direction'
import {Element} from './main'

const AppRecipe: Hybrids<Element> = {
	recipe: {},
	render: ({recipe}) => html`<article class="recipe">
		<h1>${recipe.name}</h1>
		<p>${recipe.description}</p>
		<hr>
		<h2>Ingredients</h2>
		<ul>
			${recipe.ingredients.map((i) => html`<li>
				<app-ingredient id="${i.iid}"
					name="${i.name}">
					<app-measure qty="${i.qty}" unit="${i.unit}"
						multiplier="1"
						variable="${i.variable}">
					</app-measure>
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