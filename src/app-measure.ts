import {define, html, Hybrids} from 'hybrids'
import {Element} from './main'
import Qty from 'js-quantities'

(<any>window).qty = Qty

const AppMeasure: Hybrids<Element> = {
	qty: 1,
	unit: '',
	measure: ({qty, unit}) => new Qty(qty, unit),
	render: ({measure}) => html`<span>${measure.toString()}</span>`
}

define('app-measure', AppMeasure)
export default AppMeasure