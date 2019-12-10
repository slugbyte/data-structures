const DirectedGraph = require("./directed-graph.js")

describe('graph', () => {
  test('#addVertex #hasVertex #getVertex', () => {
    let graph = new DirectedGraph()
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
    let graph = new DirectedGraph()
    graph.addVertex('a').addVertex('b').addVertex('c')

    expect(graph.hasEdge('a', 'b')).toBeFalsy()
    expect(graph.getEdgeWeight('a', 'b')).toBeNull()

    graph.addEdge('a', 'b').addEdge('c', 'b', 11)
    expect(graph.edgeCount).toBe(2)
    expect(graph.hasEdge('a', 'b')).toBeTruthy()
    expect(graph.hasEdge('b', 'a')).toBeFalsy()
    expect(graph.getEdgeWeight('a', 'b')).toBe(0)
    expect(graph.getEdgeWeight('b', 'a')).toBeNull()

    graph.addEdge('b', 'a')
    expect(graph.hasEdge('b', 'a')).toBeTruthy()
    expect(graph.edgeCount).toBe(3)
    expect(graph.getEdgeWeight('b', 'a')).toBe(0)

    expect(graph.hasEdge('c', 'b')).toBeTruthy()
    expect(graph.hasEdge('b', 'c')).toBeFalsy()
    expect(graph.getEdgeWeight('c', 'b')).toBe(11)
    expect(graph.getEdgeWeight('b', 'c')).toBeNull()

    expect(graph.hasEdge('c', 'a')).toBeFalsy()
  })


  test('#deleteVirtex #deleteEdge', () => {
    let graph = new DirectedGraph()
    graph.addVertex('a').addVertex('b').addVertex('c')
    .addVertex('d')
    .addEdge('a', 'b').addEdge('c', 'b').addEdge('c', 'a')
    .addEdge('b', 'a').addEdge('c', 'd')
    expect(graph.vertexCount).toBe(4)
    expect(graph.edgeCount).toBe(5)

    graph.deleteEdge('a', 'b')
    expect(graph.vertexCount).toBe(4)
    expect(graph.edgeCount).toBe(4)
    expect(graph.hasEdge('a', 'b')).toBeFalsy()
    expect(graph.hasEdge('b', 'a')).toBeTruthy()

    graph.deleteVirtex('a')
    expect(graph.vertexCount).toBe(3)
    expect(graph.edgeCount).toBe(2)
    expect(graph.hasEdge('c', 'a')).toBeFalsy()
    expect(graph.hasEdge('b', 'a')).toBeFalsy()
    expect(graph.hasVertex('a')).toBeFalsy()

    expect(graph.hasEdge('c', 'd')).toBeTruthy()
    expect(graph.hasEdge('c', 'b')).toBeTruthy()
  })

  test('traversals', () => {
    let graph = new DirectedGraph()
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
