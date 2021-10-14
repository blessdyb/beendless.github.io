---
title: Stock Exchange Problems
date: 2021-10-12 18:30:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
    - Dynamic Programming
    - Stock Exchange
---

## [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

a. Two pointers greedy solution.

Since the profit is defined by the current price and the minimum price before today. So we can have one pointer holds the minimum price so far, and another pointer holds the max price so far, with the lowerest peak from the left and highest peak from the right, we can get the maximum profit.

```golang
func maxProfit(prices []int) int {
    profit := 0
    for min, i := 100001, 0; i < len(prices); i++ {
        if min > prices[i] {
            min = prices[i]
        }
        if prices[i] - min > profit {
            profit = prices[i] - min
        }
    }
    return profit
}
```

b. Dynamic programming

Let's denote dp[i] as the profit we have so far, it can be two cases:
1) dp[i][0] We have stock so the profit we have for the first day if we buy stock is dp[0][0] = -prices[0]
2) dp[i][1] We don't have stock

so the state transition function will be :

`dp[i][0] = max(dp[i - 1][0], -prices[i])` the maximum value if we bought the stock in the previous day of we buy the stock on day i
`dp[i][1] = max(dp[i - 1][0] + prices[i], dp[i-1][1])` the maximum value if we bought the stock before and sell it today, or we don't have stock before and won't buy today

```golang
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][2]int, n)
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i < n; i++ {
        dp[i][0] = max(dp[i - 1][0], -prices[i])
        dp[i][1] = max(dp[i - 1][0] + prices[i], dp[i - 1][1])
    }
    return dp[n - 1][1]
}
```


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

## [123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

Since we can make two transactions at most, so there will be 5 status for a given day dp[i]
1) dp[i][0] We have made 0 transaction so far
2) dp[i][1] We bought the stock once so far
3) dp[i][2] We have made 1 full transaction once (bought/sold the stock once so far)
4) dp[i][3] We bought the stock twice and sold once so far
5) dp[i][4] We have made 2 full transaction once (bought/sold the stock twice so far)

```golang
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][5]int, n)
    dp[0] = [5]int{0, -prices[0], 0, -prices[0], 0}  // dp[0][1] = dp[0][0] - prices[0], dp[0][2] = dp[0][1] + prices[0], dp[0][3] = dp[0][2] - prices[0], dp[0][4] = dp[0][3] + prices[0], 
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i < n; i++ {
        dp[i][0] = dp[i - 1][0]
        dp[i][1] = max(dp[i - 1][0] - prices[i], dp[i - 1][1])
        dp[i][2] = max(dp[i - 1][1] + prices[i], dp[i - 1][2])
        dp[i][3] = max(dp[i - 1][2] - prices[i], dp[i - 1][3])
        dp[i][4] = max(dp[i - 1][3] + prices[i], dp[i - 1][4])
    }
    return dp[n-1][4]
}
```

We can also optimize the space complexity.

```golang
func maxProfit(prices []int) int {
    n := len(prices)
    dp := [5]int{0, -prices[0], 0, -prices[0], 0} 
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i < n; i++ {
        dp[1] = max(dp[0] - prices[i], dp[1])
        dp[2] = max(dp[1] + prices[i], dp[2])
        dp[3] = max(dp[2] - prices[i], dp[3])
        dp[4] = max(dp[3] + prices[i], dp[4])
    }
    return dp[4]
}
```

## [188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

Same as the above solution, here each day will won `2 * k + 1` states.

```golang
func maxProfit(k int, prices []int) int {
    n := len(prices)
    if n == 0 {
        return 0
    }
    dp := make([][]int, n)
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 0; i < n; i++ {
        dp[i] = make([]int, 2 * k + 1)
    }
    for i := 1; i < 2 * k + 1; i+=2 {
        dp[0][i] = -prices[0]
    }
    for i := 1; i < n; i++ {
        for j := 1; j < 2 * k + 1; j++ {
            if j % 2 == 1 {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i])   
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - 1] + prices[i])   
            }
        }
    }
    return dp[n - 1][2 * k]
}
```

We can reduce the space complexity to O(n)

```golang
func maxProfit(k int, prices []int) int {
    n := len(prices)
    if n == 0 {
        return 0
    }
    dp := make([]int, 2 * k + 1)
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i < 2 * k + 1; i+=2 {
        dp[i] = -prices[0]
    }
    for i := 1; i < n; i++ {
        for j := 1; j < 2 * k + 1; j++ {
            if j % 2 == 1 {
                dp[j] = max(dp[j], dp[j - 1] - prices[i])   
            } else {
                dp[j] = max(dp[j], dp[j - 1] + prices[i])   
            }
        }
    }
    return dp[2 * k]
}
```

## [309. Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

Similar like the above problems, we need to define the states of i$th$ day based on the state machine diagram.

```
               -----
               |   |
               ⌄   |
          ------------
          | Cooldown | 
          ------------
            /        ^
   __      /          \
   | |    /            \
   ⌄ |   ⌄              \                              
------------         ------------
| Buy      |------- >| Sold     | 
------------         ------------

```

1) dp[i][0] we are holding the stock, so `dp[i][0] = max(dp[i-1][0], dp[i-1][2] - prices[i])`
2) dp[i][1] we are selling the stock, so `dp[i][1] = dp[i - 1][0] + prices[i]`
3) dp[i][2] we are in the cooldown period, so `dp[i][2] = max(dp[i-1][2], dp[i-1][1])`


```golang
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][3]int, n)
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    dp[0] = [3]int{-prices[0], 0, 0}
    for i := 1; i < n; i++ {
        dp[i][0] = max(dp[i-1][0], dp[i-1][2] - prices[i])
        dp[i][1] = dp[i-1][0] + prices[i]
        dp[i][2] = max(dp[i-1][2], dp[i-1][1])
    }
    return max(dp[n-1][1], dp[n-1][2])
}
```

We can also reduce the space complexity to O(n)

```golang
func maxProfit(prices []int) int {
    n := len(prices)
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    hold := -prices[0]
    cooldown := 0
    sold := 0
    for i := 1; i < n; i++ {
        previousSold := sold
        sold = hold + prices[i]
        hold = max(hold, cooldown - prices[i])
        cooldown = max(cooldown, previousSold)
    }
    return max(cooldown, sold)
}
```


## [714. Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

Same like #122, we just need to process the transaction fee when buying a new stock

```golang
func maxProfit(prices []int, fee int) int {
    n := len(prices)
    dp := make([][2]int, n)
    dp[0] = [2]int{-prices[0]-fee, 0}
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i < n; i++ {
        dp[i][0] = max(dp[i-1][0], dp[i-1][1] - prices[i] - fee)
        dp[i][1] = max(dp[i-1][1], dp[i-1][0] + prices[i])
    }
    return dp[n-1][1]
}
```