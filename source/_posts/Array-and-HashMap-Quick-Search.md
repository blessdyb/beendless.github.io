---
title: Common Items Quick Search with Array and HashMap
date: 2021-09-02 00:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - HashMap
    - Array
---

Usually when you get a problem about searching the common items between multiple strings, the brute-force solution's time complexity is usually too high. We can use hashmap to lower the time complexity.

## [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)

If we go with brute-force solution, the time complexity will be `m * n`. Let's try with hashmap.

a. Regular hashmap
```golang
func isAnagram(s string, t string) bool {
	if len(s) != len(t) { // edge case quick solution
		return false
	}
	cache := make(map[byte]int)
	for i := range s { // Note: in Golang, when using range to iterate a string, you will get rune instead of byte
		if _, ok := cache[s[i]]; ok {
			cache[s[i]]++
		} else {
			cache[s[i]] = 1
		}
	}
	for i := range t {
		if _, ok := cache[t[i]]; ok {
			cache[t[i]]--
			if cache[t[i]] < 0 {
				return false
			}
		} else {
			return false
		}
	}
	return true
}
```

b. Use array to simulate hashmap

Since we know that the input strings only contain lowercase English letters ([a-z], fixed size, continued integers, sorted), it means we can use a fixed size array to cache the frequency of the string items. 
```golang
func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}
	var cache [26]int
	for i := range s {
		cache[s[i] - 'a']++
	}
	for i := range t {
		index := t[i] - 'a'
		cache[index]--
		if cache[index] < 0 {
			return false
		}
	}
	return true
}
```

## [1002. Find Common Characters](https://leetcode.com/problems/find-common-characters/)

Similar to the solutions above, we can easily get the solution. Note, since this time, we need to get the frequency of characters in each string, we have to use a two dimensional array.

```golang
func commonChars(words []string) []string {
	var cache[][26]int
	length := len(words)
	for _, item := range words {
		var letters [26]int
		for i := range item {
			letters[item[i] - 'a']++
		}
		cache = append(cache, letters)
	}
	result := make([]string, 0)
	for i := 0; i < 26; i++ {
		min := cache[0][i]
		for j := 0; j < length; j++ {
			if min > cache[j][i] {
				min = cache[j][i]
			}
		}
		for ; min > 0; min-- {
			result = append(result, string(i + 'a'))
		}
	}
	return result
}
```


**Tip:**

If the common items searching problem has keyworks like `frequency`, `lowercase` English characters, we can try if hashmap + array method