import {define, html, Hybrids, render} from 'hybrids'
import {Element} from './main'

/**
 * Parses tokens from recipe directions. Supports taxonomic ingredient ids and fractional modifiers.
 * Ex. ${flour.wheat:0.5} => ['${flour.wheat:0.5}', 'flour.wheat', '0.5']
 */
const tokenizer = /\$\{(?:([\w\.]+)(?:\:([\d\.]+)?)?)\}/g

const inject = (str, obj) => str.replace(/\${(.*?)}/g, (x ,g)=> obj[g]);

// function parsed(host, target) {
// 	let match
// 	let measures = {}
// 	while(match = tokenizer.exec(host.text)) {
// 		const ingredient = host.ingredients.find((i) => i.iid === match[1])
// 		const qty = ingredient.qty / (match[2] ? parseFloat(match[2]) : 1)
// 		measures[match[1]] = renderIngredient(ingredient, qty)
// 	}
// 	console.log(host.text, measures)
// 	return renderHtml(host.text, measures)
// }

function renderIngredients(host, node) {
	if(node.nodeType === node.TEXT_NODE) {
		let match
		console.log(tokenizer.exec(node))
		while(match = tokenizer.exec(node)) {
			const ingredient = host.ingredients.find((i) => i.iid === match[1])
			const [pre, suf] = node.split(match[0])
			const el: Element = document.createElement('app-ingredient')
			el.id = ingredient.id
			el.name = ingredient.name

			node.appendChild(pre)
			node.appendChild(el)
			node.appendChild(suf)
		}
	}
	node.childNodes?.forEach((node) => renderIngredients(host, node))
}

const AppRecipeDirection: Hybrids<Element> = {
	text: '',
	ingredients: [],
	render: ({text}) => html`<span>${text}</span>`,
	root: {
		get: ({render}) => render(),
		observe: renderIngredients,
	},
}

define('app-recipe-direction', AppRecipeDirection)
export default AppRecipeDirection