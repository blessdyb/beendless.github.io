---
title: Tree Traversals BFS
date: 2021-09-14 22:35:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Binary Tree
    - BFS
---

## [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

a. BFS solution
```golang
func levelOrder(root *TreeNode) [][]int {
    result := [][]int{}
    queue := []*TreeNode{root}
    n := 1
    for n > 0 {
        temp := []int{}
        for n > 0 {
            node := queue[0]
            queue = queue[1:]
            if node != nil {
                temp = append(temp, node.Val)
                queue = append(queue, node.Left)
                queue = append(queue, node.Right)
            }
            n--
        }
        n = len(queue)
        if len(temp) > 0 {
            result = append(result, temp)
        }
    }
    return result
}
```

b. DFS solution

The idea is passing the level while traversing the tree
```golang
func dfs(node *TreeNode, level int, result *[][]int) {
    if node != nil {
        if len(*result) < level {
            *result = append(*result, []int{})
        }
        (*result)[level - 1] = append((*result)[level - 1], node.Val)
        dfs(node.Left, level + 1, result)
        dfs(node.Right, level + 1, result)
    }
}

func levelOrder(root *TreeNode) [][]int {
    result := [][]int{}
    dfs(root, 1, &result)
    return result
}

```
## [107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)

We just need to reverse the result of BFS
```golang
func levelOrderBottom(root *TreeNode) [][]int {
    result := [][]int{}
    queue := []*TreeNode{root}
    n := 1
    for n > 0 {
        temp := []int{}
        for n > 0 {
            node := queue[0]
            queue = queue[1:]
            if node != nil {
                temp = append(temp, node.Val)
                queue = append(queue, node.Left)
                queue = append(queue, node.Right)
            }
            n--
        }
        n = len(queue)
        if len(temp) > 0 {
            result = append(result, temp)
        }
    }
    for i, j := 0, len(result) - 1; i < j; i, j = i + 1, j - 1 {
        result[i], result[j] = result[j], result[i]
    }
    return result
}
```