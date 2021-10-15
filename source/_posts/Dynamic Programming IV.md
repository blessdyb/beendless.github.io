---
title: Dynamic Programming IV
date: 2021-10-14 11:08:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
---


## [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

Let's denote dp[i][j] as the amount of distinct subsequences in s[:i] which can construct t[:j]. So we can get the state transition function `dp[i][j] = s[i - 1] == t[i - 1] ? (dp[i - 1][j - 1] + dp[i - 1][j] : dp[i-1][j]`. Also for the initial value, `dp[i][0]` needs to be 0 (it means there's one way we can construct empty string from s[:i]).

```golang
func numDistinct(s string, t string) int {
    m := len(s)
    n := len(t)
    dp := make([][]int, m + 1)
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
        dp[i][0] = 1
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if s[i - 1] == t[j - 1] {
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp[m][n]
}
```


## [583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/submissions/)

## [72. Edit Distance](https://leetcode.com/problems/edit-distance/)

## [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

## [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence)