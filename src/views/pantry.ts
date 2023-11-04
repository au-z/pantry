import {define, html} from 'hybrids'

export interface ViewPantry extends HTMLElement {
  [key: string]: any
}
type H = ViewPantry

export const ViewPantry = define<H>({
  tag: 'view-pantry',
  render: (h: H) => html`View Pantry`,
})
