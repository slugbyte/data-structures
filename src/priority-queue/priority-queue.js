class Node {
  constructor(key, value=null, count=0){
    this.key = key
    this.value = value
    this.count = count
  }
}

class PriorityQueue {
  constructor(){
    this.heap = []
    this.priorityHistogram = {}
  }

  _heapSize(){
    return this.heap.length
  }

  _swap(i, j){
    let temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
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
      let leftChildKey = this.heap[leftChildIndex].key
      let rightChildKey = this.heap[rightChildIndex].key
      if (leftChildKey == rightChildKey){
        let leftChildCount = this.heap[leftChildIndex].count
        let rightChilCount = this.heap[rightChildIndex].count
        return leftChildCount < rightChilCount ? leftChildIndex : rightChildIndex
      }
      return leftChildKey < rightChildKey ? leftChildIndex : rightChildIndex
    }

    if (rightChildIndex < heapSize)
      return rightChildIndex 

    if (leftChildIndex < heapSize)
        return leftChildIndex
    return null
  }

  _isParentKeyGreater(parentIndex, childIndex){
    let parent = this.heap[parentIndex]
    let child = this.heap[childIndex]
    if(parent.key == child.key)
      return parent.count > child.count

    return parent.key > child.key
  }

  isEmpty(){
    return this._heapSize() === 0
  }

  _min(){
    if(this.isEmpty())
      return null
    return this.heap[0]
  }

  enqueue(value, key=Infinity){
    if(!(typeof key === 'number' || typeof key === 'string'))
      throw new Error('key must be number or string')
    if(this.priorityHistogram[key] === undefined)
      this.priorityHistogram[key] = 0
    else 
      this.priorityHistogram[key]++
    this.heap.push(new Node(key, value, this.priorityHistogram[key]))
    // bubble up
    let childIndex = this.heap.length - 1
    let parentIndex = this._getParentIndex(childIndex)
    while(childIndex > 0 && this._isParentKeyGreater(parentIndex, childIndex)){
      this._swap(childIndex, parentIndex)
      childIndex = parentIndex
      parentIndex = this._getParentIndex(childIndex)
    }
    return this
  }


  dequeue(){
    if (this.isEmpty()) 
      return null
    let result = this._min()
    this.heap[0] = this.heap[this._heapSize() - 1] 
    this.priorityHistogram[result.key]--
    this.heap.pop()
    // bubble down
    let parentIndex = 0
    let minChildIndex = this._getMinChildIndex(parentIndex)
    while(minChildIndex !== null && 
      this._isParentKeyGreater(parentIndex, minChildIndex)) {
      this._swap(parentIndex, minChildIndex)
      parentIndex = minChildIndex
      minChildIndex = this._getMinChildIndex(parentIndex)
    }
    return result.value
  }

  peek(){
    return this._min().value
  }

  clear(){ 
    this.heap = []
    this.priorityHistogram = {}
  }
}

module.exports = PriorityQueue
