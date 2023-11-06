import Qty from 'js-quantities'

export interface Yield {
  scalar: number
  description: string
}

interface Item {
  iid: string
  name: string
}

export interface Stock extends Item {
  qty?: Qty
}

export interface IngredientSchema extends Stock {
  variable?: boolean
  substitutions?: string[]
}

export interface RecipeSchema {
  name: string
  metadata: any
  ingredients: IngredientSchema[]
  steps: string[]
  yield: Yield
}

export interface Ingredient extends IngredientSchema, Stock {}

export interface Recipe extends RecipeSchema {
  ingredients: Ingredient[]
}

export function Recipe() {}
Recipe.parse = (schema: RecipeSchema): Recipe => ({
  ...schema,
  ingredients: <Ingredient[]>schema.ingredients.map((i) => ({
    ...i,
  })),
})
