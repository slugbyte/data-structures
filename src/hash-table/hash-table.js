const crypto = require('crypto')

class HashNode {
  constructor(key, value, next){
    this.key = key
    this.value = value
    this.next = null
  }
}

class HashTable {
  constructor(numBuckets=1024){
    this.buckets = new Array(numBuckets)
    this.numBuckets = numBuckets
  }

  _hash(key){
    let hash = crypto.createHash('sha1').update(key).digest().toString('hex')
    let result = 0
    for(let i=0; i<hash.length;i++){
      result += hash.charCodeAt(i) * (i + 1)
    }
    return result % this.numBuckets
  }

  clear(numBuckets){
    this.buckets = new Array(numBuckets || this.numBuckets)
    this.numBuckets = numBuckets || this.numBuckets
  }

  insert(key, value){ 
    let hashedKey = this._hash(key)
    let node = this.buckets[hashedKey]

    if (!node){
      this.buckets[hashedKey] = new HashNode(key, value)
      return this
    }

    while(true){
      if(node.key == key){
        node.value = value
        return this
      }
      if(!node.next){
        node.next = new HashNode(key, value)
        return this
      }
    }
  }
  
  delete(key){ 
    let hashedKey = this._hash(key)
    let node = this.buckets[hashedKey]

    if (!node){
      return this 
    }

    if(node.key == key){
      this.buckets[hashedKey] = node.next
      return this
    }

    let child = node.next
    while(child){
      if(child.key == key){
        node.next = child.next
        return this
      }
      bucket = bucket.next
      child = child.next
    }

    return this
  }

  get(key){
    let hashedKey = this._hash(key)
    let node = this.buckets[hashedKey]

    if (!node){
      return null
    }

    while(node){
      if (node.key == key){
        return node.value
      }
      node = node.next
    }

    return null
  }
}

module.exports = HashTable
