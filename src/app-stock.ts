import { define, dispatch, property, store } from 'hybrids'
import { PantryStore } from './store.js'

export const AppStock = define<any>('app-stock', {
	store: store(PantryStore),
	ingredient: property({}),
	stock: {
		get: ({store, ingredient}) => store.stock(ingredient.iid),
		observe: (host, detail) => dispatch(host, 'lookup', {detail, bubbles: true, composed: true}),
	},
})
