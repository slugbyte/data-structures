const PriorityQueue = require('./priority-queue.js')

describe('PriorityQueue', () => {
  test('#enqueue #dequeue #isEmpty', () => {
    let queue = new PriorityQueue()
    queue.enqueue('hello')
    queue.enqueue('world')
    queue.enqueue('sweet')
    queue.enqueue('shark', 1 )
    queue.enqueue('dog', 1 )
    queue.enqueue('beans', 1 )
    queue.enqueue('dark', 2)
    queue.enqueue('log', 4)
    queue.enqueue('frog', 3)


    expect(queue.isEmpty()).toBeFalsy()
    expect(queue.dequeue()).toBe('shark')
    expect(queue.dequeue()).toBe('dog')
    expect(queue.dequeue()).toBe('beans')
    expect(queue.dequeue()).toBe('dark')
    expect(queue.dequeue()).toBe('frog')
    expect(queue.dequeue()).toBe('log')
    expect(queue.dequeue()).toBe('hello')
    expect(queue.dequeue()).toBe('world')
    expect(queue.dequeue()).toBe('sweet')
    expect(queue.dequeue()).toBeNull()
    expect(queue.dequeue()).toBeNull()
    expect(queue.isEmpty()).toBeTruthy()
  }) 

  test('#clear', () => {
    let queue = new PriorityQueue()
    queue.enqueue('sweet')
    queue.enqueue('shark', 1 )
    queue.enqueue('dog', 1 )
    queue.enqueue('beans', 1 )
    queue.enqueue('dark', 2)

    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()
  })

  test('#peek', () => {
    let queue = new PriorityQueue()
    queue.enqueue('sweet')
    queue.enqueue('shark', 1 )
    queue.enqueue('dog', 1 )

    expect(queue.peek()).toBe('shark')
    expect(queue.peek()).toBe('shark')
    expect(queue.dequeue()).toBe('shark')

    expect(queue.peek()).toBe('dog')
    expect(queue.peek()).toBe('dog')
    expect(queue.dequeue()).toBe('dog')

    expect(queue.peek()).toBe('sweet')
    expect(queue.peek()).toBe('sweet')
    expect(queue.dequeue()).toBe('sweet')
    expect(queue.isEmpty()).toBeTruthy()
  })

})
