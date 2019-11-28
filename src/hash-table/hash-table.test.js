const HashTable = require('./index.js')

describe('hash-table', () => {
  test('#insert, #delete', () => {
    const store = new HashTable(8)
    expect(store.numBuckets).toBe(8)

    store.insert('dude', 'shark attack')
    expect(store.buckets[2].key).toBe('dude')
    expect(store.buckets[2].value).toBe('shark attack')
    expect(store.buckets[2].next).toBe(null)
    expect(store.get('dude')).toBe('shark attack')

    // overwrite
    store.insert('dude', 'switch up')
    expect(store.buckets[2].key).toBe('dude')
    expect(store.buckets[2].value).toBe('switch up')
    expect(store.buckets[2].next).toBe(null)
    expect(store.get('dude')).toBe('switch up')

    // collision
    store.insert('ddue', 'frog crash')
    expect(store.buckets[2].next.key).toBe('ddue')
    expect(store.buckets[2].next.value).toBe('frog crash')
    expect(store.buckets[2].next.next).toBe(null)
    expect(store.get('ddue')).toBe('frog crash')

    // delete out of order
    store.delete('dude')
    expect(store.buckets[2].key).toBe('ddue')
    expect(store.buckets[2].value).toBe('frog crash')
    expect(store.buckets[2].next).toBe(null)
    expect(store.get('dude')).toBe(null)
    
    // delete only node
    store.delete('ddue')
    expect(store.buckets[2]).toBe(null)
    expect(store.get('ddue')).toBe(null)

    store.insert('hehaw', 'donkey trot')
    expect(store.buckets[5].key).toBe('hehaw') 
    expect(store.buckets[5].value).toBe('donkey trot')
    expect(store.buckets[5].next).toBe(null)
  })

})
