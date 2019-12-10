const Graph = require("./graph.js")

describe('Graph', () => {
  test('#addVertex #hasVertex #getVertex', () => {
    let graph = new Graph()
    expect(graph.vertexCount).toBe(0)

    expect(graph.hasVertex('a')).toBeFalsy()
    expect(graph.getVertex('a')).toBeNull()
    graph.addVertex('a', 'aaaa')

    expect(graph.vertexCount).toBe(1)
    expect(graph.hasVertex('a')).toBeTruthy()
    expect(graph.getVertex('a').value).toBe('aaaa')

    graph.addVertex('b')
    expect(graph.vertexCount).toBe(2)
    expect(graph.hasVertex('a')).toBeTruthy()
    expect(graph.getVertex('b').value).toBeNull()
  })

  test('#addEdge #hasEdge #getEdgeWeight', () => {
    let graph = new Graph()
    graph.addVertex('a').addVertex('b').addVertex('c')

    expect(graph.hasEdge('a', 'b')).toBeFalsy()
    expect(graph.getEdgeWeight('a', 'b')).toBeNull()

    graph.addEdge('a', 'b').addEdge('c', 'b', 11)
    expect(graph.edgeCount).toBe(2)
    expect(graph.hasEdge('a', 'b')).toBeTruthy()
    expect(graph.hasEdge('b', 'a')).toBeTruthy()
    expect(graph.getEdgeWeight('a', 'b')).toBe(0)
    expect(graph.getEdgeWeight('b', 'a')).toBe(0)

    expect(graph.hasEdge('c', 'b')).toBeTruthy()
    expect(graph.hasEdge('b', 'c')).toBeTruthy()
    expect(graph.getEdgeWeight('c', 'b')).toBe(11)
    expect(graph.getEdgeWeight('b', 'c')).toBe(11)

    expect(graph.hasEdge('c', 'a')).toBeFalsy()
  })


  test('#deleteVirtex #deleteEdge', () => {
    let graph = new Graph()
    graph.addVertex('a').addVertex('b').addVertex('c')
    graph.addEdge('a', 'b').addEdge('c', 'b').addEdge('c', 'a')
    expect(graph.vertexCount).toBe(3)
    expect(graph.edgeCount).toBe(3)

    graph.deleteEdge('a', 'b')
    expect(graph.vertexCount).toBe(3)
    expect(graph.edgeCount).toBe(2)
    expect(graph.hasEdge('b', 'a')).toBeFalsy()
    expect(graph.hasEdge('a', 'b')).toBeFalsy()

    graph.deleteVirtex('a')
    expect(graph.vertexCount).toBe(2)
    expect(graph.edgeCount).toBe(1)
    expect(graph.hasEdge('c', 'a')).toBeFalsy()
    expect(graph.hasEdge('a', 'c')).toBeFalsy()
    expect(graph.hasVertex('a')).toBeFalsy()

    expect(graph.hasEdge('c', 'b')).toBeTruthy()
    expect(graph.hasEdge('b', 'c')).toBeTruthy()
  })

  test.only('traversals', () => {
    let graph = new Graph()
    graph.addVertex('a').addVertex('b').addVertex('c')
      .addVertex('d').addVertex('e').addVertex('f')
      .addEdge('a', 'b').addEdge('b', 'c')
      .addEdge('a', 'd').addEdge('d', 'e')
      .addEdge('e', 'f')

    let depth = []
    graph.traverseDepthFirst('a', v => {
      depth.push(v.key)
    })
    expect(depth).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])

    let breadth = []
    graph.traverseBreadthFisrt('a', v => {
      breadth.push(v.key)
    })
    expect(breadth).toEqual(['a', 'b', 'd', 'c', 'e', 'f'])

    let stack = []
    graph.traverseStack('a', v => {
      stack.push(v.key)
    })
    expect(stack).toEqual(['a', 'd', 'e', 'f', 'b', 'c'])
  })
})
