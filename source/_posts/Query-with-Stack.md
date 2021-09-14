---
title: Query with Stack
date: 2021-09-12 15:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Stack
---

## [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

We can simply iterate over all items from the given string and compare the adjacent values each time with the help of stack before pushing the element in. 

```golang
func isValid(s string) bool {
    bs := make([]byte, 0)
    bs = append(bs, s[0])
    dict := map[byte]byte{
        ']': '[',
        ')': '(',
        '}': '{',
    }
    for i := 1; i < len(s); i++ {
        if v, ok := dict[s[i]]; ok && len(bs) > 0 && v == bs[len(bs) - 1] {
            bs = bs[:len(bs) - 1]
        } else {
            bs = append(bs, s[i])
        }
    }
    return len(bs) == 0
}
```

## [1047. Remove All Adjacent Duplicates In String](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)

a. Use stack to iterate the string, similar to the parentheses validation one above.
```golang
func removeDuplicates(s string) string {
    bs := make([]byte, 0)
    for i := 0; i < len(s); i++ {
        if len(bs) > 0 && s[i] == bs[len(bs) - 1]{
            bs = bs[:len(bs) - 1]
        } else {
            bs = append(bs, s[i])
        }
    }
    return string(bs)
}
```
b. Use two pointers
```golang
func removeDuplicates(s string) string {
    bs := []byte(s)
    i := 0
    for j := 0; j < len(s); j++{
        if i > 0 && bs[i] == bs[i - 1] {
            i--
        } else {
            i++
        }
    }
    return string(bs[:i])
}
```

## [150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

For arithmetic related problems, we usually use stack to solve it. The temporary computation result can be pushed to the top of the stack.
```golang
func evalRPN(tokens []string) int {
    nums := []int{}
    for _, token := range tokens {
        integer, err := strconv.Atoi(token)
        if err == nil {
            nums = append(nums, integer)
        } else {
            length := len(nums)
            x, y := nums[length - 2], nums[length - 1]
            temp := 0
            switch token {
            case "+":
                temp = x + y
            case "-":
                temp = x - y
            case "*":
                temp = x * y
            case "/":
                temp = x / y
            }
            nums[length - 2] = temp
            nums = nums[:length - 1]
        }
    }
    return nums[0]
}
```

## [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

A naive solution will be store the sliding window items into a slice and calculating the maximum value each time, the time complexity will be O(n * k). We can consider storing the sliding window items in a desending slice(Queue), it always has the maximum value at the top of the queue.
```golang
func maxSlidingWindow(nums []int, k int) []int {
    queue := make([]int, 0)
    length := len(nums)
    result := make([]int, 0)
    for i := 0; i < length; i++ {
        for len(queue) > 0 && nums[i] > nums[queue[len(queue) - 1]] {
            queue = queue[:len(queue) - 1]
        }
        queue = append(queue, i)
        for queue[0] <= i - k {
            queue = queue[1:]
        }
        if i >= k - 1 {
            result = append(result, nums[queue[0]])
        }
    }
    return result
}
```

## [71. Simplify Path](https://leetcode.com/problems/simplify-path/)

`Stack` is one of the best data structure to solve Path manipulation realted problems. 
```golang
import "strings"
func simplifyPath(path string) string {
    dirs := []string{}
    paths := strings.Split(path, "/")
    for i := 0; i < len(paths); i++ {
        if paths[i] == ".." {
            if len(dirs) > 0 {
                dirs = dirs[:len(dirs) - 1]
            }
        } else if paths[i] == "" || paths[i] == "." || paths[i] == "/" {
            continue
        } else {
            dirs = append(dirs, paths[i])
        }
    }
    return "/" + strings.Join(dirs, "/")
}
```