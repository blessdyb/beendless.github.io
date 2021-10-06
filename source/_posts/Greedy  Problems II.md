---
title: Greedy Problems - II
date: 2021-10-05 10:25:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
---

## [1005. Maximize Sum Of Array After K Negations](https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/)

To get a maximum sum, we need to convert as many negative numbers to positive ones. If there is still an odd times of converting number left, we just need to convert the smallest positive number to a negative one

```golang
func largestSumAfterKNegations(nums []int, k int) int {
    sort.Ints(nums)
    i := 0
    for i < k && i < len(nums) {
        if nums[i] < 0 {
            nums[i] = -nums[i]
            i++
        } else {
            break
        }
    }
    if i < k && (k - i) % 2 == 1 {
        sort.Ints(nums)
        nums[0] = -nums[0]
    }
    result := 0
    for _, num := range nums {
        result += num
    }
    return result
}
```

## [134. Gas Station](https://leetcode.com/problems/gas-station/)

Several cases:
    1) If the total amount of gas is less than the total amount of the cost, we can't make a round trip
    2) Given an arbitrary start point i, and at i we have gas[i] in the tank. Let's start at this point and accumulate the gas we left in the tank. If at point i + k the acculation is negative, it means we can't reach from any point in beteeen [i, i + k - 1) to point k. So we can quickly start from i + k + 1 instead of i + 1.

So the local optimal solution for a given start point is from this starting point, we are making a round trip, the debet won't be negative. If it's negative, we need to start after the negative point. This can lead to a global optimal solution.

```golang
func canCompleteCircuit(gas []int, cost []int) int {
    result := 0
    sum := 0
    debet := 0
    for i := 0; i < len(gas); i++ {
        sum += gas[i] - cost[i]
        debet += gas[i] - cost[i]
        if debet < 0 {
            debet = 0
            result = i + 1
        }
    }
    if sum < 0 {
        return -1
    }
    return result
}
```
