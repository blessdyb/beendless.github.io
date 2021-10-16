---
title: Dynamic Programming IV
date: 2021-10-14 11:10:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
---


## [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

Let's denote dp[i][j] as the amount of distinct subsequences in s[:i] which can construct t[:j]. So we can get the state transition function dp[i][j] = s[i - 1] == t[i - 1] ? (dp[i - 1][j - 1] + dp[i - 1][j] : dp[i-1][j]. Also for the initial value, `dp[i][0]` needs to be 0 (it means there's one way we can construct empty string from s[:i]).

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

a. LCS solution.

Delete characters to make two strings match, in another word, it means we need to find the longest common sequence.

```golang
func minDistance(word1 string, word2 string) int {
    m := len(word1)
    n := len(word2)
    dp := make([][]int, m + 1)
    lcs := 0
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
        for j := 0; j <= n; j++ {
            if i == 0 || j == 0 {
                continue
            } else if word1[i - 1] == word2[j - 1] {
                dp[i][j] = 1 + dp[i-1][j-1]
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            }
            lcs = max(lcs, dp[i][j])
        }
    }
    return m + n - 2 * lcs
}
```

b. Intuitive dynamic programming solution.

Let's denote dp[i][j] as the minimum delete operation to match word1[:i] and word2[:j]. So the state transition function is dp[i][j] = word1[i-1] == word2[j-1] ? dp[i-1][j-1] : max(dp[i - 1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 2).

```golang
func minDistance(word1 string, word2 string) int {
    m := len(word1)
    n := len(word2)
    dp := make([][]int, m + 1)
    min := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
        for j := 0; j <= n; j++ {
            if i == 0 {
                dp[i][j] = j
            } else if j == 0 {
                dp[i][j] = i
            } else if word1[i - 1] == word2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = min(dp[i][j - 1] + 1, min(dp[i - 1][j] + 1, dp[i - 1][j - 1] + 2))
            }
        }
    }
    return dp[m][n]
}
```

We can also reduce the space complexity to O(n)

```golang
func minDistance(word1 string, word2 string) int {
    m := len(word1)
    n := len(word2)
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    dp := make([]int, n + 1)
    for i := 0; i <= m; i++ {
        temp := make([]int, n + 1)
        for j := 0; j <= n; j++ {
            if i == 0 {
                temp[j] = j
            } else if j == 0 {
                temp[j] = i
            } else if word1[i - 1] == word2[j - 1] {
                temp[j] = dp[j - 1]
            } else {
                //temp[j] = min(temp[j - 1] + 1, min(dp[j] + 1, temp[j - 1] + 2))
                temp[j] = 1 + min(temp[j - 1], dp[j])
            }
        }
        dp = temp
    }
    return dp[n]
}
```

## [72. Edit Distance](https://leetcode.com/problems/edit-distance/)

This one is similar as the above one. Let's denote dp[i][j] as the edit distance between word1[:i] and word2[:j]. So if word1[i] == word2[j], we get dp[i][j] = dp[i - 1][j-1]. Otherwise, there will be three cases:
1) add/delete one from word1, so dp[i-1][j] + 1 or dp[i][j-1] + 1
2) add/delete one from word2, so dp[i-1][j] + 1 or dp[i][j-1] + 1
3) replace one from either word1 or word2, so dp[i-1][j-1] + 1

So dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

```golang
func minDistance(word1 string, word2 string) int {
    m := len(word1)
    n := len(word2)
    dp := make([][]int, m + 1)
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
        for j := 0; j <= n; j++ {
            if i == 0 {
                dp[i][j] = j
            } else if j == 0 {
                dp[i][j] = i
            } else if word1[i - 1] == word2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = 1 + min(dp[i - 1][j - 1], min(dp[i - 1][j], dp[i][j - 1]))
            }
        }
    }
    return dp[m][n]
}
```

we can also reduce the space complexity to O(n)

```golang
func minDistance(word1 string, word2 string) int {
    m := len(word1)
    n := len(word2)
    dp := make([]int, n + 1)
    min := func(a, b int) int {
        if a > b {
            return b
        }
        return a
    }
    for i := 0; i <= m; i++ {
        temp := make([]int, n + 1)
        for j := 0; j <= n; j++ {
            if i == 0 || j == 0 {
                temp[j] = i + j
            } else if word1[i - 1] == word2[j - 1] {
                temp[j] = dp[j - 1]
            } else {
                temp[j] = 1 + min(dp[j - 1], min(dp[j], temp[j - 1]))
            }
        }
        dp = temp
    }
    return dp[n]
}
```
## [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

## [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence)