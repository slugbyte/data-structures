const stackCreator = require('./index.js')

describe('stack', () => {
  it('stackCreator should be a function', () => {
    expect(typeof stackCreator).toBe('function')
  })

  it('stackCreator should return a stack object with the methods push, pop, peek, and isEmpty', () => {
    const stack = stackCreator()

    expect(typeof stack.push).toBe('function')
    expect(typeof stack.pop).toBe('function')
    expect(typeof stack.peek).toBe('function')
    expect(typeof stack.isEmpty).toBe('function')

    // make sure there are no extra properties on a stack object
    expect(Object.keys(stack).length).toBe(4)
  })

  it('stack.isEmpty should return true if the stack is empty otherwise false', () => {
    const stack = stackCreator()

    expect(stack.isEmpty()).toBe(true)
    stack.push('having fun yet?')
    expect(stack.isEmpty()).toBe(false)
  })

  it('stack.peek and stack.pop should return null on an empty stack', () => {
    const stack = stackCreator()

    expect(stack.peek()).toBe(null)
    expect(stack.pop()).toBe(null)
  })

  it('stack.push first push a value and then return number of items in the stack', () => {
    const stack = stackCreator()

    let result = stack.push('one')
    expect(result).toBe(1)
    expect(stack.peek()).toBe('one')

    result = stack.push('two')
    expect(result).toBe(2)
    expect(stack.peek()).toBe('two')

    result = stack.push('three')
    expect(result).toBe(3)
    expect(stack.peek()).toBe('three')

    result = stack.push('four')
    expect(result).toBe(4)
    expect(stack.peek()).toBe('four')
  })

  it('stack.peek should return the top value on the stack without removing it', () => {
    const stack = stackCreator()

    let valueCount= stack.push('a') 
    let topValue = stack.peek()
    expect(valueCount).toBe(1)
    expect(topValue).toEqual('a')
     

    valueCount = stack.push('b') 
    topValue = stack.peek()
    expect(valueCount).toBe(2)
    expect(topValue).toEqual('b')

    valueCount = stack.push('c') 
    topValue = stack.peek()
    expect(valueCount).toBe(3)
    expect(topValue).toEqual('c')
  })

  it('stack.peek should return the top value on the stack without removing it', () => {
    const stack = stackCreator()

    let valueCount= stack.push('a') 
    let topValue = stack.peek()
    expect(valueCount).toBe(1)
    expect(topValue).toEqual('a')

    valueCount = stack.push('b') 
    topValue = stack.peek()
    expect(valueCount).toBe(2)
    expect(topValue).toEqual('b')

    valueCount = stack.push('c') 
    topValue = stack.peek()
    expect(valueCount).toBe(3)
    expect(topValue).toEqual('c')
  })

  it('stack.pop should remove and return the top value of the stack', () => {
    const stack = stackCreator()

    stack.push('abc123')
    let topValue = stack.pop()
    expect(stack.isEmpty()).toBe(true)
    expect(topValue).toBe('abc123')
  })
})






