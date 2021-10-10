---
title: Dynamic Programming I
date: 2021-10-06 22:00:25
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
    - Knapsack
---

Dynamic Programming (commonly referred to as DP) is an algorithmic technique for solving a problem by recursively breaking it down into simpler subproblems and using the fact that the optimal solution to the overall problem depends upon the optimal solution to it's individual subproblems. Here is an interesting Quora question [How should I explain dynamic programming to a 4-year-old?](https://www.quora.com/How-should-I-explain-dynamic-programming-to-a-4-year-old).

## [509. Fibonacci Number](https://leetcode.com/problems/fibonacci-number/)

a. Recursive solution

```golang
func fib(n int) int {
    if n < 2 {
        return n
    }
    fib0 := fib(n - 2)
    fib1 := fib(n - 1)
    return fib0 + fib1
}
```

b. Dynamic Programming

State transition function: `dp[i] = dp[i - 1] + dp[i - 2]`

```golang
func fib(n int) int {
    if n < 2 {
        return n
    }
    dp := make([]int, n + 1)
    dp[0] = 0
    dp[1] = 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}
```

## [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

State transition function: `dp[i] = dp[i - 1] + dp[i - 2]`

```golang
func climbStairs(n int) int {
    if n < 3 {
        return n
    }
    dp := make([]int, n + 1)
    dp[0] = 0
    dp[1] = 1
    dp[2] = 2
    for i := 3; i <= n; i++ {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}
```

If given we can climb the stairs from 1 ~ m steps each time, how to solve this problem? It becomes a full knapsack problem now. And the state transition function is `dp[i] += dp[i - j]`, here 2 is the special case.

```golang
func climbStairs(n int) int {
    steps := []int{1, 2}
    dp := make([]int, n + 1)
    dp[0] = 1
    for i := 1; i <= n; i++ {
        for j := 0; j < len(steps); j++ {
            if i >= steps[j] {
                dp[i] += dp[i - steps[j]]
            }
        }
    }
    return dp[n]
}
```

## [746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

Denote dp[i] to the cost we want to step away from stair ith,  so the state transition function: `min(dp[i - 1], dp[i - 2]) + cost[i]`. 

```golang
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    dp := make([]int, n)
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    dp[0] = cost[0]
    dp[1] = cost[1]
    for i := 2; i < n; i++ {
        dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
    }
    return min(dp[n - 1], dp[n - 2]) // To reach to stair n, we can step away from n - 1 or n - 2
}
```

Another way to think about it. If we denote dp[i] as the cost to reach to ith stair, the state transition function is `dp[n] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])`

```golang
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    dp := make([]int, n + 1)
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    for i := 2; i <= n; i++ {
        dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }
    return dp[n]
}
```

## [62. Unique Paths](https://leetcode.com/problems/unique-paths/)

It's easy to get the state transition function `dp[i][j] = dp[i - 1][j] + dp[i][j - 1]` . Note for the special case first line and first row, the value is 1.

```golang
func uniquePaths(m int, n int) int {
    dp := make([][]int, m)
    for i := 0; i < m; i++ {
        dp[i] = make([]int, n)
        dp[i][0] = 1
    }
    for i := 0; i < n; i++ {
        dp[0][i] = 1
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
}
```

Based on the state transition function, dp[i][j] is defined only by two values, so we can optimize the space complexity from O(m * n) to O(n) by using a new state transition function `dp[j] = dp[j] + dp[j - 1]`

```golang
func uniquePaths(m int, n int) int {
    dp := make([]int, n)
    for i := 0; i < n; i++ {
        dp[i] = 1
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[j] += dp[j - 1]
        }
    }
    return dp[n - 1]
}
```

## [63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)

This is a similar problem to #62. The only difference is that we need to reset the path sum to 0 if there's an obstacle at the coordinate.

```golang
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
    m := len(obstacleGrid)
    n := len(obstacleGrid[0])
    dp := make([]int, n)
    for i := 0; i < n; i++ {
        if obstacleGrid[0][i] = 1 {
            dp[i] = 0
        } else if i == 0 {
            dp[i] = 1
        } else {
            dp[i] = dp[i - 1]
        }
    }
    for i := 1; i < m; i++ {
        for j := 0; j < n; j++ {
            if obstacleGrid[i][j] == 1{
                dp[i] = 0
            } else if j > 0 {
                dp[i] += dp[i - 1]
            }
        }
    }
    return dp[n - 1]
}
```

## [343. Integer Break](https://leetcode.com/problems/integer-break/)

The key point of solving this problem is to get the state transition function. There are two cases:
1) we can split the number i into two i - j and j
2) we can split the number into more than two, this case we can reuse the cached value from dp array.  dp[i - j] * j 

So the state transition function `dp[i] = max(dp[i], dp[i - j] * j, (i - j) * j)`

```golang
func integerBreak(n int) int {
    dp := make([]int, n + 1)
    dp[1] = 1
    dp[2] = 1
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 3; i <= n; i++ {
        for j := 1; j < i; j++ {
            two := j * (i - j)
            twoMore := j * dp[i - j]
            dp[i] = max(dp[i], max(two, twoMore))
        }
    }
    return dp[n]
}
```

## [96. Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/)

Based on the BST specs, we can get the state transition function `dp[i] = dp[j] * dp[i - j - 1]`, here dp[i] denotes when i is set to the root node, we have j nodes on left child and i - j - 1 on right child. Note here the base case is 1. If there's 0 nodes on left tree, it means we can construct the left tree in one uniq way.

```golang
func numTrees(n int) int {
    if n < 3 {
        return n
    }
    dp := make([]int, n + 1)
    dp[0] = 1
    dp[1] = 1
    dp[2] = 2
    for i := 3; i <= n; i++ {
        for j := 0; j < i; j++ {
            dp[i] += dp[j] & dp[i - j - 1]
        }
    }
    return dp[n]
}
```