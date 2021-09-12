---
title: Design a Stack with Queue
date: 2021-09-12 11:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Queue
    - Stack
---

## [225. Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)

We can't use the similar solution we did for [Design a Queue with Stack](/2021/09/11/Design-a-Queue-with-Stack/). It is because unlike `Stack`,  moving elements from one `Queue` to another one won't change the sequence of elements. We have to pop out all previous elements added into the queue when adding a new element, in this way we can simulate a Stack.

```golang
type Queue []int

func (q *Queue)Empty() bool {
    return len(*q) == 0
}

func (q *Queue)Push(x int) {
    *q = append(*q, x)
}

func (q *Queue)Pop() int {
    var ret int
    if !q.Empty() {
        ret = (*q)[0]
        *q = (*q)[1:]
    }
    return ret
}

func (q *Queue)Top() int {
    var ret int
    if !q.Empty() {
        ret = (*q)[0]
    }
    return ret
}

type MyStack struct {
    m *Queue
}

func Constructor() MyStack  {
    return MyStack{
        &Queue{},
    }
}

func (s *MyStack) Empty() bool {
    return s.m.Empty()
}

func (s *MyStack) Top() int {
    return s.m.Top()
}

func (s *MyStack) Pop() int {
    return s.m.Pop()
}

func (s *MyStack) Push(x int) {
    n := len(*((*s).m))
    s.m.Push(x)
    for n > 0 {
        s.m.Push(s.m.Pop())
        n--
    }
}

```
