const Matrix = require('./matrix.js')

describe('Matrix', () => {
  test('#get #set', () => {
    let matrix = new Matrix(2, 2)
    
    matrix.set(0, 0, 1)
    expect(matrix.get(0, 0)).toBe(1)

    matrix.set(0, 1, 2)
    expect(matrix.get(0, 1)).toBe(2)

    matrix.set(1, 0, 3)
    expect(matrix.get(1, 0)).toBe(3)

    matrix.set(1, 1, 4)
    expect(matrix.get(1, 1)).toBe(4)

    expect(matrix.get(0,2)).toBeNull()
    expect(matrix.get(2,0)).toBeNull()
    expect(matrix.get(2,2)).toBeNull()
    expect(matrix.get(0,-1)).toBeNull()
    expect(matrix.get(-1,0)).toBeNull()
    expect(matrix.get(-1,-1)).toBeNull()
  })

  test('#add', () => {
    let matrixA = new Matrix(2,2)
    matrixA.add(2)
    expect(matrixB.data).toEqual([2,2,2,2])
  })
})
