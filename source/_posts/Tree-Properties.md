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

## [100. Same Tree](https://leetcode.com/problems/same-tree/)

Same to the symmetric tree question.
```golang
func isSameTree(p *TreeNode, q *TreeNode) bool {
    if p == nil && q == nil {
        return true
    } else if p != nil && q != nil && p.Val == q.Val {
        return isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
    }
    return false
}
```

## [572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

a. Naive DFS solution

We will check if the given two trees are the same or not, if not, then check if the subRoot is the sub tree of the root tree's child nodes.
```golang
func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
    if isSameTree(root, subRoot) {
        return true
    }
    return root != nil && (isSubtree(root.Left, subRoot) || isSubtree(root.Right, subRoot))
}

func isSameTree(p *TreeNode, q *TreeNode) bool {
    if p == nil && q == nil {
        return true
    } else if p != nil && q != nil && p.Val == q.Val{
        return isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
    }
    return false
}
```

b. Serialize tree to string and compare the string
```golang
func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
    return toString(root) == toString(subRoot) || (root != nil && (isSubtree(root.Left, subRoot) ||  isSubtree(root.Right, subRoot)))
}

func toString(root *TreeNode) string {
    if root == nil {
        return "#"
    }
    return strconv.Itoa(root.Val) + toString(root.Left) + toString(root.Right)
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

## [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

The key to solve this challenge is to get the depth of given node's left and right child.

```golang
import "math"
func isBalanced(root *TreeNode) bool {
    if root != nil {
        left := getDepth(root.Left)
        right := getDepth(root.Right)
        if math.Abs(float64(left - right)) > float64(1) {
            return false
        }
        return isBalanced(root.Left) && isBalanced(root.Right)
    }
    return true
}

func getDepth(root *TreeNode) int {
    if root != nil {
        left := getDepth(root.Left)
        right := getDepth(root.Right)
        if left > right {
            return 1 + left
        }
        return 1 + right
    }
    return 0
}
```

## [257. Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)

When we traversing the tree, we need to push the parent nodes inforamtion to a queue.

a. DFS
```golang
import "strconv"
func binaryTreePaths(root *TreeNode) []string {
    result := []string{}
    var dfs func(*TreeNode, string)
    dfs = func(node *TreeNode, paths string) {
        if node != nil {
            p := paths + "->" + strconv.Itoa(node.Val)
            if paths == "" {
                p = strconv.Itoa(node.Val)
            }
            if node.Left == nil && node.Right == nil {
                result = append(result, p)
            } else {
                if node.Left != nil {
                    dfs(node.Left, p)
                }
                if node.Right != nil {
                    dfs(node.Right, p)
                }
            }
        }
    }
    dfs(root, "")
    return result
}
```

b. BFS
```golang
import "strconv"
type TreeNodeWithPath struct {
    Node *TreeNode
    Path string
}

func binaryTreePaths(root *TreeNode) []string {
    result := []string{}
    queue := []*TreeNodeWithPath{&TreeNodeWithPath{
        Node: root,
        Path: strconv.Itoa(root.Val),
    }}
    n := 1
    for n > 0 {
        for i := 0; i < n; i++ {
            twp := queue[i]
            if twp.Node.Left == nil && twp.Node.Right == nil {
                result = append(result, twp.Path)
            } else {
                if twp.Node.Left != nil {
                    queue = append(queue, &TreeNodeWithPath{
                        Node: twp.Node.Left,
                        Path: twp.Path + "->" + strconv.Itoa(twp.Node.Left.Val),
                    })
                }
                if twp.Node.Right != nil {
                    queue = append(queue, &TreeNodeWithPath{
                        Node: twp.Node.Right,
                        Path: twp.Path + "->" + strconv.Itoa(twp.Node.Right.Val),
                    })
                }
            }
        }
        queue = queue[n:]
        n = len(queue)
    }
    return result
}
```