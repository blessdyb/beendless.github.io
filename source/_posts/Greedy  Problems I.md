---
title: Greedy Problems - I
date: 2021-10-03 10:25:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
---

Greedy is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. So **the problems where choosing locally optimal also leads to global solution are best fit for Greedy**.

## [455. Assign Cookies](https://leetcode.com/problems/assign-cookies/)

If every child is content, then all children are content. So local optimal leads to a global optimal solution. We can use greedy. Now we want to make more child happy, we can use greedy algorithm to give the children whose gratitude is lower first.

```golang
import "sort"
func findContentChildren(g []int, s []int) int {
    sort.Ints(g)
    sort.Ints(s)
    result := 0
    for i, j := 0, 0; i < len(g) && j < len(s); j++{
        if g[i] <= s[i] {
            i++
            result++
        }
    }
    return result
}
```

## [376. Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence/)

a. Greedy solution

If all connected neighbour nodes are wiggle, the whole slice will be wiggle, it means we can use greedy algorithm. We can also draw the wave with all elements in the slice, our target is to calculate how many peaks (positive/negative) in the wave, here the peak is elements which left diff and right diff have different symbols.

```golang
func wiggleMaxLength(nums []int) int {
    result := 1
    previous := 0
    current := 0
    for i := 0; i < len(nums) - 1; i++ {
        current = nums[i + 1] - nums[i]
        if (current > 0 && previous <= 0) || (current < 0 && previous >= 0) {
            previous = current
            result++
        }
    }
    return result
}
```

b. Dynamic programming solution. Since we want to get the **maximum number**, the first algorithm in our mind will be dynamic programming. 

```golang
func wiggleMaxLength(nums []int) int {
    length := len(nums)
    if length < 2 {
        return length
    }
    dpUp := 1
    dpDown := 1
    for i := 1; i < length; i++ {
        if nums[i] > nums[i - 1] {
            dpUp = dpDown + 1
        } else if nums[i] < nums[i - 1] {
            dpDown = dpUp + 1
        }
    }
    if dpUp > dpDown {
        return dpUp
    }
    return dpDown
}
```

## [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

A naive solution will be using a two level nested for loop to go through all combinations of subsets.

a. Greedy implementation

The idea of using greedy algorithm is when calculating the local maximum sum, if the current sum of all previous elements are negative, we will reset the start point as the current element.

```golang
func maxSubArray(nums []int) int {
    result := nums[0]
    sum := 0
    for i := 0; i < len(nums); i++ {
        sum += nums[i]
        if sum > result {
            result = sum
        }
        if sum < 0 {
            sum = 0
        }
    }
}
```

b. Dynamic programming

```golang
func maxSubArray(nums []int) int {
    result := nums[0]
    dp := make([]int, len(nums))
    dp[0] = nums[0]
    for i := 1; i < len(nums); i++ {
        if dp[i - 1] < 0 {
            dp[i] = nums[i]
        } else {
            dp[i] = dp[i - 1] + nums[i]
        }
        if result < dp[i] {
            result = dp[i]
        }
    }
    return result
}

func maxSubArray(nums []int) int {
    result := nums[0]
    dp := nums[0]
    for i := 1; i < len(nums); i++ {
        if dp < 0 {
            dp = nums[i]
        } else {
            dp = dp + nums[i]
        }
        if result < dp {
            result = dp
        }
    }
    return result
}
```

c. Devide and conquer 

```golang
func maxSubArray(nums []int) int {
    getCrossMiddleMaxSubArray := func(start, end, middle int) int {
        left, right := 0, 0
        if middle > 0 {
            sum := 0
            for i := middle - 1; i >= start; i-- {
                sum += nums[i]
                if sum > left {
                    left = sum
                }
            }
        }
        if middle < end {
            sum := 0
            for i := middle + 1; i <= end; i++ {
                sum += nums[i]
                if sum > right {
                    right = sum
                }
            }
        }
        return left + nums[middle] + right
    }
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    var getMaxSubArray func(int, int) int
    getMaxSubArray = func(start, end int) int {
        if start == end {
            return nums[start]
        }
        mid := (start + end) / 2
        left := getMaxSubArray(start, mid)
        right := getMaxSubArray(mid + 1, end)
        middle := getCrossMiddleMaxSubArray(start, end, mid)
        return max(max(left, middle), right)
    }
    return getMaxSubArray(0, len(nums) - 1)
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