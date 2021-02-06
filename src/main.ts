import AppMain from './app-main'
import AppRecipe from './app-recipe'
import AppIngredient from './app-ingredient'
import AppMeasure from './app-measure'

const components = {
	AppMain,
	AppRecipe,
	AppIngredient,
	AppMeasure,
}

export interface Element extends HTMLElement {
	[key: string]: any
}
