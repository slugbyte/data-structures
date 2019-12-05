// TODO: write better error messages

class Matrix {
  constructor(rows, columns){
    if(typeof rows != 'number')
      throw new Error('rows must be a number')
    if(typeof columns != 'number')
      throw new Error('columns must be a number')
    this.rows = rows
    this.columns =  columns
    this.data = new Array(rows).fill(0) // fill with zero beacause map wont work with undefined
      .map(() => new Array(columns).fill(0))
  }

  _validateIndex(row, column){
    if (row >= this.rows || row < 0) return false
    if(column >= this.columns || column < 0) return false
    return true
  }

  get(row, column){
    if (!this._validateIndex(row, column)) return null
    return this.data[row][column]
  }

  set(row, column, value){
    if(typeof value !== 'number')
      throw new Error('set only acepts numbers')
    if (!this._validateIndex(row, column)) return this
    this.data[row][column] = value
    return this
  }

  map(fn){
    let result = new Matrix(this.rows, this.columns)
    for(let x=0; x<this.rows; x++){
      for(let y=0; y<this.columns; y++){
        result.set(x, y, fn(this.get(x, y), x, y))
      }
    }
    return result
  }

  add(matrix){
     if (!(matrix instanceof Matrix))
      throw new Error('add only accept a Matrix') 
    if(!(this.columns == matrix.columns && this.rows == matrix.rows))
      throw new Error('rows and colums must match on both matrix')
    return this.map((value, x, y) => value + matrix.get(x, y))
  }

  subtract(matrix){
     if (!(matrix instanceof Matrix))
      throw new Error('add only accept a Matrix') 
    if(!(this.columns == matrix.columns && this.rows == matrix.rows))
      throw new Error('rows and colums must match on both matrix')
    return this.map((value, x, y) => value - matrix.get(x, y))
  }

  multiplyScaler(scaler){
    if(typeof scaler != 'number')
      throw new Error('scaler must be a number')
    return this.map(value => value * scaler)
  }

  _clacMultiplyValue(row, column, matrix){
    let value = 0
    for (var i=0; i<this.columns; i++){
      value += this.get(row, i) * matrix.get( i, column)
    }
    return value
  }

  multiplyMatrix(matrix){
    if (this.columns != matrix.rows) 
      throw new Error('TODO: matrixMult error')
    //if(this.rows != matrix.columns)
    let result = new Matrix(this.rows, matrix.columns)
    for(var x=0; x<result.rows;x++){ 
      for(var y=0; y<result.columns; y++){
        let value = this._clacMultiplyValue(x, y, matrix)
        result.set(x, y, value)
      }
    }
    return result
  }

  swapRows(i, j){
    if(i>=this.rows || j>=this.rows)
      throw new Error('out of bounds')
    let temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
    return this
  }

  swapColumns(i,j){
    if(i>=this.columns || j>=this.rows)
      throw new Error('out of bounds')
    for(var row=0;row<this.rows;row++){
      let temp = this.data[row][i]
      this.data[row][i] = this.data[row][j]
      this.data[row][j] = temp
    }
    return this
  }

  toString(){
    return this.data.map(row => row.join(', ')).join('\n')
  }
}

Matrix.identity = function(size){
  let result = new Matrix(size, size)
  for (let x=0; x<size; x++){
    for (let y=0; y<size; y++){
      if(x === y){
        result.set(x, y, 1)
      } else {
        result.set(x, y, 0)
      }
    }
  }
  return result
}

Matrix._validateFromData = function(data){
  if(!(data instanceof Array))
    throw new Error('data must be array') 
  if(data.length < 1)
    throw new Error('data must contain colums') 
  for(let i=0;i<data.length; data++){
    if(!(data[i] instanceof Array))
        throw new Error('each row must contain an array') 
    if(i>0)
      if(data[i].length != data[i-1].length)
        throw new Error('each row must have the same length') 
  }
}

Matrix.fromData = function(data){ 
  Matrix._validateFromData(data)
  let result = new Matrix(data.length, data[0].length)
  result.data = data
  return result
}

module.exports = Matrix

// rc0 1 2 3 
// 0 a b c d
// 1 e f g h
// 2 i j k l
// 3 m n o p

//   0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
// [ a b c d e f g h i j k  l  m  n  o  p ]
// r 0 0 0 0 1 1 1 1 2 2 2  2  3  3  3  3
// c 0 1 2 3 0 1 2 4 0 1 2  3  0  1  2  3

//   0 1 2 3
// [ a b c d ]
//    c       r
//0 * 2 + 0 * 2 = 0 = a
//1 * 2 + 0 * 2 = 2 = b

//    0 1 2 3
//   [a b c d] 0
//   [e f g h] 1 
//   [i j k l] 2
//   [m n o p] 3
// ]
