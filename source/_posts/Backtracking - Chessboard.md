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