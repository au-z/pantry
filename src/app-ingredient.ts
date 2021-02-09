import {children, define, html, Hybrids} from 'hybrids'
import {Element} from './main'
import styles from './app-ingredient.css'

function updateMeasure(host, e) {
	host.frac = e.detail.frac
}

const ModVia: Hybrids<Element> = {
	kind: '',
	color: 'ffffff',
	render: ({kind, color}) => html`<div class="mod-via ${kind}" style="background: #${color};"></div>
	
	<style>
		:host {
			line-height: 0;
		}

		.mod-via {
			width: 8px;
			height: 8px;
			border-radius: 8px;
		}
	</style>`
}

const AppIngredient: Hybrids<Element> = {
	id: '',
	name: '',
	frac: 1,
	render: ({measure, id, name, frac}) => html`<div data-id="${id}">
		${JSON.stringify(measure)}
		<div class="mods">
			${frac !== 1 && html`<mod-via kind="border" color="ff0000"></mod-via>`}
			${frac !== 1 && html`<mod-via kind="border" color="00ff00"></mod-via>`}
			${frac !== 1 && html`<mod-via kind="border" color="0000ff"></mod-via>`}
			${frac !== 1 && html`<mod-via kind="border" color="ffff00"></mod-via>`}
		</div>
		<div class="content">
			<span>${name}</span>
			<slot onmeasure="${updateMeasure}"></slot>
		</div>
	</div>`.define({ModVia}).style(styles)
}

define('app-ingredient', AppIngredient)
export default AppIngredient