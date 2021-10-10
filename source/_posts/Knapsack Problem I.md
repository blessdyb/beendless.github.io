---
title: Knapsack Problems I
date: 2021-10-07 22:12:24
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

## [1049. Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/)

a. Dynamic programming

To get the minimum result, we need to try our best to split the stones into two similar weight subsets. Let's denote the `sum` as the total weight of all stones, so we need to find `target = sum/2` to get the minimum `sum - 2 * target`

```golang
func lastStoneWeightII(stones []int) int {
    sum := 0
    for _, stone := range stones {
        sum += stone
    }
    target := sum / 2
    n := len(stones)
    dp := make([][]int, n + 1)
    for i := 0; i <= n; i++ {
        dp[i] = make([]int, target + 1)
    }
    for i := 1; i <= n; i++ {
        for j := 0; j <= target; j++ {
            if j >= stones[i - 1] && dp[i - 1][j] < dp[i - 1][j - stones[i - 1]] + stones[i - 1] {
                dp[i][j] = dp[i - 1][j - stones[i - 1]] + stones[i - 1]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return sum - 2 * dp[n][target]
}
```

We can use 1D rolling array

```golang
func lastStoneWeightII(stones []int) int {
    sum := 0
    for _, stone := range stones {
        sum += stone
    }
    target := sum / 2
    n := len(stones)
    dp := make([]int, target + 1)
    for i := 0; i < n; i++ {
        for j := target; j >= stones[i]; j-- {
            if dp[j] < dp[j - stones[i]] + stones[i] {
                dp[j] = dp[j - stones[i]] + stones[i]
            }
        }
    }
    return sum - 2 * dp[target]
}
```

b. Brute-force Set 

We can get all possible combinations of the sum and find the minimum absolute value.

```golang
func lastStoneWeightII(stones []int) int {
    sum := stones[0]
    hash := make(map[int]bool)
    hash[stones[0]] = true
    hash[-stones[0]] = true
    n := len(stones)
    for i := 1; i < n; i++ {
        sum += stones[i]
        temp := make(map[int]bool)
        for key, _ := range hash {
            temp[key + stones[i]] = true
            temp[key - stones[i]] = true
        }
        hash = temp
    }
    result := sum + 1
    for key, _ := range hash {
        if key >= 0 && key < result{
            result = key
        } else if key < 0 && -key < result {
            result = -key
        }
    }
    return result
}
```

## [474. Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/)

Each items have two properties (1 amount and 0 amount) and we need to get the maximum sum of a subset based on the two dememsion restrictions (total 1 amount n and total 0 amount m). It can be considered as a classical two dememsion 0-1 knapsack problem. So the state transition function is `dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1)` (Note, ideally we need 3D array to solve this problem, but based on the state transition function, we can reduce to a 2D rolling array with reverse for-loop).

```golang
func findMaxForm(strs []string, m int, n int) int {
    dp := make([][]int, m + 1)
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
    }
    for _, str := range strs {
        ones := strings.Count("1")
        zeros := strings.Count("0")
        for i := m; i >= zeros; i-- {
            for j := n; j >= ones; j-- {
                pickme := dp[i - zeros][j - ones] + 1
                if dp[i][j] < pickme {
                    dp[i][j] = pickme
                }
            }
        }
    }
    return dp[m][j]
}
```

## [322. Coin Change](https://leetcode.com/problems/coin-change/)

This is a classical full knapsack problem. The state transition function is `dp[i] = min(dp[i], dp[i - coins[i]] + 1)`. Since we need to get the minimal number, so the initial value needs to be an integer which is out of the scope (except dp[0] which is 0). We can either use `math.MaxInt32` or `amount + 1`

a. Traverse knapsack volume first.

```golang
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount + 1)
    dp[0] = 0
    for i := 0; i <= amount; i++ {
        dp[i] = math.MaxInt32
    }
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    for i := 1; i <= amount; i++ {
        for j := 0; j < len(coins); j++ {
            if i >= coins[j] && dp[i - coins[j]] != math.MaxInt32 { // If we pick one current coin and there's some calculated solution to the state dp[i - coins[j]] which is not the initial value, then we have a valid solution
                dp[i] = min(dp[i], dp[i - coins[j]] + 1)
            }
        }   
    }
    if dp[amount] == math.MaxInt32 {
        return -1
    }
    return dp[amount]
}
```

b. Traverse items first.

```golang
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount + 1)
    dp[0] = 0
    for i := 1; i <= amount; i++ {
        dp[i] = math.MaxInt32
    }
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    for i := 0; i < len(coins); i++ {
        for j := coins[i]; j <= amount; j++ {
            if dp[j - coins[i]] != math.MaxInt32 {
                dp[j] = min(dp[j], dp[j - coins[i]] + 1)   
            }
        }
    }
    if dp[amount] == math.MaxInt32 {
        return -1
    }
    return dp[amount]
}
```

## [518. Coin Change 2](https://leetcode.com/problems/coin-change-2/)

This is is also a full knapsack problem. The difference between this and the above is that we need to get the amount of combinations. So the state transition function is `dp[i] += dp[i - coins[j]]`. Since here each coin change solution is a combination problem instead of permutation problem, we can only iterate the coins first. If we iterate the knapsack space first, we will get the duplicated result like [[coins[0], coins[1]], [coins[1], coins[0]]]. 

```golang
func change(amount int, coins []int) int {
    dp := make([]int, amount + 1)
    dp[0] = 1
    for i := 0; i < len(coins); i++ {
        for j := coins[i]; j <= amount; j++ {
            dp[j] += dp[j - coins[i]]
        }
    }
    return  dp[amount]
}
```

Based on the problems above, we can get a knapsack problem solution template

**0-1 knapsack template**
```golang
dp := make([]int, amount + 1)
dp[0] = // Initial value based on the problem
for i := 0; i <= len(nums); i++ {
    for j := amount; j >= nums[i]; j-- {
        // state transition function
        // dp[j] = dp[j] || dp[j - nums[i]]
        // dp[j] = max(dp[j], dp[j - nums[i]] + nums[i])
    }
}
```

**full knapsack template**
```golang
dp := make([]int, amount + 1)
dp[0] = // Initial value based on the problem
// dp[i] = // Initial value based on the problem, could be 0 for total solutions counting or min/max value to get the maximum/minimum expectation
for i := 0; i < len(nums); i++ {
    for j := nums[i]; j <= amount; j++ {
        // state transition function
        // dp[j] += dp[j - nums[i]]
        // dp[j] = min(dp[j], dp[j - nums[i]] + nums[i])
    }
}
```