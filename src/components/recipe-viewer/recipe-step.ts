import { define, html, dispatch } from 'hybrids'
import './recipe-ingredient'

export const RecipeStep = define<any>({
  tag: 'recipe-step',
  step: (host) => host.innerHTML,
  tokens: {
    get: ({ step }) => parseStepToTokens(step),
    observe: (host, tokens) => {
      tokens.forEach(({ metadata }) => {
        if (!metadata) return
        if (metadata.type === 'ingredient') {
          dispatch(host, 'register:ingredient', {
            detail: metadata,
            bubbles: true,
            composed: true,
          })
        }
      })
    },
  },
  render: (h) => html` <div>${h.tokens.map((token) => token.render(h))}</div>`,
})

/**
 * parse a recipe step into renderable semantic tokens.
 */
function parseStepToTokens(step: string) {
  // extract recipe ingredients
  const tokens = []
  /**
   * Parses a recipe ingredient in the following text format
   * [{value}{unit}:{name}]
   * https://regexr.com/7eh10
   */
  let re = /\[(([\d.]+)\s*([A-z]+)?):([\w-\s]+)\]/gi
  let matches
  while ((matches = re.exec(step))) {
    const [match, measure, strValue, strUnit, strIngredient] = matches
    const value = parseFloat(strValue)
    const unit = strUnit ?? null
    const name = strIngredient.replace(/\n\s/, '')
    tokens.push({
      range: [matches.index, matches.index + match.length],
      metadata: {
        type: 'ingredient',
        value,
        unit,
        fractional: !unit,
        name,
      },
      render: (h) => html`<recipe-ingredient
        value="${value}"
        unit="${unit}"
        name="${name}"
        fractional="${!unit}"
      ></recipe-ingredient>`,
    })
  }

  let start = 0
  const stringTokens = []
  // gather surrounding string tokens
  for (let i = 0; i < tokens.length; i++) {
    const range = tokens[i].range
    const span = step.substring(start, range[0])
    stringTokens.push({
      range: [start, range[0]],
      render: (h) => html`<span>${span}</span>`,
    })
    start = range[1]
  }

  // appended string token
  if (start < step.length) {
    stringTokens.push({
      range: [start, step.length - 1],
      render: (h) => html`<span>${step.substring(start)}</span>`,
    })
  }

  // interleave string and ingredient tokens
  return stringTokens.reduce(function (arr, v, i) {
    return tokens[i] ? arr.concat(v, tokens[i]) : arr.concat(v)
  }, [])
}
