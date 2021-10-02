---
title: Backtracking - Partioning
date: 2021-10-01 18:05:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Backtracking
---

Partitioning is another classical problem which can be solved with backtracking algorithm.

## [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

```golang
func partition(s string) [][]string {
    result := [][]string{}
    path := []string{}
    length := len(s)
    isParlindrom := func(s string) bool {
        for i, j := 0, len(s) - 1; i < j; i, j := i + 1, j - 1 {
            if s[i] != s[j] {
                return false
            }
        }
        return true
    }
    var backtracking func(int)
    backtracking = func(index int) {
        if index == length {
            temp := make([]int, len(path))
            copy(temp, path)
            result = append(result, temp)
            return
        }
        for i := index; i < length; i++ {
            if isParlindrom(s[index:i + 1]) {
                path = append(path, s[index: i + 1])
                backtracking(i + 1)
                path = path[:len(path) - 1]
            }
        }
    }
    backtracking(0)
    return result
}
```

## [93. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)

We need to consider the edge case that some numbers start with 0 since golang's `strconv.Atoi` will convert those string to integer successfully.

```golang
import (
    "strings"
    "strconv"
)

func restoreIpAddresses(s string) []string {
    result := []string{}
    path := []string{}
    length := len(s)
    var backtracking func(int)
    backtracking = func(index int) {
        if index > length {
            return
        } else if len(path) == 4 {
            if index == length {
                result = append(result, strings.Join(path, "."))
            }
            return
        }
        for i := index; i < length; i++ {
            if i - index <= 2 {
                num, _ := strconv.Atoi(s[index:i + 1])
                if (i - index == 2 && num < 100) || (i - index == 1 && num < 10) {
                    continue
                }
                if num < 256 {
                    path = append(path, s[index:i + 1])
                    backtracking(i + 1)
                    path = path[:len(path) - 1]
                }
            }
        }
    }
    backtracking(0)
    return result
}
```