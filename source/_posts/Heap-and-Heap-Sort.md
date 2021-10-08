---
title: Heap and Heap Sort
date: 2021-09-13 12:46:23
categories: CS
tags:
    - Golang
    - Algorithms
    - Leetcode
    - Bucket Sort
    - Top K Frequent
    - Heap
    - Priority Queue
---

A `Heap` is a special Tree-based data structure in which the tree is a complete binary tree. Generally, there are two types of `Heap`: Max-Heap (root node is greater than its child nodes) and Min-Heap (root node is smaller than its child nodes).

Golang's standard library shipped with a [`heap` container](https://pkg.go.dev/container/heap). We can also use a slice to simulate a Heap. Let's take `Max-Heap` as an example.

```golang
type Heap []int

func (h *Heap) Push(x int) {
    *h = append(*h, x)
    index := len(*h) - 1
    parent := (index - 1) / 2 // (index + 1) / 2 - 1, 1 based index node n, it's child is 2n and 2n + 1,
    for parent >= 0 && (*h)[index] > (*h)[parent] {
        (*)h[index], (*)h[parent] = (*)h[parent], (*)h[index]
        index = parent
        parent = (index - 1) / 2
    }
}

func (h *Heap) Pop() (int, bool) {
    var ret int
    if len(*h) > 0 {
        ret := (*h)[0]
        length := len(*h)
        (*h)[0] = (*h)(length - 1)
        parent := 0
        left := 2 * parent + 1
        for left < length - 1 {
            child := left
            if left + 1 < length - 1 && (*h)[left] < (*h)[left + 1]{
                child++
            }
            if (*h)[parent] < (*h)[child] {
                (*)h[parent], (*)h[child] = (*)h[child], (*)h[parent]
                parent = child
                left = 2 * parent + 1
            } else {
                break
            }
        }
        *h = (*h)[:length - 1]
        return ret, true
    }
    return ret, false
}
```

`Heap` is always used to implement the priority queue since it's search and pop time complexities are both O({% mathjax %}\log{_2}{n}{% endmathjax %}).

## [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

A naive implementation will be to get the frequency map , to store the (key, frequency) into a 2D-slice and to sort the matrix with quick sort. Then return the last `k`th element of the slice.

a. Bucket Sort solution
```golang
func topKFrequent(nums []int, k int) []int {
    result := []int{}
    mapping := make(map[int]int)
    max := 0
    for _, v := range nums {
        mapping[v]++
        if mapping[v] > max {
            max = mapping[v]
        }
    }
    buckets := make([][]int, max + 1)
    for k, v := range mapping {
        buckets[v] = append(buckets[v], k)
    }
    for max > 0 && k > 0 {
        result = append(result, buckets[max]...)
        k -= len(buckets[max])
        max--
    }
    return result
}
```

b. We can consider the frequency as a priority, so with the help of `Max-Heap`, we can solve it in  O({% mathjax %}n\log{_2}{n}{% endmathjax %})
```golang
func topKFrequent(nums []int, k int) []int {
    result := []int{}
    mapping := make(map[int]int)
    for _, v := range nums {
        mapping[v]++
    }

    heap := [][2]int{}
    for k, v := range mapping {
        // Push into the heap
        heap = append(heap, [2]int{v, k})
        index := len(heap) - 1
        parent := (index - 1) / 2
        for index > 0 && heap[parent][0] < heap[index][0] {
            heap[parent], heap[index] = heap[index], heap[parent]
            index = parent
            parent = (index - 1) / 2
        } 
    }
    for k > 0 {
        result = append(result, heap[0][1])
        heap[0] = heap[len(heap) - 1]
        parent := 0
        left := 2 * parent + 1
        for left < len(heap) - 1 {
            child := left
            if child + 1 < len(heap) - 1 && heap[left][0] < heap[left + 1][0] {
                child = left + 1
            }
            if heap[parent][0] < heap[child][0] {
                heap[parent], heap[child] = heap[child], heap[parent]
                parent = child
                left = 2 * parent + 1
            } else {
                break
            }
        }
        heap = heap[:len(heap) - 1]
        k--
    }
    return result
}
```

