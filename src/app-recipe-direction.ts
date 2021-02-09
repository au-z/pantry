import {define, html, Hybrids} from 'hybrids'
import {Element} from './main'
import {DOM} from './utilities'
import AppIngredient from './app-ingredient'
import AppQty from './app-qty'

/**
 * Parses tokens from recipe directions. Supports taxonomic ingredient ids and fractional modifiers.
 * Ex. ${flour.wheat:0.5} => ['${flour.wheat:0.5}', 'flour.wheat', '0.5']
 */
const tokenizer = /\$\{(?:([\w\.]+)(?:\:([\d\.]+)?)?)\}/g

function parseIngredients(host, node) {
	let next = node
	if(node.nodeType === node.TEXT_NODE) {
		let replacements = []
		let match
		let text = node.textContent
		while(match = tokenizer.exec(node.textContent)) {
			const [prefix, suffix] = text.split(match[0]).map((text) => document.createTextNode(text))
			
			let data = host.ingredients.find((i) => i.iid === match[1])
			if(match[2]) {
				data = {...data, frac: parseFloat(match[2])}
			}
			const ingredient: Element = DOM('app-ingredient', {...data}, [
				DOM('app-qty', {...data})
			])

			replacements.pop()
			replacements.push(prefix, ingredient, suffix)

			text = suffix.textContent
		}

		replacements.length && node.replaceWith(...replacements)
	}
	next.childNodes?.forEach((node) => parseIngredients(host, node))
}

const AppRecipeDirection: Hybrids<Element> = {
	text: '',
	ingredients: [],
	render: ({text}) => html`<span>${text}</span>`.define({AppIngredient, AppQty}),
	root: {
		get: ({render}) => render(),
		observe: parseIngredients,
	},
}

define('app-recipe-direction', AppRecipeDirection)
export default AppRecipeDirection