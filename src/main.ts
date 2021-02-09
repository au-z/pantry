import AppMain from './app-main'
import AppRecipe from './app-recipe'
import AppIngredient from './app-ingredient'
import AppQty from './app-qty'

const components = {
	AppMain,
	AppRecipe,
	AppIngredient,
	AppQty,
}

export interface Element extends HTMLElement {
	[key: string]: any
}
