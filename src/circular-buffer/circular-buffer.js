class CircularBuffer {
  constructor(size=100){
    this.size = size
    this.data = new Array(size)
    this.start = 0
    this.length = 0
  }

  _incramentLength(){
    this.length++
  }

  _decrementLength(){
    this.length--
  }

  _incramentStart(){
    this.start = (this.start + 1) % this.size
  }

  _decrementStart(){
    if(this.start == 0){
      this.start = this.size - 1
      return
    }
    this.start = (this.start - 1) 
  }

  _end(){
    return ((this.start + this.length - 1) % this.size)
  }
  
  _storeValue(value, index){
    if (index < 0)
      index = this.size - index
    this.data[index % this.size] = value
  }

  _fetchValue(index){
    if (index < 0)
      index = this.size - index
    return this.data[index % this.size] 
  }

  appendValue(value){
    if (this.length < this.size){
      this._incramentLength()
      this._storeValue(value, this._end())
    }
    return this
  }

  prependValue(value){
    if (this.length < this.size){
      this._decrementStart()
      this._storeValue(value, this.start)
      this._incramentLength()
    }
    return this
  }

  extractLast(){
    if(this.length > 0){
      let result = this._fetchValue(this._end())
      this.data[this._end()] = undefined
      this._decrementLength()
      return result
    }
  }

  extractFirst(){
    if(this.length > 0){
      let result = this._fetchValue(this.start)
      this.data[this.start] = undefined
      this._incramentStart()
      this._decrementLength()
      return result
    }
  }

  push(value){
    return this.appendValue(value)
  }

  pop(){
    return this.extractLast()
  }

  enqueue(value){
    return this.appendValue(value)
  }

  dequeue(){
    return this.extractFirst()
  }

  getNth(n){
    if(n < 0) return 
    if(n > (this.size - 1)) return 
    return this._fetchValue(this.start + n)
  }

  peekFirst(){
    return this._fetchValue(this.start)
  }

  peekLast(){
    return this._fetchValue(this._end())
  }
}

module.exports = CircularBuffer
