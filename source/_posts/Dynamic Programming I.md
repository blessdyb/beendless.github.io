---
title: Dynamic Programming I
date: 2021-10-06 22:00:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
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