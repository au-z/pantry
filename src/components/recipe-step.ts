// import { getset, ref } from '@auzmartist/hybrids-helpers'
// import { define, html } from 'hybrids'
// import { DOM } from '../utilities'

// /**
//  * Parses tokens from recipe directions. Supports taxonomic ingredient ids and fractional modifiers.
//  * Ex. ${flour.wheat:0.5} => ['${flour.wheat:0.5}', 'flour.wheat', '0.5']
//  */
// const tokenizer = /\$\{(?:([\w\.]+)(?:\:([\d\.]+)?)?)\}/g

// function parseIngredients(host, node) {
//   let next = node
//   if (node.nodeType === node.TEXT_NODE) {
//     let replacements = []
//     let match
//     let text = node.textContent
//     while ((match = tokenizer.exec(node.textContent))) {
//       const [prefix, suffix] = text.split(match[0]).map((text) => document.createTextNode(text))

//       let data = host.ingredients.find((i) => i.iid === match[1])
//       if (match[2]) {
//         data = { ...data, frac: parseFloat(match[2]) }
//       }
//       const { iid, name, scalar, unit } = data
//       const ingredient: Element = DOM('recipe-ingredient', { iid, name, scalar, unit, inline: true })

//       replacements.pop()
//       replacements.push(prefix, ingredient, suffix)

//       text = suffix.textContent
//     }

//     replacements.length && node.replaceWith(...replacements)
//   }
//   next.childNodes?.forEach((node) => parseIngredients(host, node))
// }

// export const RecipeStep = define<any>({
//   tag: 'recipe-step',
//   direction: '',
//   ingredients: getset([]),
//   root: {
//     ...ref('span'),
//     observe: parseIngredients,
//   },
//   render: (host) => html`<span>${host.direction}</span>`.css`
//     span {

//     }

//     cam-button {
//       --padding: 0;
//     }
//   `,
// })
