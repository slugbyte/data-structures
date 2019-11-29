const Enum = require('./enum.js')

describe('enum', () => {
  test('testing enum', () => {
    let temp = new Enum('red', 'blue', 'green')
    let red = temp.red
    let blue = temp.blue
    let green = temp.green

    expect(red).not.toEqual('red')
    expect(blue).not.toEqual('blue')
    expect(green).not.toEqual('green')

    expect(red).toEqual(temp.red)
    expect(blue).toEqual(temp.blue)
    expect(green).toEqual(temp.green)

    expect(temp.isRED(red)).toEqual(true)
    expect(temp.isBLUE(blue)).toEqual(true)
    expect(temp.isGREEN(green)).toEqual(true)
  })

  test('should work with a switch statement', () => {
    let temp = new Enum('red', 'blue', 'green')

    switch(temp.green){
      case temp.red:
        throw new Error('booo')
      case temp.blue:
        throw new Error('booo')
      case temp.green:
        // no error will throw and test will pass
        return 
      default:
        throw new Error('booo')
    }
  })
  
})
