// import { getset } from '@auzmartist/hybrids-helpers'
// import { define, html } from 'hybrids'
// import { Recipe } from '../models/domain'
// import './recipe-step'
// import './recipe-ingredient'

// /**
//  * @deprecated
//  */
// export const RecipeViewer = define<any>({
//   tag: 'recipe-viewer',
//   recipe: getset<any, Recipe>(undefined),
//   // prettier-ignore
//   render: ({ recipe }) => recipe ? html`<article class="recipe">
//     <section class="ingredients">
//       <h3>Ingredients</h3>
//       <ul>
//         ${recipe.ingredients.map((i) => html`<li>
//           <recipe-ingredient iid="${i.iid}" name="${i.name}" scalar="${i.scalar}" unit="${i.unit}">
//           </recipe-ingredient>
//         </li>`)}
//       </ul>
//     </section>
//     <section class="method">
//       <h3>Directions</h3>
//       <ol>
//         ${recipe.steps.map((step) => html`<li>
//           <recipe-step direction="${step}" ingredients="${recipe.ingredients}"></recipe-step>
//         </li>`)}
//       </ol>
//     </section>
//   </article>`: html``,
// })
