const Trie = require('./trie.js')

describe('Trie', () => {
  test('#insert, #find, #delete, #clear', () => {
    let trie = new Trie()
    expect(trie.wordCount).toBe(0)
    expect(trie.nodeCount).toBe(1)
    trie.insert('shark')
    expect(trie.wordCount).toBe(1)
    expect(trie.nodeCount).toBe(6)

    trie.insert('shack')
    expect(trie.wordCount).toBe(2)
    expect(trie.nodeCount).toBe(8)

    trie.insert('snack')
    expect(trie.wordCount).toBe(3)
    expect(trie.nodeCount).toBe(12)

    trie.insert('glorg')
    expect(trie.wordCount).toBe(4)
    expect(trie.nodeCount).toBe(17)

    trie.delete('glorg')
    expect(trie.wordCount).toBe(3)
    expect(trie.nodeCount).toBe(12)
    expect(trie.find('glorg')).toBeNull()

    let result = trie.find('shark')
    expect(result.char).toBe('k')
    expect(result.isEnd).toBeTruthy()
    expect(result.parent.char).toBe('r')

    result = trie.find('wat')
    expect(result).toBeNull()

    trie.clear()
    expect(trie.wordCount).toBe(0)
    expect(trie.nodeCount).toBe(1)

  })


})
