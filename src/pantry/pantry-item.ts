import { html, Hybrids, property } from "hybrids";
import {Element} from '../main';
import styles from './pantry-item.css'

export const PantryItem: Hybrids<Element> = {
	iid: '',
	name: '',
	qty: property({}),
	render: ({iid, name, qty}) => html`<div class="pantry-item">
		<label title="${iid}">${name.replace('_', ' ')}</label>
		&nbsp;<app-chip slot>${qty}</app-chip>
	</div>`.style(styles)
}