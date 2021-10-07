---
title: Stock Exchange Problems
date: 2021-10-03 18:25:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
    - Dynamic Programming
    - Stock Exchange
---


## [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

a. Greedy solution

To gian the maximum amount of profit, we just need to accumulate the position profits if we buy it on the previous day and sell it on the next day.

```golang
func maxProfit(prices []int) int {
    result := 0
    for i := 1; i < len(prices); i++ {
        profit := prices[i] - prices[i - 1]
        if profit > 0 {
            result += profit
        }
    }
    return result
}
```

b. Peak & Valley solution

A naive approach is find the local lowest price (valley price) and sell it at the next local highest price (peak price). Then we accumulate all of those local profits.

```golang
func maxProfit(prices []int) int {
    result := 0
    peak := prices[0]
    valley := prices[0]
    length := len(prices)
    for i := 0; i < length - 1; {
        for i < length - 1 && prices[i] >= prices[i + 1] {
            i++
        }
        valley = prices[i]
        for i < length - 1 && prices[i] <= prices[i + 1] {
            i++
        }
        peak = prices[i]
        result += peak - valley
    }
    return result
}
```

c. Dynamic programming

```golang
func maxProfit(prices []int) int {
    length := len(prices)
    dp := make([][2]int, length)
    // dp[i][0] on day i we are holding stock
    // dp[i][1] on day i we don't have stock
    dp[0] = [2]int{-prices[0], 0}
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i < length; i++ {
        // stock we got from day i - 1, or stock we are going to buy on day i
        dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] - prices[i])
        // we don't have stock from day i - 1, or we are going to sell stock we got from day i - 1
        dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] + prices[i])
    }
    return max(dp[length - 1][0], dp[length - 1][1])
}
```

## [714. Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)