const DoubleEndedQueue = require('./double-ended-queue.js')

describe('DoubleEndedQueue', () => {
  test('#prepend #append #extractLast #extractFirst, #peekFirst #peekLast, ', () => {
    let queue = new DoubleEndedQueue()
    queue.append(1).append(2).append(3).prepend(0)
    expect(queue.extractFirst()).toBe(0)
    expect(queue.extractLast()).toBe(3)
    expect(queue.peekFirst(1))
    expect(queue.peekLast(3))
  })
})
