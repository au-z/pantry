import '@auzmartist/cam-el/input'
import { getset } from '@auzmartist/hybrids-helpers'
import { define, html } from 'hybrids'
export interface FormStepElement extends HTMLElement {
  [key: string]: any
}

type H = FormStepElement

export const FormStep = define<H>({
  tag: 'form-step',
  ingredients: getset([]),
  imap: ({ ingredients }) =>
    ingredients.reduce((map, ingredient) => {
      const key = ingredient.name.trim().toLowerCase().replace(/\s+/g, '_')
      map[key] = ingredient
      return map
    }, {}),
  step: 'Combine wheat flour, salt, all purpose flour',
  regex: ({ ingredients }) =>
    new RegExp(ingredients.map(({ name }) => name.trim().toLowerCase().replace(/\s/g, '\\s')).join('|'), 'gi'),

  template: ({ regex, step, ingredients }) => {
    console.log('CALC')
    let match
    let parts: any = []
    let args = []
    let idx = 0
    while ((match = regex.exec(step))) {
      const key = match[0].trim().toLowerCase().replace(/\s+/g, '_')
      const i = ingredients.find(({ iid }) => iid === key)
      parts.push(step.slice(idx, match.index))
      args.push(
        html`<recipe-ingredient
          iid="${i.iid}"
          name="${i.name}"
          scalar="${i.scalar}"
          unit="${i.unit}"
          inline
        ></recipe-ingredient>`
      )
      idx = match.index + match[0].length
    }
    parts.push(step.slice(idx, step.length))
    parts.raw = [parts]
    return html(parts, ...args)
  },
  render: (h: H) => html`<div class="step">
    <textarea value="${h.step}" oninput="${setStep}"></textarea>
    <div class="rendered">${h.template}</div>
  </div>`.css`
    .step {
      position: relative;
    }
    .step > .rendered {
      position: absolute;
      top: 0;
      color: red;
    }
    textarea {
      width: 400px;
      min-height: 80px;
      font-family: var(--font);
      font-size: 1em;
    }
  `,
})

function setStep(host, e) {
  host.step = e.target.value
}
