const BitArray = require('./bit-array.js')

describe('BitArray', () => {
  test('BitArray.fromArray', () => {
    let buffer = BitArray.fromArray([0,1,0,true])
    expect(buffer.toNumber()).toBe(5)
  })

  test('#setBit, #getBit, #flipBit, #toNumber', () => {
    let buffer = new BitArray(8)
    buffer.setBit(0, 1)
    expect(buffer.getBit(0)).toBe(1)
    expect(buffer.data[7]).toBe(1)

    buffer.setBit(3, true)
    expect(buffer.getBit(3)).toBe(1)
    expect(buffer.data[4]).toBe(1)

    buffer.setBit(8, 1)
    expect(buffer.data).toEqual([0,0,0,0,1,0,0,1])

    expect(buffer.toNumber()).toBe(9)

    buffer.flipBit(0)
    expect(buffer.data).toEqual([0,0,0,0,1,0,0,0])
  })

  test('#and', () => {
    let a = BitArray.fromArray([0,0,0,0,1,1,1,1])
    let b = BitArray.fromArray([0,1,0,1])
    let resultA = a.and(b)
    expect(resultA.size).toBe(8)
    expect(resultA.toNumber()).toBe(5)

    let resultB = b.and(a)
    expect(resultB.size).toBe(8)
    expect(resultB.toNumber()).toBe(5)
  })

  test('#or', () => {
    let a = BitArray.fromArray([0,0,0,0,1,1,1,1])
    let b = BitArray.fromArray([0,1,0,1])
    let resultA = a.or(b)
    expect(resultA.size).toBe(8)
    expect(resultA.toNumber()).toBe(15)

    let resultB = b.or(a)
    expect(resultB.size).toBe(8)
    expect(resultB.toNumber()).toBe(15)
  })

  test('#xor', () => {
    let a = BitArray.fromArray([0,0,0,0,1,1,1,1])
    let b = BitArray.fromArray([0,1,0,1])
    let resultA = a.xor(b)
    expect(resultA.size).toBe(8)
    expect(resultA.toNumber()).toBe(10)

    let resultB = b.xor(a)
    expect(resultB.size).toBe(8)
    expect(resultB.toNumber()).toBe(10)
  })

  test('#shiftLeft', () => {
    let buffer = BitArray.fromArray([0,0,0,0,1,1,1,1])
    buffer.shiftLeft()
    expect(buffer.data).toEqual([0,0,0,1,1,1,1,0])

    buffer.shiftLeft(2)
    expect(buffer.data).toEqual([0,1,1,1,1,0,0,0])
  })

  test('#shiftRight', () => {
    let buffer = BitArray.fromArray([0,0,0,0,1,1,1,1])

    buffer.shiftRight()
    expect(buffer.data).toEqual([0,0,0,0,0,1,1,1])

    buffer.shiftRight(2)
    console.log(buffer)
    expect(buffer.data).toEqual([0,0,0,0,0,0,0,1])
  })
})
