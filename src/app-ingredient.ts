import {children, define, dispatch, html, Hybrids, property, store} from 'hybrids'
import {Element} from './main'
import styles from './app-ingredient.css'
import { PantryStore } from './store'
import { QtyProperties } from './app-qty'

function updateMeasure(host, e) {
	host.frac = e.detail.frac
}

const AppIcon: Hybrids<Element> = {
	error: false,
	warn: false,
	slot: false,
	rgb: (host) =>
		host.slot ? '150, 150, 239' :
		host.error ? '239, 71, 111' :
		host.warn ? '255, 209, 102' :
		'white',
	render: (host) => html`
		${!host.slot && html`
			${host.warn && html`<span>&#9888;</span>`}
			${host.error && html`<span>&#9888;</span>`}
		`}
		<slot></slot>
	<style>
		:host {
			padding: 1px 6px;
			border: 1px solid rgba(${host.rgb}, 0.4);
			background: rgba(${host.rgb}, 0.1);
		}
		span {
			color: rgba(${host.rgb}, 1);
		}
	</style>`
}

const AppIngredient: Hybrids<Element> = {
	iid: '',
	name: '',
	frac: 1,
	inline: false,
	...QtyProperties,
	store: store(PantryStore),
	remaining: {
		get: ({iid, store, qty}) => store.remaining(iid, qty),
		observe: (host, detail) => detail.scalar < 0 &&
			dispatch(host, 'out-of-stock', {detail, bubbles: true, composed: true}),
	},
	inStock: ({remaining}) => remaining?.scalar > 0,
	render: ({measure, iid, name, frac, inline, qty, remaining}) => html`
		<div class="${{inline, 'app-ingredient': true}}" data-id="${iid}">
			<span>${name}</span>
			<div class="info">
				<app-icon slot><small>${qty}</small></app-icon>
				${!inline && remaining?.scalar === 0 && html`<app-icon warn></app-icon>`}
				${!inline && remaining?.scalar < 0 && html`<app-icon error></app-icon>`}
			</div>
		</div>
	`.define({AppIcon}).style(styles)
}

define('app-ingredient', AppIngredient)
export default AppIngredient