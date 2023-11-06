import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Ingredient } from '../../types'
import Qty from 'js-quantities'

export interface PantryState {
  shelf: Record<Ingredient['name'], { scalar: number; unit: Unit }>
}

const initialState: PantryState = {
  shelf: {
    'wheat flour': { scalar: 2, unit: 'cu' },
    'all-purpose flour': { scalar: 2, unit: 'cu' },
    salt: { scalar: 2, unit: 'tsp' },
    'active dry yeast': { scalar: 0, unit: 'tsp' },
    water: { scalar: 2, unit: 'cu' },
  },
}

export const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {
    stock: (state, action: { payload: { name: string; quantity: Qty } }) => {
      const { name, quantity } = action.payload
      if (!state.shelf[name]) {
        state.shelf[name] = { stock: quantity }
      } else {
        state.shelf[name].stock = new Qty(state.shelf[name].stock.add(quantity))
      }
    },
    use: (state, action: { payload: { name: string; quantity: Qty } }) => {
      const { name, quantity } = action.payload
      if (!state.shelf[name]) {
        throw new Error('Ingredient not available.')
      }
      state.shelf[name].stock = new Qty(state.shelf[name].stock.sub(quantity))
    },
  },
})

const state = (state: { pantry: PantryState; [key: string]: any }) => state.pantry

export const shelf = createSelector(state, (state) => state.shelf)

export const stock = createSelector([state, (name: string) => name], (state, name) => state.shelf[name]?.stock)

export const remainingStock = createSelector(
  [stock, (name: string) => name, (sub: Qty) => sub],
  (quantity, name, sub) => quantity(name).sub(sub)
)
