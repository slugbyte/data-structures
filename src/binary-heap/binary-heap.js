// MAX HEAP IMPLAMENTED WITH ARRAY
//
const MAX_HEAP = Symbol()
const MIN_HEAP = Symbol()

class Node {
  constructor(key, value=null){
    this.key = key
    this.value = value
  }
}

class BinaryHeap {
  constructor(type){
    this.nodes = []
    if ([MIN_HEAP, MAX_HEAP].indexOf(type) < 0)
      throw new Error('Use BinaryHeap.MinHeap or BinaryHeap.MaxHeap')

    if (type == MAX_HEAP){
      this.comparitor =  ((a , b) => a < b)
      this.max = this._getRootNode
      this.extractMax = this._extract
    } else {
      this.comparitor =  ((a , b) => a > b)
      this.min = this._getRootNode
      this.extractMin = this._extract
    }
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

  _getMinOrMaxChildIndex(parentIndex){
    let heapSize = this._heapSize()
    if (parentIndex == heapSize)
      return null
    
    let leftChildIndex = this._getLeftChildIndex(parentIndex)
    let rightChildIndex = this._getRightChildIndex(parentIndex)

    if(leftChildIndex < heapSize && rightChildIndex < heapSize){
      let leftChildKey = this.nodes[leftChildIndex].key
      let rightChildKey = this.nodes[rightChildIndex].key
      return this.comparitor(rightChildKey, leftChildKey) ? leftChildIndex : rightChildIndex
    }

    if (rightChildIndex < heapSize)
      return rightChildIndex 

    if (leftChildIndex < heapSize)
        return leftChildIndex
    return null
  }

  _compareParentAndChild(parentIndex, childIndex){
    return this.comparitor(this.nodes[parentIndex].key, this.nodes[childIndex].key)
  }

  isEmpty(){
    return this._heapSize() === 0
  }

  _getRootNode(){
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
    while(childIndex > 0 && this._compareParentAndChild(parentIndex, childIndex)){
      this._swap(childIndex, parentIndex)
      childIndex = parentIndex
      parentIndex = this._getParentIndex(childIndex)
    }
    return this
  }

  _extract(){
    if (this.isEmpty()) 
      return null
    let result = this._getRootNode()
    this.nodes[0] = this.nodes[this._heapSize() - 1] 
    this.nodes.pop()
    // bubble down
    let parentIndex = 0
    let minOrMaxChildIndex = this._getMinOrMaxChildIndex(parentIndex)
    while(minOrMaxChildIndex !== null && this._compareParentAndChild(parentIndex, minOrMaxChildIndex)) {
      this._swap(parentIndex, minOrMaxChildIndex)
      parentIndex = minOrMaxChildIndex
      minOrMaxChildIndex = this._getMinOrMaxChildIndex(parentIndex)
    }
    return result
  }
}

BinaryHeap.MaxHeap = function(){
  return new BinaryHeap(MAX_HEAP)
}

BinaryHeap.MinHeap = function(){
  return new BinaryHeap(MIN_HEAP)
}

module.exports = BinaryHeap
