const SkipList = require("./skip-list.js")

describe('SkipList', () => {
  test('#insert', () => {
    let list = new SkipList()
    list.insert(4, 'four')

    expect(list.nodeCount).toBe(1)
    list.insert(7, 'seven')
    expect(list.nodeCount).toBe(2)
    list.insert(11, 'eleven')
    expect(list.nodeCount).toBe(3)
    list.insert(9, 'nine')
    expect(list.nodeCount).toBe(4)
    list.insert(8, 'eight')
    expect(list.nodeCount).toBe(5)
    list.insert(3, 'three')
    expect(list.nodeCount).toBe(6)
    list.insert(1, 'one')
    expect(list.nodeCount).toBe(7)

    let next = list.getHead()
    expect(next.key).toBe(1)
    next = next.getNext()
    expect(next.key).toBe(3)
    next = next.getNext()
    expect(next.key).toBe(4)
    next = next.getNext()
    expect(next.key).toBe(7)
    next = next.getNext()
    expect(next.key).toBe(8)
    next = next.getNext()
    expect(next.key).toBe(9)
    next = next.getNext()
    expect(next.key).toBe(11)
    next = next.getNext()
    expect(next).toBeNull()
  })

  test('#find', () => {
    let list = new SkipList()
    list.insert(4, 'four').insert(7, 'seven')
      .insert(11, 'eleven').insert(9, 'nine')
      .insert(8, 'eight').insert(3, 'three')
    
    expect(list.find(8).value).toBe('eight')
    expect(list.find(11).value).toBe('eleven')
    expect(list.find(22)).toBeNull()
  })

  test('#delete #isEmpty', () => {
    let list = new SkipList()
    list.insert(4, 'four').insert(7, 'seven')
      .insert(11, 'eleven').insert(9, 'nine')
      .insert(8, 'eight').insert(3, 'three')

    expect(list.isEmpty()).toBeFalsy()

    list.delete(8)
    expect(list.find(7).getNext().key).toBe(9)
    expect(list.nodeCount).toBe(5)

    list.delete(1)
    expect(list.getHead().key).toBe(3)
    expect(list.delete(100))
    expect(list.nodeCount).toBe(5)

    list.delete(11).delete(3).delete(7)
      .delete(4).delete(9)
    expect(list.isEmpty()).toBeTruthy()
  })

  test('#clear', () => {
    let list = new SkipList()
    list.insert(4, 'four').insert(7, 'seven')
      .insert(11, 'eleven').insert(9, 'nine')
      .insert(8, 'eight').insert(3, 'three')

    list.clear()
    expect(list.isEmpty()).toBeTruthy()
    
  })
  
})