## [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)

a. Bucket sorting
```golang
import "sort"
func topKFrequent(words []string, k int) []string {
    mapping := make(map[string]int)
    max := 0
    for _, word := range words {
        mapping[word]++
        if mapping[word] > max {
            max = mapping[word]
        }
    }
    bucket := make([][]string, max + 1)
    for key, value := range mapping {
        bucket[value] = append(bucket[value], key)
    }
    result := []string{}
    for max > 0 && k > 0 {
        sort.Strings(bucket[max])
        length := len(bucket[max])
        if k < length {
            length = k
        }
        result = append(result, bucket[max][:length]...)
        k -= length
        max--
    }
    return result
}
```

b. Max-Heap
```golang
import "strings"
func topKFrequent(words []string, k int) []string {
    mapping := make(map[string]int)
    for _, word := range words {
        mapping[word]++
    }
    heap := []string{}
    for key, _ := range mapping {
        heap = append(heap, key)
        index := len(heap) - 1
        parent := (index - 1) / 2
        for index > 0 && compareFn(heap[parent], heap[index], mapping) {
            heap[parent], heap[index] = heap[index], heap[parent]
            index = parent
            parent = (index - 1) / 2
        }
    }
    result := []string{}
    for k > 0 {
        result = append(result, heap[0])
        heap[0] = heap[len(heap) - 1]
        index := 0
        left := 1
        for left < len(heap) - 1 {
            child := left
            if child + 1 < len(heap) - 1 && compareFn(heap[left], heap[left + 1], mapping) {
                child = left + 1
            }
            if compareFn(heap[index], heap[child], mapping) {
                heap[index], heap[child] = heap[child], heap[index]
                index = child
                left = 2 * index + 1   
            } else {
                break
            }
        }
        heap = heap[:len(heap) - 1]
        k--
    }
    return result
}

func compareFn(a, b string, mapping map[string]int) bool {
    if mapping[b] < mapping[a] {
        return false   
    } else if mapping[b] > mapping[a] {
        return true
    }
    return strings.Compare(b, a) == -1
}

```


## [1046. Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

a. Naive solution

```golang
func lastStoneWeight(stones []int) int {
    sort.Ints(stones)
    length := len(stones)
    for length > 1 {
        y := stones[length - 1]
        x := stones[length - 2]
        stones = stones[:length - 2]
        length -= 2
        if y != x {
            stones = append(stones, y - x)
            sort.Ints(stones)
            length++
        }
    }
    if length == 1 {
        return stones[0]
    }
    return 0
}
```

b. Heap solution

Since we always need to get the largest numbers, it's easy to get it from a Max-Heap structure.

```golang
func lastStoneWeight(stones []int) int {
    n := len(stones)
    heap := []int{}
    pushToHeap := func(value int) {
        heap = append(heap, value)
        index := len(heap) - 1
        for index > 0 {
            parent := (index - 1) / 2
            if heap[parent] < heap[index] {
                heap[parent], heap[index] = heap[index], heap[parent]
                index = parent
            } else {
                break
            }
        }
    }
    popFromHeap := func() int {
        value := heap[0]
        heap[0] = heap[len(heap) - 1]
        heap = heap[:len(heap) - 1]
        index := 0
        for index < len(heap) {
            left := index * 2 + 1
            right := index * 2 + 2
            if left < len(heap) && right >= len(heap) && heap[index] < heap[left] {
                heap[left], heap[index] = heap[index], heap[left]
                index = left
            } else if right < len(heap) && (heap[index] < heap[left] || heap[index] < heap[right]) {
                if heap[left] > heap[right] {
                    heap[left], heap[index] = heap[index], heap[left]
                    index = left
                } else {
                    heap[right], heap[index] = heap[index], heap[right]
                    index = right
                }
            } else {
                break   
            }
        }
        return value
    }
    for i := 0; i < n; i++ {
        pushToHeap(stones[i])
    }
    for len(heap) > 1 {
        y := popFromHeap()
        x := popFromHeap()
        if x != y {
            pushToHeap(y - x)
        }
    }
    if len(heap) == 1 {
        return heap[0]
    }
    return 0
}
```