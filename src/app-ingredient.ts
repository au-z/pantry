import { define, dispatch, html, store } from 'hybrids'
import styles from './app-ingredient.css'
import { QtyProperties } from './app-qty.js'
import { PantryStore } from './store.js'

export const AppIngredient = define<any>('app-ingredient', {
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
	render: ({iid, name, inline, qty, remaining}) => html`
		<div class="${{inline, 'app-ingredient': true}}" data-id="${iid}">
			<span>${name}</span>
			<div class="info">
				<app-chip slot><small>${qty}</small></app-chip>
				${!inline && remaining?.scalar === 0 && html`<app-chip warn></app-chip>`}
				${!inline && remaining?.scalar < 0 && html`<app-chip error></app-chip>`}
			</div>
		</div>`.style(styles)
})
