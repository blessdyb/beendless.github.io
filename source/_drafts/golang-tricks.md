---
title: Golang-tricks
date: 2021-08-03 22:45:23
categories: CS
tags:
    - Golang
---

1. When converting string to []byte or []byte to string, usually you have to reallocate the memory and copy the data. But if the data is too large, we can go with a `unsafe` method. You can find the same thing in Golang source code https://golang.org/src/strings/builder.go#L45

```golang
func toString(data []byte) string {
	return *(*string)(unsafe.Pointer(&data))
}

func main() {
	bs := []byte("hello world!")
	s  := toString(bs)

	fmt.Println("bs: %s, %x\n", bs, &bs)
	fmt.Println("bs: %s, %x\n", s, &s)
}

```

2. Since `recover` can only be triggered after `defer` function gets invoked. So if we want to protect our main gorutine, we should consider refactor the risky codes into a function. For example:

```golang
func test(x, y) {
	z := 0
	func() {
		defer func() {
			if recover() != nil {
				z = 0
			}
		}()

		z = x / y
	}()
	fmt.Println("x / y = ", z)
}

```