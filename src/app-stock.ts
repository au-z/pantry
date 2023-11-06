import { define, dispatch } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import { store, pantry } from './state/store.js'

export const AppStock = define<any>({
  tag: 'app-stock',
  ingredient: getset({}),
  stock: {
    get: ({ ingredient }) => store.get(pantry.select.stock, ingredient.iid),
    observe: (host, detail) => dispatch(host, 'lookup', { detail, bubbles: true, composed: true }),
  },
})
