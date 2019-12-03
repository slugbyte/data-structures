const CircularBuffer = require('./circular-buffer.js')
describe('CircularBuffer', () => {
  test('#prependValue', () => {
    let store = new CircularBuffer(4)
    expect(store.length).toBe(0)
    store.prependValue(4)
    expect(store.data[3]).toBe(4)
    expect(store.length).toBe(1)
    store.prependValue(3)
    expect(store.data[2]).toBe(3)
    expect(store.length).toBe(2)
    store.prependValue(2)
    expect(store.data[1]).toBe(2)
    expect(store.length).toBe(3)
    store.prependValue(1)
    expect(store.data[0]).toBe(1)
    expect(store.length).toBe(4)
    store.prependValue(0)
    // buffer should be full
    expect(store.data[3]).toBe(4)
    expect(store.length).toBe(4)
    console.log(store)
  })

  test('#appendValue', () => {
    let store = new CircularBuffer(4)
    expect(store.length).toBe(0)

    store.appendValue(4)
    expect(store.data[0]).toBe(4)
    expect(store.length).toBe(1)

    store.appendValue(3)
    expect(store.data[1]).toBe(3)
    expect(store.length).toBe(2) 

    store.appendValue(2)
    expect(store.data[2]).toBe(2)
    expect(store.length).toBe(3)

    store.appendValue(1)
    expect(store.data[3]).toBe(1)
    expect(store.length).toBe(4)

    // buffer should be full
    store.appendValue(0)
    expect(store.data[0]).toBe(4)
    expect(store.length).toBe(4)
  })

  test('#extractLast', () => {
    let store = new CircularBuffer(4)
    store.appendValue(2).appendValue(3)
    expect(store.extractLast()).toBe(3)
    store.prependValue(1)
    expect(store.extractLast()).toBe(2)
    expect(store.extractLast()).toBe(1)
    expect(store.extractLast()).toBeUndefined()
  })

  test('#extractFirst', () => {
    let store = new CircularBuffer(4)
    store.prependValue(3).prependValue(2)
    expect(store.extractFirst()).toBe(2)
    store.appendValue(4)
    expect(store.extractFirst()).toBe(3)
    expect(store.extractFirst()).toBe(4)
    expect(store.extractFirst()).toBeUndefined()
  })

  test('#push #pop', () => {
    let store = new CircularBuffer(4)
    store.push(4).push(3).push(2).push(1).push(0)
    expect(store.pop()).toBe(1)
    expect(store.pop()).toBe(2)
    expect(store.pop()).toBe(3)
    expect(store.pop()).toBe(4)
    expect(store.pop()).toBeUndefined()
  })

  test('#enqueue #dequeue', () => {
    let store = new CircularBuffer(4)
    store.enqueue(4).enqueue(3).enqueue(2).enqueue(1).enqueue(0)
    expect(store.dequeue()).toBe(4)
    expect(store.dequeue()).toBe(3)
    expect(store.dequeue()).toBe(2)
    expect(store.dequeue()).toBe(1)
    expect(store.dequeue()).toBeUndefined()
  })

  test('#getNth, #peekFirst, #peekLast', () => {
    let store = new CircularBuffer(4)
    store.appendValue(4).appendValue(3)
      .appendValue(2).appendValue(1)

    expect(store.getNth(0)).toBe(4)
    expect(store.getNth(1)).toBe(3)
    expect(store.getNth(2)).toBe(2)
    expect(store.getNth(3)).toBe(1)
    expect(store.getNth(4)).toBeUndefined()
    expect(store.getNth(-1)).toBeUndefined()

    expect(store.peekFirst()).toBe(4)
    console.log(store)
    expect(store.peekLast()).toBe(1)
    
  })
})
