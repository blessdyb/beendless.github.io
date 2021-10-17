---
title: Dynamic Programming IV
date: 2021-10-14 11:14:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
    - Two Pointers
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

a. Dynamic Programming

Let's denote dp[i][j] as a boolean value to identify if substring s[j:i] is a parlindrom or not. So if s[j] != s[i], then dp[i][j] is false. Otherwise, there are three cases:

1) i - j <= 1, so dp[i][j] = true
2) i - j > 1, so dp[i][j] = dp[i - 1][j + 1]

```language
func countSubstrings(s string) int {
    n := len(s)
    dp := make([][]bool, n + 1)
    result := 0
    for i := 0; i <= n; i++ {
        dp[i] = make([]bool, n + 1)
        for j := 0; j <= i; j++ {
            if i == 0 || j == 0 {
                continue
            } else if s[j - 1] == s[i - 1] {
                if i - j <= 1 || dp[i - 1][j + 1] {
                    dp[i][j] = true
                    result++
                }
            }
        }
    }
    return result
}
```

b. Two pointers expand from center solution

All parlindrom related problems, we can try to use two pointers solution, we selecte the middle point (it could be only one pointer or two pointers), then we expand to left and right.

```golang
func countSubstrings(s string) int {
    n := len(s)
    expanding := func(l, r int) int { // return the numbers of parlindrom substrings the given string contains
        result := 0
        for l >= 0 && r < n && s[l] == s[r] {
            result++
            l--
            r++
        }
        return result
    }
    result := 0
    for i := 0; i < n; i++ {
        result += expanding(i, i)
        result += expanding(i, i + 1)
    }
    return result
}
```


## [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence)

Denote dp[i][j] as the longest palindromic sequence in s[i:j], so if s[i] == s[j], dp[i][j] = 2 + dp[i + 1][j - 1]. Otherwise dp[i][j] = max(dp[i][j - 1], dp[i + 1][j]). Since dp[i][j] depends on dp[i+1][?] value, we should reverse the for loop

```golang
func longestPalindromeSubseq(s string) int {
    n := len(s)
    dp := make([][]int, n)
    for i := 0; i < n; i++ {
        dp[i] = make([]int, n)
        dp[i][i] = 1
    }
    for i := n - 1; i >= 0; i-- {
        for j = i + 1; j < n; j++ {
            if s[i] == s[j] {
                dp[i][j] = dp[i + 1][j - 1] + 2
            } else {
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[0][n - 1]
}
```

## [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring)

a. Dynamic Programming

Same as above, let's denote dp[i][j] to flag if s[i:j] is a parlindrom. So we know if s[i] == s[j], dp[i][j] = dp[i + 1][j - 1].  and dp[i][i] = true.

```golang
func longestPalindrome(s string) string {
    n := len(s)
    dp := make([][]bool, n)
    for i := 0; i < n; i++ {
        dp[i] = make([]bool, n)
        dp[i][i] = true
    }
    max := 1
    result = string(s[0])
    for i := n - 1; i >= 0; i-- {
        for j := i + 1; j < n; j++ {
            if s[i] == s[j] {
                if j - i <= 1 {
                    dp[i][j] = true
                } else {
                    dp[i][j] = dp[i + 1][j - 1]
                }
                if dp[i][j] && max < j - i + 1 {
                    max = j - i + 1
                    result = s[i:j + 1]
                }
            }
        }
    }
    return result
}
```

b. Two pointers expand from center solution

```golang
func longestPalindrome(s string) string {
    n := len(s)
    expanding := func(l, r int) int { // return the longest length of the parlindrom in the given substring
        for l >= 0 && r < n && s[l] == s[r] {
            l--
            r++
        }
        return r - l - 1
    }
    max := 0
    start := 0
    for i := 0; i < n; i++ {
        p1 := expanding(i, i)
        p2 := expanding(i, i + 1)
        if p1 > p2 && max < p1 {
            start = i - (p1 - 1) / 2
            max = p1
        } else if max < p2 && p1 < p2 {
            start = i -  (p2 - 2) / 2
            max = p2
        }
    }
    return s[start:start + max]
}
```
