// MAX HEAP IMPLAMENTED WITH ARRAY
class Node {
  constructor(key, value=null){
    this.key = key
    this.value = value
  }
}

class MaxHeap {
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

  _getMaxChildIndex(parentIndex){
    let heapSize = this._heapSize()
    if (parentIndex == heapSize)
      return null
    
    let leftChildIndex = this._getLeftChildIndex(parentIndex)
    let rightChildIndex = this._getRightChildIndex(parentIndex)

    if(leftChildIndex < heapSize && rightChildIndex < heapSize){
      let leftChildKey = this.nodes[leftChildIndex].key
      let rightChildKey = this.nodes[rightChildIndex].key
      return leftChildKey > rightChildKey ? leftChildIndex : rightChildIndex
    }

    if (rightChildIndex < heapSize)
      return rightChildIndex 

    if (leftChildIndex < heapSize)
        return leftChildIndex
    return null
  }

  _isParentKeyLess(parentIndex, childIndex){
    return this.nodes[parentIndex].key < this.nodes[childIndex].key
  }

  isEmpty(){
    return this._heapSize() === 0
  }

  max(){
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
    while(childIndex > 0 && this._isParentKeyLess(parentIndex, childIndex)){
      this._swap(childIndex, parentIndex)
      childIndex = parentIndex
      parentIndex = this._getParentIndex(childIndex)
    }
    return this
  }

  extractMax(){
    if (this.isEmpty()) 
      return null
    let result = this.max()
    this.nodes[0] = this.nodes[this._heapSize() - 1] 
    this.nodes.pop()
    // bubble down
    let parentIndex = 0
    let maxChildIndex = this._getMaxChildIndex(parentIndex)
    while(maxChildIndex !== null && 
      this._isParentKeyLess(parentIndex, maxChildIndex)) {
      this._swap(parentIndex, maxChildIndex)
      parentIndex = maxChildIndex
      maxChildIndex = this._getMaxChildIndex(parentIndex)
    }
    return result
  }
}

module.exports = MaxHeap
