export default function Router(template) {
	const routes = template.map((r, i) => ({
		...r,
		params: /\:\w+/g.exec(r.path)?.slice(1),
		props: r.props || {}
	}))
	let nextProps = {}

	const routeChangeInvalidate = (invalidate) => {
		window.addEventListener('pushstate', invalidate)
		window.addEventListener('popstate', invalidate)
	}

	function mapParams(route, pathParts) {
		let params = {}
		let match = route.path.split('/').every((part, i) => {
			if(part.indexOf(':') === 0 && pathParts[i] != null) {
				params[part.slice(1)] = pathParts[i]
				return true
			} else if(part === pathParts[i]) {
				return true
			}
			return false
		})
		console.log(params)
		console.log(route, pathParts)
		// if(route.params.length !== pathParts.length) return false
		// const params = route.params.reduce((acc, p, i) => {
		// 	acc[p] = pathParts[i]
		// })
		// route.params = params
		return false
	}

	function push(to: string, props?: Record<string, any>) {
		return () => {
			nextProps = props
			window.history.pushState({}, '', to)
			window.dispatchEvent(new CustomEvent('pushstate'))
		}
	}

	return {
		RouterOutlet: {
			pathParts: {
				get: () => window.location.pathname.split('/').slice(1),
				connect: (host, key, invalidate) => {
					routeChangeInvalidate(invalidate)
				},
			},
			active: {
				get: ({pathParts}) => {
					const route = routes.find((route) => mapParams(route, pathParts))
					// if(route.path !== window.location.pathname) push(route.path)()
					return route
				},
				connect: (host, key, invalidate) => {
					routeChangeInvalidate(invalidate)
				},
			},
			render: ({active, store}) => active.template,
			// render: ({active, store}) => (host, target) => {
			// 	let child
			// 	while(child = target.firstChild) target.removeChild(child)
			// 	const properties = {...active.props, ...nextProps}
			// 	console.log('rendering', properties)
			// 	target.appendChild(DOM(active.component, properties))
			// },
		},
		push,
	}
}