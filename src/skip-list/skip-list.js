class Node {
  constructor(key, value, maxLevels){
    this.key = key
    this.value = value
    this.level = 0
    this.prev = new Array(maxLevels).fill(null)
    this.next = new Array(maxLevels).fill(null)
  }

  getPrev(level=0){
    return this.prev[level]
  }

  getNext(level=0){
    return this.next[level]
  }

  setPrev(node, level=0){
    this.prev[level] = node
  }
  
  _delete(){
    for(let i=0; i<=this.level; i++){
      let prev = this.prev[i]
      let next = this.next[i]
      prev.next[i] = next
      if(next) next.prev[i] = prev
    }
    return this
  }

  setNext(node, level=0){
    if(this.next[level])
      node.setNext(this.getNext(level), level)
    this.next[level] = node
    node.setPrev(this, level)
  }
}

class SkipList {
  constructor(maxLevels=7){
    this._maxLevels = maxLevels
    this.head = new Array(maxLevels)
      .fill(new Node(-Infinity, -Infinity, maxLevels))
    this.nodeCount = 0
  }

  _randomLevel(){
    let flip = Math.random()
    let level = 0
    while (flip < .55 && level < (this._maxLevels - 1)){
      level++
      flip = Math.random()
    }
    return level 
  }

  clear(){
    this.head = new Array(this._maxLevels)
      .fill(new Node(-Infinity, -Infinity, this._maxLevels))
    this.nodeCount = 0
  }

  find(key){
    let level = this._maxLevels - 1
    let current = this.head[level]
    while(current.key <= key && level > -1){
      if(current.key == key) return current
      let next = current.getNext(level)
      if(!next || next.key > key){
        level--
      } else {
        current = current.getNext(level)
      }
    }
    return null
  }

  delete(key){
    let node = this.find(key)
    if(!node)
      return this
    node._delete()
    this.nodeCount--
    return this
  }

  insert(key, value=null){
    let node = new Node(key, value, this._maxLevels)
    let level = this._maxLevels - 1
    let current = this.head[level]
    let temp = []
    while(current.key < node.key && level > -1){
      let next = current.getNext(level)
      if(!next || next.key > node.key){
        temp[level] = current
        level--
      } else {
        current = current.getNext(level)
      }
    }
    if(level > 0){
      while(level > -1)
        temp[level--] = current
    }
    let randomLevel = this._randomLevel()
    node.level = randomLevel
    for(let i=0; i<=randomLevel; i++){
      temp[i].setNext(node, i)
    }
    this.nodeCount++
    return this
  }

  toString(){
    let head = this.getHead()
    let text = ''
    let levels = ''
    while(head){
      text += head.key + ' '
      levels += head.level + ' '
      head = head.getNext()
    }
    return 'value: ' + text + '\n' + 'level: ' + levels
  }

  getHead(){
    return this.head[0].getNext()
  }

  isEmpty(){
    if(this.nodeCount === 0) return true
    return false
  }
}

module.exports = SkipList
