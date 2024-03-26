import Qty from 'js-quantities'

export interface Recipe {
  name: string
  metadata: {
    description: string
  }
  ingredients?: Record<string, any>
  steps: string[]
  yield: { quantity: number }
}

export interface Ingredient {
  name: string
  quantity: Qty
}
export function Ingredient() {}
Ingredient.create = createIngredient

function createIngredient(name: string, quantity: Qty, _?: never): Ingredient
function createIngredient(name: string, strQty: string, _?: never): Ingredient
function createIngredient(name: string, scalar: number, unit: string): Ingredient
function createIngredient(name: string, scalar: string | number | Qty, unit: string | never = 'cu'): Ingredient {
  if (typeof scalar === 'number') {
    return {
      name,
      quantity: new Qty(scalar, unit),
    }
  } else if (typeof scalar === 'string') {
    return {
      name,
      quantity: new Qty(scalar),
    }
  } else {
    return {
      name,
      quantity: scalar,
    }
  }
}
