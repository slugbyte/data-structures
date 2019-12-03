class BitArray {
  constructor(size=8){
    this.size = size
    this.data = new Array(size).fill(0)
  }

  _indexToPosition(index){
    return this.size - index - 1
  }


  getBit(index){
    if(typeof index != 'number') return
    if(index < this.size){
      return this.data[this._indexToPosition(index)]
    }
  }

  _getBitOrZero(index){
    return this.getBit(index) || 0
  }

  setBit(index, value){
    if(typeof index != 'number') return
    if(index < this.size){
      this.data[this._indexToPosition(index)] = value ? 1 : 0
    }
    return this
  }

  flipBit(index){
    if(typeof index != 'number') return
    if(index < this.size){
      this.data[this._indexToPosition(index)] = this.getBit(index) ? 0 : 1
    }
  }

  and(bitArray){
    let bigger = bitArray.size > this.size ? bitArray : this
    let smaller = bitArray.size > this.size ? this : bitArray
    let result = new BitArray(bigger.size)
    for(let i=0;i<bigger.size; i++){
      result.setBit(i, bigger.getBit(i) && smaller._getBitOrZero(i))
    }
    return result
  }

  or(bitArray){
    let bigger = bitArray.size > this.size ? bitArray : this
    let smaller = bitArray.size > this.size ? this : bitArray
    let result = new BitArray(bigger.size)
    for(let i=0;i<bigger.size; i++){
      result.setBit(i, bigger.getBit(i) | smaller._getBitOrZero(i))
    }
    return result
  }

  xor(bitArray){
    let bigger = bitArray.size > this.size ? bitArray : this
    let smaller = bitArray.size > this.size ? this : bitArray
    let result = new BitArray(bigger.size)
    for(let i=0;i<bigger.size; i++){
      result.setBit(i, bigger.getBit(i) ^ smaller._getBitOrZero(i))
    }
    return result
  }

  shiftLeft(numBits=1){
    if(typeof numBits != 'number') return
    if(numBits < 1) return 
    for(let i=0; i<numBits; i++){
      this.data.shift()
      this.data.push(0)
    }
  }

  shiftRight(numBits=1){
    if(typeof numBits != 'number') return
    if(numBits < 1) return 
    for(let i=0; i<numBits; i++){
      this.data.unshift(0)
      this.data.pop()
    }
  }

  toNumber(){
    let result = 0
    for(let i=0; i<this.size; i++){
      result += this.getBit(i) * Math.pow(2, i)
    }
    return result
  }
}

BitArray.fromArray = function(data){
  let result = new BitArray()
  result.size = data.length
  result.data = data.map(item => !!item ? 1 : 0)
  return result
}

module.exports = BitArray
