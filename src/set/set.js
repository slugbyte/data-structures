// CustomSet for primitive values string, number, and boolean
class CustomSet {
  constructor(){
    this.string = {}
    this.number = {}
    this.boolean = {}
    this.count = 0
  }

  isEmpty(){
    return this.count === 0 
  }

  size(){
    return this.count
  }

  add(value){
    let type = typeof value
    if (['string', 'boolean', 'number'].indexOf(type) < 0)
      throw new Error('value must be string, boolean, or number')
    if(!this[type][value]){
      this[type][value] = true
      this.count += 1
    }
    return this
  }

  remove(value){
    let type = typeof value
    if (['string', 'boolean', 'number'].indexOf(type) < 0)
      return 
    if(this[type][value]){
      delete this[type][value] 
      this.count -= 1
    }
    return this
  }

  contains(value){
    let type = typeof value
    if (['string', 'boolean', 'number'].indexOf(type) < 0)
      return False
    return !!this[type][value]
  }

  toArray(){
    let result = Object.keys(this.boolean).reduce((result, next) => {
      if (next === 'false'){
        result.push(false)
        return result
      }
      result.push(true)
      return result
    }, [])

    result = Object.keys(this.number).reduce((result, next) => {
      result.push(Number(next))
      return result
    }, result)

    return result.concat(Object.keys(this.string))
  }

  union(set){
    let result = new CustomSet()
    this.toArray().forEach(value => {
      result.add(value)
    })

    set.toArray().forEach(value => {
      result.add(value)
    })

    return result
  }

  intersect(set){
    let result = new CustomSet()
    set.toArray().forEach(value => {
      if (this.contains(value)){
        result.add(value)
      }
    })
    return result
  }

  diff(set){
    let result = new CustomSet()
    this.toArray().forEach(value => {
      if(!set.contains(value)){
        result.add(value)
      }
    })
    return result
  }

  isSuperSetOf(set){
    let values = this.toArray()
    for(let i=0; i<values.length; i++){
      if(!this.contains(value))
        return false
    }
    return true
  }
}

module.exports = CustomSet
