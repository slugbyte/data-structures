class Node {
  constructor(key=null, value=null, left, right, parent){
    this.height = 1
    this.key = key 
    this.value = value 
    this.left = left || null
    this.right = right || null
    this.parent = parent || null
  }

  setValue(value){
    this.value = value
  }

  setLeft(child){
    this.left = child
    if(child)
      child.parent = this
  }

  setRight(child){
    this.right = child 
    if(child)
      child.parent = this
  }

  rightHeight(){
    return this.right ? this.right.height : 0
  }

  leftHeight(){
    return this.left ? this.left.height : 0
  }

  updateHeight(){
    this.height =  Math.max(this.rightHeight(), this.leftHeight()) + 1
  }
}

class AVLTree {
  constructor(){
    this.root = null
    this.nodeCount = 0
  }

  _rotateLeft(node){
    console.log('left roation')
    let parent = node.parent
    let temp = node.right 
    node.setRight(node.right.left)
    temp.setLeft(node)
    if(node == this.root)
      this.root = temp
    else if (node.parent.key < temp.key)
      node.parent.setRight(temp)
    else if (node.parent.key > temp.key)
      node.parent.setLeft(temp)
    if(temp.left)
      temp.left.parent = node
    node.parent = temp
    temp.parent = parent
    node.updateHeight()
    temp.updateHeight()
  }

  _rotateRight(node){
    console.log('right roation')
    let parent = node.parent
    let temp = node.left
    node.setLeft(node.left.right)
    temp.setRight(node)
    if(node == this.root)
      this.root = temp
    else if (node.parent.key > temp.key)
      node.parent.setLeft(temp)
    else if (node.parent.key < temp.key)
      node.parent.setRight(temp)
    if(temp.Right)
      temp.Right.parent = node
    node.parent = temp
    temp.parent = parent
    node.updateHeight()
    temp.updateHeight()
  }

  _rotateLeftRight(node){
    console.log('left-right rotation')
    this._rotateLeft(node.left)
    this._rotateRight(node)
  }

  _rotateRightLeft(node){
    console.log('right-left rotation')
    this._rotateRight(node.right)
    this._rotateLeft(node)
  }

  _balenceNode(node){ 
    if (!node) return
    node.updateHeight()
    let balance = node.leftHeight() - node.rightHeight() || 0  
    if (balance > 1){
      console.log(node.key, '>', node.left.key, 'balance:', balance)
      if(node.key > node.left.key)
        return this._rotateRight(node)
      else 
        return  this._rotateLeftRight(node)
    } if (balance < -1){
      console.log(node.key, '<', node.right.key, 'balance:', balance)
      if(node.key < node.right.key)
        return this._rotateLeft(node)
      else 
        return  this._rotateRightLeft(node)
    }
  }

  _insertLeft(child, parent){
    if (!parent.left) {
      parent.setLeft(child)
      this.nodeCount++
    } else {
      this._insertChildIntoParent(child, parent.left)
    }
    this._balenceNode(parent)
  }

  _insertRight(child, parent){
    if (!parent.right) {
      parent.setRight(child) 
      this.nodeCount++
    } else {
      this._insertChildIntoParent(child, parent.right)
    }
    this._balenceNode(parent)
  }

  _insertChildIntoParent(child, parent){
    if (!child || !parent) return
    if (child.key === parent.key) // UPDATE VALUE
      return parent.setValue(child.value)
    if (child.key < parent.key)
      return this._insertLeft(child, parent)
    return this._insertRight(child, parent)
  }


  insert(key, value){
    let child = new Node(key, value)
    if (!this.root){
      this.root = child
      this.nodeCount++
      this._balenceNode(this.root)
      return this
    }
    this._insertChildIntoParent(child, this.root)
    return this
    
  }

  traverseDepthInOrder(cb){
    let _inOrder = (node) => {
      if(node.left) _inOrder(node.left)
      cb(node)
      if(node.right) _inOrder(node.right)
    }
    _inOrder(this.root)
  }

}

AVLTree.Node = Node

module.exports = AVLTree
