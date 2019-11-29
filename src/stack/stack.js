class Stack {
  constructor(){
    this._state = []
  }

  push(value){
    this._state.push(value)
    return this
  }

  pop(){
    return this._state.pop()
  }
}

module.exports = Stack
