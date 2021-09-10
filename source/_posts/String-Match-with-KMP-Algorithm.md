---
title: String Match with KMP Algorithm
date: 2021-09-09 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - String
    - KMP
---

Search if a given string pattern (needle) is part of a target string (haystack) is a common problem. The naive approach is to use two nested loops with O(n * m) time complexity. KMP is a better way which has a better performance.

Two keypoints to implement KMP algorithm:

a. Generate LPS (Longest common proper Prefix and Suffix ) dictionary
b. Use LPS dictionary to identify a better pointer position for next matching instead of steping back.

## [28. Implement strStr()](https://leetcode.com/problems/implement-strstr/)

```golang
func strStr(haystack string, needle string) int {
    n, m := len(haystack), len(needle)
    if m == 0 {
        return 0
    }
    j := -1
    lps := getLPS(needle)
    for i := 0; i < n; i++ {
        for j >= 0 && haystack[i] != needle[j + 1] {
            j = lps[j]
        }
        if haystack[i] == needle[j + 1] {
            j++
        }
        if j == m - 1 {
            return i - m + 1
        }
    }
    return -1
}

func getLPS(s string) []int {
    length := len(s)
    j := -1
    lps := make([]int, length)
    lps[0] = -1
    for i := 1; i < length; i++ {
        for j >= 0 && s[i] != s[j + 1] {
            j = lps[j]
        }
        if s[i] == s[j + 1] {
            j++
        }
        lps[i] = j
    }
    return lps
}
```

## [459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)

Since we can get the longest common prefix suffix by using KMP. For a string, if its LPS[n - 1] != -1, it means it has common prefix and suffix. So with this in mind, we can check `len(s) % (len(s) - lps[-1] + 1)`.

```golang
func repeatedSubstringPattern(s string) bool {
    n := len(s)
    if n == 0 {
        return false
    }
    lps := getLPS(s)
    return lps[n - 1] > -1 && n % (n - (lps[n - 1] + 1)) == 0
}

func getLPS(s string) []int {
    length := len(s)
    j := -1
    lps := make([]int, length)
    lps[0] = j
    for i := 1; i < length; i++ {
        for j >= 0 && s[i] != s[j + 1] {
            j = lps[j]
        }
        if s[i] == s[j + 1] {
            j++
        }
        lps[i] = j
    }
    return lps
}
```

## [1392. Longest Happy Prefix](https://leetcode.com/problems/longest-happy-prefix/)

Same as above, we can quickly get the LPS slice and check lps[n-1]
```golang
func longestPrefix(s string) string {
    n := len(s)
    if n > 0 {
        lps := make([]int, n)
        lps[0] = -1
        for i, j := 1, -1; i < n; i++ {
            for j >= 0 && s[i] != s[j + 1] {
                j = lps[j]
            }
            if s[i] == s[j + 1] {
                j++
            }
            lps[i] = j
        }
        if lps[n - 1] > -1 {
            return s[n - (lps[n - 1] + 1):]
        }
    }
    return ""
}
```

## [214. Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)

a. A naive brute-force solution will be :
```golang
func shortestPalindrome(s string) string {
    bs := []byte(s)
    length := len(bs)
    for i, j := 0, length - 1; i < j; i, j = i + 1, j - 1 {
        bs[i], bs[j] = bs[j], bs[i]
    }
    reverted := string(bs)
    for i := 0; i < length; i++ {
        if s[:n - i] == reverted[i:] {
            return reverted[:i] + s
        }
    }
    return ""
}
```

b. Based on the solution a, `s[:n - i] == reverted[i:]`, we want to find LPS in `s + '#' + reverted`.
```golang
func shortestPalindrome(s string) string {
    bs := []byte(s)
    length := len(bs)
    for i, j := 0, length - 1; i < j; i, j = i + 1, j - 1 {
        bs[i], bs[j] = bs[j], bs[i]
    }
    reverted := string(bs)
    converted := s + "#" + reverted
    convertedLength := length * 2 + 1
    lps := make([]int, convertedLength)
    lps[0] = -1
    for i, j := 1, -1; i < convertedLength; i++ {
        for j >= 0 && converted[i] != converted[j + 1] {
            j = lps[j]
        }
        if converted[i] == converted[j + 1] {
            j++
        }
        lps[i] = j
    }
    //s[:n - i] == reverted[i:]
    return reverted[0: length - (lps[convertedLength - 1] + 1)] + s
}
```


* https://leetcode.com/problems/repeated-substring-pattern/discuss/827070/Python-O(n)-Practice-KMP
* https://www.youtube.com/watch?v=4jY57Ehc14Y&t=857s
* https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0028.%E5%AE%9E%E7%8E%B0strStr.md
* https://leetcode.com/problems/shortest-palindrome/discuss/60113/clean-kmp-solution-with-super-detailed-explanation
* https://leetcode.com/problems/shortest-palindrome/solution/