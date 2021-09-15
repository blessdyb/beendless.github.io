---
title: Tree Traversals DFS
date: 2021-09-13 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Binary Tree
    - DFS
---

## [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

a. Recursive solution
```golang
func inorderTraversal(root *TreeNode) []int {
    result := []int{}
    if root != nil {
        if root.Left != nil {
            result = append(result, inorderTraversal(root.Left)...)
        }
        result = append(result, root.Val)
        if root.Right != nil {
            result = append(result, inorderTraversal(root.Right)...)   
        }
    }
    return result
}
```

b. Iterative solution
```golang
func inorderTraversal(root *TreeNode) []int {
    result := []int{}
    stack := []int{}
    node := root
    for {
        if node != nil {  // reach to the left most node and push node to stack so we can pop left child node before parent node
            stack = append(stack, node.Val)
            node = node.Left
        } else if len(stack) > 0 {
            node = stack[len(stack) - 1]  // pop parent node out if it doesn't have left child node
            stack = stack[:len(stack) - 1]
            result = append(result, node.Val) // switch to right child node
            node = node.Right
        } else {
            break
        }
    }
    return result
}
```

c. Morris Traversal
```golang
func inorderTraversal(root *TreeNode) []int {
    result := []int{}
    current := root
    for current != nil {
        if current.Left == nil {
            result = append(result, current.Val)
            current = current.Right
        } else {
            previous := current.Left
            for previous.Right != nil && previous.Right != current {
                previous = previous.Right
            }
            if previous.Right == nil {
                previous.Right = current
                current = current.Left
            }
            if previous.Right == current {
                previous.Right = nil
                result = append(result, current.Val)
                current = current.Right
            }
        }
    }
    return result
}
```

## [144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)

a. Recursive solution
```golang
func preorderTraversal(root *TreeNode) []int {
    result := []int{}
    if root != nil {
        result = append(result, root.Val)
        result = append(result, preorderTraversal(root.Left)...)
        result = append(result, preorderTraversal(root.Right)...)
    }
    return result
}
```

b. Iterative traversal
```golang
func preorderTraversal(root *TreeNode) []int {
    result := []int{}
    stack := []*TreeNode{root}
    for len(stack) > 0{
        node := stack[len(stack) - 1]
        stack = stack[:len(stack) - 1]
        if node != nil {
            result = append(result, node.Val)
            stack = append(stack, node.Right)
            stack = append(stack, node.Left)
        }
    }
    return result
}
```

c. Morris Traversal
```golang
func preorderTraversal(root *TreeNode) []int {
    result := []int{}
    current := root
    for current != nil {
        if current.Left == nil {
            result = append(result, current.Val)
            current = current.Right
        } else {
            previous := current.Left
            for previous.Right != nil && previous.Right != current {
                previous = previous.Right
            }
            if previous.Right == nil {
                result = append(result, current.Val)
                previous.Right = current
                current = current.Left
            }
            if previous.Right == current {
                previous.Right = nil
                current = current.Right
            }
        }
    }
}
```

## [145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)

a. Recursive solution
```golang
func postorderTraversal(root *TreeNode) []int {
    result := []int{}
    if root != nil {
        result = append(result, postorderTraversal(root.Left)...)
        result = append(result, postorderTraversal(root.Right)...)
        result = append(result, root.Val)
    }
    return result
}
```

b. Iterative solution
```golang
func postorderTraversal(root *TreeNode) []int {
    result := []int{}
    stack := []*TreeNode{root, root}
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if node != nil {
            if len(stack) > 0 && node == stack[len(stack)-1] { // First time to visit the parent node
                stack = append(stack, node.Right)
                stack = append(stack, node.Right)
                stack = append(stack, node.Left)
                stack = append(stack, node.Left)
            } else {
                result = append(result, node.Val) // Second time to visit the parent node
            }
        }
    }
    return result
}
```

c. Morris Traversal

The idea is we make a PreOrder traversal but right node first, and reverse the result. 
```golang
func postorderTraversal(root *TreeNode) []int {
    result := []int{}
    current := root
    for current != nil {
        if current.Right == nil {
            result = append(result, current.Val)
            current = current.Left
        } else {
            previous := current.Right // get the right child's left most child, and point it back to parent node
            for previous.Left != nil && previous.Left != current {
                previous = previous.Left
            }
            if previous.Left == nil {
                result = append(result, current.Val)
                previous.Left = current
                current = current.Right
            }
            if previous.Left == current {
                previous.Left = nil
                current = current.Left
            }
        }
    }
    for i, j := 0, len(result) - 1; i < j; i, j = i + 1, j - 1 {
        result[i], result[j] = result[j], result[i]
    }
    return result
}
```
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