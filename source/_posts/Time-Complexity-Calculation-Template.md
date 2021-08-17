---
title: Time Complexity Calculation Template
date: 2021-08-16 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Time complexity
---

1. O(n)

```golang
for i := 0; i < n; i++ {
	//statements
}

```

2. O(n$2$)

```golang
for i := 0; i < n; i++ {
	for j := 0; j < n; j++ {
		//statements
	}
}

```


3. O(n$2$)

```golang
for i := 0; i < n; i++ {
	for j := 0; j < i; j++ {
		//statements
	}
}

```

*Explaination*:

| i   | j   |
|-----|-----|
| 0   | 0   |
| 1   | 1   |
| 2   | 2   |
| ... | ... |
| n   | n   |

So the complexity is : `1 + 2 + 3 + ... + n = n * (n + 1) / 2` = O(n$2$)



4. O({% mathjax %}\sqrt{n}{% endmathjax %})

```golang
for i, j := 0, 0; j < n; i++ {
	j += i
	//statements
}

```

*Explaination*:

| i   | j                       |
|-----|-------------------------|
| 0   | 0                       |
| 1   | 0 + 1                   |
| 2   | 0 + 1 + 2               |
| 3   | 0 + 1 + 2 + 3           |
| ... | ...                     |
| k   | 0 + 1 + 2 + 3 + ... + k |

We need to find the solution for `1 + 2 + 3 + ... + k > n` => `k` > {% mathjax %}\sqrt{n}{% endmathjax %}



5. O({% mathjax %}\log{_2}{n}{% endmathjax %})

```golang
for i := 1; i <= n; i *= 2 {
	//statements
}

```

*Explaination*:

We need to find the solution for `2$k$` < `n` =>  `k` < {% mathjax %}\log{_2}{n}{% endmathjax %}


6. O({% mathjax %}\log{_2}{n}{% endmathjax %})

```golang
for i := n; i >= 1; i /= 2 {
	//statements
}

```

*Explaination*:

We need to find the solution for {% mathjax %} n/2^k{% endmathjax %} > 1 =>  `k` < {% mathjax %}\log{_2}{n}{% endmathjax %}


7. O({% mathjax %}\sqrt{n}{% endmathjax %})

```golang
for i := 0; i * i < n; i++ {
	//statements
}

```

*Explaination*:

We need to find the solution for k$2$ < n =>  `k` < {% mathjax %}\sqrt{n}{% endmathjax %}

8. Time complexity for resursion. Let's take a look at a problem from Leetcode [50. Pow(x, n)](https://leetcode.com/problems/powx-n/).

a. Brute-force solution O(n) => template #1

```golang
func myPow(x float64, n int) float64 {
	upperBound := n
	if n < 0 {
		upperBound = -n
	}
	ret := 1.0
	for i := 1; i <= upperBound; i++ {
		ret *= x
	}
	if n > 0 {
		return ret
	}
	return 1 / ret
}
```
Golang Playbook: https://play.golang.org/p/YxdrpGt-VXT

b. Let's try recursive solution I  O(n)
```golang
func recursivePow(x float64, n int) float64 {
	if n == 0 {
		return 1
	}
	return recursivePow(x, n-1) * x
}

func myPow(x float64, n int) float64 {
	upperBound := n
	if n < 0 {
		upperBound = -n
	}

	ret := recursivePow(x, upperBound)
	if n > 0 {
		return ret
	}
	return 1 / ret
}
```
Golang Playbook: https://play.golang.org/p/O_MPA_gORmA

**NOTE:** This is still **O(n)** since the `recursivePow` was invoked `n` times

c. Let's try recursive solution II
```golang

func recursivePow(x float64, n int) float64 {
	if n == 0 {
		return 1
	}
	if n%2 == 0 {
		return recursivePow(x, n/2) * recursivePow(x, n/2)
	}
	return recursivePow(x, n/2) * recursivePow(x, n/2) * x
}

func myPow(x float64, n int) float64 {
	upperBound := n
	if n < 0 {
		upperBound = -n
	}
	ret := recursivePow(x, upperBound)
	if n > 0 {
		return ret
	}
	return 1 / ret
}
```
Golang Playbook: https://play.golang.org/p/m2azp6-WuLF

**NOTE:**  Actually, this idea comes as a Divide & Concor solution, but if you count how many times `recursivePow` are invoked, you will find that it's still O(n). You can consider the input as a BST's root node, so our target is to get the nodes number. It will be n.


d. Optimized cached recursive solution III O({% mathjax %}\log{_2}{n}{% endmathjax %}) => Template #6
```golang

func recursivePow(x float64, n int) float64 {
	if n == 0 {
		return 1
	}
	ret := recursivePow(x, n/2)
	if n%2 == 0 {
		return ret * ret
	}
	return ret * ret * x
}

func myPow(x float64, n int) float64 {
	upperBound := n
	if n < 0 {
		upperBound = -n
	}
	ret := recursivePow(x, upperBound)
	if n > 0 {
		return ret
	}
	return 1 / ret
}
```
Golang Playbook: https://play.golang.org/p/lzC2k6QgLlF

The only difference between `c` and `d` is we cached the result of the function call `recursivePow`. This will be similar like the binary search, each time we save half of the computation time.