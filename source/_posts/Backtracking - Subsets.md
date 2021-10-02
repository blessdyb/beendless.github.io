---
title: Backtracking - Subsets
date: 2021-10-01 20:05:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Subsets
---

Backtracking can also help us to get all subsets of a given slice. If Combination and Partitioning problems can be converted to get root-to-leaf paths during a tree DFS traversal, Subsets can be treated as getting all root-to-node paths during a tree DFS traversal.

## [78. Subsets](https://leetcode.com/problems/subsets/)
```golang
func subsets(nums []int) [][]int {
    result := [][]int{[]int{}}
    path := []int{}
    length := len(nums)
    var backtracking func(int)
    backtracking = func(index int) {
        if index == length {
            return
        }
        for i := 0; i < length; i++ {
            path = append(path, nums[i])
            temp := make([]int, len(path))
            copy(temp, path)
            result = append(result, temp)
            backtracking(i + 1)
            path = path[:len(path) - 1]
        } 
    }
    backtracking(0)
    return result
}
```

## [90. Subsets II](https://leetcode.com/problems/subsets-ii/)