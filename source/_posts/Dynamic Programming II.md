---
title: Dynamic Programming II
date: 2021-10-08 11:00:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
    - DFS
---

## [494. Target Sum](https://leetcode.com/problems/target-sum/)

a. Brute-force DFS recursive solution

```golang
func findTargetSumWays(nums []int, target int) int {
    count := 0
    var dfs func(int ,int)
    dfs = func(index, left int) {
        if index == len(nums) {
            if left == 0 {
                count++
            }
        } else {
            dfs(index + 1, left + nums[index])
            dfs(index + 1, left - nums[index])
        }
    }
    dfs(0, target)
    return count
}
```

b. Dynamic Programming

dp[i][j] refers to the number of assignments which can lead to a sum of j up to the ith items in the Array. We can get the state transition function: `dp[i][j + nums[i]] = dp[i][j + nums[i]] + dp[i - 1][j]` and `dp[i][j - nums[i]] = dp[i][j - nums[i]] + dp[i - 1][j]`

```golang
func findTargetSumWays(nums []int, target int) int {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    dp := make([][]int, len(nums))
    for i := 0; i < len(nums); i++ {
        dp[i] = make([]int, 2 * sum + 1)
    }
    dp[0][sum + nums[0]] = 1
    dp[0][sum - nums[0]] += 1 // incase nums[0] is 0
    for i := 1; i < len(nums); i++ {
        for j := -sum; j <= sum; j++ {
            if dp[i - 1][j + sum] > 0 {
                dp[i][j + sum + nums[i]] += dp[i - 1][j + sum]
                dp[i][j + sum - nums[i]] += dp[i - 1][j + sum]
            }
        }
    }
    if target > 0 && sum < target || target < 0 && -sum > target{
        return 0
    }
    return dp[len(nums) - 1][target + sum]
}
```