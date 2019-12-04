class DoubleEndedQueue {
  constructor(){
    this.data = []
    this.count = 0
  }

  prepend(value){
    this.data.unshift(value)
    this.count++
    return this
  }

  append(value){
    this.data.push(value)
    this.count++
    return this
  }

  extractFirst(){
    if (this.data.length < 1) return 
    this.count--
    return this.data.shift()
  }

  extractLast(){
    if (this.data.length < 1) return 
    this.count--
    return this.data.pop()
  }

  peekLast(){
    return this.data[this.data.length - 1]
  }

  peekFirst(){
    return this.data[0]
  }
}

module.exports = DoubleEndedQueue
