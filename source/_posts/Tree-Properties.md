---
title: Tree Properties
date: 2021-09-19 21:35:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Binary Tree
---

## [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

a. DFS solution
```golang
func isSymmetric(root *TreeNode) bool {
    return testSymmetric(root, root)
}

func testSymmetric(a, b *TreeNode) bool {
    if a == nil && b == nil {
        return true
    } else if a != nil && b != nil && a.Val == b.Val{
        return testSymmetric(a.Left, b.Right) && testSymmetric(a.Right, b.Left)
    }
    return false
}
```

b. BFS solution
```golang
func isSymmetric(root *TreeNode) bool {
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        n := len(queue)
        for i, j := 0, n - 1; i < j; i, j = i + 1, j - 1 {
            if !testSymmetric(queue[i], queue[j]) {
                return false
            }
        }
        for i := 0; i < n; i++ {
            node := queue[i]
            if node != nil {
                queue = append(queue, node.Left)
                queue = append(queue, node.Right)
            }
        }
        queue = queue[n:]
    }
    return true
}

func testSymmetric(a, b *TreeNode) bool {
    if a == nil && b == nil {
        return true
    } else if a != nil && b != nil && a.Val == b.Val{
        return true
    }
    return false
}
```

## [559. Maximum Depth of N-ary Tree](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/)

a. DFS solution
```golang
import "math"
func maxDepth(root *Node) int {
    if root != nil {
        max := math.Inf(-1)
        for _, node := range root.Children {
            depth := maxDepth(node)
            if max < float64(depth) {
                max = float64(depth)
            }
        }
        if max == math.Inf(-1) {
            max = 0
        }
        return 1 + int(max)
    }
    return 0
}
```

b. BFS solution
```golang
func maxDepth(root *Node) int {
    n := 0
    if root != nil {
        queue := []*Node{root}
        for len(queue) > 0 {
            length := len(queue)
            for i := 0; i < length; i++ {
                node := queue[i]
                for _, child := range node.Children {
                    queue = append(queue, child)
                }
            }
            queue = queue[length:]
            n++
        }   
    }
    return n
}
```

## [222. Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/)

a. DFS recursion
```golang
func countNodes(root *TreeNode) int {
    n := 0
    if root != nil {
        return 1 + countNodes(root.Left) + countNodes(root.Right)
    }
    return n   
}
```

b. BFS recursion
```golang
func countNodes(root *TreeNode) int {
    n := 0
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        if node != nil {
            n++
            queue = append(queue, node.Left)
            queue = append(queue, node.Right)
        }
    }
    return n
}
```

c. Complete tree property

For a full binary tree, it has 2$depth$ - 1 nodes. Since a full binary tree is a subset of complete tree, based on the equation, we can calculate the nodes of a given tree if it's left most child node's depth equals it's right most child note's depth.

```golang
func countNodes(root *TreeNode) int {
    if root == nil {
        return 0
    }
    left := root.Left
    right := root.Right
    l, r := 0, 0
    for left != nil {
        l++
        left = left.Left
    }
    for right != nil {
        r++
        right = right.Right
    }
    if l == r { // It's a full binary tree
        return 2 << l - 1
    }
    return countNodes(root.Left) + countNodes(root.Right) + 1
}
```