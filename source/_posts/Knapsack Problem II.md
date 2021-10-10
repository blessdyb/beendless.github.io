---
title: Knapsack Problems II
date: 2021-10-9 22:12:24
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