---
title: Multi-Stage Golang Docker Image
date: 2021-10-19 11:15:24
categories: CS
tags:
    - Golang
    - Docker
---

If we have a tiny web service which return the host name as below.  We can use golang image and build the executable package, then move it into a basic linux container like alpine.

```golang
package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/gorilla/mux"
)

func handler(w http.ResponseWriter, r *http.Request) {
    name, err := os.Hostname()
    if err != nil {
        fmt.Fprintf(w, "Can't get hostname")
    } else {
        fmt.Fprintf(w, "Go Hostname: %s\n", name)
    }
}

func main() {
    r := mux.NewRouter()
    r.PathPrefix("/").HandlerFunc(handler)
    srv := &http.Server{
        Handler: r,
        Addr:    ":8000",
        // Good practice: enforce timeouts for servers you create!
        WriteTimeout: 15 * time.Second,
        ReadTimeout:  15 * time.Second,
    }

    log.Fatal(srv.ListenAndServe())
}
```

```dockerfile
FROM golang:1.17 AS builder
# https://stackoverflow.com/questions/61515186/when-using-cgo-enabled-is-must-and-what-happens
# https://gist.github.com/blessdyb/ebe59987e4a4632b28c10ec74a1eda0c
ENV CGO_ENABLED=0
WORKDIR /build
COPY .  .
RUN go mod download
RUN go build -o app

FROM alpine:latest  
WORKDIR /app
COPY --from=builder /build/app .
EXPOSE 8000
CMD ["./app"]
```
