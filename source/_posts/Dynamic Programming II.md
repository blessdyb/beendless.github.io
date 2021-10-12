---
title: Dynamic Programming II
date: 2021-10-08 11:04:24
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

c. Knapsack solution (subset sum)

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

We can use 1D rolling array to reduce the space complexity.

```golang
func findTargetSumWays(nums []int, target int) int {
    sum := 0
    zeros := 0
    sort.Ints(nums)
    for _, num := range nums {
        sum += num
        if num == 0 {
            zeros++
        }
    }
    if sum < target || -sum > target || (sum + target) % 2 == 1 {
        return 0
    }
    n := len(nums)
    target = (sum + target) / 2
    dp := make([]int, target + 1)
    dp[0] = 1
    for i := 0; i < n; i++ {
        for j := target; j >= nums[i]; j-- {
            dp[j] += dp[j - nums[i]]
        }
    }
    return dp[target] * int(math.Pow(float64(2), float64(zeros)))
}
```

## [198. House Robber](https://leetcode.com/problems/house-robber/)

State transition function: `dp[i] = max(dp[i - 1], dp[i - 2] + value[i]`

```golang
func rob(nums []int) int {
    n := len(nums)
    dp := make([]int, n + 1)
    dp[1] = nums[0]
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 2; i <= n; i++ {
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])
    }
    return dp[n]
}
```

## [213. House Robber II](https://leetcode.com/problems/house-robber-ii)

Since we only need to compare [0, n-1] and [1, n] cases, and those two can be resolved with the solution we have above.

```golang
func rob(nums []int) int {
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    if len(nums) == 1 {
        return nums[0]
    }
    basicRobber := func(nums []int) int{
        n := len(nums)
        dp := make([]int, n + 1)
        dp[1] = nums[0]
        for i := 2; i <= n; i++ {
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])
        }
        return dp[n]
    }
    return max(basicRobber(nums[:len(nums) - 1]), basicRobber(nums[1:len(nums)]))
}
```

## [337. House Robber III](https://leetcode.com/problems/house-robber-iii)

a. DFS + memorized result

```golang
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func rob(root *TreeNode) int {
    cache := make(map[*TreeNode]int)
    var dfs func(*TreeNode) int
    dfs = func(root *TreeNode) int {
        if root == nil {
            return 0
        }
        if value, ok := cache[root]; ok {
            return value
        }
        rootValue := root.Val
        if root.Left != nil {
            rootValue += dfs(root.Left.Left) + dfs(root.Left.Right)
        }
        if root.Right != nil {
            rootValue += dfs(root.Right.Left) + dfs(root.Right.Right)
        }
        childValue := dfs(root.Left) + dfs(root.Right)
        maxValue := childValue
        if rootValue > childValue {
            maxValue = rootValue
        }
        cache[root] = maxValue
        return maxValue
    }
    return dfs(root)
}
```

b. Dynamic Programming to cache more calculation results.

Since each node has two values, with or without its own value. The above one only caches the maxValue, if we cache both of those in an array, it will speed up the calculating.

```golang
func rob(root *TreeNode) int {
    cache := make(map[*TreeNode][2]int)
    var dfs func(*TreeNode) [2]int
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    dfs = func(root *TreeNode) [2]int {
        if root == nil {
            return [2]int{0, 0}
        }
        if value, ok := cache[root]; ok {
            return value
        }
        rootValue := root.Val
        leftValue := dfs(root.Left)
        rightValue := dfs(root.Right)
        childValue := max(leftValue[0], leftValue[1]) + max(rightValue[0], rightValue[1])
        cache[root] = [2]int{rootValue + leftValue[1] + rightValue[1], childValue}
        return cache[root]
    }
    value := dfs(root)
    return max(value[0], value[1])
}
```