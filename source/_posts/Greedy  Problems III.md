---
title: Greedy Problems - II
date: 2021-10-06 21:55:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
---

## [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)

Similar to other sgement related problems. The first thing we need to do is to sort the slice. Once we have a sorted segment slice, we can iterate over all items and merge them. Note there is one edge case we need to cover after the iteration, either we merged all segments into one or the last one can't be merged into the previous segment. 

```golang
func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(a, b int) bool {
        return intervals[a][0] < intervals[b][0]
    })
    result := []int{}
    start := intervals[0][0]
    end := intervals[0][1]
    for i := 0; i < len(intervals); i++ {
        if end < intervals[i][0] {
            result = append(result, []int{start, end})
            start = intervals[i][0]
            end = intervals[i][1]
        } else if end < intervals[i][1] {
            end = intervals[i][1]
        }
    }
    result = append(result, []int{start, end})
    return result
}
```

## [763. Partition Labels](https://leetcode.com/problems/partition-labels/)

## [738. Monotone Increasing Digits](https://leetcode.com/problems/monotone-increasing-digits/)

## [968. Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/)