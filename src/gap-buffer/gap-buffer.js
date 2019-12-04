class GapBuffer {
  constructor(){
    this.before = []
    this.after = []
  }

  clear(){
    this.before = []
    this.after = []
    return this
  } 

  getGapIndex(){
    return this.before.length
  }

  getCharAt(index){
    if(index < this.before.length){
      return this.before[index]
    }
    return this.after[index - this.before.length]
  }

  insertChar(char){
    if(typeof char != 'string' || char.length != 1)
      throw new Error('insertChar only accepts a single charicter')
    this.before.push(char)
    return this
  }

  insertString(text){
    for(var i=0; i<text.length;i++){
      this.insertChar(text[i])
    }
    return this
  }

  shiftGap(direction){
    if (direction == 0) return this
    if(direction < 0) {
      this.after = this.before.splice(direction).concat(this.after)
      return this
    } 
    this.before = this.before.concat(this.after.splice(0, direction))
    return this
  }

  moveGap(index){
    if (index > (this.before.length)){
      index = index - this.before.length
      this.before = this.before.concat(this.after.splice(0, index))
      return this
    } 
    this.after = this.before.splice(index).concat(this.after)
    return this
  }

  deleteForward(numChars=1){
    if(numChars == 0) return
    this.after.splice(0, numChars)
    return this
  }

  deleteBackward(numChars=1){
    if(numChars == 0) return
    this.before.splice(numChars * (-1))
    return this
  }

  toString(){
    return this.before.join('') + this.after.join('')
  }
}

module.exports = GapBuffer
