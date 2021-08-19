---
title: Two Pointers Array
date: 2021-08-17 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Array
---

1. Array Elements In-Placed Removal

Let's take a look at a easy problem on Leetcode [27. Remove Element](https://leetcode.com/problems/remove-element/). We will demonstrate how to remove an element from an array without allocating extra space for another array.
```golang
func removeElement(nums []int, val int) int {
	length := len(nums)
	ret := 0
	for j: = 0; j < length; j++ {
		if nums[j] != val {
			if ret < j {
				nums[ret] = nums[j]
			}
			ret++
		}
		j++
	}
	return ret
}
```

Golang Playbook: https://play.golang.org/p/bhOG7VWIE0-

2. Squares of a Sorted Array

Here is another problem on Leetcode [977. Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/). The straight forward solution will be calculate the squares of the given array with an O(n) loop and then use fast sort to get a result O({% mathjax %}n\log{_2}{n}{% endmathjax %}). So the complexity will be O(n + {% mathjax %}n\log{_2}{n}{% endmathjax %}). Let's review the sorted array again. For the squares of the given array, the maximum squred number can only exist on either left end or right end. It means if we have two pointers start at both ends, we can continus comparing the squred number and move the pointer inward, the pointers will meet at the minumum squred number. So the time complexity will be O(n)
```golang
func sortedSquares(nums []int) []int {
    length := len(nums)
    ret := make([]int, length, length)
    for i, j, k := 0, length - 1, length -1; k >= 0; k-- {
        squred_i := nums[i] * nums[i]
 		squred_j := nums[j] * nums[j]
 		if squred_j > squred_i {
 			ret[k] = squred_j
            j--
 		} else {
 			ret[k] = squred_i
            i++
 		}
    }
    return ret
}
```

Golang Playbook: https://play.golang.org/p/h_rFxkg42a4

3. Sliding window

Generally speaking, a sliding window is a sub-list than runs over an underlying collection. This technique shows how a nested for loop in some array related problems can be converted to a single for loop to reduce the time complexity. Here is a Leetcode problem [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/). We can easily solve it with two nested loops with O(n$2$) time complexity. Let's see how we can optimize it with two pointers sliding window.
```golang
func minSubArrayLen(target int, nums []int) int {
	ret := 0
	length := len(nums)
	sum := 0
	for i, j := 0, 0; j < length; j++ {
		sum += nums[j]
		for sum >= target {
			subLength := j - i + 1 // Note: the length of subArray need +1
			if ret == 0 || subLength < ret {
				ret = subLength
			}
			sum -= nums[i]
			i++
		}
	}
	return ret
}
```

Golang Playbook: https://play.golang.org/p/EjMpnZJvBaW

Since all elements will be visited by the sliding window at most twice (entering or exiting), so the time complexity is O(n) instead of O(n$2$)