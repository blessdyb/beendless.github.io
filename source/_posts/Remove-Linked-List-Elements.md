---
title: Remove Linked List Elements
date: 2021-08-24 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Linked List
---

Let's take a look at a easy problem on Leetcode [203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/). We will demonstrate how to remove elements from a linked list.

Basically there are two ways to make it done. 

a. Since all nodes in the linked list have a previous node except the head node, we can use those node's previous node to delete those node. But if we have to remove the head node, we need to use a special logic. 
```golang
func removeElements(head *ListNode, val int) *ListNode {
    for ; head != nil && head.Val == val; {
        head = head.Next
    }
    for p := head; p != nil && p.Next != nil; {
        if p.Val == val {
            p.Next = p.Next.Next
        } else {
            p = p.Next
        }
    }
    return head
}
```

Golang Playbook: https://play.golang.org/p/ij55kvVD3aM

b. We can also add a virtual node to point to the head node, so all nodes including the head node have a previous node. With this change.
```golang
func removeElements(head *ListNode, val int) *ListNode {
	virtualNode := &ListNode{0, head}
	for p := virtualNode; p != nil && p.Next != nil; {
		if p.Next.Val == val {
			p.Next = p.Next.Next
		} else {
			p = p.Next
		}
	}
	return virtualNode.Next
}
```

Golang Playbook: https://play.golang.org/p/1tvSzIGDAm7
