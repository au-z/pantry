import { html, property } from 'hybrids'

export default function Router(template) {
	const routes = template.map((r, i) => ({
		...r,
		parts: r.path.split('/').slice(1),
		params: /\:\w+/g.exec(r.path)?.slice(1),
		props: r.props || {}
	}))
	let nextProps = {}

	const routeChangeInvalidate = (invalidate) => {
		window.addEventListener('pushstate', invalidate)
		window.addEventListener('popstate', invalidate)
	}

	const matchingRoute = (route, pathParts) => route.parts
		.every((part, i) => part === pathParts[i] || part.indexOf(':') === 0)

	const mapParams = (route, pathParts) => route.parts.reduce((map, part, i) => {
		if(part.indexOf(':') !== 0) return map
		else return {...map, [part.substr(1)]: pathParts[i]}
	}, {})

	function push(to: string, props: Record<string, any> = {}) {
		return () => {
			nextProps = props
			window.history.pushState({}, '', to)
			window.dispatchEvent(new CustomEvent('pushstate'))
		}
	}

	const RouterOutlet = {
		pathParts: {
			get: () => window.location.pathname.split('/').slice(1),
			connect: (host, key, invalidate) => { routeChangeInvalidate(invalidate) },
		},
		active: {
			get: ({pathParts}) => {
				const route = routes.find((route) => matchingRoute(route, pathParts)) || routes.find((r) => !!r.default)
				if(!matchingRoute(route, pathParts)) push(route.path)()
				route.params = mapParams(route, pathParts)
				return route
			},
			connect: (host, key, invalidate) => { routeChangeInvalidate(invalidate) },
		},
		render: ({active}) => active?.template ? active.template({...active.params, ...nextProps}) :
			html`<h1>404</h1>
			${JSON.stringify(active)}
			<style>
				:host {
					padding: 4rem;
					display: flex;
					justify-content: center;
					font-family: var(--font, 'Rubik', sans-serif);
				}
			</style>`,
	}

	const RouterLink = {
		to: '',
		props: property({}),
		render: ({to, props}) => html`
			<a class="router-link" onclick="${push(to, props)}">
				<slot></slot>
			</a>
		`,
	}

	return {
		RouterOutlet,
		RouterLink,
		push,
	}
}