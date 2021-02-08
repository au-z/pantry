import QTY from 'js-quantities'
import {Qty} from './store'

const pantry = {
	flour: {
		wheat: Qty('2 cups'),
		all_purpose: Qty('2 cups'),
	},
	yeast: {
		active_dry: Qty('3 oz'),
	},
	salt: Qty('32 oz'),
	water: Qty('1000000000000 cups'),
}

export {
	pantry,
}