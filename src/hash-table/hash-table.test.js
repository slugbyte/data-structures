const HashTable = require('./hash-table.js')

describe('hash-table', () => {
  test('#insert, #delete, #get, #clear', () => {
    const store = new HashTable(8)

    store.insert('shark', 'in the dark')
    store.insert('frog', 'on a log')
    expect(store.buckets[0].key).toBe('shark')
    expect(store.buckets[0].value).toBe('in the dark')
    expect(store.get('shark')).toBe('in the dark')

    expect(store.buckets[7].key).toBe('frog')
    expect(store.buckets[7].value).toBe('on a log')
    expect(store.get('frog')).toBe('on a log')

    expect(store.get('hippo')).toBeNull()
    store.clear()
    expect(store.get('frog')).toBeNull()
    expect(store.get('shark')).toBeNull()
  })

  test('#insert, #delete, #get with colsions', () => {
    const store = new HashTable(1)
    expect(store.numBuckets).toBe(1)

    store.insert('dude', 'shark attack')
    expect(store.buckets[0].key).toBe('dude')
    expect(store.buckets[0].value).toBe('shark attack')
    expect(store.buckets[0].next).toBe(null)
    expect(store.get('dude')).toBe('shark attack')

    // overwrite
    store.insert('dude', 'switch up')
    expect(store.buckets[0].key).toBe('dude')
    expect(store.buckets[0].value).toBe('switch up')
    expect(store.buckets[0].next).toBe(null)
    expect(store.get('dude')).toBe('switch up')

    // delete out of order
    store.insert('ddue', 'frog crash')
    store.delete('dude')
    expect(store.buckets[0].key).toBe('ddue')
    expect(store.buckets[0].value).toBe('frog crash')
    expect(store.buckets[0].next).toBe(null)
    expect(store.get('dude')).toBe(null)
    
    // delete only node
    store.delete('ddue')
    expect(store.buckets[0]).toBe(null)
    expect(store.get('ddue')).toBe(null)

    store.insert('hehaw', 'donkey trot')
    expect(store.buckets[0].key).toBe('hehaw') 
    expect(store.buckets[0].value).toBe('donkey trot')
    expect(store.buckets[0].next).toBe(null)
  })
})
