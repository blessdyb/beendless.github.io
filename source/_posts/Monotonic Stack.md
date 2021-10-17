---
title: Monotonic Stack
date: 2021-10-16 11:14:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Monotonic Stack
    - Dynamic Programming
    - Two Pointers
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

Based on the requirment, for each column, we will need to get the highest value on its left and right and then get the smaller one.

a. Dynamic Programming

```golang
func trap(height []int) int {
    n := len(height)   
    left := make([]int, n)
    right := make([]int, n)
    left[0] = height[0]
    right[n - 1] = height[n - 1]
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    for i := 1; i < n; i++ {
        left[i] = max(height[i], left[i - 1])
    }
    for i := n - 2; i >= 0; i-- {
        right[i] = max(height[i], right[i + 1])
    }
    result := 0
    for i := 0; i < n; i++ {
        diff := min(left[i], right[i]) - height[i]
        if diff > 0 {
            result += diff
        }
    }
    return result
}
```

b. Monotonic Stack

We will get the water layer by layer vertically for each item. [https://leetcode.wang/leetCode-42-Trapping-Rain-Water.html]. Basically, the idea is we have at least two items in the stack, if the stack top is smaller than the current one, it means the stack top is the bottom of the rain trapper, and the second top one in stack is the left bounary and the current one is the right boundary.
```
 ___
5| |
4| |     ___ 
3| |     | |
2| |__   | |
1|____|__|_|
 a b  c  d e
```
so result = (min(d, c) - 0) * (d - c) + (min(d, b) - c ) * (d - b)

```golang
func trap(height []int) int {
    result := 0
    n := len(height)
    stack := []int{}
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    for i := 0; i < n; i++ {
        for len(stack) > 0 && height[i] > height[stack[len(stack) - 1]] {
            bottom := height[stack[len(stack) - 1]]
            stack = stack[:len(stack) - 1]
            if len(stack) > 0 {
                w := i - stack[len(stack) - 1] - 1;
                h := min(height[stack[len(stack) - 1]], height[i])
                result += w * (h - bottom)
            }
        }
        stack = append(stack, i)
    }
    return result
}
```

c. Two pointers

```golang
func trap(height []int) int {
    result := 0
    n := len(height)
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    for i := 1; i < n - 1; i++ {
        left := height[i]
        for l := i - 1; l >= 0; l-- {
            left = max(left, height[l])
        }
        right := height[i]
        for r := i + 1; r < len(height); r++ {
            right = max(right, height[r])
        }
        amount := min(left, right) - height[i]
        if amount > 0 {
            result += amount
        }
    }
    return result
}
```

## [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

For each item, we need to get the first lower value than the current one on it's left and right. With this we can get the width of the rectangle.

a. Dynamic Programming

```golang
func largestRectangleArea(heights []int) int {
    n := len(heights)
    left := make([]int, n)
    left[0] = -1
    right := make([]int, n)
    right[n - 1] = n
    for i := 1; i < n; i++ {
        t := i - 1
        for t >= 0 && heights[t] >= heights[i] {
            t = left[t]
        }
        left[i] = t
    }
    for i := n - 2; i >= 0; i-- {
        t := i + 1
        for t < n && heights[t] >= heights[i] {
            t = right[t]
        }
        right[i] = t
    }
    result := 0
    for i := 0; i < n; i++ {
        area := heights[i] * (right[i] - left[i] - 1)
        if result < area {
            result = area
        }
    }
    return result
}
```

b. Monotonic Stack solution

We can use a monotonic stack to maintain the higher bars’s indices in ascending order. When encounter a lower bar, pop the tallest bar and use it as the bottleneck to compute the area.

```golang
func largestRectangleArea(heights []int) int {
    // The reason we have a 0 at the end is if the given heights is a sorted ascending array, we will push everything to the stack without doing anything.
    heights := append(heights, 0)
    n := len(heights)
    result := 0
    stack := []int{}
    for i := 0; i < n; i++ {
        for len(stack) > 0 && height[i] < height[stack[len(stack) - 1]] {
            h := heights[stack[len(stack) - 1]]
            stack = stack[:len(stack) - 1]
            w := i
            if len(stack) > 0 {
                w = i - stack[len(stack) - 1] - 1
            }
            area := h * w
            if result < area {
                result = area
            }
        }
        stack = append(stack, i)
    }
}
```