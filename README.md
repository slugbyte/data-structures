# Data Structures in Javascript
[![Build Status](https://travis-ci.org/slugbyte/data-structures.svg?branch=master)](https://travis-ci.org/slugbyte/data-structures)

![abstract data structure drawing](https://github.com/slugbyte/data-structures/raw/master/assets/data-structures-header.png)


## Goals
* The implementations will be test-driven.
* Each data structure will have documentation. 

## What are "abstract data types"?
When the words "data type" are used together they often refer to a model of some "type" of information. The phrase "data type" may remind you of _primitive_ data types in programming languages like floating point numbers, integers, booleans, and characters, or perhaps it reminds you of more complex data types such as JPEG image files, WAV audio files, and MP4 movie files. If you are familiar with Object-Oriented Programming (OOP), you should be used to modeling all types of information into classes which could be thought of as "types". For example, you may have at some point modeled user data, website content, or video game state.   

Wherever there is data in software there are usually actions that can be performed on that data. These actions are typically functions designed to limit the ways in which the data can be mutated (modified). One of OOP's main goals was to couple data types with its actions (class methods).  
 
Over time, many software design patterns have emerged as programmers have realized certain data types, data actions, and software architectures have repeatedly solved specific common problems. One category of design patterns that has emerged is called Abstract Data Types (ADTs). ADTs are models for data types that are defined by their behavior instead of their information. At first, this can seem a bit confusing, but it's only giving a name (ADT) to a thing that programmers naturally do; coupling actions with data. Often this is thought of in reverse - like data is thought to have a type, and actions can belong to that type. However, ADTs define common behaviors or actions as a type and agnostic to the kind of information stored.

Abstract data types are amazing tools that solve many common programming problems. Learning to implement them can greatly enhance your understanding of software design problems. 

## General Abstrat Data Structures
* ✔︎ [Singly Linked List](./src/singly-linked-list)
* ✔︎ [Doubly Linked List](./src/doubly-linked-list)
* ✔︎ [Array](./src/array)
* ✔︎ [Enum](./src/enum)
* ✔︎ [Stack](./src/stack)
* ✔︎ [Queue](./src/queue)
* ✔︎ [Set](./src/set)
* ✔︎ [Hash Table](./src/hash-table)
* ✔︎ [Min Heap](./src/min-heap)
* ✔︎ [Max Heap](./src/max-heap)
* ✔︎ [Binary Search Tree](./src/binary-search-tree)

### TODO
1. ✗ Trie 
1. ✗ Rope
1. ✗ Observable
1. ✗ Binomial Heap
1. ✗ Directed Graph 
1. ✗ Circular Buffer
1. ✗ Double Hashed Hash Table
1. ✗ B-Tree
1. ✗ AA Tree
1. ✗ AVL Tree
1. ✗ K-Ary Tree
1. ✗ Ternary Tree
1. ✗ Cartesian Tree
1. ✗ Red-Black Tree

## References
* [https://en.wikipedia.org/wiki/Abstract_data_type](https://en.wikipedia.org/wiki/Double_hashing)

## License 
[MIT](https://github.com/slugbyte/data-structures/blob/master/LICENSE.md)
