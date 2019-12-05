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

  test('Matrix.identity', () => {
    let two = Matrix.identity(2)
    expect(two.get(0, 0)).toBe(1)
    expect(two.get(1, 1)).toBe(1)
    expect(two.get(1, 0)).toBe(0)
    expect(two.get(0, 1)).toBe(0)


    let three = Matrix.identity(3)
    expect(three.get(0, 0)).toBe(1)
    expect(three.get(1, 1)).toBe(1)
    expect(three.get(2, 2)).toBe(1)
    expect(three.get(1, 0)).toBe(0)
    expect(three.get(0, 1)).toBe(0)
    expect(three.get(1, 2)).toBe(0)
    expect(three.get(2, 1)).toBe(0)
    expect(three.get(2, 0)).toBe(0)
    expect(three.get(0, 2)).toBe(0)
  })


  test('Matrix.fromData', () => {
    let matrix = Matrix.fromData([
      [1,2,3],
      [4,5,6],
    ])

    expect(matrix.get(0,0)).toBe(1)
    expect(matrix.get(0,1)).toBe(2)
    expect(matrix.get(0,2)).toBe(3)
    expect(matrix.get(1,0)).toBe(4)
    expect(matrix.get(1,1)).toBe(5)
    expect(matrix.get(1,2)).toBe(6)
  })

  test('#add, #subtract', () => {
    let a = Matrix.fromData([[1,2],[3,4]])
    let b = Matrix.fromData([[10,20],[30,40]])

    let c = a.add(b)
    expect(c.get(0,0)).toBe(11)
    expect(c.get(0,1)).toBe(22)
    expect(c.get(1,0)).toBe(33)
    expect(c.get(1,1)).toBe(44)

    let d = b.subtract(a)
    expect(d.get(0,0)).toBe(9)
    expect(d.get(0,1)).toBe(18)
    expect(d.get(1,0)).toBe(27)
    expect(d.get(1,1)).toBe(36)
  })

  test('#multiplyScaler', () => {
    let a = Matrix.fromData([[1,2],[3,4]])
    let b = a.multiplyScaler(2)
    expect(b.get(0,0)).toBe(2)
    expect(b.get(0,1)).toBe(4)
    expect(b.get(1,0)).toBe(6)
    expect(b.get(1,1)).toBe(8)
  })

  test('#multiplyMatrix', () => {
    let a = Matrix.fromData([[0,1,2],[3,4,5]])
    let b = Matrix.fromData([[6,7],[8,9],[10,11]])
    let c = a.multiplyMatrix(b)
    expect(c.get(0,0)).toBe(28)
    expect(c.get(0,1)).toBe(31)
    expect(c.get(1,0)).toBe(100)
    expect(c.get(1,1)).toBe(112)

    let d = Matrix.fromData([[1,2],[3,4]])
    let e = Matrix.fromData([[5,6,7],[8,9,10]])
    let f = d.multiplyMatrix(e)

    expect(f.get(0, 0)).toBe(21)
    expect(f.get(0, 1)).toBe(24)
    expect(f.get(0, 2)).toBe(27)
    expect(f.get(1, 0)).toBe(47)
    expect(f.get(1, 1)).toBe(54)
    expect(f.get(1, 2)).toBe(61)

    let g = Matrix.fromData([
      [0, 2, 5, 2],
      [.4, 0, 0, 0],
      [0, .5, 0, 0],
      [0, 0, .6, 0],
    ])

    let h = Matrix.fromData([
      [5],
      [2],
      [2],
      [2],
    ])

    let i = g.multiplyMatrix(h)
    expect(i.get(0,0)).toBe(18)
    expect(i.get(1,0)).toBe(2)
    expect(i.get(2,0)).toBe(1)
    expect(i.get(3,0)).toBe(1.2)
  })

  test('#swapRows, #swapColumns', () => {
    let matrix = Matrix.fromData([
      [1,2],
      [3,4],
    ])
    expect(matrix.get(0,0)).toBe(1)
    expect(matrix.get(0,1)).toBe(2)
    expect(matrix.get(1,0)).toBe(3)
    expect(matrix.get(1,1)).toBe(4)

    matrix.swapRows(0, 1)

    expect(matrix.get(0,0)).toBe(3)
    expect(matrix.get(0,1)).toBe(4)
    expect(matrix.get(1,0)).toBe(1)
    expect(matrix.get(1,1)).toBe(2)

    matrix.swapColumns(0, 1)
    expect(matrix.get(0,0)).toBe(4)
    expect(matrix.get(0,1)).toBe(3)
    expect(matrix.get(1,0)).toBe(2)
    expect(matrix.get(1,1)).toBe(1)
  })

})
