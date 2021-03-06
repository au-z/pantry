import {html, Hybrids} from 'hybrids'
import CamEl from '@auzmartist/cam-el'
console.log(CamEl)
import {Element} from '../main'

export const PantrySearch: Hybrids<Element> = {
	render: () => html`<form class="pantry-search">
		<cam-input type="text"></cam-input>
	</form>`,
}