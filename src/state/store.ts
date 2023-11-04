import { Arg, PayloadAction, Store } from '@auzmartist/ducks';
import Qty from 'js-quantities/esm';
const devTools = typeof window !== 'undefined' && (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()

export interface Stock {
  name: string
  qty: Qty,
}

export type PantryState = {
  // https://github.com/gentooboontoo/js-quantities/blob/master/src/quantities/definitions.js#L4
  preferred_units: {
    length: 'meter'|'inch'|'foot'|'yard'|'mile'|'naut-mile'|'league'|'furlong'|'rod'|'mil'|'angstrom'|'fathom'|'pica'|'point'|'redshift'|'AU'|'light-second'|'light-minute'|'light-year'|'parsec'|'datamile',
    area: 'hectare' | 'acre' | 'sqft',
    volume: 'liter'|'gallon'|'gallon-imp'|'quart'|'pint'|'pint-imp'|'cup'|'fluid-ounce'|'fluid-ounce-imp'|'tablespoon'|'teaspoon'|'bushel'|'oilbarrel'|'beerbarrel'|'beerbarrel-imp',
    time: 'second'|'minute'|'hour' |'day' |'week' |'fortnight' |'year' |'decade' |'century',
    temperature: 'kelvin' | 'celsius' | 'fahrenheit' | 'rankine' | 'temp-K' | 'temp-C' | 'temp-F' | 'temp-R',
    mass: 'kilogram' | 'AMU' | 'dalton' | 'slug' | 'short-ton' | 'metric-ton' | 'carat' | 'pound' | 'ounce' | 'gram' | 'grain' | 'dram' | 'stone',
  }
  data: Record<string, Stock>
}

const state: PantryState = {
  preferred_units: {
    length: 'inch',
    area: 'sqft',
    volume: 'cup',
    time: 'hour',
    temperature: 'fahrenheit',
    mass: 'ounce',
  },
  data: {}
}

export const pantry = Store.createSlice('pantry', state, {
  addStock(state, {payload}: PayloadAction<Stock>) {
    const found = state.data[payload.name]
    if(found) {
      found.qty = found.qty.add(payload.qty)
    } else {
      // normalize to preferred unit
      payload.qty = payload.qty.to(state.preferred_units[payload.qty.kind()])
      state.data[payload.name] = payload
    }
  },
  removeStock(state, {payload}: PayloadAction<Stock>) {
    const found = state.data[payload.name]
    if(found) {
      found.qty = found.qty.sub(payload.qty)
    } else {
      state.data[payload.name] = payload
    }
  }
}, {
  selectors: ({$, select}) => {
    const stock = select($, Arg<string>(), Arg<string>(), ({data}, name, unit?) => {
      const found = data[name]
      if(unit) found.qty = found.qty.to(unit)
      return found
    })

    return {
      stock
    }
  }
})

export const store = Store.create({
  slices: [pantry],
  devTools,
  middleware: (getDefaultMiddlware) => getDefaultMiddlware({
    serializableCheck: {
      ignoreActions: true,
      ignoreState: true,
    }
  })
})
