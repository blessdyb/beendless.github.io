---
title: Modify Trees
date: 2021-09-27 23:35:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Binary Tree
---

## [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-Binary-search-tree/)

Highed balanced means left nodes and right nodes have the minimized same size difference.

```golang
func sortedArrayToBST(nums []int) *TreeNode {
    if len(nums) == 0 {
        return nil
    }
    mid := len(nums) / 2
    node := &TreeNode{nums[mid], nil, nil}
    node.Left = sortedArrayToBST(nums[:mid])
    node.Right = sortedArrayToBST(nums[mid + 1:])
    return node
}
```

## [701. Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

Naive BST recursively traversal
```golang
func insertIntoBST(root *TreeNode, val int) *TreeNode {
    if root == nil {
        return &TreeNode{val}
    }
    if root.Val > val {
        root.Left = insertIntoBST(root.Left, val)
    }
    if root.Val < val {
        root.Right = insertIntoBST(root.Right, val)
    }
    return root
}
```

## [450. Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

Naive BST recursively traversal
```golang
func deleteNode(root *TreeNode, key int) *TreeNode {
    if root != nil {
        if root.Val == key {
            if root.Right == nil {
                return root.Left
            }
            node := root.Right
            for node.Left != nil {
                node = node.Left
            }
            node.Left = root.Left
            return root.Right
        } else if root.Val < key {
            root.Right = deleteNode(root.Right, key)
        } else {
            root.Left = deleteNode(root.Left, key)
        }
    }
    return root
}
```

## [669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/)

Since it's a BST, we can avoid some calculation by comparing the root value with low, high value.

```golang
func trimBST(root *TreeNode, low int, high int) *TreeNode {
    if root != nil {
        if root.Val < low {
            return trimBST(root.Right, low, high)
        }
        if root.Val > high {
            return trimBST(root.Left, low, high)
        }
        root.Left = trimBST(root.Left, low, high)
        root.Right = trimBST(root.Right, low, high)
    }
    return root
}
```

## [538. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree/)

Since Inorder BST is a sorted slice, for greater tree, we need to get a reversed slice, which means we can still follow the Inorder traversal of the tree but right child node first.

```golang
func convertBST(root *TreeNode) *TreeNode {
    sum := 0
    stack := []*TreeNode{}
    current := root
    for {
        if current != nil {
            stack = append(stack, current)
            current = current.Right
        } else if len(stack) > 0 {
            current = stack[len(stack) - 1]
            stack = stack[:len(stack) - 1]
            sum += current.Val
            current.Val = sum
            current = current.Left
        } else {
            break
        }
    }
    return root
}
```