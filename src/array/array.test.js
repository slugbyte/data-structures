const CustomArray = require('./array.js')
describe('Array', () => {
  test('#append', () => {
    let temp = new CustomArray()
    expect(temp.length).toBe(0)

    temp.append('a')
    expect(temp.length).toBe(1)
    expect(temp[0]).toBe('a')

    temp.append('b')
    expect(temp.length).toBe(2)
    expect(temp[1]).toBe('b')
  })

  test('#prepend', () => {
    let temp = new CustomArray()
    expect(temp.length).toBe(0)

    temp.prepend('a')
    expect(temp.length).toBe(1)
    expect(temp[0]).toBe('a')

    temp.prepend('b')
    expect(temp.length).toBe(2)
    expect(temp[0]).toBe('b')
    expect(temp[1]).toBe('a')
  })

  test('#removeLast', () => {
    let temp = new CustomArray()
    temp.append('a').append('b').append('c')
    expect(temp[0]).toBe('a')
    expect(temp[1]).toBe('b')
    expect(temp[2]).toBe('c')
    expect(temp.length).toBe(3)

    expect(temp.removeLast()).toBe('c')
    expect(temp[0]).toBe('a')
    expect(temp[1]).toBe('b')
    expect(temp[2]).toBe(undefined)
    expect(temp.length).toBe(2)

    expect(temp.removeLast()).toBe('b')
    expect(temp[0]).toBe('a')
    expect(temp[1]).toBe(undefined)
    expect(temp[2]).toBe(undefined)
    expect(temp.length).toBe(1)
  })
  
  test('#removeFirst', () => {
    let temp = new CustomArray()
    temp.append('a').append('b').append('c')
    expect(temp[0]).toBe('a')
    expect(temp[1]).toBe('b')
    expect(temp.length).toBe(3)

    expect(temp.removeFirst()).toBe('a')
    expect(temp[0]).toBe('b')
    expect(temp[1]).toBe('c')
    expect(temp[2]).toBe(undefined)
    expect(temp.length).toBe(2)

    expect(temp.removeFirst()).toBe('b')
    expect(temp[0]).toBe('c')
    expect(temp[1]).toBe(undefined)
    expect(temp[2]).toBe(undefined)
    expect(temp.length).toBe(1)
  })

  test('#reduce', () => {
    let temp = new CustomArray()
    temp.prepend(1).prepend(2).prepend(3)

    let result = temp.reduce((result, next) => {
      return result + next
    })

    expect(result).toBe(6)
    
    result = temp.reduce((result, next) => {
      return result + next
    }, 10)

    expect(result).toBe(16)
  })

  test('#filter', () => {
    let temp = new CustomArray()
    temp.prepend(5).prepend(4).prepend(3)
      .prepend(2).prepend(1)

    let result = temp.filter((next) => {
      return next % 2
    })

    expect(result.length).toBe(3)
    expect(result[0]).toBe(1)
    expect(result[1]).toBe(3)
    expect(result[2]).toBe(5)
  })

  test('#map', () => {
    let temp = new CustomArray()
    temp.prepend(3).prepend(2).prepend(1)

    let result = temp.map((next) => next * 2)
    expect(result.length).toBe(3)
    expect(result[0]).toBe(2)
    expect(result[1]).toBe(4)
    expect(result[2]).toBe(6)
  })
})

