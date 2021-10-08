---
title: Knapsack Problems I
date: 2021-10-07 22:00:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
    - Knapsack
---

The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

## [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

We can quickly get the result if the sum is an odd number. If the sum is an even number `s`, it means we need to find some items in the slice which can get a sum to `s / 2`. Now the problem becomes a classical 0-1 knapsack problem.

a. Classical 0-1 knapsack solution

Denote dp[i][j] as if we can construct a sum `j` from the first `i` items. So the state transition function is `dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]`.  The value is determined by:
  1) If we don't use the current item, we need to check if we can construct the target `j` by the first `i - 1` items: `dp[i-1][j]`
  2) If we use the current item, we need to check if we can construct the target `j - nums[i]` by the first `i - 1` items: `dp[i - 1][j - nums[i]]`

```golang
func canPartition(nums []int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum % 2 == 1 {
        return false
    }
    target := sum / 2
    n := len(nums)
    dp := make([][]bool, n + 1)
    for i := 0; i <= n; i++ {
        dp[i] = make([]bool, target + 1)
        dp[i][0] = true
    }
    for i := 1; i <= n; i++ {
        for j := 1; j <= target; j++ {
            if j >= nums[i - 1] {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp[n][target]
}
```

b. Rolling array solution

Based on the state transition function above, we can simplifiy it by using a 1D array. `dp[i] = dp[i] || dp[i - nums[i]]`. Note since this time in the 1D array, the left part has side effect to the right side, so we need to iterate the array from right to left.

```golang
func canPartition(nums []int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum % 2 == 1 {
        return false
    }
    target := sum / 2
    n := len(nums)
    dp := make([]bool, target + 1)
    dp[0] = true
    for i := 0; i < n; i++ {
        for j := target; j >= nums[i]; j-- {
            dp[j] = dp[j] || dp[j - nums[i]]
        }
    }
    return dp[target]
}
```

Note: the two solutions above are using `bool` value as dp array value type, we can also use `int` to store the sum we can get. So the state transition function will be `dp[j] = max(dp[j], dp[j - nums[i]] + nums[i])`. At the end, we just need to veryfy `dp[target] == target`.


## [473. Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/)

## [698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)

## [1049. Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/)