const MinHeap = require('./min-heap.js')

describe("MinHeap", () => {
  test("#insert, #min, #isEmpty", () => {
    let heap = new MinHeap()

    expect(heap.isEmpty()).toBeTruthy()
    expect(heap.min()).toBeNull()

    heap.insert(5, 'five')
    expect(heap.min().key).toBe(5)
    expect(heap.min().value).toBe('five')
    expect(heap.isEmpty()).toBeFalsy()

    heap.insert(6, 'six')
    expect(heap.min().key).toBe(5)
    expect(heap.min().value).toBe('five')
    expect(heap.nodes[0].key).toBe(5)
    expect(heap.nodes[1].key).toBe(6)

    heap.insert(4, 'four')
    expect(heap.min().key).toBe(4)
    expect(heap.min().value).toBe('four')
    expect(heap.nodes[0].key).toBe(4)
    expect(heap.nodes[1].key).toBe(6)
    expect(heap.nodes[2].key).toBe(5)

    heap.insert(7, 'seven')
    expect(heap.min().key).toBe(4)
    expect(heap.min().value).toBe('four')
    expect(heap.nodes[0].key).toBe(4)
    expect(heap.nodes[1].key).toBe(6)
    expect(heap.nodes[2].key).toBe(5)
    expect(heap.nodes[3].key).toBe(7)

    heap.insert(3, 'three')
    expect(heap.min().key).toBe(3)
    expect(heap.min().value).toBe('three')
    expect(heap.nodes[0].key).toBe(3)
    expect(heap.nodes[1].key).toBe(4)
    expect(heap.nodes[2].key).toBe(5)
    expect(heap.nodes[3].key).toBe(7)
    expect(heap.nodes[4].key).toBe(6)

    // test default value is null
    heap.insert(2)
    expect(heap.min().key).toBe(2)
    expect(heap.min().value).toBeNull()
    expect(heap.nodes[0].key).toBe(2)
    expect(heap.nodes[1].key).toBe(4)
    expect(heap.nodes[2].key).toBe(3)
    expect(heap.nodes[3].key).toBe(7)
    expect(heap.nodes[4].key).toBe(6)
    expect(heap.nodes[5].key).toBe(5)
  })

  test("#extractMin", () => {
    let heap = new MinHeap()
    heap.insert(5).insert(6).insert(4)
      .insert(7).insert(3).insert(2)
    expect(heap.nodes[0].key).toBe(2)
    expect(heap.nodes[1].key).toBe(4)
    expect(heap.nodes[2].key).toBe(3)
    expect(heap.nodes[3].key).toBe(7)
    expect(heap.nodes[4].key).toBe(6)
    expect(heap.nodes[5].key).toBe(5)

    expect(heap.extractMin().key).toBe(2)
    expect(heap.nodes[0].key).toBe(3)
    expect(heap.nodes[1].key).toBe(4)
    expect(heap.nodes[2].key).toBe(5)
    expect(heap.nodes[3].key).toBe(7)
    expect(heap.nodes[4].key).toBe(6)

    expect(heap.extractMin().key).toBe(3)
    expect(heap.nodes[0].key).toBe(4)
    expect(heap.nodes[1].key).toBe(6)
    expect(heap.nodes[2].key).toBe(5)
    expect(heap.nodes[3].key).toBe(7)

    expect(heap.extractMin().key).toBe(4)
    expect(heap.nodes[0].key).toBe(5)
    expect(heap.nodes[1].key).toBe(6)
    expect(heap.nodes[2].key).toBe(7)

    expect(heap.extractMin().key).toBe(5)
    expect(heap.nodes[0].key).toBe(6)
    expect(heap.nodes[1].key).toBe(7)

    expect(heap.extractMin().key).toBe(6)
    expect(heap.nodes[0].key).toBe(7)

    expect(heap.extractMin().key).toBe(7)
    expect(heap.nodes[0]).toBe(undefined)
    expect(heap.extractMin()).toBeNull()
  })
})
