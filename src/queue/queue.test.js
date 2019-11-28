const Queue = require('./index.js')

describe('queue', () => {
  test('#enqueue and #dequeue', () => {
    let temp = new Queue()
    temp.enqueue('a')
    temp.enqueue('b')
    temp.enqueue('c')

    expect(temp.dequeue()).toBe('a')
    expect(temp.dequeue()).toBe('b')
    expect(temp.dequeue()).toBe('c')
    expect(temp.dequeue()).toBe(undefined)
  })
})
