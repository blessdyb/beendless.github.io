---
title: Design a Queue with Stack
date: 2021-09-11 11:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Queue
    - Stack
---

## [232. Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)

Since `Queue` is `FIFO` but `Stack` is `FILO`. If we need to use `Stack` to implement a `Queue`, we need to use at least two `Stack`s. So we use one stack which only handle `Push` operations, and another `Stack` which only handle `Pop`/`Peek` operations. And we move elements from the `Pop` only `Stack` to the other one when `Pop`/`Peek` get called. It will reverse the `FILO` stack elements sequence after that. So we get a `FIFO` sequence.

```golang
type Stack []int

func (s *Stack)Empty() bool {
    return len(*s) == 0
}

func (s *Stack)Push(x int) {
    *s = append(*s, x)
}

func (s *Stack)Pop() int {
    var ret int
    if !s.Empty() {
        lastIndex := len(*s) - 1
        ret = (*s)[lastIndex]
        *s = (*s)[:lastIndex]
    }
    return ret
}

func (s *Stack)Peek() int {
    var ret int
    if !s.Empty() {
        ret = (*s)[len(*s) - 1]
    }
    return ret
}

type MyQueue struct {
    m, n *Stack
}

func Constructor() MyQueue {
    return MyQueue{
        &Stack{},
        &Stack{},
    }
}

func (q *MyQueue)Push(x int) {
    q.m.Push(x)
}

func (q *MyQueue)Pop() int {
    q.Peek()
    return q.n.Pop()
}

func (q *MyQueue)Peek() int {
    if q.n.Empty() {
        for !q.m.Empty() {
            q.n.Push(q.m.Pop())
        }
    }
    return q.n.Peek()
}


func (q *MyQueue)Empty() bool {
    return q.m.Empty() && q.n.Empty()
}

```

* https://leetcode.com/problems/implement-queue-using-stacks/discuss/64206/Short-O(1