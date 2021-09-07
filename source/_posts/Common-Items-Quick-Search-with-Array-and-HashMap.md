---
title: Common Items Quick Search with Array and HashMap
date: 2021-09-06 21:45:23
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

## [383. Ransom Note](https://leetcode.com/problems/ransom-note/)

Based on the tip above, we can quickly solve it with:

a. Regular hashmap
```golang
func canConstruct(ransomNote string, magazine string) bool {
	cache := make(map[byte]int)
	length := len(magazine)
	for i := 0; i < length; i++ {
		cache[magazine[i]]++
	}
	length = len(ransomNote)
	for i := 0; i < length; i++ {
		cache[ransomNote[i]]--
		if cache[ransomNote[i]] < 0 {
			return false
		}
	}
	return true
}
```

b. Array based hashmap
```golang
func canConstruct(ransomNote string, magazine string) bool {
	cache := make([26]int, 26)
	length := len(magazine)
	for i := 0; i < length; i++ {
		cache[magazine[i] - 'a']++
	}
	length = len(ransomNote)
	for i := 0; i < length; i++ {
		cache[ransomNote[i] - 'a']--
		if cache[ransomNote[i] - 'a'] < 0 {
			return false
		}
	}
	return true
}
```



## [349. Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)

Getting two array intersection, we can try `Set` or with the help of hashmap 
```golang
func intersection(nums1 []int, nums2 []int) []int {
	cache := make(map[int]int)
	result := make([]int, 0)
	for _, i := range nums1 {
		cache[i] = 1
	}
	for _, i := range nums2 {
		if v, ok := cache[i]; ok && v > 0 {
			cache[i] = 0
			result = append(result, i)
		}
	}
	return result
}
```

## [1. Two Sum](https://leetcode.com/problems/two-sum/)

Using hashmap can solve two-sum in `O(n)` complexity.
```golang
func twoSum(nums []int, target int) []int {
	cache := make(map[int]int)
	for i, v := range nums {
		if index, ok := cache[target - v]; ok {
			return []int{i, index}
		}
		cache[v] = i
	}
	return []int{}
}
```

## [454. 4Sum II](https://leetcode.com/problems/4sum-ii/)

Similar to two sum problem, we can convert 4 sum ii problem to a two sum problem.
```golang
func fourSumCount(nums1 []int, nums2 []int, nums3 []int, nums4 []int) int {
	result := 0
	cache := make(map[int]int) // Since we can calculate the duplicated result, map value needs to be an integer
	for _, i := range nums1 {
		for _, j := range nums2 {
			cache[i + j]++
		}
	}
	for _, i := range nums3 {
		for _, j := range nums4 {
			result += cache[-i-j]
		}
	}
	return result
}

```

## [202. Happy Number](https://leetcode.com/problems/happy-number/)

Since we need to detect if `it loops endlessly in a circle`, it's better to use a hashmap (set).

```golang
func isHappy(n int) bool {
	cache := make(map[int]bool)
	isHappyNumber := func(n int) int {
		s := 0
		for n > 0 {
			t := n % 10
			s += t * 5
			n = n / 10
		}
		return s
	}

	// Simulate a set by flaging the calculated number before to detect the circle
	for n != 1 && !cache[n] {
		n, cache[n] = isHappyNumber(n), true
	}

	return n == 1
}
```