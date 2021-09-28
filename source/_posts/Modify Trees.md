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

## [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-Binary-search-tree/)

## [669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/)

## [538. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree/)