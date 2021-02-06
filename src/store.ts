import {store} from 'hybrids'
import {produce} from 'immer'
import {recipes} from './recipe'

export const PantryStore = {
	recipes,
	selectedRecipe: ({recipes}) => (i) => recipes[i],
}

