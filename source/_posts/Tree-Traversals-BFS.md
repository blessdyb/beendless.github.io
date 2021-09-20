---
title: Tree Traversals BFS
date: 2021-09-14 22:35:24
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

## [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

We just need to get the right most item (last item) of each layer by using BFS.
```golang
func rightSideView(root *TreeNode) []int {
    result := []int{}
    queue := []*TreeNode{root}
    n := 1
    for n > 0 {
        for i := 0; i < n; i++ {
            node := queue[0]
            queue = queue[1:]
            if node != nil {
                if i == n - 1 {
                    result = append(result, node.Val)
                }
                queue = append(queue, node.Left)
                queue = append(queue, node.Right)
            }
        }
        n = len(queue)
    }
    return result
}
```

## [637. Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/)

Get the sum of each level by using BFS or DFS with level information, then claculate the average.
```golang
func averageOfLevels(root *TreeNode) []float64 {
    result := []float64{}
    queue := []*TreeNode{root}
    n := 1
    for n > 0 {
        var sum float64 = 0
        item := 0    // Track the not nil item
        for i := 0; i < n; i++ {
            node := queue[0]
            queue = queue[1:]
            if node != nil {
                sum += float64(node.Val)
                item++
                queue = append(queue, node.Left)
                queue = append(queue, node.Right)
            }
        }
        if item > 0 {
            result = append(result, sum / float64(item))   
        }
        n = len(queue)
    }
    return result
}
```

## [429. N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

```golang
func levelOrder(root *Node) [][]int {
    result := [][]int{}
    queue := []*Node{root}
    n := 1
    for n > 0 {
        temp := []int{}
        for n > 0 {
            node := queue[0]
            queue = queue[1:]
            if node != nil {
                temp = append(temp, node.Val)
                for _, child := range node.Children {
                    queue = append(queue, child)
                }
            }
            n--
        }
        if len(temp) > 0 {
            result = append(result, temp)
        }
        n = len(queue)
    }
    return result
}
```

## [515. Find Largest Value in Each Tree Row](https://leetcode.com/problems/find-largest-value-in-each-tree-row/)

```golang
func largestValues(root *TreeNode) []int {
    result := []int{}
    if root != nil {
        queue := []*TreeNode{root}
        n := 1
        for n > 0 {
            max := queue[0].Val
            for n > 0 {
                node := queue[0]
                queue = queue[1:]
                if node.Val > max {
                    max = node.Val
                }
                if node.Left != nil {
                    queue = append(queue, node.Left)
                }
                if node.Right != nil {
                    queue = append(queue, node.Right)
                }
                n--
            }
            n = len(queue)
            result = append(result, max)
        }
    }
    return result
}
```

## [116. Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)

a. A naive solution will be using BFS to traverse the tree.
```golang
func connect(root *Node) *Node {
    if root != nil {
        queue := []*Node{root}
        n := 1
        for n > 0 {
            for i := 0; i < n; i++ {
                if i > 0 {
                    queue[i - 1].Next = queue[i]
                }
                if queue[i].Left != nil {
                    queue = append(queue, queue[i].Left)
                    queue = append(queue, queue[i].Right)
                }
            }
            queue = queue[n:]
            n = len(queue)
        }
    }
    return root
}
```

b. DFS solution. Since the given tree is a full complete tree, we can easily use the parent node to get it's siblings children nodes.

```golang
func connect(root *Node) *Node {
    parent := root
    for parent.Left != nil { // Has child node
        current := parent
        for current != nil { // Moving from left to right
            current.Left.Next = current.Right
            if current.Next != nil {
                current.Right.Next = current.Next.Left
            }
            current = current.Next
        }
        parent = parent.Left // Move to the next layer
    }
    return root
}
```

* https://leetcode.wang/leetcode-116-Populating-Next-Right-Pointers-in-Each-Node.html

## [117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)

The only difference between this one and the above one is we need to verify the node's right child before push the into the queue.

a. A naive solution will be using BFS to traverse the tree.
```golang
func connect(root *Node) *Node {
    if root != nil {
        queue := []*Node{root}
        n := 1
        for n > 0 {
            for i := 0; i < n; i++ {
                if i > 0 {
                    queue[i - 1].Next = queue[i]
                }
                if queue[i].Left != nil {
                    queue = append(queue, queue[i].Left)
                }
                if queue[i].Right != nil {
                    queue = append(queue, queue[i].Right)
                }
            }
            queue = queue[n:]
            n = len(queue)
        }
    }
    return root
}
```

b. DFS solution

```golang
func connect(root *Node) *Node {
    current := root
    for current != nil {
        dummy := &Node{}    // Dummy pointer which points to the first node in current node's child layer
        tail := dummy       // Using tail node to construct a linked list which head is dummy node
        for current != nil {
            if current.Left != nil {
                tail.Next = current.Left
                tail := tail.Next
            }
            if current.Right != nil {
                tail.Next = current.Right
                tail = tail.Next
            }
            current = current.Next
        }
        current = dummy.Next
    }
    return root
}
```

* https://leetcode.wang/leetcode-117-Populating-Next-Right-Pointers-in-Each-NodeII.html

## [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

a. BFS
```golang
func maxDepth(root *TreeNode) int {
    ret := 0
    if root != nil {
        queue := []*TreeNode{root}
        n := len(queue)
        for n > 0 {
            for i := 0; i < n; i++ {
                if node := queue[i]; node != nil {
                    if node.Left != nil {
                        queue = append(queue, node.Left)
                    }
                    if node.Right != nil {
                        queue = append(queue, node.Right)
                    }
                }
            }
            queue = queue[n:]
            n = len(queue)
            ret++
        }
    }
    return ret    
}
```

b. DFS
```golang
func maxDepth(root *TreeNode) int {
    return getDepth(root)
}

func getDepth(node *TreeNode) int {
    if node != nil {
        left := getDepth(node.Left)
        right := getDepth(node.Right)
        if left > right {
            return left + 1
        }
        return right + 1
    }
    return 0
}
```