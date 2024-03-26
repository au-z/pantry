import { define, html } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import { produce } from 'immer'
import { Recipe } from '../../models/domain.js'
import '../recipe-ingredient.js'
import '../recipe-step.js'
import './form-ingredient.js'
import './form-step.js'

export interface RecipeEditorElement extends HTMLElement {
  recipe: Recipe
  [key: string]: any
}

type H = RecipeEditorElement

const EMPTYRECIPE: Recipe = {
  name: '',
  metadata: {},
  ingredients: [
    { iid: 'wheat_flour', name: 'Wheat Flour', scalar: 2, unit: 'cu' },
    { iid: 'all_purpose_flour', name: 'All Purpose Flour', scalar: 1, unit: 'cu' },
  ],
  steps: [],
  yield: {
    quantity: 1,
    description: '',
  },
}

export const RecipeEditor = define<H>({
  tag: 'recipe-editor',
  recipe: getset(EMPTYRECIPE),
  render: (h: H) => html`<article>
    <section class="ingredients">
      <h3>Ingredients</h3>
      <cam-grid grid="auto auto 1fr, unset, 1rem, 0.5rem" items="start, center" inline>
        ${h.recipe.ingredients.map(
          (i, idx) => html`
            <cam-icon>radio_button_unchecked</cam-icon>
            <recipe-ingredient iid="${i.iid}" name="${i.name}" scalar="${i.scalar}" unit="${i.unit}">
            </recipe-ingredient>
            ${renderIngredientActions(h, idx)}
          `
        )}
        <cam-icon>add</cam-icon>
        <form-ingredient oncreate="${addIngredient}"></form-ingredient>
      </cam-grid>
    </section>
    <section class="steps">
      <h3>Directions</h3>
      <ol>
        ${h.recipe.steps.map(
          (step) => html`<li>
            <recipe-step direction="${step}" ingredients="${h.recipe.ingredients}"></recipe-step>
          </li>`
        )}
      </ol>
      <form-step ingredients="${h.recipe.ingredients}" oncreate="${addStep}"></form-step>
      <br />
    </section>
  </article>`.css`
    ingredients > cam-grid {
      grid-wrap: wrap;
    }
    cam-button.circle {
      --padding: 0;
      --width: 1.5rem;
      --height: 1.5rem;
      --border-radius: 1.5rem;
    }
  `,
})

function addStep(host: H, e) {
  host.recipe = produce(host.recipe, (r) => {
    r.steps.push(e.detail)
  })
}

function addIngredient(host: H, e) {
  host.recipe = produce(host.recipe, (r) => {
    r.ingredients.push(e.detail)
  })
}

function multiplyIngredient(host: H, e, i) {
  host.recipe = produce(host.recipe, (r) => {
    r.ingredients[i].scalar *= 2
  })
}

function divideIngredient(host: H, e, i) {
  host.recipe = produce(host.recipe, (r) => {
    r.ingredients[i].scalar /= 2
  })
}

function deleteIngredient(host: H, e, i) {
  host.recipe = produce(host.recipe, (r) => {
    r.ingredients.splice(i, 1)
  })
}

const renderIngredientActions = (host, idx) => html` <cam-grid
  class="ingredient-actions"
  flow="column"
  gap="0.25rem"
  inline
>
  <cam-button
    class="circle"
    type="secondary"
    items="center"
    title="x 2"
    onclick="${(host, e) => multiplyIngredient(host, e, idx)}"
    ><cam-icon>close</cam-icon></cam-button
  >
  <cam-button
    class="circle"
    type="secondary"
    items="center"
    title="% 2"
    onclick="${(host, e) => divideIngredient(host, e, idx)}"
    ><cam-icon>percent</cam-icon></cam-button
  >
  <cam-button class="circle" type="secondary" items="center" onclick="${(host, e) => deleteIngredient(host, e, idx)}"
    ><cam-icon>delete</cam-icon></cam-button
  >
</cam-grid>`
