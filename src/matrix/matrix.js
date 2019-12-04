//   0 1 2 3 
// 0 a b c d
// 1 e f g h
// 2 i j k l
// 3 m n o p
//   0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
// [ a b c d e f g h i j k  l  m  n  o  p ]


class Matrix {
  constructor(rows, columns){
    this.rows = rows
    this.columns =  columns
    this.data = new Array(rows * columns).fill(0)
  }

  _index(row, column){
    if(row > (this.rows - 1) || row < 0) return null
    if(column > (this.columns - 1) || column < 0) return null
    return (row * this.rows) + (column * this.columns)
  }

  get(row, column){
    let index = this._index(row, column)
    if (index === null) return null
    return this.data[index]
  }

  set(row, column, value){
    if(typeof value !== 'number')
      throw new Error('set only acepts numbers')
    let index = this._index(row, column)
    if (index === null) 
      throw new Error('not a valid location') 
    this.data[index] = value
  }

  add(value){
    if (typeof value == 'number'){
      this.data = this.data.map(i => i + value)
      return this
    } else if (value instanceof Matrix){
      if(!(this.columns == value.columns && this.rows == value.rows))
        throw new Error('matrix may only be added if they have the ame number of rows and columns')
      for(var i=0; i<this.data.length;i++){
        this.data[i] = this.data[i] + value.data[i]
      }
      return this
    } else {
      throw new Error('add only accept a Number or a Matrix') 
    }
  }
}

module.exports = Matrix
