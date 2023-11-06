import Qty from 'js-quantities'

export interface Yield {
  quantity: number
  description: string
}

interface Item {
  iid: string
  name: string
}

export interface Ingredient extends Item {
  scalar: number
  unit: string
  qty?: Qty
  substitutions?: Ingredient[]
}

export interface Step {
  description: string
}

export interface Recipe {
  id?: string
  name: string
  metadata: any
  ingredients: Ingredient[]
  steps: Step[]
  yield: Yield
}
