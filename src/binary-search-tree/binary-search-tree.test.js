const BinarySearchTree = require('./binary-search-tree.js')

describe('BinarySearchTree', () => {
  test('#insert, #find, #clear, #min, #max', () => {
    let bst = new BinarySearchTree()
    expect(bst.nodeCount).toBe(0)
    expect(bst.root).toBeNull()

    bst.insert(7, 'seven')
    expect(bst.nodeCount).toBe(1)
    expect(bst.root.key).toBe(7)
    expect(bst.root.value).toBe('seven')
    expect(bst.root.left).toBeNull()
    expect(bst.root.left).toBeNull()
    

    bst.insert(3)
    expect(bst.nodeCount).toBe(2)
    expect(bst.root.left.key).toBe(3)
    expect(bst.root.left.value).toBeNull()

    bst.insert(11)
    expect(bst.nodeCount).toBe(3)
    expect(bst.root.right.key).toBe(11)
    expect(bst.root.right.value).toBeNull()

    bst.insert(9)
    expect(bst.nodeCount).toBe(4)
    expect(bst.root.right.left.key).toBe(9)

    bst.insert(15)
    expect(bst.nodeCount).toBe(5)
    expect(bst.root.right.right.key).toBe(15)

    bst.insert(5)
    expect(bst.nodeCount).toBe(6)
    expect(bst.root.left.right.key).toBe(5)

    bst.insert(1, 'one')
    expect(bst.nodeCount).toBe(7)
    expect(bst.root.left.left.key).toBe(1)

    expect(bst.find(7).key).toBe(7)
    expect(bst.find(7).value).toBe('seven')

    expect(bst.find(3).key).toBe(3)
    expect(bst.find(3).value).toBeNull()

    expect(bst.find(1).key).toBe(1)
    expect(bst.find(1).value).toBe('one')
    
    expect(bst.find(15).key).toBe(15)
    expect(bst.find(2)).toBeNull()
    expect(bst.find(18)).toBeNull()

    expect(bst.min().key).toBe(1)
    expect(bst.max().key).toBe(15)

    bst.clear()
    expect(bst.root).toBeNull()
    expect(bst.nodeCount).toBe(0)

    
  })

  test('#extract', () => {
    // empty bst
    let bst = new BinarySearchTree()
    let extracted = bst.extract(8)
    expect(extracted).toBeNull()

    // test remove root without children
    bst = new BinarySearchTree()
    bst.insert(7)
    extracted = bst.extract(7)
    expect(extracted.key).toBe(7)
    expect(extracted.value).toBeNull()
    expect(extracted.left).toBeNull()
    expect(extracted.right).toBeNull()
    expect(extracted.parent).toBeNull()
    expect(bst.root).toBeNull()
    expect(bst.nodeCount).toBe(0)

    // test remove root with both children
    bst = new BinarySearchTree()
    bst.insert(7).insert(8).insert(3)
    extracted = bst.extract(7)
    expect(extracted.key).toBe(7)
    expect(extracted.value).toBeNull()
    expect(extracted.left).toBeNull()
    expect(extracted.right).toBeNull()
    expect(extracted.parent).toBeNull()
    expect(bst.nodeCount).toBe(2)
    expect(bst.root.key).toBe(3)
    expect(bst.root.right.key).toBe(8)
    expect(bst.root.left).toBeNull()

    // test remove root with only left child
    bst = new BinarySearchTree()
    bst.insert(7).insert(3)
    extracted = bst.extract(7)
    expect(extracted.key).toBe(7)
    expect(extracted.value).toBeNull()
    expect(extracted.left).toBeNull()
    expect(extracted.right).toBeNull()
    expect(extracted.parent).toBeNull()
    expect(bst.nodeCount).toBe(1)
    expect(bst.root.key).toBe(3)
    expect(bst.root.right).toBeNull()
    expect(bst.root.left).toBeNull()

    // test remove root with only right child
    bst = new BinarySearchTree()
    bst.insert(7).insert(8)
    extracted = bst.extract(7)
    expect(extracted.key).toBe(7)
    expect(extracted.value).toBeNull()
    expect(extracted.left).toBeNull()
    expect(extracted.right).toBeNull()
    expect(extracted.parent).toBeNull()
    expect(bst.nodeCount).toBe(1)
    expect(bst.root.key).toBe(8)
    expect(bst.root.right).toBeNull()
    expect(bst.root.left).toBeNull()

    // test remove child with parent and childen
    bst = new BinarySearchTree()
    bst.insert(7).insert(3).insert(11).insert(9)
      .insert(8).insert(10).insert(15)
    extracted = bst.extract(11)
    expect(extracted.key).toBe(11)
    expect(extracted.value).toBeNull()
    expect(extracted.left).toBeNull()
    expect(extracted.right).toBeNull()
    expect(extracted.parent).toBeNull()
    expect(bst.root.key).toBe(7)
    expect(bst.root.left.key).toBe(3)
    expect(bst.root.right.key).toBe(9)
    expect(bst.root.right.left.key).toBe(8)
    expect(bst.root.right.right.key).toBe(10)
    expect(bst.root.right.right.right.key).toBe(15)
    expect(bst.nodeCount).toBe(6)
  })

  test('traversals', () => {
    //       15
    //    11
    //        9
    // 7 
    //        5
    //     3
    //        1
    let bst = new BinarySearchTree()
    bst.insert(7).insert(3).insert(1).insert(5)
      .insert(11).insert(9).insert(15)
    let result = []
    bst.traverseDepthInOrder(node => {
      result.push(node.key)
    })
    expect(result).toEqual([1,3,5,7,9,11,15])

    result = []
    bst.traverseDepthPreOrder(node => {
      result.push(node.key)
    })
    expect(result).toEqual([7,3,1,5,11,9,15])

    result = []
    bst.traverseDepthPostOrder(node => {
      result.push(node.key)
    })
    expect(result).toEqual([1,5, 3, 9, 15, 11, 7])

    result = []
    bst.traverseBreadthMinFirst(node => {
      result.push(node.key)
    })
    expect(result).toEqual([7, 3, 11, 1, 5, 9, 15])

    result = []
    bst.traverseBreadthMaxFirst(node => {
      result.push(node.key)
    })
    expect(result).toEqual([7, 11, 3, 15, 9, 5, 1])
  }) 


})
