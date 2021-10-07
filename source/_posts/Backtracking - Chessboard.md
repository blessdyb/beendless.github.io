---
title: Backtracking - Chessboard
date: 2021-10-01 22:25:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Backtracking
---

Backtracking can also be used to solve chessboard problems.

## [51. N-Queens](https://leetcode.com/problems/n-queens/)

```golang
func solveNQueens(n int) [][]string {
    result := [][]string{}
    board := make([][]string, n)
    for i := 0; i < n; i++ {
        board[i] = make([]string, n)
        for j := 0; j < n; j++ {
            board[i][j] = "."
        }
    }
    isValid := func(row, col int) bool {
        for i := 0; i < row; i++ {
            if board[i][col] == "Q" {
                return false
            }
        }
        for i := 0; i < col; i++ {
            if board[row][i] == "Q" {
                return false
            }
        }
        for i, j := row, col; i >= 0 && j >= 0; i, j = i - 1, j - 1 {
            if board[i][j] == "Q" {
                return false
            }
        }
        for i, j := row, col; i >= 0 && j < n; i, j = i - 1, j + 1 {
            if board[i][j] == "Q" {
                return false
            }
        }
        return true
    }
    var backtracking func(int)
    backtracking = func(row int) {
        if row == n {
            temp := make([]string, n)
            for i, boardRow := range board {
                temp[i] = strings.Join(boardRow, "")
            }
            result = append(result, temp)
            return
        }
        for col := 0; col < n; col++ {
            if isValid(row, col) {
                board[row][col] = "Q"
                backtracking(row + 1)
                board[row][col] = "."
            }
        }
    }
    backtracking(0)
    return result
}
```

## [52. N-Queens II](https://leetcode.com/problems/n-queens-ii/)

```golang
func totalNQueens(n int) int {
    result := 0
    board := make([][]string, n)
    for i := 0; i < n; i++ {
        board[i] = make([]string, n)
        for j := 0; j < n; j++ {
            board[i][j] = "."
        }
    }
    isValid := func(row, col int) bool {
        for i := 0; i < row; i++ {
            if board[i][col] == "Q" {
                return false
            }
        }
        for i := 0; i < col; i++ {
            if board[row][i] == "Q" {
                return false
            }
        }
        for i, j := row, col; i >= 0 && j >= 0; i, j = i - 1, j - 1 {
            if board[i][j] == "Q" {
                return false
            }
        }
        for i, j := row, col; i >= 0 && j < n; i, j = i - 1, j + 1 {
            if board[i][j] == "Q" {
                return false
            }
        }
        return true
    }
    var backtracking func(int)
    backtracking = func(row int) {
        if row == n {
            result++
            return
        }
        for col := 0; col < n; col ++ {
            if isValid(row, col) {
                board[row][col] = "Q"
                backtracking(row + 1)
                board[row][col] = "."
            }
        }
    }
    backtracking(0)
    return result
}
```

## [37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)

```golang
func solveSudoku(board [][]byte)  {
    isValid := func(row, col int, value byte) bool {
        for i := 0; i < 9; i++ {
            if board[i][col] == value || board[row][i] == value{
                return false
            }
        }
        squareX := (row / 3) * 3
        squareY := (col / 3) * 3
        for i := 0; i < 3; i++ {
            for j := 0; j < 3; j++ {
                if board[i + squareX][j + squareY] == value {
                    return false
                }
            }
        }
        return true
    }
    var backtracking func() bool
    backtracking = func() bool {
        for i := 0; i < 9; i++ {
            for j := 0; j < 9; j++ {
                if board[i][j] == '.' {
                    for k := '1'; k <= '9'; k++ {
                        if isValid(i, j, byte(k)) {
                            board[i][j] = byte(k)
                            if backtracking() {
                                return true
                            }
                            board[i][j] = '.'
                        }
                    }
                    return false
                }
            }
        }
        return true
    }
    backtracking()
}
```

## [980. Unique Paths III](https://leetcode.com/problems/unique-paths-iii/)

A classical backtracking problem. The backtracking state transition function is `backtracking(i, j) = backtracking(i + 1, j) + backtracking(i - 1, j) + backtracking(i, j - 1) + backtracking(i, j + 1)`, also we need to keep tracking the global state of the grid.

```golang
func uniquePathsIII(grid [][]int) int {
    m := len(grid)
    n := len(grid[0])
    visited := make([][]bool, m)
    count := 0
    start := []int{}
    end := []int{}
    for i := 0; i < m; i++ {
        visited[i] = make([]bool, n)
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                start = []int{i, j}
                visited[i][j] = true
            } else if grid[i][j] == 2 {
                end = []int{i, j}
            } else if grid[i][j] == -1 {
                visited[i][j] = true
            }
        }
    }
    isSuccess := func(x, y int) bool {
        if x != end[0] || y != end[1] {
            return false
        }
        for i := 0; i < m; i++ {
            for j := 0; j < n; j++ {
                if !visited[i][j] {
                    return false
                }
            }
        }
        return true
    }
    var visit func(i, j int)
    visit = func(i, j int) {
        if isSuccess(i, j) {
            count++
            return
        }
        if i - 1 >= 0 && !visited[i - 1][j] {
            visited[i-1][j] = true
            visit(i-1, j)
            visited[i-1][j] = false
        }
        if i + 1 < m && !visited[i + 1][j] {
            visited[i+1][j] = true
            visit(i+1, j)
            visited[i+1][j] = false
        }
        if j - 1 >= 0 && !visited[i][j - 1] {
            visited[i][j-1] = true
            visit(i, j - 1)
            visited[i][j-1] = false
        }    
        if j + 1 < n && !visited[i][j + 1] {
            visited[i][j+1] = true
            visit(i, j + 1)   
            visited[i][j+1] = false
        }
    }
    visit(start[0], start[1])
    return count
}
```