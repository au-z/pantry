import './app-main'
import './app-recipe'
import './app-ingredient'
import './pantry/app-pantry'
import './app-qty'
import './app-stock'
import './app-filterable'
import './app-chip'
import * as CamElements from '@auzmartist/cam-el'

const components = {
  ...CamElements,
}

export interface Element extends HTMLElement {
  [key: string]: any
}
