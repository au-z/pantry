import {store} from 'hybrids'
import {produce} from 'immer'
import {recipes} from './recipe'
import {parseRecipe} from './domain'
import QTY from 'js-quantities'

type Option<T> = T | null

export interface Qty {
	scalar: number,
	baseScalar: number,
	isBase: boolean,
	initValue: string,
	[key: string]: any,
}

export function Qty(qty: number | string, unit?: string): Qty {
	return (typeof qty === 'string') ? QTY.parse(qty) : new QTY(qty, unit)
}

interface Stock extends Qty {iid: string}

const regexWord = /\w+/g

export const PantryStore = {
	recipes: recipes.map((r) => parseRecipe(r)),
	selectedRecipe: ({recipes}) => (i) => recipes[i],
	stock: ({pantry}) => (iid: string): Option<Stock> => {
		let node = pantry
		let stock
		let match
		while(match = regexWord.exec(iid)) {
			node = node[match[0]]
			if(node?.scalar) stock = {...node, iid}
		}
		return stock
	},
	inStock: ({pantry}) => (iid: string, qty: Qty): boolean => {
		const existing = pantry.stock(iid)
		return false
		// return existing?.convert(measure.unit) > Qty(measure.qty, measure.unit)
	},
	pantry: {
		flour: {
			wheat: Qty('2 cups'),
			all_purpose: Qty('2 cups'),
		},
		yeast: {
			active_dry: Qty('3 oz'),
		},
		salt: Qty('32 oz'),
		water: Qty('1000000000000 cups'),
	},
}

