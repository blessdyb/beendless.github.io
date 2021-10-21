---
title: CKAD
date: 2021-10-18 11:15:24
categories: CS
tags:
    - CKAD
---

More and more teams are transitioning from a monolithic architecture to to bite-sized, cohesive and containerized microservices. There are pros and cons to both approaches, but we can't deny that Kubernetes has become the de facto runtime platform for deploying and operating applications without needing to worry about the underlying physical infrastructure.

## Tips:

### Setting a Context and Namespace

```bash
kubectl config set-context <context-of-question> \
  --namespace=<namespace-of-question>
```

### Using an Alias for kubectl

```bash
$ alias k=kubectl
$ k version
```

### Deleting Kubernetes Objects

Use the command line option `--grace-period=0` and `--force` to send a SIGKILL signal. The signal will delete a Kubernetes object immediately.

```bash
$ kubectl delete pod nginx --grace-period=0 --force
```

### Debugs

1. Changing the Pod label effectively removes the Pod from the Deployment. At that point, the Deployment sees that no Pods that match it's label selector exists, so it creates a new one. This results in an unmanaged Pod. It could be a useful technique in debugging-—removing a Pod from a controller so you can connect and investigate a problem, while the controller starts a replacement Pod, which keeps your app running at the desired scale. You can also do the opposite: editing the labels on a Pod to fool a controller into acquiring that Pod as part of the set it manages.

### Exercises

https://github.com/dgkanatsios/CKAD-exercises

## Core Concepts

A Pod is the Kubernetes primitive for running an application in a container. Docker is the containerization technology employed by Kubernetes.

### Kubernetes Primitives

Kubernetes primitives are the basic building blocks anchored in the Kubernetes architecture for creating and operating an application on the platform.