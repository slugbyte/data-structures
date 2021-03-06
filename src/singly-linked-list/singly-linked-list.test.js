const SinglyLinkedList = require('./singly-linked-list.js')

describe('Singly Linked List', () => {
  test('#prependNodeWithValue', () => {
    let temp = new SinglyLinkedList()
    temp.prependNodeWithValue(1) 
    temp.prependNodeWithValue(2) 
    expect(temp.head.value).toBe(2)
    expect(temp.head.next.value).toBe(1) 
    expect(temp.head.next.next).toBe(null)
  })

  test('#appendNodeWithValue', () => {
    let temp = new SinglyLinkedList()
    temp.appendNodeWithValue(1)
    temp.appendNodeWithValue(2)
    expect(temp.head.value).toBe(1)
    expect(temp.head.next.value).toBe(2)
    expect(temp.head.next.next).toBe(null)
  })

  test('#getNthNode', () => {
    let temp = new SinglyLinkedList()
    temp.appendNodeWithValue(1)
    temp.appendNodeWithValue(2)
    temp.appendNodeWithValue(3)
    temp.appendNodeWithValue(4)
    expect(temp.getNthNode(0).value).toBe(1)
    expect(temp.getNthNode(1).value).toBe(2)
    expect(temp.getNthNode(2).value).toBe(3)
    expect(temp.getNthNode(3).value).toBe(4)
    expect(temp.getNthNode(5)).toBe(null)
  })

  test('#getNthFromLastNode', () => {
    let temp = new SinglyLinkedList()
    temp.appendNodeWithValue(1)
    temp.appendNodeWithValue(2)
    temp.appendNodeWithValue(3)
    temp.appendNodeWithValue(4)
    expect(temp.getNthFromLastNode(0).value).toBe(4)
    expect(temp.getNthFromLastNode(1).value).toBe(3)
    expect(temp.getNthFromLastNode(2).value).toBe(2)
    expect(temp.getNthFromLastNode(3).value).toBe(1)
    expect(temp.getNthFromLastNode(4)).toBe(null)
  })

  test('#findMiddle', () => {
    let temp = new SinglyLinkedList()
    temp.appendNodeWithValue(1)
    expect(temp.findMiddle().value).toBe(1)
    temp.appendNodeWithValue(2)
    expect(temp.findMiddle().value).toBe(1)
    temp.appendNodeWithValue(3)
    temp.appendNodeWithValue(4)
    expect(temp.findMiddle().value).toBe(2)
    temp.appendNodeWithValue(5)
    expect(temp.findMiddle().value).toBe(3)
  }) 

  test('#getHead and #getTail', () => {
    let temp = new SinglyLinkedList()
    expect(temp.getHead()).toBe(null)
    expect(temp.getTail()).toBe(null)
    temp.appendNodeWithValue(1) 
    expect(temp.getHead().value).toBe(1)
    expect(temp.getTail().value).toBe(1)
    temp.appendNodeWithValue(2) 
    temp.appendNodeWithValue(3) 
    expect(temp.getHead().value).toBe(1)
    expect(temp.getTail().value).toBe(3)
  })
})
