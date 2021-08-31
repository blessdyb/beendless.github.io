---
title: Design A Linked List Class
date: 2021-08-30 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Linked List
---

For a given linked list, it has 3 common methods: GetByIndex, AddTo(Head/Tail/ToIndex), Delele. Similar to SQL's CURD. Let's see how to design a linked list class. [707. Design Linked List](https://leetcode.com/problems/design-linked-list/)

```golang
type Node struct {
    Val int
    Next *Node
}

type MyLinkedList struct {
    virtualNode *Node
    size int
}

func Constructor() MyLinkedList {
    return MyLinkedList{&Node{}, 0}
}

func (this *MyLinkedList) Get(index int) int {
    if index < 0 || index >= this.size {
        return -1
    }
    p := this.virtualNode
    for ; index > 0; index-- {
        p = p.Next
    }
    return p.Next.Val
}

func (this *MyLinkedList) AddAtHead(val int)  {
    this.virtualNode.Next = &Node{val, this.virtualNode.Next}
    this.size++
}

func (this *MyLinkedList) AddAtTail(val int)  {
    p := this.virtualNode
    for ; p.Next != nil; p = p.Next {}
    p.Next = &Node{val, nil}
    this.size++
}

func (this *MyLinkedList) AddAtIndex(index int, val int)  {
    if index > this.size {
        return
    }
    if index < 0 {
        index = 0
    }
    p := this.virtualNode
    for ; index > 0; index-- {
        p = p.Next
    }
    node := &Node{val, p.Next}
    p.Next = node
    this.size++
}

func (this *MyLinkedList) DeleteAtIndex(index int)  {
    if index < 0 || index >= this.size {
        return
    }
    p := this.virtualNode
    for ; index > 0; index-- {
        p = p.Next
    }
    p.Next = p.Next.Next
    this.size--
}

```