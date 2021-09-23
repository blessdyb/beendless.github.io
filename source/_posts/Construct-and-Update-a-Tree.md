---
title: Construct and Update a Tree
date: 2021-09-23 00:00:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Binary Tree
---

## [1008. Construct Binary Search Tree from Preorder Traversal](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

Based on the preorder traversal definition for a BST, the first element in the slice is always coming from the root node, we can split the rest elements into two parts from the element which is no less than the root node for child nodes.

```golang
func bstFromPreorder(preorder []int) *TreeNode {
    var root *TreeNode
    length := len(preorder)
    if length > 0 {
        root = &TreeNode{}
        root.Val = preorder[0]
        i := 1
        for i < length {
            if preorder[i] >= root.Val {
               break 
            }
            i++
        }
        root.Left = bstFromPreorder(preorder[1:i])
        root.Right = bstFromPreorder(preorder[i:])
    }
    return root
}
```

## [106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

The last element in postorder slice is the root node, with this information, we can split inorder to a left subtree and a right subtree. Since now we know the amount of nodes in the left subtree, we can go back to split the postorder list into two.
```golang
func indexOf(haystack []int, needle int) int {
    for i := range haystack {
        if haystack[i] == needle {
            return i
        }
    }
    return -1
}

func buildTree(inorder []int, postorder []int) *TreeNode {
    var root *TreeNode
    if len(inorder) > 0 {
        root = &TreeNode{}
        rootValue := postorder[len(postorder) - 1]
        root.Val = rootValue
        inorderLeftIndex := indexOf(inorder, rootValue)
        inorderLeft := inorder[:inorderLeftIndex]
        inorderRight := inorder[inorderLeftIndex + 1:]
        postorderLeft := postorder[:len(inorderLeft)]
        postorderRight := postorder[len(inorderLeft):len(postorder) - 1]
        root.Left = buildTree(inorderLeft, postorderLeft)
        root.Right = buildTree(inorderRight, postorderRight)
    }
    return root
}
```

## [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

Similar to the above one, we can get the root node first from preorder slice.
```golang
func indexOf(haystack []int, needle int) int {
    for i := range haystack {
        if haystack[i] == needle {
            return i
        }
    }    
    return -1
}

func buildTree(preorder []int, inorder []int) *TreeNode {
    var root *TreeNode
    if len(preorder) > 0 {
        rootValue := preorder[0]
        rootValueIndex := indexOf(inorder, rootValue)
        inorderLeft := inorder[:rootValueIndex]
        inorderRight := inorder[rootValueIndex + 1:]
        preorderLeft := preorder[1:len(inorderLeft) + 1]
        preorderRight := preorder[len(inorderLeft) + 1:]
        root = &TreeNode{
            Val: rootValue,
            Left: buildTree(preorderLeft, inorderLeft),
            Right: buildTree(preorderRight, inorderRight),
        }
    }
    return root
}
```

## [889. Construct Binary Tree from Preorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

With the second element in preorder slice, we can split postorder slice into two sub slices. With this information we can go back to split the preorder slice into two sub slices with the same sizes.

```golang
func indexOf(haystack []int, needle int) int {
    for i := range haystack {
        if haystack[i] == needle {
            return i
        }
    }
    return -1
}

func constructFromPrePost(preorder []int, postorder []int) *TreeNode {
    var root *TreeNode
    if len(preorder) > 0 {
        rootValue := preorder[0]
        root = &TreeNode{}
        root.Val = rootValue
        if len(preorder) > 1 {
            leftValue := preorder[1]
            leftValueIndex := indexOf(postorder, leftValue)
            postorderLeft := postorder[:leftValueIndex + 1]
            postorderRight := postorder[leftValueIndex + 1:len(postorder) - 1]
            preorderLeft := preorder[1:len(postorderLeft) + 1]
            preorderRight := preorder[len(postorderRight) + 1:]    
            root.Left = constructFromPrePost(preorderLeft, postorderLeft)
            root.Right = constructFromPrePost(preorderRight, postorderRight)
        }
    }
    return root
}
```

## [654. Maximum Binary Tree](https://leetcode.com/problems/maximum-binary-tree/)

Find the maximu value, then split the slice with the max value to get two sub slices.

```golang
func maxIndex(haystack []int) int {
    max := -1
    ret := -1
    for i := range haystack {
        if haystack[i] > max {
            max = haystack[i]
            ret = i
        }
    }
    return ret
}

func constructMaximumBinaryTree(nums []int) *TreeNode {
    var root *TreeNode
    if len(nums) > 0 {
        max := maxIndex(nums)
        root = &TreeNode{}
        root.Val = nums[max]
        root.Left = constructMaximumBinaryTree(nums[:max])
        root.Right = constructMaximumBinaryTree(nums[max+1:])
    }
    return root
}
```

## [998. Maximum Binary Tree II](https://leetcode.com/problems/maximum-binary-tree-ii/)

With the idea from the above one, since `Suppose b is a copy of a with the value val appended to it. `, it means `b` can only be the root node or part of right subtree based on the tree construction rule.

```golang
func insertIntoMaxTree(root *TreeNode, val int) *TreeNode {
    if root != nil && root.Val > val {
        root.Right = insertIntoMaxTree(root.Right, val)
        return root
    }
    return &TreeNode{
        Val: val,
        Left: root,
        Right: nil,
    }
}
```

## [617. Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/)

```golang
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
    var root *TreeNode
    if root1 != nil || root2 != nil {
        if root1 == nil {
            root = root2
        } else if root2 == nil {
            root = root1
        } else {
            root = &TreeNode{
                Val: root1.Val + root2.Val,
                Left: mergeTrees(root1.Left, root2.Left),
                Right: mergeTrees(root1.Right, root2.Right),
            }
        }
    }
    return root
}
```