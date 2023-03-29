---
title: Bluetooth navigation code analysis
date: 2021-08-04 13:54:33
categories: Bluetooth
tags:
    - Bluetooth
    - GEO Location
---

Let's take a look at a easy problem on Leetcode [704. Binary Search](https://leetcode.com/problems/binary-search/). Besides the brute-force O(n) solution, it's not hard to get the O(log(n)) solution from the constrains `unique` and `sorted in ascending order`. Binary search is one of the most basic algorithms we are using, but most people couldn't get the right code.

Based on the open/close intervals, there are two different templates for Binary Search code:

## Left-closed, Right-closed [left, right]

Two tips if you chose this one：
* Use `left <= right` for the loop condition checking
* When narrowing dow to a sub-range, use `left = middle + 1` or `right = middle - 1`

```golang
func search(nums []int, target int) int {
	start, end := 0, len(nums) - 1
	for start <= end {
		middle := (start + end) / 2
		if nums[middle] == target {
			return middle
		} else if nums[middle] > target {
			end = middle - 1
		} else {
			start = middle + 1
		}
	}
	return -1
}
```

Golang Playbook: https://play.golang.org/p/g_mimUUYz2H

## Left-closed, Right-opened [left, right)

Samething above, two similar tips for this template:
* Use `left < right` for the loop condition checking, it's because 0-based array list, the right open interval is invalid index.
* When narrowing down to a sub-range, use `left = middle + 1` and `right = middle` to keep the consistance of the intervals

```golang
func search(nums []int, target int) int {
	left, right := 0, len(nums)
	for left < right {
		middle := left + (right-left)/2
		if nums[middle] == target {
			return middle
		} else if nums[middle] > target {
			right = middle
		} else {
			left = middle + 1
		}
	}
	return -1
}
```

Golang Playbook: https://play.golang.org/p/tkUkoNElKSV


Another important thing to keep in mind is that the range overflow. You may notice that when we calculate the new sub ranges above, we are using `middle := left + (right-left)/2` instead of `middle := (left + right)/2`. So what's the difference between those two? Mathmatically there's no difference, but in computer world, the later one postentially can cause an overflow issue when the range of the array is too large. `left + right` could be larger than the biggest `int`.