const createQueue = require('./index.js')

describe('queue', () => {
  it('createQueue should be a function', () => {
    expect(typeof createQueue).toBe('function')
  })

  it('createQueue should return a queue object with the methods enqueue, dequeue, and isEmpty', () => {
    const queue = createQueue()
    expect(typeof queue.enqueue).toBe('function')
    expect(typeof queue.dequeue).toBe('function')
    expect(typeof queue.isEmpty).toBe('function')

    // make sure there are no unwanted properties on the queue object
    expect(Object.keys(queue).length).toBe(3)
  })

  it('queue.dequeue should return null if the queue is empty', () => {
    const queue = createQueue()
    expect(queue.dequeue()).toBe(null)
  })

  it('queue.enqueue should return the updated length of the queue', () => {
    const queue = createQueue()
    let length = queue.enqueue('one')
    expect(length).toEqual(1)
    length = queue.enqueue('two')
    expect(length).toEqual(2)
    length = queue.enqueue('three')
    expect(length).toEqual(3)
  })

  it('queue.enqueue should enqueue values and queue.dequeue should dequeue values', () => {
    const queue = createQueue()
    queue.enqueue('one')
    queue.enqueue('two')
    queue.enqueue('three')
    expect(queue.dequeue()).toBe('one')
    expect(queue.dequeue()).toBe('two')
    expect(queue.dequeue()).toBe('three')
    expect(queue.dequeue()).toBe(null)
  })

  it('queue.isEmpty should return a true only if the queue is empty', () => {
    const queue = createQueue()
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue('not empty now')
    expect(queue.isEmpty()).toBe(false)
  })
})
