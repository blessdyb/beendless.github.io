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