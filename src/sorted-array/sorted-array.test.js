const SortedArray = require('./sorted-array.js')

describe('SortedArray', () => {
  test('init', () => {
    let list = new SortedArray([1,4,5,3,7,10])
    expect(list.data).toEqual([1,3,4,5,7,10])

    expect(list[0]).toEqual(1)
    expect(list[1]).toEqual(3)
    expect(list[2]).toEqual(4)
  })

  test('#insert', () => {
    let list = new SortedArray()
    list.insert(4).insert(2).insert(8).insert(10)
    expect(list.data).toEqual([2,4,8,10])
  })

  test('#concat', () => {
    let listA = new SortedArray([1,2,3])
    let listB = new SortedArray([0,2,4,5]) 

    let listC = listA.concat(listB)
    expect(listC.data).toEqual([0,1,2,2,3,4,5])

    listC = listA.concat([0,2,4,5])
    expect(listC.data).toEqual([0,1,2,2,3,4,5])
  })

  
})
