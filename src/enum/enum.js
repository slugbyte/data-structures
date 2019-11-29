class Enum {
  constructor(...args){
    for(let i=0; i<args.length; i++){
      this[args[i].toLowerCase()] = Symbol(i)
      this['is' + args[i].toUpperCase()] = function(value){
        if(this[args[i].toLowerCase()] === value)
          return true
        return false
      }
    }
  }
}

module.exports = Enum
