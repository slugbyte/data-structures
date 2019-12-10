const {
  isNumber,
  isString,
  assertTrue, 
  assertString,
  assertFunction,
  isNotUndefined,
} = require('../lib/validate.js')

class Vertex {
  constructor(key, value=null){
    this.key = key
    this.value = value
  }
}

class Graph {
  constructor(){
    this.vertices = {}
    this.edges = {}
    this.vertexCount = 0
    this.edgeCount = 0
  }

  addVertex(key, value){
    assertString(key, 'key is required')
    let vertex = new Vertex(key, value)
    this.vertices[key] = vertex
    this.edges[key] = {}
    this.vertexCount++
    return this
  }

  addEdge(keyA, keyB, weight=0){
    assertTrue(isString(keyA) && isString(keyB) 
      && isNumber(weight), 'keyA keyB and weight are required')
    if(!(this.hasVertex(keyA) && this.hasVertex(keyB)))
      return this
    this.edges[keyA][keyB] = weight
    this.edges[keyB][keyA] = weight
    this.edgeCount++
    return this
  }

  getVertex(key){
    assertString(key, 'key is required')
    if(this.hasVertex(key))
      return this.vertices[key]
    return null
  }

  getEdgeWeight(keyA, keyB){
    if(!this.hasEdge(keyA, keyB)) return null
    return this.edges[keyA][keyB]
  }

  hasVertex(key){
    assertString(key, 'key is required')
    return isNotUndefined(this.vertices[key])
  }

  hasEdge(keyA, keyB) {
    assertTrue(isString(keyA) && isString(keyB), 'keyA and are required')
    if(this.hasVertex(keyA) && this.hasVertex(keyB) 
      && isNotUndefined(this.edges[keyA]) && isNotUndefined(this.edges[keyB]) 
      && isNotUndefined(this.edges[keyA][keyB])) {
      return true
    }
    return false
  }

  deleteVirtex(key){
    assertString(key, 'key is required')
    if(this.hasVertex(key)){
      Object.keys(this.edges).forEach(edge => this.deleteEdge(edge, key))
      delete this.vertices[key] 
      delete this.edges[key]
      this.vertexCount--
    }
    return this
  }

  deleteEdge(keyA, keyB){
    assertTrue(isString(keyA) && isString(keyB), 'keyA and keyB are required')
    if(this.hasEdge(keyA, keyB)){
      delete this.edges[keyA][keyB]
      delete this.edges[keyB][keyA]
      this.edgeCount--
    }
    return this
  }

  traverseDepthFirst(key, cb){
    assertString(key, 'key is required')
    assertFunction(cb, 'callback is required')
    let visited = {}
    let _traverse = (current) => {
      if(this.hasVertex(current) && !visited[current]){
        cb(this.getVertex(current))
        visited[current] = true
        Object.keys(this.edges[current]).forEach(edge => {
          if(this.hasEdge(edge, current) && !visited[edge]) 
            _traverse(edge)
        })
      }
    }
    _traverse(key)
    return this
  }

  traverseBreadthFisrt(key, cb){
    assertString(key, 'key is required')
    assertFunction(cb, 'callback is required')
    let visited = {}
    let queue = [key]
    let _traverse = () => {
      if(queue.length == 0) return
      let current = queue.shift()
      if(this.hasVertex(current) && !visited[current]){
        cb(this.getVertex(current))
        visited[current] = true
        Object.keys(this.edges[current]).forEach(edge => {
          if(this.hasEdge(edge, current) && !visited[edge]) 
            queue.push(edge)
        })
        _traverse()
      }
    }
    _traverse()
    return this
  }
  
  traverseStack(key, cb){
    assertString(key, 'key is required')
    assertFunction(cb, 'callback is required')
    let visited = {}
    let queue = [key]
    let _traverse = () => {
      if(queue.length == 0) return
      let current = queue.pop()
      if(this.hasVertex(current) && !visited[current]){
        cb(this.getVertex(current))
        visited[current] = true
        Object.keys(this.edges[current]).forEach(edge => {
          if(this.hasEdge(edge, current) && !visited[edge]) 
            queue.push(edge)
        })
        _traverse()
      }
    }
    _traverse()
    return this
  }
}

module.exports = Graph
