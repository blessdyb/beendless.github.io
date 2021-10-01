---
title: Backtracking - Combinations
date: 2021-10-01 13:35:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Backtracking
---

Backtracking is an algorithmic-technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time (by time, here, is referred to the time elapsed till reaching any level of the search tree). Usually we can consider backtracking as DFS recursively traversal.

## Backtracking template
```golang
func backtracking(...args) {
    if stop_condition {
        // Update the result set
        return
    }
    for i := range nodes_in_current_layer(...args) {
        // Down to next layer
        backtracking(...args, i + 1)
        // Go back to the upper layer
    }
}
```

## [77. Combinations](https://leetcode.com/problems/convert-sorted-array-to-Binary-search-tree/)

We can't use a naive bruth force algorithm to solve this one, since it's almost impossible to write a N-layers nested for loop.

a. Naive backtracking solution
```golang
func combine(n int, k int) [][]int {
    result := [][]int{}
    path := []int{}
    var backtracking func(int, int, int)
    backtracking = func(n, k, index int) {
        if len(path) == k {
            temp := make([]int, len(path))
            copy(temp, path)
            result = append(result, temp)
            return
        }
        for i := index; i <= n; i++ {
            path = append(path, i)
            backtracking(n, k, i + 1)
            path = path[:len(path) - 1]
        }
    }
    backtracking(n, k, 1)
    return result
}
```

b. Remove the unnecessary backtracking branches
```golang
func combine(n, k int) [][]int {
    result := [][]int{}
    path := []int{}
    var backtracking func(int, int, int)
    backtracking = func(n, k, index int) {
        if len(path) == k {
            temp := make([]int, len(path))
            copy(temp, path)
            result = append(result, temp)
            return
        }
        // For example, given n = 4, k = 3, if path is empty, n - (k - 0) + 1 = 2 means the last valid index can be 2
        for i := index; i <= n - (k - len(path)) + 1; i++ {
            path = append(path, i)
            backtracking(n, k, i + 1)
            path = path[:len(path) - 1]
        }
    }
    backtracking(n, k, 1)
    return result
}
```

## [216. Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)

Similar to #77, we can use the backtracking template to solve it.

a. Naive backtracking solution
```golang
func combinationSum3(k int, n int) [][]int {
    results := [][]int{}
    path := []int{}
    var backtracking func(int, int, int, int)
    backtracking = func(k, n, index, sum int) {
        if len(path) == k {
            if sum == n {
                temp := make([]int, k)
                copy(temp, path)
                results = append(results, temp)  
            }             
            return
        }
        for i := index; i <= 9; i++ {
            path = append(path, i)
            backtracking(k, n, i + 1, sum + i)
            path = path[:len(path) - 1]
        }
    }
    backtracking(k, n, 1, 0)
    return results
}
```

b. Remove the unnecessary backtracking branches
```golang
func combinationSum3(k, n int) [][]int {
    result := [][]int{}
    path := []int{}
    var backtracking func(int, int, int, int)
    backtracking = func(k, n, index, sum) {
        if len(path) == k {
            if sum == n {
                temp := make([]int, k)
                copy(temp, path)
                result = append(result, temp)
            }
            return
        }
        for i := index; i < 9 - (k - len(path)) + 1; i++ {
            path = append(path, i)
            backtracking(n, k, i + 1, sum + i)
            path = path[:len(path) - 1]
        }
    }
    backtracking(k, n, 1, 0)
    return result
}
```


## [39. Combination Sum](https://leetcode.com/problems/combination-sum/)

The only difference between #216 and this one is we can reuse the elements of the slice. 

```golang
func combinationSum(candidates []int, target int) [][]int {
    result := [][]int{}
    path := []int{}
    length := len(candidates)
    var backtracking func(int, int)
    backtracking = func(target, index int) {
        if target < 0 {
            return
        } else if target == 0 {
            temp := make([]int, len(path))
            copy(temp, path)
            result = append(result, temp)
            return
        }
        for i := index; i < length; i++ {
            path = append(path, candidates[i])
            backtracking(target - candidates[i], i)
            path = path[:len(path) - 1]
        }
    }
    backtracking(target, 0)
    return result
}
```

## [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

Since we don't know how long the given digits will be, we have to use backtracking.

```golang
import "strconv"

func letterCombinations(digits string) []string {
    result := []string{}
    if len(digits) > 0 {
        digitsMap := [10]string {
            "", // 0
            "", // 1
            "abc", // 2
            "def", // 3
            "ghi", // 4
            "jkl", // 5
            "mno", // 6
            "pqrs", // 7
            "tuv", // 8
            "wxyz", // 9
        }
        path := []byte{}
        var backtracking func(int)
        backtracking = func(index int) {
            if index == len(digits) {
                result = append(result, string(path))
                return
            }
            digit, _ := strconv.Atoi(string(digits[index]))
            for i := 0; i < len(digitsMap[digit]); i++ {
                path = append(path, digitsMap[digit][i])
                backtracking(index + 1)
                path = path[:len(path) - 1]
            }
        }
        backtracking(0)
    }
    return result
}
```

## [40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)

Since we can convert a combination backtracking problem to a DFS traversal problem,  if we don't want to have the duplicated combination result item, it means we can't pick duplicated nodes from the same layer of a tree. According to the backtracking template, in side of the backtracking for-loop we are handling the same layer logic (push/pop). At this point, if the given candidates is a sorted slice, we just need to compare if the previous element equals to the current element in the same layer.

```golang
import "sort"
func combinationSum2(candidates []int, target int) [][]int {
    result := [][]int{}
    path := []int{}
    length := len(candidates)
    sort.Ints(candidates)
    var backtracking func(int, int)
    backtracking = func(target, index int) {
        if target < 0 {
            return
        } else if target == 0 {
            temp := make([]int, len(path))
            copy(temp, path)
            result = append(result, temp)
            return
        }
        for i := index; i < length; i++ {
            if i > index && candidates[i] == candidates[i - 1] {
                continue
            }
            path = append(path, candidates[i])
            backtracking(target - candidates[i], i + 1)
            path = path[:len(path) - 1]
        }
    }
    backtracking(target, 0)
    return result
}
```