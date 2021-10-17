---
title: Monotonic Stack
date: 2021-10-16 11:14:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Monotonic Stack
---

Monotonic Stack is the best time complexity solution for many “range queries in an array” problems. Because every element in the array could only enter the monotonic stack once, the time complexity is O(N). (N represents the length of the array).

## [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

Since we want to get the first larger element after the current element, we can consider using the monotonic stack.

```golang
func dailyTemperatures(temperatures []int) []int {
    n := len(temperatures)
    result := make([]int, n)
    stack := []int{}
    for i := 0; i < n; i++ {
        for len(stack) > 0 && temperatures[i] > temperatures[stack[len(stack) - 1]]{
            last := stack[len(stack) - 1]
            result[last] = i - last
            stack = stack[:len(stack) - 1]
        }
        stack = append(stack, i)
    }
    return result
}
```

## [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)

We use a monotonic stack to iterate over the nums2 array. During the iteration, if we find that the top stack value is lower than the current value and the top stack value exist in nums1, it means we get the one result in nums1. Since all elements are unique, we don't need to worry about the override risk.

```golang
func nextGreaterElement(nums1 []int, nums2 []int) []int {
    result := make([]int, len(nums1))   
    hash := make(map[int]int)
    for i := 0; i < len(nums1); i++ {
        result[i] = -1
        hash[nums1[i]] = i
    }
    stack := []int{0}
    for i := 1; i < len(nums2); i++ {
        if nums2[i] <= nums2[stack[len(stack) - 1]] { 
            stack = append(stack, i)
        } else {
            for len(stack) > 0 && nums2[i] > nums2[stack[len(stack) - 1]] { // unique values in both nums1 and nums2
                if index, ok := hash[nums2[stack[len(stack) - 1]]] {
                    result[index] = nums2[i]
                }
                stack = stack[:len(stack) - 1]
            }
            stack = append(stack, i)
        }
    }
    return result
}
```
## [503. Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)

We can concat two nums2 to one and get a longer list of result, then reduce the result size to half. It will be a same problem as the above one. We can also use mod operator to get the correct index

```golang
func nextGreaterElements(nums []int) []int {
    n := len(nums)
    stack := []int{0}
    result := make([]int, n)
    for i := 0; i < n; i++ {
        result[i] = -1
    }
    for i := 1; i < 2 * n; i++ {
        for len(stack) > 0 && nums[i % n] > nums[stack[len(stack) - 1]] {
            result[stack[len(stack) - 1]] = nums[i % n]
            stack = stack[:len(stack) - 1]
        }
        stack = append(stack, i % n)
    }
    return result
}
```

## [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water)

## [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
