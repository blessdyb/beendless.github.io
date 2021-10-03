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

It's similar to #78, the only difference is we can't have duplicated subsets, which means we can't pick the same value at the same tree level during traversal.

```golang
import "sort"
func subsetsWithDup(nums []int) [][]int {
    sort.Ints(nums)
    result := [][]int{[]int{}}
    path := []int{}
    length := len(nums)
    var backtracking func(int)
    backtracking = func(index int) {
        if index == length {
            return
        }
        for i := index; i < length; i++ {
            if i > index && nums[i] == nums[i - 1] {
                continue
            }
            path := append(path, nums[i])
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

## [491. Increasing Subsequences](https://leetcode.com/problems/increasing-subsequences/)

Since we can't sort the given slice, so we have to use a hashmap / array to save the used nodes in the same layer.

```golang
func findSubsequences(nums []int) [][]int {
    result := [][]int{}
    path := []int{}
    length := len(nums)
    var backtracking func(int)
    backtracking = func(index int) {
        if len(apth) == length {
            return
        }
        used := make(map[int]bool)
        for i := index; i < length; i++ {
            if (len(path) > 0 && path[len(path) - 1] > nums[i]) || used[nums[i]] {
                continue
            }
            used[nums[i]] = true
            path = append(path, nums[i])
            if len(path) >= 2 {
                temp := make([]int, len(path))
                copy(temp, path)
                result = append(result, temp)
            }
            backtracking(i + 1)
            path = path[:len(path) - 1]
         }
    }
    backtracking(0)
    return result
}
```