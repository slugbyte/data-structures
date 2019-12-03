const AVLTree = require('./avl-tree.js')

describe('AVLTree', () => {
  test('#insert root right rotation', () => {
    let avl = new AVLTree()
    avl.insert(4, 'four')
    expect(avl.root.key).toBe(4)
    avl.insert(3, 'three')
    expect(avl.root.key).toBe(4)
    expect(avl.root.left.key).toBe(3)
    avl.insert(2, 'two')
    expect(avl.root.key).toBe(3)
    expect(avl.root.left.key).toBe(2)
    expect(avl.root.right.key).toBe(4)
    expect(avl.root.height).toBe(2)
    expect(avl.root.left.height).toBe(1)
    expect(avl.root.right.height).toBe(1)
  })

  test('#insert root left rotation', () => {
    let avl = new AVLTree()
    avl.insert(3, 'three')
    expect(avl.root.key).toBe(3)
    avl.insert(4)
    expect(avl.root.key).toBe(3)
    expect(avl.root.right.key).toBe(4)
    avl.insert(5)
    expect(avl.root.key).toBe(4)
    expect(avl.root.right.key).toBe(5)
    expect(avl.root.left.key).toBe(3)
  })

  test('#insert non-root left roatation', () => {
    let avl = new AVLTree()
    console.log('boom')
    avl.insert(7).insert(11).insert(5).insert(1).insert(15)
    .insert(14)
  })

  test('#insert non-root right roatation', () => {
    let avl = new AVLTree()
    console.log('boom 2')
    avl.insert(7).insert(11).insert(5).insert(1).insert(9)
    .insert(8)
  })

  test('#insert non-root right roatation', () => {
    let avl = new AVLTree()
    console.log('boom 2')
    avl.insert(7).insert(11).insert(5).insert(1).insert(9)
    .insert(8)
  })

  test('#insert non-root left-right roatation', () => {
    let avl = new AVLTree()
    console.log('boom 3')
    avl.insert(3).insert(2).insert(5).insert(1).insert(4).insert(7) 
    .insert(6).insert(8).insert(9)
    console.log(avl)
  })
  
})
