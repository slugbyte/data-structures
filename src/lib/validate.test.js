const valid = require('./validate.js')

test('boolean validators', () => {
  expect(valid.isTrue(3)).toBe(true)
  expect(valid.isTrue(0)).toBe(false)

  expect(valid.isFalse('')).toBe(true)
  expect(valid.isFalse('hello')).toBe(false)

  expect(valid.isEqual(3, 3)).toBe(true)
  expect(valid.isEqual('hello', 'cool')).toBe(false)

  expect(valid.isLess(2, 3)).toBe(true)
  expect(valid.isLess(4, 2)).toBe(false)

  expect(valid.isGreater(4, 3)).toBe(true)
  expect(valid.isGreater(2, 3)).toBe(false)

  expect(valid.isUndefined(undefined)).toBe(true)
  expect(valid.isUndefined(null)).toBe(false)

  expect(valid.isNan(NaN)).toBe(true)
  expect(valid.isNan(0)).toBe(false)

  expect(valid.isNull(null)).toBe(true)
  expect(valid.isNull(0)).toBe(false)

  expect(valid.isSet(new Set())).toBe(true)
  expect(valid.isSet('hello')).toBe(false)

  expect(valid.isMap(new Map())).toBe(true)
  expect(valid.isMap('hello')).toBe(false)

  expect(valid.isArray([])).toBe(true)
  expect(valid.isArray('hello')).toBe(false)

  expect(valid.isNumber(3)).toBe(true)
  expect(valid.isNumber('hello')).toBe(false)

  expect(valid.isString('hello')).toBe(true)
  expect(valid.isString(Symbol())).toBe(false)

  expect(valid.isObject([])).toBe(true)
  expect(valid.isObject('hello')).toBe(false)

  expect(valid.isSymbol(Symbol())).toBe(true)
  expect(valid.isSymbol('hello')).toBe(false)

  expect(valid.isBoolean(false)).toBe(true)
  expect(valid.isBoolean('hello')).toBe(false)

  expect(valid.isFunction(Symbol)).toBe(true)
  expect(valid.isFunction('hello')).toBe(false)

  expect(valid.isInstanceOf(new Set(), Set)).toBe(true)
  expect(valid.isInstanceOf(new Array(), Map)).toBe(false)
})

test('not funcs', () => {
  expect(valid.isNotNumber('hello')).toBe(true)
  expect(valid.isNotNumber(3)).toBe(false)

  expect(valid.isNotGreater(2, 3)).toBe(true)
  expect(valid.isNotGreater(3, 2)).toBe(false)

  expect(valid.isNotInstanceOf(new Set(), Array)).toBe(true)
  expect(valid.isNotInstanceOf(new Set(), Set)).toBe(false)
})

test('assert funcs', () => {
  expect(() => {
    valid.assertNumber(3, 'cool beans')
  }).not.toThrow('cool beans')

  expect(() => {
    valid.assertNumber('hello', 'cool beans')
  }).toThrow(new Error('cool beans'))

  expect(() => {
    valid.assertLess(3, 5, 'cool beans')
  }).not.toThrow('cool beans')

  expect(() => {
    valid.assertLess(5, 5, 'cool beans')
  }).toThrow(new Error('cool beans'))

  expect(() => {
    valid.assertInstanceOf([], Array, 'cool beans')
  }).not.toThrow(new Error('cool beans'))

  expect(() => {
    valid.assertInstanceOf(new Map(), Set, 'cool beans')
  }).toThrow(new Error('cool beans'))

  expect(() => {
    valid.assertNotNumber('hello', 'cool beans')
  }).not.toThrow('cool beans')

  expect(() => {
    valid.assertNotNumber(3, 'cool beans')
  }).toThrow(new Error('cool beans'))
})
