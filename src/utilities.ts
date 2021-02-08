
function DOM(el: HTMLElement | string, properties: Object, children?: HTMLElement[]) {
	if(typeof el === 'string') el = document.createElement(el)
	Object.entries(properties).forEach(([key, value]) => {
		if(el[key] !== undefined) el[key] = value
		else((<HTMLElement>el).setAttribute(key, value))
	})
	children?.forEach((child) => (<HTMLElement>el).appendChild(child))
	return el
}

export {
	DOM,
}