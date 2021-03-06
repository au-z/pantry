
function DOM(el: HTMLElement | string, properties: Object, children?: (HTMLElement | string)[]) {
	if(typeof el === 'string') el = document.createElement(el)
	Object.entries(properties).forEach(([key, value]) => {
		el[key] = value
	})
	children?.forEach((child: any) => {
		if(typeof child === 'string') child = document.createTextNode(child);
		(<HTMLElement>el).appendChild(child)
	})
	return el
}

export {
	DOM,
}