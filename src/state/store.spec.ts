import Qty from 'js-quantities'
import { describe, expect, test } from 'vitest'
import { pantry, store } from './store.js'

describe('pantry store tests', () => {
  const {state, dispatch, ref} = store
  const {createSelector, select} = pantry
  const stock = (name: string, qtyString: string) => ({name, qty: Qty(qtyString)})
  const stockQty = (name: string) => {
    const stock = ref(select.stock, name)
    return () => stock.value?.qty
  };

  describe('pantry tests', () => {
    describe('given an empty pantry', () => {
      const saltQty = stockQty('salt')

      test('when inspecting the state, the state is empty', () => {
        expect(state().pantry).toMatchObject({data: {}})
      })

      test('when adding an item, the state is non-empty', () => {
        dispatch(pantry.addStock(stock('salt', '8 cu')))
        expect(saltQty().toString()).toBe('8 cu')
        dispatch(pantry.addStock(stock('salt', '2 cu')))
        expect(saltQty().toString()).toBe('10 cu')
      })

      test('when using some salt, the state is updated', () => {
        store.dispatch(pantry.removeStock(stock('salt', '1 tsp')))
        expect(saltQty().scalar).toBeCloseTo(9.98, 2)
      })
    })
  })
})