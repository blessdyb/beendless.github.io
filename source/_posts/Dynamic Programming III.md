---
title: Dynamic Programming III
date: 2021-10-13 11:04:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
---

## [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence)

If we define dp[i] as the longest increasing subsequence of [0, i]. Then dp[i] >= 1. And the state transition function is `dp[i] = max(dp[i], dp[j] + 1)` here j ∈ [0, i).

```golang
func lengthOfLIS(nums []int) int {
    n := len(nums)
    dp := make([]int, n)
    dp[0] = 1
    result = 1
    for i := 1; i < n; i++ {
        dp[i] = 1
        for j := 0; j < i; j++ {
            if nums[i] > nums[j] {
                dp[i] = max(dp[i], dp[j] + 1)
            }
        }
        result = max(result, dp[i])
    }
    return result
}
```