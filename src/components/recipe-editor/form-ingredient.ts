import '@auzmartist/cam-el/button'
import '@auzmartist/cam-el/grid'
import '@auzmartist/cam-el/input'
import { define, dispatch, html } from 'hybrids'
import Qty from 'js-quantities'

function pantryFormatter(qty) {
  return (scalar, units) => {
    console.log('format', qty)
    return `${scalar} ${units}`
  }
}

export interface FormIngredientElement extends HTMLElement {
  [key: string]: any
}

type H = FormIngredientElement

export const FormIngredient = define<H>({
  tag: 'form-ingredient',
  name: '',
  scalar: '',
  unit: '',
  iid: ({ name }) => name.trim().toLowerCase().replace(/\s+/g, '_'),
  disabled: ({ qty }) => !qty,
  qty: (host: H) => {
    let qty
    if (!parseFloat(host.scalar)) return qty
    try {
      qty = new Qty(parseFloat(host.scalar) ?? 0, host.unit)
    } catch (ex) {}
    return qty
  },
  fqty: ({ qty }) => qty?.format(pantryFormatter),
  // prettier-ignore
  render: (host: H) => html`
      <cam-grid flow="column" gap="0.25rem">
        <cam-input placeholder="1" size="1" onupdate="${setScalar}"></cam-input>
        <cam-input placeholder="cu" size="1" onupdate="${setUnit}"></cam-input>
        <cam-input placeholder="name" size="14" onupdate="${setName}"></cam-input>
      </cam-grid>
      <cam-button type="primary" onclick="${create}" disabled="${host.disabled}">${host.disabled ? 'Invalid' : 'Add'} ${host.qty}</cam-button>
    ${host.error && html`<span>${host.error}</span>`}
  `.css`
    :host {
      display: contents;
    }
    cam-input {
      display: inline;
      --color: white;
      --background: rgba(255, 255, 255, 0.1);
    }
  `,
})

function setName(host, e) {
  host.name = e.detail
}

function setScalar(host, e) {
  host.scalar = e.detail
}

function setUnit(host, e) {
  host.unit = e.detail
}

function create(host, e) {
  dispatch(host, 'create', {
    detail: { scalar: host.scalar, unit: host.unit, name: host.name, iid: host.iid },
    bubbles: true,
    composed: true,
  })
  host.name = ''
  host.scalar = ''
  host.unit = ''
}
