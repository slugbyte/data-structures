class Node {
  constructor(value=null){
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  constructor(){
    this.head = null
  }

  prependNodeWithValue(value){
    let node = new Node(value)
    if(this.head)
      node.next = this.head
    this.head = node
    return this
  }

  appendNodeWithValue(value){
    let node = new Node(value)
    if(!this.head){
      this.head = node
      return this
    }
    let current = this.head 
    while(current.next)
      current = current.next
    current.next = node
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
    let current = this.head 
    let offset = this.head
    while(n-- > 0 && offset)
      offset = offset.next
    if (!offset)
      return null
    while(offset.next){
      offset = offset.next
      current = current.next
    }
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
    return this.getNthFromLastNode(0)
  }
}

module.exports = SinglyLinkedList
