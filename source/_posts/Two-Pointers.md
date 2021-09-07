---
title: Two Pointers
date: 2021-09-06 00:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Array
    - Linked List
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

4. Reverse a Linked List

It's easy to use an additional Linked List to reverse a Linked List. But we can use two pointers to reduce the space complexity down to O(1). Let's check a LeetCode problem [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

```golang
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
	var pre *ListNode
	cur := head
	for cur != nil {
		temp := cur.Next
		cur.Next = pre
		pre = cur
		cur = temp
	}
	return pre
}
```

We can also solve it with a recursive solution
```golang
func helper(pre, node *ListNode) *ListNode {
    if node == nil {
        return pre
    }    
    next := node.Next
    node.Next = pre
    return helper(node, next)
}

func reverseList(head *ListNode) *ListNode {
    return helper(nil, head)
}
```

5. Remove the last Nth node from a Linked List

The two pointers method can also help us to remove the last Nth node from a Linked List within one iteration. Let's check LeetCode problem [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/submissions/). Another tip for Linked List node removal, with the help of a dummy node pointing to the head node, it will simplify the process.

```golang
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummy := &ListNode{
		Next: head,
	}
	pre, cur := dummy, dummy
	for i := 0; cur != nil; i++ {
		cur = cur.Next
		if i > n {  // Since deleting a node, we must get its previous node, so the distance between those two pointers is n + 1 instead of n
			pre = pre.Next
		}
	}
	pre.Next = pre.Next.Next
	return dummy.Next
}
```

6. Swap Nodes in Pairs

[24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) is a similar problem similar to #4 and #5 above. We can quickly solve it with dummy node and two pointers. 

```golang
func swapPairs(head *ListNode) *ListNode {
	dummy := &ListNode{
		Next: head,
	}
	p := dummy
	for head != nil && head.Next != nil {
		p.Next = head.Next
		temp := p.Next.Next
		p.Next.Next = head
		head.Next = temp
		p = head
		head = temp
	}
	return dummy.Next
}
```

**Tip:**
We can come up with a template here, whenever the solution expects a `*ListNode` as return value, we should consider using dummy node pointing to the head node.


7. Intersection of Two Linked Lists

[160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/) The key point to solve this problem is to understand the meaning of the intersected Linked List. Based on the examples and description, after the intersected nodes, the two Linked Lists share the same tail nodes. So we just need to find the shorter one's length N and compare the last N nodes of the given two Linked List.
```golang
func getIntersectionNode(headA, headB *ListNode) *ListNode {
 	m, n := 0, 0
 	p, q := headA, headB
 	for p != nil {
 		p = p.Next
 		m++
 	}
 	for q != nil {
 		q = q.Next
 		n++
 	}
 	l, s := headA, headB
 	k := m - n
 	if m < n {
 		l, s = s, l
 		k = n - m
 	}
 	for l != nil {
 		if k <= 0 {
 			if s == l {
 				return s
 			}
 			s = s.Next
 		} else {
 			k--
 		}
 		l = l.Next
 	}
}
```

8. Detect Circles I

A classical usage of two pointers is to detect if a Linked List contains a circle. We can have a faster and a slower pointer. If there's a circle, the faster pointer should meet the slower one before it reaches to the end of the Linked List. The faster pointer's moving speed can be set to two times of the slower one's. [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
```golang
func hasCycle(head *ListNode) bool {
	if head != nil && head.Next != nil {
		f, l := head, head.Next
		for f != l {
			if f == nil || f.Next == nil {
				return false
			}
			f = f.Next.Next
			l = l.Next
		}
		return true
	}
	return false
}
```

**Tip:**
If we make the faster pointer pointing to the head node, the slower pointer pointing to the next node of the head node, and the speed of faster one is 2 times of the slower one. They will meet when we make the first move.


9. Detect Circle's Starting Node 

Continue to the circle detection problem, how to find the starting node of the circle? Let's check [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/). Given the starting node of the circle A, let's define below variables:

* x : the distance between the head node and A
* y : the distance between A and the met node P
* z : the distance between the met node P and A

Since faster node's speed is two times of the slower one. We can get `(x + y) * 2 = n * (y + z) + (x + y)` => `x = n * (y + z) - y` => `x = (n - 1) * (y + z) + z` . It means after those two pointers meet at P,  if the slower pointer continues moving to A, the moved distance will be the same length if we move a new pointer from head to A. More information you can get from (https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.md)

```golang
func detectCycle(head *ListNode) *ListNode {
	f, s := head, head
	for f != nil && f.Next != nil {
		f = f.Next.Next
		s = s.Next
		if f == s {
			t := head
			for t != s {
				t = t.Next
				s = s.Next
			}
			return t
		}
	}
	return nil
}
```

10. 3 Sum

For LeetCode questtion [15. 3Sum](https://leetcode.com/problems/3sum/), the brute-force solution's time complexity is at least O(n^3). We can convert it to a two sum problem in side of a loop. We can compare the adjacent elements to remove the duplicated solution.
```golang
import "sort"
func threeSum(nums []int) [][]int {
	result := [][]int{}
	sort.Ints(nums)
	length := len(nums)
	for i := 0; i < length - 2; i++ {
		n1 = nums[i]
		if n1 > 0 {
			break
		}
		if i > 0 && n1 == nums[i - 1] {
			continue
		}
		j := i + 1
		k := length - 1
		for j < k {
			n2 := nums[j]
			n3 := nums[k]
			t := n1 + n2 + n3
			if t == 0 {
				result = append(result, []int{n1, n2, n3})
				while j < k && n2 == nums[j] {
					j++
				}
				while k > j && n3 == nums[k] {
					k--
				}
			} else t < 0 {
				j++
			} else {
				k--
			}
		}
	}
	return result
}
```

11. 4 Sum

Similar to 3 Sum, we can solve [18. 4Sum](https://leetcode.com/problems/4sum/) with two pointers.
```golang
import "sort"
func fourSum(nums []int, target int) [][]int {
	result := [][]int{}
	sort.Ints(nums)
	length := len(nums)
	for i := 0; i < length - 3; i++ {
		n1 := nums[i]
		if target >= 0 && n1 > target { // Note: if target is negative, we can't break the loop
			break
		}
		if i > 0 && n1 == nums[i - 1] {
			continue
		}
		for j := i + 1; j < length - 2; j++ {
			n2 := nums[j]
			if j > i + 1 && n2 == nums[j - 1] {
				continue
			}
			k := j + 1
			l := length - 1
			for k < l {
				n3 := nums[k]
				n4 := nums[l]
				t := n1 + n2 + n3 + n4
				if t == target {
					result = append(result, []int{n1, n2, n3, n4})
					for k < l && n3 == nums[k] {
						k++
					}
					for l > k && n4 == nums[l] {
						l--
					}
				} else if t < 0 {
					k++
				} else {
					l--
				}
			}
		}
	}
	return result
}
```
