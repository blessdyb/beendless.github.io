---
title: Search in Trees
date: 2021-09-27 21:35:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Binary Tree
---

## [700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)

Naive BST query.

```golang
func searchBST(root *TreeNode, val int) *TreeNode {
    var ret *TreeNode
    current := root
    for current != nil {
        if current.Val == val {
            ret = current
            break
        } else if current.Val > val {
            current = current.Left
        } else {
            current = current.Right
        }
    }
    return ret
}
```

## [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

Since Inorder Traversal a BST we will get a sorted list, we just need to compare the previous value with current value during the traversal.

```golang
import "math"
func isValidBST(root *TreeNode) bool {
    previous := math.Inf(-1)
    stack := []*TreeNode{}
    node := root
    for {
        if node != nil {
            stack = append(stack, node)
            node = node.Left
        } else if len(stack) > 0 {
            node = stack[len(stack) - 1]
            stack = stack[:len(stack) - 1]
            if float64(node.Val) <= previous {
                return false
            }
            previous = float64(node.Val)
            node = node.Right
        } else {
            break
        }
    }
    return true
}
```

## [530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)

a. In Order transverse of BST with stack, we can set up two pointers to check the difference

```golang
func getMinimumDifference(root *TreeNode) int {
    ret := 100001
    var previous, current int
    node := root
    count := 0
    stack := []*TreeNode{}
    for {
        if node != nil {
            stack = append(stack, node)
            node = node.Left
        } else if len(stack) > 0 {
            node = stack[len(stack) - 1]
            stack = stack[:len(stack) - 1]
            if count > 0 {
                previous = current
            }
            current = node.Val
            if count >= 1 && ret > current - previous {
                ret = current - previous
            }
            count++
            node = node.Right
        } else {
            break
        }
    }
    return ret
}
```

b. Recurrsively Inorder Traversal with two pointers

```golang
func getMinimumDifference(root *TreeNode) int {
    data := []int{}
    var dfs func(*TreeNode)
    dfs = func(node *TreeNode) {
        if node != nil {
            dfs(node.Left)
            data = append(data, node.Val)
            dfs(node.Right)
        }
    }
    dfs(root)
    min := data[1] - data[0]
    for i, j := 1, 2; j < len(data); i, j = i + 1, j + 1 {
        if min > data[j] - data[i] {
            min = data[j] - data[i]
        }
    }
    return min
}
```

## [501. Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree/)

Since it's a BST, we can get a sorted slice with inorder traversal of the tree. Once we have the sorted slice, we can use two pointers sliding window to get a mode result. 

```golang
func findMode(root *TreeNode) []int {
    var dfs func(*TreeNode)
    result := []int{}
    count := 1
    maxCount := 1
    previous := 100001
    dfs = func(root *TreeNode) {
        if root != nil {
            dfs(root.Left)
            if previous == root.Val {
                count++
            } else {
                count = 1
            }
            if count > maxCount {
                maxCount = count
                result = []int{root.Val}
            } else if count == maxCount {
                result = append(result, root.Val)
            }
            previous = root.Val
            dfs(root.Right)
        }
    }
    dfs(root)
    return result
}
```

A naive solution which can apply to all trees (not only binary tree) is we create a frequence map with a tree traversal. Then sort the map values and get the higher frequency list.

## [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

a. Pass down parent informatin layer by layer to get two slices, then find the first common items.
```javascript
var lowestCommonAncestor = function(root, p, q) {
    const stack = [[root, []]];
    let pPath, qPath;
    while(stack.length && (!pPath || !qPath)) {
        const [node, ancestor] = stack.shift();
        const newAncestor = ancestor.concat([node]);
        if (node.val === p.val) {
            pPath = newAncestor;
        }
        if (node.val === q.val) {
            qPath = newAncestor;
        }
        if (node.left) {
            stack.push([node.left, newAncestor]);
        }
        if (node.right) {
            stack.push([node.right, newAncestor]);
        }
    }
    let result = root;
    while(pPath.length && qPath.length) {
        const x = pPath.shift();
        const y = qPath.shift();
        if (x.val === y.val) {
            result = x;
        } else {
            break;
        }
    }
    return result;
};
```

b. If we search a tree from bottom layer to top, we can easily get the ancestor node. Postorder traversal can help us to go from bottom to up.
```golang
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q {   // edge case
        return root
    }
    left := lowestCommonAncestor(root.Left, p, q)    
    right := lowestCommonAncestor(root.Right, p, q)
    if left != nil && right != nil {    // Postorder Traversal
        return root
    } else if left == nil {
        return right
    }
    return left

}
```

## [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

Since it's a BST, we can compare the value to remove some unnecessary calculation.

```golang
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root != nil {
        if root.Val > p.Val && root.Val > q.Val {
            return lowestCommonAncestor(root.Left, p, q)
        }
        if root.Val < p.Val && root.Val < q.Val {
            return lowestCommonAncestor(root.Right, p, q)
        }
    }
    return root
}
```