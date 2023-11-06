import { getset } from '@auzmartist/hybrids-helpers'
import { define, dispatch, html } from 'hybrids'
import produce from 'immer'
import { Recipe } from '../../types'
import './recipe-ingredient'
import './recipe-step'

export interface RecipeViewer extends HTMLElement {
  src: string
  recipe: Recipe
  ingredients: Record<string, { value: number; unit: string }>
  stocking: Record<string, any>
}
type H = RecipeViewer

export const RecipeViewer = define<H>({
  tag: 'recipe-viewer',
  src: {
    value: '',
    observe: (host, src) => loadRecipe(src).then((recipe) => (host.recipe = recipe)),
  },
  recipe: {
    ...getset(undefined),
    observe: (host, recipe) => {
      dispatch(host, 'load', { detail: recipe, bubbles: true, composed: true })
    },
  },
  ingredients: {
    ...getset({}),
    observe: (host, ingredients) => {
      dispatch(host, 'pantry:req:stock', {
        detail: {
          ingredients: Object.keys(ingredients),
          callback: (stocking) => (host.stocking = stocking),
        },
        bubbles: true,
        composed: true,
      })
    },
  },
  stocking: getset({}),
  render: ({ recipe, ingredients }) => {
    return html`
      <section class="header">
        <h2>${recipe?.name}</h2>
      </section>
      <section class="ingredients">
        <ul>
          ${Object.entries(ingredients).map(
            ([name, { value, unit }]) => html`<li>
              <recipe-ingredient name="${name}" value="${value}" unit="${unit}"></recipe-ingredient>
            </li>`
          )}
        </ul>
      </section>
      <section class="steps" onregister:ingredient="${onregisterIngredient}">
        <ol>
          ${recipe?.steps?.map((step) => html`<li><recipe-step>${step}</recipe-step></li>`)}
        </ol>
      </section>
    `
  },
})

function loadRecipe(src) {
  return fetch(src).then((res) => res.json())
}

function onregisterIngredient(host, e) {
  const { detail } = e
  e.stopPropagation()

  // TODO combine new ingredients with unit conversion
  host.ingredients = produce(host.ingredients, (draft) => {
    if (!draft[detail.name]) draft[detail.name] = detail
    else draft[detail.name].value += detail.value
  })

  // imperatively trigger re-render
  host.render()
}
