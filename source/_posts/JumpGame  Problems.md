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
    - BFS
    - Dynamic Programming
    - Two Pointers
    - Sliding Window
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

This is a classical tree traversal with BFS problem. From each array index we can jump to multiple elements simoteniously, those nextstep elements can be consiered as the tree node's child nodes. So we jump to all nodes's children nodes at once which can be considered as one jump (BFS). Since the same value of the nodes can jump to each other, we have to mark the nodes values which have been pushed to the queue to make sure we don't push the same nodes back to the queue (even we have a visited flag, we can easily run out of memory without another same number flag under this edge case if we have 1000 same value nodes in the slice). 

```golang
func minJumps(arr []int) int {
    length := len(arr)
    if length < 3 {
        return length - 1
    }
    jumpIndexes := make(map[int][]int)
    for i, v := range arr {
        jumpIndexes[v] = append(jumpIndexes[v], i)
    }
    queue := make([]int, 1)
    queue[0] = 0
    result := 0
    visited := make([]bool, length)
    sameNumberVisited := make(map[int]bool) // Have a flag is one thing, another solution is to remove the sameNumber key from the jumpIndexes hashmap.
    n := len(queue)
    for n > 0 {
        for i := 0; i < n; i++ {
            index := queue[i]
            if index == length - 1 {
                return result
            }
            if !visited[index] {
                visited[index] = true
                if index - 1 >= 0 && !visited[index - 1]{
                    queue = append(queue, index - 1)
                }
                if index + 1 < length && !visited[index + 1] {
                    queue = append(queue, index + 1)
                }
                if !sameNumberVisited[arr[index]] {
                    sameNumberVisited[arr[index]] = true
                    for _, v := range jumpIndexes[arr[index]] {
                        if !visited[v] {
                            queue = append(queue, v)
                        }
                    }
                }
            }
        }
        queue = queue[n:]
        n = len(queue)
        result++
    }
    return result
}
```

## [1340. Jump Game V](https://leetcode.com/problems/jump-game-v/)

To resolve this problem, we need to understand ` you can only jump from index i to index j if arr[i] > arr[j] and arr[i] > arr[k] for all indices k between i and j (More formally min(i, j) < k < max(i, j)).`. Let's say we stand at index i, and jumping from i - 1, i + 1 until i - d, i + d inside of for loops. We need to break the loop if we find a k between [i-d, i) or (i, i + d] which makes arr[k] >= arr[i].

```golang
func maxJumps(arr []int, d int) int {
    result := 0
    length := len(arr)
    dp := make([]int, length)
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
    var jump func(int) int
    jump = func(index int) int {
        if dp[index] == 0 {
            dp[index] = 1
            for i := index - 1; i >= max(0, index - d) && arr[i] < arr[index]; i-- {
                dp[index] = max(dp[index], jump(i) + 1)
            }
            for i := index + 1; i <= min(length - 1, index + d) && arr[i] < arr[index]; i++ {
                dp[index] = max(dp[index], jump(i) + 1)
            }
        }
        return dp[index]
    }
    for i := 0; i < length; i++ {
        dp[i] = jump(i)
        result = max(dp[i], result)
    }
    return result
}
```

## [1696. Jump Game VI](https://leetcode.com/problems/jump-game-vi/)

A naive idea is to iterate over all nodes, so the worse time complexity could be O(n * k) [K = maxJump - minJump] which most likely will cause a TLE issue. This one can be considered as a classic [sliding window](/tags/Sliding-Window/) maximum problem. Since dp[i] = nums[i] + max(dp[i - k], ... , dp[i - 1]). We just need to maintain the maximum dp value in the sliding window during the iteration.

```
01010101010101011111

|---------(i)------|
    |----->|
    i-k    i-1
|----------(i + 1)------|
     |----->|
     i-k+1  i
```


```golang
func maxResult(nums []int, k int) int {
    length := len(nums)
    queue := []int{0}      // stores the dp indexes of the sliding window items
    dp := make([]int, length)
    dp[0] = nums[0]
    for i := 1; i < length; i++ {
        maxSumIndex := queue[0]
        dp[i] = nums[i] + dp[maxSumIndex]
        for len(queue) > 0 && dp[queue[len(queue) - 1]] <= dp[i] { // sliding window queue contains all values in a desending order
            queue = queue[:len(queue) - 1]
        }
        for len(queue) > 0 && i - queue[0] >= k {  // remove the index which is going to out of the window
            queue = queue[1:]
        }
        queue = append(queue, dp[i])
    }
    return dp[length - 1]
}
```




## [1871. Jump Game VII](https://leetcode.com/problems/jump-game-vii/)

Same as the above one, a naive dp will get a TLE. A keypoint to solve this problem is we need to avoid the duplicated node visiting. One way is we can use a hashmap to note all visited elements. Another method is that we can bypass the overlap like below:

```
01010101010101011111
  |--------->|
  1          2
    |--------->|
    3          4
```

The first jump range is 1 ~ 2, the second is 3 ~ 4, here the range 3 ~ 2 doesn't need to be visited again. With this in mind, we can use tree-like traversal solution with queue or two pointers sliding window to fix this issue.


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

b. Two pointers


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