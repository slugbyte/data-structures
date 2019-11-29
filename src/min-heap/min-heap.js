// MIN HEAP IMPLAMENTED WITH ARRAY
class Node {
  constructor(key, value=null){
    this.key = key
    this.value = value
  }
}

class MinHeap {
  constructor(){
    this.nodes = []
  }

  _heapSize(){
    return this.nodes.length
  }

  _swap(i, j){
    let temp = this.nodes[i]
    this.nodes[i] = this.nodes[j]
    this.nodes[j] = temp
  }

  _getLeftChildIndex(parentIndex){
    return (parentIndex * 2) + 1
  }
  
  _getRightChildIndex(parentIndex){
    return (parentIndex * 2) + 2
  }

  _getParentIndex(childIndex){
    return Math.floor((childIndex - 1) / 2)
  }

  _getMinChildIndex(parentIndex){
    let heapSize = this._heapSize()
    if (parentIndex == heapSize)
      return null
    
    let leftChildIndex = this._getLeftChildIndex(parentIndex)
    let rightChildIndex = this._getRightChildIndex(parentIndex)

    if(leftChildIndex < heapSize && rightChildIndex < heapSize){
      let leftChildKey = this.nodes[leftChildIndex].key
      let rightChildKey = this.nodes[rightChildIndex].key
      return leftChildKey < rightChildKey ? leftChildIndex : rightChildIndex
    }

    if (rightChildIndex < heapSize)
      return rightChildIndex 

    if (leftChildIndex < heapSize)
        return leftChildIndex
    return null
  }

  _isParentKeyGreater(parentIndex, childIndex){
    return this.nodes[parentIndex].key > this.nodes[childIndex].key
  }

  isEmpty(){
    return this._heapSize() === 0
  }

  min(){
    if(this.isEmpty())
      return null
    return this.nodes[0]
  }

  insert(key, value){
    if(!(typeof key === 'number' || typeof key === 'string'))
      throw new Error('key must be number or string')
    this.nodes.push(new Node(key, value))
    // bubble up
    let childIndex = this.nodes.length - 1
    let parentIndex = this._getParentIndex(childIndex)
    while(childIndex > 0 && this._isParentKeyGreater(parentIndex, childIndex)){
      this._swap(childIndex, parentIndex)
      childIndex = parentIndex
      parentIndex = this._getParentIndex(childIndex)
    }
    return this
  }

  extractMin(){
    if (this.isEmpty()) 
      return null
    let result = this.min()
    this.nodes[0] = this.nodes[this._heapSize() - 1] 
    this.nodes.pop()
    // bubble down
    let parentIndex = 0
    let minChildIndex = this._getMinChildIndex(parentIndex)
    while(minChildIndex !== null && 
      this._isParentKeyGreater(parentIndex, minChildIndex)) {
      this._swap(parentIndex, minChildIndex)
      parentIndex = minChildIndex
      minChildIndex = this._getMinChildIndex(parentIndex)
    }
    return result
  }
}

module.exports = MinHeap
