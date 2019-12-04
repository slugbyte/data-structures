class SortedArray {
  constructor(data=[]){
    if(!(data instanceof Array))
      throw new Error('inital data must be an Array instance')
    this.data = data
    if(this.data.length > 0)
      this._quicksort()

    return new Proxy(this, {
      set: () => {
        return false
      },
      get: (target, prop) => {
        let num = Number(prop)
        if(!isNaN(num))
          return target.data[num]
        return target[prop];
      }
    })
  }

  _swap(i, j){
    let temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  _quicksort(){
    let _partition = (data, lo, hi) => {
      let pivot = data[hi]
      let i = lo
      for (let j=lo; j<hi; j++)
        if(data[j] < pivot)
          this._swap(i++, j)
      this._swap(i, hi)
      return i 
    }
    let _sort = (data, lo, hi) => {
      if(lo<hi){
        let p = _partition(data, lo, hi)
        _sort(data, lo, p - 1)
        _sort(data, p + 1, hi)
      }
    }
    _sort(this.data, 0, this.data.length - 1)
    return this
  }

  insert(value){
    this.data.push(value)
    return this._quicksort()
  }

  concat(data){
    if(data instanceof Array){
      return new SortedArray(this.data.concat(data))
    } else if (data instanceof SortedArray) {
      return new SortedArray(this.data.concat(data.data))
    } else {
      throw new Error('concat only supports SortedArray and Array')
    }
  }
}

module.exports = SortedArray

