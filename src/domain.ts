import Qty from 'js-quantities'

interface Item {
	iid: string,
	name: string,
}

export interface IngredientSchema extends Item {
	scalar: number,
	unit: string,
	variable?: boolean,
	subs?: string[]
}

export interface RecipeSchema {
	name: string,
	description: string,
	ingredients: IngredientSchema[],
	directions: string[],
}

interface Stock extends Item {
	qty: Qty,
}

export interface Ingredient extends IngredientSchema, Stock {}

export interface Recipe extends RecipeSchema {
	ingredients: Ingredient[],
}

export function parseRecipe(schema: RecipeSchema): Recipe {
	const recipe: Recipe = {
		...schema,
		ingredients: <Ingredient[]>schema.ingredients.map((i) => ({
			...i,
			qty: new Qty(i.scalar, i.unit),
		}))
	}
	return recipe
}
