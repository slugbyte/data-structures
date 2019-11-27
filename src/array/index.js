class CustomArray {
  constructor(){
    this.length = 0
  }

  append(value){
    this[this.length++] = value
    return this
  }

  prepend(value){
    for(let i = this.length++; i>0; i--){
      this[i] = this[i-1]
    }
    this[0] = value
    return this
  }

  removeLast(){
    if (this.length == 0)
      return undefined
    let result = this[--this.length] 
    delete this[this.length]
    return result
  }

  removeFirst(){
    if (this.length == 0)
      return undefined
    let result = this[0]
    for(let i=0;i<this.length;i++){
      this[i] = this[i+1]
    }
    delete this[--this.length]
    return result
  }

  reduce(itterator, result){
    let i = 0 
    if(!result){
      result = this[i++]
    }
    for(;i<this.length;i++){
      result = itterator(result, this[i], i, this)
    }
    return result
  }

  filter(itterator){
    return this.reduce((result, next, i) => {
      if(itterator(next, i, this))
        result.append(next)
      return result
    }, new CustomArray())
  }

  map(itterator){
    return this.reduce((result, next, i) => {
      result.append(itterator(next, i, this))
      return result
    }, new CustomArray())
  }

}

module.exports = CustomArray
