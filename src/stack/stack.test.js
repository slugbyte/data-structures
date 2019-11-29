const Stack = require('./stack.js')

describe('stack', () => {
  test('#push and #pop', () => {
    let temp = new Stack()

    temp.push(1).push(2).push(3)
    expect(temp.pop()).toBe(3)
    expect(temp.pop()).toBe(2)
    expect(temp.pop()).toBe(1)
    expect(temp.pop()).toBe(undefined)
  })
})






