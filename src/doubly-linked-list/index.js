class Node {
  constructor(value=null){
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor(){
    this.head = null
    this.tail = null
  }

  prependNodeWithValue(value){
    let node = new Node(value)
    if (!this.head){
      this.head = node 
      this.tail = node
      return this
    }
    node.next = this.head
    this.head.prev = node
    this.head = node
    return this
  }

  appendNodeWithValue(value){
    let node = new Node(value)
    if(!this.head){
      this.head = node
      this.tail = node
      return this
    }
    let current = this.head 
    while(current.next)
      current = current.next
    current.next = node
    node.prev = current
    this.tail = node
    return this
  }

  getNthNode(n){
    if (n < 0) 
      return null
    let current = this.head 
    while(n-- > 0 && current)
      current = current.next
    if (n > 0)
      return null
    return current
  }

  getNthFromLastNode(n){
    if (n < 0) 
      return null
    let current = this.tail 
    while(n-- > 0 && current) 
      current = current.prev
    if (n > 0)
      return null
    return current
  }

  findMiddle(){
    let current = this.head 
    let offset = this.head 
    while (offset && offset.next && offset.next.next){
      current = current.next
      offset = offset.next.next
    }
    return current
  }

  getHead(){
    return this.head
  }

  getTail(){
    return this.tail
  }
}

module.exports = DoublyLinkedList
