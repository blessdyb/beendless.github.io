---
title: Greedy Problems - II
date: 2021-10-05 10:25:24
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Greedy
---

## [1005. Maximize Sum Of Array After K Negations](https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/)

To get a maximum sum, we need to convert as many negative numbers to positive ones. If there is still an odd times of converting number left, we just need to convert the smallest positive number to a negative one

```golang
func largestSumAfterKNegations(nums []int, k int) int {
    sort.Ints(nums)
    i := 0
    for i < k && i < len(nums) {
        if nums[i] < 0 {
            nums[i] = -nums[i]
            i++
        } else {
            break
        }
    }
    if i < k && (k - i) % 2 == 1 {
        sort.Ints(nums)
        nums[0] = -nums[0]
    }
    result := 0
    for _, num := range nums {
        result += num
    }
    return result
}
```

## [134. Gas Station](https://leetcode.com/problems/gas-station/)

Several cases:
    1) If the total amount of gas is less than the total amount of the cost, we can't make a round trip
    2) Given an arbitrary start point i, and at i we have gas[i] in the tank. Let's start at this point and accumulate the gas we left in the tank. If at point i + k the acculation is negative, it means we can't reach from any point in beteeen [i, i + k - 1) to point k. So we can quickly start from i + k + 1 instead of i + 1.

So the local optimal solution for a given start point is from this starting point, we are making a round trip, the debet won't be negative. If it's negative, we need to start after the negative point. This can lead to a global optimal solution.

```golang
func canCompleteCircuit(gas []int, cost []int) int {
    result := 0
    sum := 0
    debet := 0
    for i := 0; i < len(gas); i++ {
        sum += gas[i] - cost[i]
        debet += gas[i] - cost[i]
        if debet < 0 {
            debet = 0
            result = i + 1
        }
    }
    if sum < 0 {
        return -1
    }
    return result
}
```

## [135. Candy](https://leetcode.com/problems/candy/)

Since the rating only have effect to neighbour candy distribution. We can start from one end to distribution the candy once, to make sure all children are happy when looking to their right. Then we make another round from the other end.

```golang
func candy(ratings []int) int {
    length := len(ratings)
    candies := make([]int, length)
    candies[0] = 1
    for i := 1; i < length; i++ {
        if ratings[i] > ratings[i - 1] {
            candies[i] = candies[i - 1] + 1
        } else {
            candies[i] = 1   
        }
    }
    for i := length - 2; i >= 0; i-- {
        if ratings[i] > ratings[i + 1] && candies[i] < candies[i + 1] + 1 {
            candies[i] = candies[i + 1] + 1
        }
    }
    result := 0
    for i := 0; i < length; i++ {
        result += candies[i]
    }
    return result
}
```

## [860. Lemonade Change](https://leetcode.com/problems/lemonade-change/)

A greedy solution will be if we have $10, we provide $10 to customers who pay with $20.

```golang
func lemonadeChange(bills []int) bool {
    five := 0
    ten := 0
    for i := 0; i < len(bills); i++ {
        switch bills[i] {
        case 5:
            five++
        case 10:
            ten++
            if five >= 1 {
                five --
            } else {
                return false
            }
        case 20:
            if ten == 0 {
                if five < 3 {
                    return false
                }
                five -= 3
            } else if ten > 0 {
                ten--
                if five == 0 {
                    return false
                }
                five--
            }   
        }
    }
    return true
}
```

## [406. Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/)

Since there are to demensions, and the demension k depends on h, the idea is we sort the given slice by h as the primary order, k as the secondary order. After that, we use the insert sorting algorithm to insert all slice items one by one based on the k value to a new slice.

```golang
func reconstructQueue(people [][]int) [][]int {
    result := [][]int{}
    sort.Slice(people, func(a, b int) bool { // order by h desc, order by k asc
        if people[a][0] == people[b][0] {
            return people[a][1] < people[b][1]
        }
        return people[a][0] > people[b][0]
    })
    for _, p := range people {
        result = append(result, p)
        copy(result[p[1] + 1:], result[p[1]:])
        result[p[1]] = p
    }
    return result
}
```

## [452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

A greedy solution is we choose the shoot point which is the most line segments overlaped as a local optimal, it also leads to a global optimal solution. For example, we have four segments as below. If we sort them by the start point, we can easily get a first point should be between e ~ b. It means we iterate all segments, if the current segment's start point is no great than the previous one's end point, we can merge those two by reseting the current one's end point to the minimum number between itself and the previous one's end point.

```
|--------------|
a              b
    |-----------------|
    c                 d
       |---------|
       e         f
                   |---------|
                   g         h
```

```golang
func findMinArrowShots(points [][]int) int {
    sort.Slice(points, func(a, b int) bool {
        return points[a][0] < points[b][0]
    })
    result := 1
    for i := 1; i < len(points); i++ {
        if points[i][0] > points[i - 1][1] {
            result++
        } else if points[i][1] > points[i - 1][1] {
            points[i][1] = points[i - 1][1]
        }
    }
    return result

}
```

## [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

This one is a similar problem as #452. An intuition to solve this kind of problem is sort if first. Since all line segments have two points, we have two choices to sort it. The local optimal to find the interval is the end of current segment should have a distance between the next one's start point. With this in mind, we can quickly get the total of intervals. So if we sort by the end point, we can iterate from left to right. Otherwise, we need to reverse the iteration order.

```golang
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(a, b int) bool {
        return intervals[a][1] < intervals[b][1]
    })
    end := intervals[0][1]
    count := 1
    for i := 1; i < len(intervals); i++ {
        if end <= intervals[i][0] {
            count++
            end = intervals[i][1]
        }
    }
    return len(intervals) - count
}
```