---
title: Set up Kubeadm on MacOS with Vagrant and VirtualBox
date: 2021-08-18 22:45:23
categories: CS
tags:
    - Kubernetes
---

Based on [kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/) installation instructions, we can't directly install it on MacOS. But with the help of Vagrant and VirtualBox, we can quickly create a local kubenetes cluster.

1. Install [VirtualBox](https://www.virtualbox.org/) and Vagrant(https://www.vagrantup.com)
2. Create three virtualbox instances, one as a master node and the other two as workder nodes. You can use this [Vagrantfile](https://github.com/kodekloudhub/certified-kubernetes-administrator-course/blob/master/Vagrantfile). Basically we will:
  a. Use ubuntu/bionic64 as the OS
  b. Set up a private network and use IP subnet "192.168.5.X" (master nodes will use 192.168.5.1X, worker nodes will use 192.168.5.2X)
  c. Update /etc/hosts to set up the host record to all nodes
  d. Add Google's open dns to /etc/resolver.conf file
  e. Once you finish the above process, you can run `vagrant status`, you will get something like below
  ```
    kubemaster                running (virtualbox)
	kubenode01                running (virtualbox)
	kubenode02                running (virtualbox)
  ```
3. Install Docker runtime on all three instances by following https://docs.docker.com/engine/install/ubuntu/
4. Follow https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/ to install the kubeadm.
   a. Letting iptables see bridged traffic
   b. Installing kubeadm/kubelet and kubectl
5. Follow https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/ to create a cluster.
   a. Initializing a control-plane node `kubeadm init --pod-network-cid=10.244.0.0/16 --apiserver-advertise-address=192.1168.5.11` . Here `10.244.0.0/16` specifies the subnet for pods on worker nodes. You can give a different one. Once it's installed successfully, you can run `kubectl get nodes` and the master nodes will be displayed as `NotReady` as expected
   b. Installing a Pod network add-on by following https://kubernetes.io/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model. Here we choose [WeaveNet](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/) which doesn't need any additional configuration.
   c. Join the worker nodes to the cluster. If you forget the tokens, you can run `kubeadm token create --print-join-command` and run the `kubeadm join` command in all worker nodes.
6. Now if you run `kubectl get nodes`, you can get a result as below.
	```
	NAME         STATUS   ROLES                  AGE   VERSION
	kubemaster   Ready    control-plane,master   9h    v1.22.3
	kubenode01   Ready    <none>                 9h    v1.22.3
	kubenode02   Ready    <none>                 9h    v1.22.3
	```