---
title: Mastering Go Notes
date: 2021-10-18 11:15:24
categories: CS
tags:
    - Golang
    - Mastering Go
---

1. If you have to check godoc offline, you could install gdoc `go get golang.org/x/tools/cmd/godoc` and then run `godoc -http :8001` in termilal.

2. Go consider the `main()` function the entry point to the application and begins the execution of the applicaiton with the code found in the `main()` function of the `main` package.

3. Everything that begins with a lowercase letter is considered private and is accessible in the current package only.

4. If no initial value is given to a variable, the Go compiler will automatically initialize that variable to the zero value of its data type.

5. The `var` keyword is mostly used for declaring global or local variables without an initial value. Since every statement that exists outside of the code of a function must begin with a keywoprd such as `func`, `const` or `var`, you can't use short assignment statement `:=` outside of the function.

6. The `os.Args` `string` slice is properly initialized by Go and is available to the program when referenced. 