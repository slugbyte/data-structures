const CustomSet = require('./index.js')

describe('CustomSet', () => {
  it('#add, #remove, #contains, #size, and #isEmpty', () => {
    const set = new CustomSet()
    expect(set.isEmpty()).toBe(true)
    expect(set.size()).toBe(0)

    // boolean
    set.add(true)
    expect(set.size()).toBe(1)
    expect(set.isEmpty()).toBe(false)
    expect(set.contains(true)).toBe(true)
    expect(set.contains("true")).toBe(false)

    // string 
    set.add("cool")
    expect(set.size()).toBe(2)
    expect(set.isEmpty()).toBe(false)
    expect(set.contains("cool")).toBe(true)

    // number 
    set.add(22)
    expect(set.size()).toBe(3)
    expect(set.isEmpty()).toBe(false)
    expect(set.contains("22")).toBe(false)
    expect(set.contains(22)).toBe(true)

    set.remove(true)
    expect(set.size()).toBe(2)

    set.remove("cool")
    expect(set.size()).toBe(1)

    set.remove("22")
    expect(set.size()).toBe(1)

    set.remove(22)
    expect(set.size()).toBe(0)
    expect(set.isEmpty()).toBe(true)
  })

  it('#toArray', () => {
    let set = new CustomSet()
    set.add(true).add(11).add(4).add("false").add("hello world")
    let list = set.toArray()
    expect(list).toContain(true)
    expect(list).toContain(11)
    expect(list).toContain("false")
    expect(list).toContain("hello world")
    expect(list).not.toContain("true")
    expect(list).not.toContain("11")
    expect(list).not.toContain(false)
  })

  it('#union', () => {
    let a = new CustomSet()
    let b = new CustomSet()
    a.add('one').add("two").add("three")
    b.add('one').add(1).add(2).add(3)

    let result = a.union(b)
    expect(result.contains("one")).toBeTruthy()
    expect(result.contains("two")).toBeTruthy()
    expect(result.contains("three")).toBeTruthy()
    expect(result.contains(1)).toBeTruthy()
    expect(result.contains(2)).toBeTruthy()
    expect(result.contains(3)).toBeTruthy()
  })

  it('#intersect', () => {
    let a = new CustomSet()
    let b = new CustomSet()
    a.add('one').add("two").add("three").add(3)
    b.add('one').add(1).add(2).add(3)

    let result = a.intersect(b)
    expect(result.contains("one")).toBeTruthy()
    expect(result.contains(3)).toBeTruthy()

    expect(result.contains("two")).toBeFalsy()
    expect(result.contains("three")).toBeFalsy()
    expect(result.contains(1)).toBeFalsy()
    expect(result.contains(2)).toBeFalsy()
  })

  it('#diff', () => {
    let a = new CustomSet()
    let b = new CustomSet()
    a.add('one').add("two").add("three").add(3)
    b.add('one').add(1).add(2).add(3)

    let result = a.diff(b)
    expect(result.contains("two")).toBeTruthy()
    expect(result.contains("three")).toBeTruthy()

    expect(result.contains("one")).toBeFalsy()
    expect(result.contains(1)).toBeFalsy()
    expect(result.contains(2)).toBeFalsy()
    expect(result.contains(3)).toBeFalsy()
  })
})
