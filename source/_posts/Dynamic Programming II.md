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
    - Knapsack
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

`dp[i][j]` refers to the number of assignments which can lead to a sum of j up to the ith items in the Array. We can get the state transition function: `dp[i][j] = dp[i - 1][j + nums[i]] + dp[i - 1][j - nums[i]]`

```golang
func findTargetSumWays(nums []int, target int) int {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum < target || -sum > target || (sum + target) % 2 != 0 {
        return 0
    }
    n := len(nums)
    dp := make([][]int, n)
    for i := 0; i < n; i++ {
        dp[i] = make([]int, 2 * sum + 1)
    }
    dp[0][sum + nums[0]] = 1
    dp[0][sum - nums[0]] += 1
    for i := 1; i < n; i++ {
        for j := -sum; j <= sum; j++ {
            if j + nums[i] < sum + 1 {
                dp[i][j + sum + nums[i]] += dp[i - 1][j + sum]
            }   
            if j + sum - nums[i] >= 0 {
                dp[i][j + sum - nums[i]] += dp[i - 1][j + sum]   
            }
        }
    }
    return dp[n - 1][sum + target]
}
```

c. Knapsack solution

Based on the problem description, we will have two subsets. One with positive symbol (s1) and another one with negative symbol (s2).  So `s1 + s2 = sum`  and `s1 - s2 = target`. We can convert this problem to a 0-1 knapsack problem --- find a subset which subtotal is `s1 = (sum + target) / 2`.

```golang
func findTargetSumWays(nums []int, target int) int {
    sum := 0
    zero := 0
    sort.Ints(nums)  // to make sure we can handle cases contains 0
    for _, num := range nums {
        if num == 0 {
            zero++
        }
        sum += num
    }
    if sum < target || -sum > target || (sum + target) % 2 != 0 {
        return 0
    }
    n := len(nums)
    target = (sum + target) / 2
    dp := make([][]int, n + 1)
    for i := 0; i <= n; i++ {
        dp[i] = make([]int, target + 1)
        dp[i][0] = 1
    }
    for i := 1; i <= n; i++ {
        for j := 1; j <= target; j++ {
            dp[i][j] = dp[i-1][j]
            if j >= nums[i - 1] {
                dp[i][j] += dp[i-1][j - nums[i - 1]]
            }
        }
    }
    return dp[n][target] * int(math.Pow(float64(2), float64(zero)))
}
```