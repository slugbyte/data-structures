class Node { 
  constructor(char, isEnd=false){
    this.char = char
    this.isEnd = isEnd 
    this.parent = null
    this.children = {}
    this.childrenCount = 0
  }

  addChild(char, isEnd=false){
    let child = new Node(char, isEnd) 
    this.children[char] = child
    child.parent = this
    this.childrenCount = 0
  }

  getChild(char){
    return this.children[char]
  }
}

class Trie {
  constructor(){
    this.root = new Node('')
    this.wordCount = 0
    this.nodeCount = 1
  }

  clear(){
    this.root = new Node('')
    this.wordCount = 0
    this.nodeCount = 1
  }

  insert(text){
    let current = this.root
    let isLastChar = (index) => index === (text.length - 1)
    let lastCharIndex = text.length - 1 
    for(let i=0;i<text.length;i++){
      let char = text[i]
      let node = current.getChild(text[i])
      if(!node){
        current.addChild(char, isLastChar(i))
        this.nodeCount++
      }
      current = current.getChild(text[i])
    }
    if(current != this.root && !current.isEnd)
      current.isEnd = true
      this.wordCount++
    return this
  }

  find(text){
    let current = this.root
    let isLastChar = (index) => index === (text.length - 1)
    for(var i=0; i<text.length && current; i++){
      current = current.getChild(text[i])
    }
    if(!current || !current.isEnd) return null
    return current
  }

  delete(text){
    let current = this.find(text)
    if(!current || current == this.root) return
    current.isEnd = false
    while(current != this.root && !current.isEnd){ 
      current.parent.children[current.char] = undefined
      current = current.parent
      this.nodeCount--
    }
    this.wordCount--
    return this
  }
}

module.exports = Trie
