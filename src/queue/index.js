class Queue {
  constructor(){
    this._state = []

  }

  enqueue(value){
    this._state.push(value)
    return this
  }

  dequeue(value){
    return this._state.shift()
  }
}

module.exports = Queue
