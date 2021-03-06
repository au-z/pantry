import {define, dispatch, Hybrids, property, store} from 'hybrids'
import {Element} from './main'
import { PantryStore } from './store'

const AppStock: Hybrids<Element> = {
	store: store(PantryStore),
	ingredient: property({}),
	stock: {
		get: ({store, ingredient}) => store.stock(ingredient.iid),
		observe: (host, detail) => dispatch(host, 'lookup', {detail, bubbles: true, composed: true}),
	},
}

define('app-stock', AppStock)
export default AppStock