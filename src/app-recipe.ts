import { define, html, store } from 'hybrids'
import Qty from 'js-quantities/esm'
import './app-recipe-direction.js'
import styles from './app-recipe.css?inline'

export const AppRecipe = define<any>({
  tag: 'app-recipe',
  recipe: {},
  store: () => {
    stock: () => {
      throw new Error('stock not implemented')
    }
  },
  stock: ({ store, recipe }) => recipe.ingredients.map(({ iid }) => store.stock(iid)),
  remaining: ({ store, recipe }) =>
    recipe.ingredients.map(({ iid, scalar, unit }) => ({
      iid,
      qty: store.remaining(iid, new Qty(scalar, unit)),
    })),
  list: ({ remaining }) =>
    remaining.filter(({ qty }) => qty.scalar < 0).map(({ iid, qty }) => ({ iid, qty: qty.mul(-1) })),
  render: ({ recipe, stock, store, list }) =>
    html`<article class="recipe">
      <section class="header">
        <h1>${recipe.name}</h1>
        <p>${recipe.description}</p>
      </section>

      <section class="ingredients">
        <h3>Ingredients</h3>
        ${list.length > 0 &&
        html`
          <blockquote class="banner warn">
            You are missing ingredients. Add to shopping list? <button>Add Items</button>
          </blockquote>
        `}
        <ul>
          ${recipe.ingredients.map(
            (i) => html`<li>
              <app-ingredient iid="${i.iid}" name="${i.name}" scalar="${i.scalar}" unit="${i.unit}"
                >&nbsp;&nbsp;
              </app-ingredient>
            </li>`
          )}
        </ul>
      </section>

      <section class="method">
        <h2>Directions</h2>
        <ol>
          ${recipe.directions.map(
            (text) => html`<li>
              <app-recipe-direction text="${text}" ingredients="${recipe.ingredients}"></app-recipe-direction>
            </li>`
          )}
        </ol>
      </section>
    </article>`.style(styles),
})
