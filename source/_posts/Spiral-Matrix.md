---
title: Traverse Spiral Matrix
date: 2021-08-18 22:45:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Matrix
---

1. Traverse Spiral Matrix

The trick of traverse a matrix in spiral order is that we need to have flags to keep the boundary. Let's check LeetCode problerm [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

```golang
func spiralOrder(matrix [][]int) []int {
	rows, columns := len(matrix), len(matrix[0])
	length := rows * columns
	ret := make([]int, length)
	up, down, left, right := 0, rows-1, 0, columns-1
	for i := 0; i < length; {
		for j := left; j <= right; j++ {
			ret[i] = matrix[up][j]
			i++
		}
		for j := up + 1; j <= down; j++ {
			ret[i] = matrix[j][right]
			i++
		}
		if up != down {
			for j := right - 1; j >= left; j-- {
				ret[i] = matrix[down][j]
				i++
			}
		}
		if left != right {
			for j := down - 1; j > up; j-- {
				ret[i] = matrix[j][left]
				i++
			}
		}
		up++
		down--
		left++
		right--
	}
	return ret
}
```

Golang Playbook: https://play.golang.org/p/MTcaLR-vu0g

Similar to the problem above, there's another one which the start of the spiral is given as part of the input. [885. Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii/)

2. Generate Spiral Matrix

Same as spiral matrix traversal, let's resolve LeetCode problerm [59. Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)

```golang
func generateMatrix(n int) [][]int {
	ret := make([][]int, n)
	for i := 0; i < n; i++ {
		ret[i] = make([]int, n)
	}
	total := n * n
	up, down, left, right := 0, n-1, 0, n-1
	for i := 1; i <= total; {
		for j := left; j <= right; j++ {
			ret[up][j] = i
			i++
		}
		for j := up + 1; j <= down; j++ {
			ret[j][right] = i
			i++
		}
		if up != down {
			for j := right - 1; j >= left; j-- {
				ret[down][j] = i
				i++
			}
		}
		if left != right {
			for j := down - 1; j > up; j-- {
				ret[j][left] = i
				i++
			}
		}
		up++
		down--
		left++
		right--
	}
	return ret
}
```

Golang Playbook: https://play.golang.org/p/q-CBvye-xx6

3. Spiral Traverse with Dynamic Starting Point

The key points to resolve LeetCode problem [885. Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii/) :
a. After observing the spiral path, you can get the pattern of the step sequence: `1, 1, 2, 2, 3, 3, 4, 4`
b. Figure out a way to make a spiral circle `n % 4`

With those in mind, we can get a solution
```golang
func spiralMatrixIII(rows int, cols int, rStart int, cStart int) [][]int {
	ret := [][]int{{rStart, cStart}}
	directions := [4][2]int{
		{0, 1},
		{1, 0},
		{0, -1},
		{-1, 0},
	}
	for i, d := 0, 0; len(ret) < rows*cols; i++ {
		for j := 0; j < i/2+1; j++ {
			rStart += directions[d%4][0]
			cStart += directions[d%4][1]
			if rStart < 0 || cStart < 0 || rStart >= rows || cStart >= cols {
				continue
			}
			ret = append(ret, []int{rStart, cStart})
		}
		d++
	}
	return ret
}
```

Golang Playbook: https://play.golang.org/p/bPk8zAyAqe2

