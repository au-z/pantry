import { define, html } from 'hybrids'

export const AppFilterable = define<any>('app-filterable', {
	event: 'filter',
	match: '',
	filtered: false,
	onFilter: {
		connect: (host, key) => {
			window.addEventListener(host.event, ({detail}) => {
				host.filtered = detail.every(({ref}) => ref.indexOf(host.match) < 0)
			})
		},
	},
	render: ({filtered}) => html`<div class="${{filterable: true, filtered}}">
		<slot></slot>
	</div>
	<style>
		div.filterable {
			transition: 0.6s all ease;
			overflow: hidden;
		}
		div.filtered {
			opacity: 0.3;
			height: auto;
		}
	</style>`
})
