const isTrue = (value) => !!value ? true: false 
const isFalse = (value) => isTrue(!value)

const assert = (bool, errorMsg) => {
  if (!!bool) return 
  throw new Error(errorMsg)
}

// ...args, errorMsg
const assertTool = (fn) => (...args) => {
  let errorMsg = Array.prototype.pop.call(args)
  assert(fn(...args), errorMsg)
}

const notTool = (fn) => (...args) => {
  return isFalse(fn(...args))
}

const isLess = (a, b) => isTrue(a < b)
const isGreater = (a, b) => isTrue(a > b)
const isEqual = (a, b) => isTrue(a === b)
const isUndefined = (a) => isTrue(a === undefined)
const isNull = (a) => isTrue(a === null)
const isNan = (a) => isTrue(isNaN(a))

// curry
const isInstaneOf = (constructor) => (value) => isTrue(value instanceof constructor) 
const isType = (type) => (value) => isTrue(typeof value === type)

const isNumber = isType('number') 
const isString = isType('string')
const isObject = isType('object')
const isSymbol = isType('symbol')
const isBoolean = isType('boolean')
const isFunction = isType('function')
const isArray = isInstaneOf(Array)
const isSet = isInstaneOf(Set)
const isMap = isInstaneOf(Map)

const validators = module.exports = {
  isTrue,
  isFalse,
  isLess, 
  isEqual, 
  isGreater,
  isNan,
  isNull,
  isUndefined, 
  isSet,
  isMap, 
  isArray,
  isNumber, 
  isString, 
  isObject,
  isSymbol,
  isBoolean,
  isFunction,
  isInstanceOf: (value, constructor) => isInstaneOf(constructor)(value),
}

// add not and assert funcs
Object.keys(validators).forEach(key => {
  let fn = validators[key] 
  let notKey = key.replace('is', 'isNot')
  let assertKey = key.replace('is', 'assert')
  let assertNotKey = key.replace('is', 'assertNot')
  module.exports[notKey] = notTool(fn)
  module.exports[assertKey] = assertTool(fn)
  module.exports[assertNotKey] = assertTool(notTool(fn))
})

