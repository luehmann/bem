import { bem, bemModule, join } from '../index'

test('block', () => {
	expect(bem('Button')).toBe('Button')
})
test('block with modifiers', () => {
	expect(
		bem('Button', {
			active: false,
			disabled: true,
		}),
	).toBe('Button Button--disabled')
})

test('with module', () => {
	const styles = {
		'Button': 'Button1234',
		'Button--disabled': 'Button--disabled1234',
	}
	const bemFromModule = bemModule(styles)
	expect(
		bemFromModule('Button', {
			active: false,
			disabled: true,
		}),
	).toBe('Button1234 Button--disabled1234')
})

test('join', () => {
	expect(join('one', ...['two', 'three'], 'four')).toBe('one two three four')
})
