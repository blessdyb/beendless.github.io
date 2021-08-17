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

8. Time complexity for resursion. 

a. T(n) = T(n - 1) + 1 => O(n)
```golang
func x(n int) {
	if (n > 0) {
		return x(n - 1)
	}
	return 1
}

```

b. T(n) = T(n - 1) + n =>  O(n$2$)
```golang
func x(n int) {
	if (n > 0) {
		for i := 0; i < n; i++ {
			//statements
		}
		return x(n - 1)
	}
	return 1
}

```
*Explaination*:

T(n) = T(n - 1) + n = T(n - 2) + (n - 1) + n = T(n - 3) + (n - 2) + (n - 1) + n = ... = T(1) + 1 + 2 + 3 + ... + n 

c. T(n) = T(n - 1) + {% mathjax %}\log{_2}{n}{% endmathjax %} =>  O({% mathjax %}n\log{_2}{n}{% endmathjax %})
```golang
func x(n int) {
	if (n > 0) {
		for i := 0; i < n; i *= 2 {
			//statements
		}
		return x(n - 1)
	}
	return 1
}

```
*Explaination*:

Similar like 8.b, the time complexity will be {% mathjax %}\log{_2}{1}{% endmathjax %} + {% mathjax %}\log{_2}{2}{% endmathjax %} + {% mathjax %}\log{_2}{3}{% endmathjax %} + ... + {% mathjax %}\log{_2}{n}{% endmathjax %} = {% mathjax %}\log{_2}{n!}{% endmathjax %} ≈  n{% mathjax %}\log{_2}{n}{% endmathjax %}


d. T(n) = 2 * T(n - 1) + 1 =>  O(2$n$)
```golang
func x(n int) {
	if (n > 0) {
		for i := 0; i < n; i *= 2 {
			//statements
		}
		return x(n - 1)
	}
	return 1
}

```
*Explaination*:

Similar like 8.b, the time complexity will be T(n) = 2 * T(n - 1) + 1 = 4 * T(n - 2) + 2 + 1 = 8 * T(n - 3) + 4 + 2 + 1 = ... = 2$n$ * T(0) + 2$n-1$ + 2$n-2$ + ... + 4 + 2 + 1 = 2$n + 1$  - 1 [Geometric Sequence]


e. T(n) = T(n / 2) + 1 =>  O({% mathjax %}\log{_2}{n}{% endmathjax %}) [Classic Binary Search]
```golang
func x(n int) {
	if (n > 1) {
		//statements
		return x(n/2)
	}
	return 1
}

```
*Explaination*:

Similar like 8.b, the time complexity will be T(n) = T(n - 1) + 1 = T(n - 2) + 1 + 1 = ... = T({% mathjax %}\log{_2}{n}{% endmathjax %}) + {% mathjax %}\log{_2}{n}{% endmathjax %} * 1


f. T(n) = T(n / 2) + n =>  O(n)
```golang
func x(n int) {
	if (n > 1) {
		for i := 0; i < n; i++ {
			//statements	
		}
		return x(n/2)
	}
	return 1
}

```
*Explaination*:

Similar like 8.3, the time complexity will be T(n) = T(n/2) + n = T(n/4) + n / 2 + n = ... = T(n/2$k$) + n / 2$k-1$ + ... + n / 2$1$ + n / 2$0$ = T(1) + n * (1 / 2$k-1$ + ... + 1 / 2$1$ + 1 / 2$0$) = O(n) [Geometric Sequence]


g. T(n) = 2T(n / 2) + n =>  O(n{% mathjax %}\log{_2}{n}{% endmathjax %})
```golang
func x(n int) {
	if (n > 1) {
		for i := 0; i < n; i++ {
			//statements	
		}
		return x(n/2)
	}
	return 1
}

```

*Explaination*:

Similar like 8.3, the time complexity will be T(n) = 2 * T(n/2) + n = 4 * T(n/4) + n + n = 8 * T(n / 8) + n + n + n = ... = 2$k$ * T(n / 2$k$) + k * n = n * T(1) + {% mathjax %}\log{_2}{n}{% endmathjax %} * n = O(n{% mathjax %}\log{_2}{n}{% endmathjax %})


<hr/>

Now, Let's take a look at a problem from Leetcode [50. Pow(x, n)](https://leetcode.com/problems/powx-n/).

a. Brute-force solution O(n) => template #8.a

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

[Refs]
* https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O