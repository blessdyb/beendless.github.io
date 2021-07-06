---
title: Understand Golang's Function Type
date: 2021-07-06 02:20:48
categories: CS
tags:
    - Golang
keywords:
    - Golang Function Type
    - Go function type
    - http.HanderFunc
    - http.Hander
---

Based on Golang's [function type](http://weekly.golang.org/doc/go_spec.html#Function_types) spec:

```
A function type denotes the set of all functions with the same parameter and result types
```
And [type identity](http://weekly.golang.org/doc/go_spec.html#Type_identity):

```
Two function types are identical if they have the same number of parameters and result types, corresponding parameters and result types are identical, and either both functions have variadic or neither is. Parameter and result names are not required to match
```

It means that if two functions have the same signature(parameters and result types), they share one function type. Golang allows us to use the `type` keyword to define a `struct` (or `function type`). You may think it is just a sort of coding documentation, but in practice, user-defined function types are really useful. **They allow functions to implement interfaces.** The most common usage is for HTTP handlers. 

An HTTP handler processes and HTTP server request. Based on the [interface documentation](https://golang.org/pkg/net/http/#Handler), it's an interface with a method `ServeHttp`.

```
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```
Function type `http.HanderFunc` is an adapter to allow the use of ordinary functions as HTTP handlers. If f is a function with the appropriate signature, `HandlerFunc(f)` is a Handler that calls `f`.
```
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
	f(w, r)
}

```

Which means we can define a handler below
```
func handleGreeting(format string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, format, "World")
    }
}
```
This is valid return type since the anonymous function's signature and return type is the same as `http.HandlerFunc`, so we don't need to explictly convert it. It's the same as 
```
func handleGreeting(format string) http.HandlerFunc {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, format, "World")
    })
}
```