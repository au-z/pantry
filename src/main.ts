import AppMain from './app-main'
import AppRecipe from './app-recipe'
import AppIngredient from './app-ingredient'
import AppQty from './app-qty'
import AppStock from './app-stock'

const components = {
	AppMain,
	AppRecipe,
	AppIngredient,
	AppQty,
	AppStock,
}

export interface Element extends HTMLElement {
	[key: string]: any
}
