import { recipes } from './recipe.js'
import { parseRecipe } from './domain.js'
import Qty from 'js-quantities/esm'
;(window as any).Qty = Qty

type Option<T> = T | null

interface Stock {
  iid: string
  qty: Qty
}

const regexWord = /\w+/g

// prettier-ignore
export const PantryStore = {
  recipes: recipes.map((r) => parseRecipe(r)),
  recipe: ({ recipes }) => (name) => recipes.find((r) => r.name === name),
  selectedRecipe: ({ recipes }) => (i) => recipes[i],
  stock: ({ pantry }) => (iid: string): Option<Stock> => {
    let node = pantry
    let stock: Option<Stock>
    let match
    while ((match = regexWord.exec(iid))) {
      node = node[match[0]]
      if (node['scalar']) stock = { iid, qty: <Qty>node }
    }
    return stock
  },
  remaining: ({ pantry, stock }) => (iid: string, qty: Qty): Qty => {
    const existing: Stock = stock(iid)
    return !existing ? qty.mul(-1) : existing.qty.gte(qty) ? existing.qty.sub(qty) : qty.sub(existing.qty).mul(-1)
  },
  pantry: () => ({
    nuts: {
      walnut: Qty('2 cu'),
    },
    flour: {
      wheat: Qty('1 cu'),
      all_purpose: Qty('2 cu'),
    },
    yeast: {
      active_dry: Qty('6 tsp'),
    },
    salt: Qty('32 floz'),
    water: Qty('1000 gal'),
  }),
}
