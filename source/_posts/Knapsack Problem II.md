---
title: Knapsack Problems II
date: 2021-10-9 22:14:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
    - Knapsack
---

## [377. Combination Sum IV](https://leetcode.com/problems/combination-sum-iv)

This is also a full knapsack problem. It looks similar to the [coins change ii](/2021/10/07/Knapsack%20Problem%20I/), but the difference here is that we need to get the permutation of the solutions instead of combination. So in this case we need to iterate the knapsack space first, then iterate the items.

```golang
func combinationSum4(nums []int, target int) int {
    dp := make([]int, target + 1)
    dp[0] = 1
    for i := 1; i <= target; i++ {
        for j := 0; j < len(nums); j++ {
            if i >= nums[j] {
                dp[i] += dp[i - nums[j]]
            }
        }
    }
    return dp[target]
}
```

## [279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)

This is also a full knapsack problem. We can consider all squares not greater than the given n as items, n as the knapsack total capacity,  and we can reuse all items to fill the knapsack. To get the minimal items, the state transition function is `dp[i] = min(dp[i], dp[i - j] + 1`

```golang
func numSquares(n int) int {
    squares := []int{}
    for i := 1; i * i <= n; i++ {
        squares = append(squares, i * i)
    }
    dp := make([]int, n + 1)
    dp[1] = 1
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    for i := 2; i <= n; i++ {
        for j := 0; j < len(squares); j++ {
            if i >= squares[j] {
                dp[i] = min(dp[i], dp[i - squares[j]] + 1) // here we are counting the number, so we increase the items count.
            }
        }
    }
    return dp[n]
}
```

We can also try to use backtracking to resolve this problem.

```golang
func numSquares(n int) int {
    squares := []int{}
    for i := 1; i * i <= n; i++ {
        squares = append(squares, i * i)
    }
    hash := make(map[int]int)
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    var backtracking func(int) int
    backtracking = func(index int) int {
        if v, ok := hash[index]; ok {
            return v
        }
        if index == 0 {
            return 0
        }
        count := n + 1
        for j := 0; j < len(squares); j++ {
            if index >= squares[j] {
                count = min(count, backtracking(index - squares[j]) + 1)   
            }
        }
        hash[index] = count
        return count
    }
    return backtracking(n)
}
```