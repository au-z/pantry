import { define, dispatch, store } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import { PantryStore } from './store.js'

export const AppStock = define<any>({
	tag: 'app-stock', 
	store: store(PantryStore),
	ingredient: getset({}),
	stock: {
		get: ({store, ingredient}) => store.stock(ingredient.iid),
		observe: (host, detail) => dispatch(host, 'lookup', {detail, bubbles: true, composed: true}),
	},
})
