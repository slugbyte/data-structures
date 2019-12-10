const {isNotUndefined} from '../lib/validate.js'

class Vertex {
  constructor(key, value=null){
    isNotUndefined(key, 'key is required')
    this.key = key
    this.value = value
  }
}

class Graph {
  constructor(){
    this.vertices = {}
    this.edges = {}
    this.vertexCount = 0
  }

  addVertex(key, value){
    let vertex = new Vertex(key, value)
    this.vertices[key] = vertex
    this.edges[key] = {}
    return this
  }

  containsVertex(key){
    return !!this.vertices[key]
  }

  addEdge(keyA, keyB, weight=0){
    if(!(this.containsVertex(keyA) && this.containsVertex(keyB)))
      return this
    this.edges[keyA][keyB] = weight
    this.edges[keyB][keyA] = weight
    return this
  }


}

module.exports = Graph
