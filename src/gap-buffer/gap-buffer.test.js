const GapBuffer = require('./gap-buffer.js')

describe('GapBuffer', () => {
  test('#insertChar', () => {
    let buffer = new GapBuffer()
    buffer.insertChar('h')
    buffer.insertChar('e')
    buffer.insertChar('l')
    buffer.insertChar('l')
    buffer.insertChar('o')
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(buffer.after).toEqual([])
    try {
      buffer.insertChar('hello')
      throw new Error('should not hit this line')
    } catch(e){
      expect(e.message).toBe('insertChar only accepts a single charicter')
    }
  })

  test('#insertString', () => {
    let buffer = new GapBuffer()
    buffer.insertString('hello')
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(buffer.after).toEqual([])
    buffer.insertString('!!!')
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l', 'o','!','!','!'])
    expect(buffer.after).toEqual([])
  })

  test('#clear', () => {
    let buffer = new GapBuffer()
    buffer.insertString('hello').clear()
    expect(buffer.before).toEqual([])
    expect(buffer.after).toEqual([])
  })

  test('#shiftGap', () => {
    let buffer = new GapBuffer()
    buffer.insertString('hello')

    buffer.shiftGap(-2)
    expect(buffer.before).toEqual(['h', 'e', 'l'])
    expect(buffer.after).toEqual(['l', 'o'])

    buffer.shiftGap(1)
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l'])
    expect(buffer.after).toEqual([ 'o'])

    buffer.shiftGap(3)
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(buffer.after).toEqual([])

    buffer.shiftGap(-5)
    expect(buffer.before).toEqual([])
    expect(buffer.after).toEqual(['h', 'e', 'l', 'l', 'o'])
  })

  test('#moveGap', () => {
    let buffer = new GapBuffer()
    buffer.insertString('hello')
    buffer.moveGap(0)
    expect(buffer.before).toEqual([])
    expect(buffer.after).toEqual(['h', 'e', 'l', 'l', 'o'])

    buffer.moveGap(5)
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(buffer.after).toEqual([])

    buffer.moveGap(1)
    expect(buffer.before).toEqual(['h'])
    expect(buffer.after).toEqual([ 'e', 'l', 'l', 'o'])

    buffer.moveGap(3)
    expect(buffer.before).toEqual(['h', 'e', 'l' ])
    expect(buffer.after).toEqual([ 'l', 'o'])

    buffer.moveGap(7)
    expect(buffer.before).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(buffer.after).toEqual([])
  })

  test('#getCharAt', () => {
    let buffer = new GapBuffer().insertString('hello')
      .moveGap(3)

    expect(buffer.getCharAt(0)).toBe('h')
    expect(buffer.getCharAt(1)).toBe('e')
    expect(buffer.getCharAt(2)).toBe('l')
    expect(buffer.getCharAt(3)).toBe('l')
    expect(buffer.getCharAt(4)).toBe('o')
    expect(buffer.getCharAt(5)).toBeUndefined()
  })

  test('#deleteForward #deleteBackward', () => {
    let buffer = new GapBuffer()
    buffer.insertString('hello')

    buffer.moveGap(3).deleteBackward()
    expect(buffer.before).toEqual(['h', 'e',])
    expect(buffer.after).toEqual([ 'l', 'o'])
    buffer.deleteForward()
    expect(buffer.before).toEqual(['h', 'e',])
    expect(buffer.after).toEqual([ 'o'])

    buffer.clear().insertString('hello')
      .moveGap(3).deleteBackward(2)
    expect(buffer.before).toEqual(['h'])
    expect(buffer.after).toEqual([ 'l', 'o'])

    buffer.clear().insertString('hello')
      .moveGap(2).deleteForward(2)
    expect(buffer.before).toEqual(['h', 'e' ])
    expect(buffer.after).toEqual([  'o'])
  })

  test('#toString', () => {
    let buffer = new GapBuffer().insertString('hello world')
      .moveGap(5).deleteForward()
    expect(buffer.toString()).toEqual('helloworld')
  })
})
