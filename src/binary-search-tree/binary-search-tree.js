class Node {
  constructor(key, value=null, parent=null, left=null, right=null){
    this.key = key
    this.value = value
    this.parent = parent
    this.left = left
    this.right = right
  }
  setLeft(child){
    child.parent = this
    this.left = child
  }
  setRight(child){
    child.parent = this
    this.right = child
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null
    this.nodeCount = 0
  }

  _insertNode(child, parent){
    if (!child) return this
    let _insert = (parent) => {
      if (parent.key < child.key){
        if (parent.right)
          return _insert(parent.right)
        return parent.setRight(child)
      } 
      if (parent.key > child.key){
        if (parent.left)
          return _insert(parent.left)
        return parent.setLeft(child)
      }
    }
    _insert(parent)
    return this
  }

  clear(){
    this.root = null
    this.nodeCount = 0
  }

  insert(key, value){
    let node = new Node(key, value)
    this.nodeCount++
    if(!this.root){
      this.root = node
      return this
    }
    return this._insertNode(node, this.root)
  }

  find(key){
    if(!this.root)
      return null
    let _find = (node) => {
      if (!node)
        return null
      if(node.key === key)
        return node
      if(node.key < key)
        return _find(node.right)
      return _find(node.left)
    }
    return _find(this.root)
  }

  min(){
    let current = this.root
    while (current.left)
      current = current.left
    return current
  }
  
  max(){
    let current = this.root
    while (current.right)
      current = current.right
    return current
  }

  extract(key){
    let node = this.find(key)
    if (!node) return null 
    this.nodeCount--
    let parent = node.parent 
    if (!parent) { // its the ROOT NODE
      if(!node.left && !node.right){
        this.root = null
        return node
      }
      if(node.left && !node.right){
        this.root = node.left
        this.root.parent = null
        node.left = null
        node.right = null
        return node
      }
      if(node.right && !node.left){
        this.root = node.right
        this.root.parent = null
        node.left = null
        node.right = null
        return node
      }
      this.root = node.left
      this.root.parent = null
      this._insertNode(node.right, this.root)
      node.left = null
      node.right = null
      return node
    } 
    // extract non-root
    if (parent.left == node) 
      parent.left = null
    if (parent.right == node)
      parent.right = null
    this._insertNode(node.left, parent)
    this._insertNode(node.right, parent)
    node.left = null
    node.right = null
    node.parent = null
    return node
  }

  traverseDepthInOrder(cb){
    let _inOrder = (node) => {
      if(!node) return
      _inOrder(node.left)
      cb(node)
      _inOrder(node.right)
    }
    _inOrder(this.root)
  }

  traverseDepthPreOrder(cb){
    let _inOrder = (node) => {
      if(!node) return
      cb(node)
      _inOrder(node.left)
      _inOrder(node.right)
    }
    _inOrder(this.root)
  }

  traverseDepthPostOrder(cb){
    let _inOrder = (node) => {
      if(!node) return
      _inOrder(node.left)
      _inOrder(node.right)
      cb(node)
    }
    _inOrder(this.root)
  }

  traverseBreadthMinFirst(cb){
    let _depth = (queue) => {
      if(!queue.length) return
      let current = queue.shift()
      cb(current)
      if(current.left)
        queue.push(current.left)
      if(current.right)
        queue.push(current.right)
      _depth(queue)
    }
    _depth([this.root])
  }

  traverseBreadthMaxFirst(cb){
    let _depth = (queue) => {
      if(!queue.length) return  
      let current = queue.shift()
      cb(current)
      if(current.right)
        queue.push(current.right)
      if(current.left)
        queue.push(current.left)
      _depth(queue)
    }
    _depth([this.root])
  }
}

module.exports = BinarySearchTree
