---
title: JumpGame  Problems
date: 2021-10-03 22:05:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
    - JumpGame
    - Binary Tree
    - DFS
    - Dynamic Programming
    - Two Pointers
---

## [55. Jump Game](https://leetcode.com/problems/jump-game/)

a. Greedy solutions

At each step, a greedy jump can give us the local optimal furthest solution. Our global solution can be found in if we always take the greedy jump.

```golang
func canJump(nums []int) bool {
    distance := 0
    length := len(nums)
    for i := 0; i <= distance; i++ { // Note: here we use distance to control which items we can check
        if distance < i + nums[i] {
            distance = i + nums[i]
        }
        if distance >= length - 1 {
            return true
        }
    }
    return false
}
```

b. Dynamic programming

```golang
func canJump(nums []int) bool {
    length := len(nums)
    dp := make([]int, length)
    dp[0] = true
    for i := 0; i < length; i++ {
        if dp[i] {
            for j := 1; j <= nums[i] && i + j < length; j++ {
                dp[i + j] = true
            }
        }
    }
    return dp[length - 1]
}
```

## [45. Jump Game II](https://leetcode.com/problems/jump-game-ii/)

a. Greedy solution

Each time, we will jump to a position which can make us future jumping even further. And each jump will resolve to a coverage range as below, so the total jump steps will be the sum of times we reach to the edge of the coverge range.

```
| 2 | 3 | 1 | 1 | 4 | 5 | 1 | 2 |

|---------->|
    |-------------->|

                |-------------->|
```

```golang
func jump(nums []int) int {
    result := 0
    length := len(nums)
    end := 0
    max := 0
    for i := 0; i < length - 1; i++{
        if max < nums[i] + i {  // Get the next coverage edge
            max = nums[i] + i
        }
        if i == end {           // Switch to the next range with a jump
            end = max
            result++
        }
    }
    return result
}
```

b. Dynamic programming

```golang
func jump(nums []int) int {
    dp := make([]int, len(nums))
    dp[0] = 0
    for i := 1; i < len(nums); i++ {
        dp[i] = -1
    } 
    for i := 0; i < len(nums); i ++ {
        for j := 1; j <= nums[i] && i + j < len(nums); j++ {
            if dp[i + j] == -1 {
                dp[i + j] = dp[i] + 1   
            } else if dp[i + j] > dp[i] + 1 {
                dp[i + j] = dp[i] + 1
            }
        }
    }
    return dp[len(nums) - 1]
}
```

## [1306. Jump Game III](https://leetcode.com/problems/jump-game-iii/)

The keypoint here is during the traversal of the recursive, we don't get lost in a infinite loop. So we need to remember all of the visted nodes in a hash.

a. Recursive solution
```golang
func canReach(arr []int, start int) bool {
    result := false
    reachedNodes := make(map[int]bool)
    var jump func(int)
    jump = func(index int) {
        if arr[index] == 0 {
            result = true
            return
        }
        if reachedNodes[index] {
            return
        }
        reachedNodes[index] = true
        if index - arr[index] >= 0 {
            jump(index - arr[index])
        }
        if index + arr[index] < len(arr) {
            jump(index + arr[index])
        }
    }
    jump(start)
    return result
}
```

b. Queue traversal solution.

```golang
func canReach(arr []int, start int) bool {
    reachedNodes := make(map[int]bool)
    queue := []int{start}
    length := len(arr)
    for len(queue) > 0 {
        index := queue[0]
        if arr[index] == 0 {
            return true
        }
        reachedNodes[index] = true
        queue = queue[1:]
        if index + arr[index] < length && !reachedNodes[index + arr[index]] {
            queue = append(queue, index + arr[index])
        }
        if index - arr[index] < length && !reachedNodes[index - arr[index]] {
            queue = append(queue, index - arr[index])
        }
    }
    return false
}
```

## [1345. Jump Game IV](https://leetcode.com/problems/jump-game-iv/)

## [1340. Jump Game V](https://leetcode.com/problems/jump-game-v/)

## [1696. Jump Game VI](https://leetcode.com/problems/jump-game-vi/)

## [1871. Jump Game VII](https://leetcode.com/problems/jump-game-vii/)

A naive idea is to iterate over all nodes, so the worse time complexity could be O(n * k) [K = maxJump - minJump] which most likely will cause a TLE issue. A keypoint to solve this problem is we need to avoid the duplicated node visiting. One way is we can use a hashmap to note all visited elements. Another method is that we can bypass the overlap like below:

```
01010101010101011111
  |--------->|
  1          2
    |--------->|
    3          4
```

The first jump range is 1~2, the second is 3~4, here the range 3~2 doesn't need to be visited again. With this in mind, we can use tree-like traversal solution with queue or two pointers sliding window to fix this issue.


a. Queue with traversal solution

```golang
func canReach(s string, minJump int, maxJump int) bool {
    queue := []int{0}
    length := len(s)
    visited := make(map[int]bool)
    visited[0] = true
    edge := 0
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for len(queue) > 0 {
        index := queue[0]
        if index == length - 1 {
            return true
        }
        queue = queue[1:]
        left := index + minJump
        right := min(length - 1, index + maxJump)
        for i := max(edge + 1, left); i <= right; i++ {
            if s[i] == '0' && !visited[i]{
                visited[i] = true
                queue = append(queue, i)
            }
        }
        edge = right
    }
    return false
}
```

b. Two pointers sliding window


```golang
func canReach(s string, minJump int, maxJump int) bool {
    length := len(s)
    if s[length - 1] == '0' {
        min := func(a, b int) int {
            if a > b {
                return b
            }
            return a
        }
        max := func(a, b int) int {
            if a > b {
                return a
            }
            return b
        }
        canVisit := make(map[int]bool)
        canVisit[0] = true
        edge := 0
        for i := 0; i <= edge && i < length; i++ {
            if canVisit[i] {
                left := i + minJump
                right := min(length - 1, i + maxJump)
                for j := max(left, edge + 1); j <= right; j++ {
                    if s[j] == '0' {
                        canVisit[j] = true
                        if j == length - 1 {
                            return true
                        }
                    }
                }
                edge = right
            }
        }
    }
    return false
}
```