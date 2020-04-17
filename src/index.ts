export interface CSSModule {
	readonly [className: string]: string
}

type BEM = (element: string, modifiers?: Modifiers) => string

export const join = (...classNames: string[]): string => {
	const classList: string[] = []
	for (const className of classNames) {
		if (classList.includes(className)) continue
		classList.push(className)
	}
	return classList.join(' ')
}

type Condition = boolean
interface Modifiers {
	readonly [modifier: string]: Condition
}

const filterModifiers = (element: string, modifiers: Modifiers): string[] =>
	Object.entries(modifiers)
		.filter(([_, condition]) => condition)
		.map(([modifier]) => `${element}--${modifier}`)

const findRealClassName = (cssModule: CSSModule, className: string): string => cssModule[className]

export const bemModule = (cssModule: CSSModule): BEM => (element: string, modifiers: Modifiers = {}): string => {
	const classList = [element, ...filterModifiers(element, modifiers)].map((className) =>
		findRealClassName(cssModule, className),
	)
	return join(...classList)
}

export const bem: BEM = (element: string, modifiers: Modifiers = {}): string => {
	return join(element, ...filterModifiers(element, modifiers))
}
