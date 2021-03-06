import AppMain from './app-main'
import AppRecipe from './app-recipe'
import AppIngredient from './app-ingredient'
import AppPantry from './pantry/app-pantry'
import AppQty from './app-qty'
import AppStock from './app-stock'

const components = {
	AppMain,
	AppRecipe,
	AppIngredient,
	AppPantry,
	AppQty,
	AppStock,
}

export interface Element extends HTMLElement {
	[key: string]: any
}
