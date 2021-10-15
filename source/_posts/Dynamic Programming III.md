---
title: Dynamic Programming III
date: 2021-10-13 11:06:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Dynamic Programming
---

## [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence)

If we define dp[i] as the longest increasing subsequence of [0, i]. Then dp[i] >= 1. And the state transition function is `dp[i] = max(dp[i], dp[j] + 1)` here j ∈ [0, i).

```golang
func lengthOfLIS(nums []int) int {
    n := len(nums)
    dp := make([]int, n)
    dp[0] = 1
    result = 1
    for i := 1; i < n; i++ {
        dp[i] = 1
        for j := 0; j < i; j++ {
            if nums[i] > nums[j] {
                dp[i] = max(dp[i], dp[j] + 1)
            }
        }
        result = max(result, dp[i])
    }
    return result
}
```

## [674. Longest Continuous Increasing Subsequence](https://leetcode.com/problems/longest-continuous-increasing-subsequence/)

```golang
func findLengthOfLCIS(nums []int) int {
    n := len(nums)
    dp := make([]int, n)
    dp[0] = 1
    result := 1
    for i := 1; i < n; i++ {
        if nums[i] > nums[i - 1] {
            dp[i] = dp[i - 1] + 1
        } else {
            dp[i] = 1
        }
        if result < dp[i] {
            result = dp[i]
        }
    }
    return result
}
```

We can reduce the space complexity to O(1)

```golang
func findLengthOfLCIS(nums []int) int {
    n := len(nums)
    count := 1
    result := 1
    for i := 1; i < n; i++ {
        if nums[i] > nums[i - 1] {
            count++
        } else {
            count = 1
        }
        if count > result {
            result = count
        }
    }
    return result
}
```

## [718. Maximum Length of Repeated Subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray/)

Let's denote dp[i][j] as the maximum length of repeated subarray which `ends with i and j`. So we know that `dp[i][j] = nums1[i] == nums[j] ? (dp[i-1][j-1] + 1) : 0`

```golang
func findLength(nums1 []int, nums2 []int) int {
    m := len(nums1)
    n := len(nums2)
    dp := make([][]int, m + 1)
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
    }
    result := 0
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if nums[i - 1] == nums2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            if dp[i][j] > result {
                result = dp[i][j]
            }
        }
    }
    return result
}
```

## [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

Similar like above, if we denote dp[i][j] as the maximum number commen sequence which `ends with i and j`. So we know `dp[i][j] == text1[i] == text2[j] ? dp[i-1][j-1] + 1 : max(dp[i-1][j], dp[i][j-1])`.

```golang
func longestCommonSubsequence(text1 string, text2 string) int {
    m := len(text1)
    n := len(text2)
    dp := make([][]int, m + 1)
    for i := 0; i <= m; i++ {
        dp[i] = make([]int, n + 1)
    }
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text[i - 1] == text2[j - 1] {
                dp[i][j] = 1 + dp[i - 1][j - 1]
            } else {
                dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
            }
        }
    }
    return dp[m][n]
}
```

## [1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)

## [392. Is Subsequence](https://leetcode.com/problems/is-subsequence/)

## [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

## [583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/submissions/)

## [72. Edit Distance](https://leetcode.com/problems/edit-distance/)

## [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

## [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence)