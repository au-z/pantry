import { define, dispatch, html, property } from 'hybrids'
import Qty from 'js-quantities'
import lunr from 'lunr'
import styles from './pantry-search.css?inline'

const debounce = (fn, ms) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}

function initLunr(pantry) {
  function createDocsRecurse(
    pantry,
    ns = ''
  ): {
    iid: string
    name?: string
    category?: string
    qty?: string
    units?: string
  }[] {
    return Object.entries(pantry)
      .map(([name, obj]) => {
        let iid = ns ? `${ns}.${name}` : name
        if (typeof obj === 'object' && (obj as any)._units != null) {
          return { iid, name, qty: (obj as Qty).toString(), units: (obj as Qty).units() }
        } else {
          return [{ iid, category: name, isGroup: true }, ...createDocsRecurse(obj, iid)]
        }
      })
      .flat()
  }

  const docs = createDocsRecurse(pantry)
  return lunr(function () {
    this.ref('iid')
    this.field('iid', { extractor: (doc) => doc.iid.split('.') })
    this.field('name', { extractor: (doc) => doc.name?.split('_') })
    this.field('category', { extractor: (doc) => doc.category?.split('_') })
    this.field('qty')
    this.field('units')

    docs.forEach(function (doc) {
      this.add(doc)
    }, this)
  })
}

export const PantrySearch = define<any>('pantry-search', {
  pantry: {
    ...property({}),
    observe: (host, pantry) => {
      if (Object.keys(pantry).length > 0) host.lunr = initLunr(pantry)
    },
  },
  lunr: {
    get: (host, val) => val,
    set: (host, val) => val,
  },
  fuzz: '1',
  search:
    () =>
    (host, { detail }) => {
      const query = detail ? detail + (host.fuzz ? `~${host.fuzz}` : '') : detail
      const results = host.lunr.search(query)
      dispatch(host, 'search', { detail: results })
    },
  render: ({ search }) =>
    html`<cam-box p="0 2" class="pantry-search">
      <cam-input oninput="${debounce(search, 200)}"></cam-input>
    </cam-box>`.style(styles),
})
