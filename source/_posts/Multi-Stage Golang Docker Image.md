---
title: Multi-Stage Golang Docker Image Build and Kubernetes Deployment
date: 2021-10-19 11:15:24
categories: CS
tags:
    - Golang
    - Docker
    - Kubernetes
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
Once we have the docker file, we can build an image with command `docker build -t whoami-web .` . Now, we can use Kubernetes to deploy it

```kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: whoami
  labels:
    app: whoami
    version: v1
spec:
  selector:
    matchLabels:
      app: whoami
      version: v1
  template:
    metadata:
      labels:
        app: whoami
        version: v1
    spec:
      containers:
        - name: whoami-web
          image: whoami-web
          imagePullPolicy: Never
```

Run `kubectl apply -f deployment.yml` we will have the deployment running.

Run `kubectl port-forward deploy/whoami 8001:8000` , then we can check `localhost:8001` in our browser.

You can compare the result of the real container name by running below commands:

`kubectl get pods -o custom-columns=NAME:metadata.name`
`kubectl exec deploy/whoami -- sh -c 'hostname'`
