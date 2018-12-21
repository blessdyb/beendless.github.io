---
title: Scaling NodeJS Apps -- Archtectural Patterns
date: 2018-12-20 23:00:00
categories: CS
tags:
	- DevOps
	- NodeJS
	- Archetecture
---

This is the notes when I read the book [Scaling Your Nodej.js Apps](https://www.apress.com/de/book/9781484239902).


## Layered Architecture

It is based on the logistic seperation of concerns of your application (or platform) into layers. And the layers must comply with the following points:

* Each layer must have a well-defined purpose (presentation layer, business layer, and so on)
* Each layer cannot speak (or send data) to any other layer that is not the one directly below it

## MVC

Many web frameworks have adopted this pattern, because the structure of most web projects resembles this approach. 

* MVP (Model, View, Presenter) pattern aims to remove that unwanted interaction between Model and View, making Presenter the sole man-in-the-middle talking care of passing information between its associated View and it's Model.
* MVVM (Model, View, ViewModel) aims for a two-way data binding between the View and ViewModel. This is in turns allows for automatic updates on the view, based on changes in the model.

## Client-Server

It consists of having a powerful server that provides meaningful services to many clients.

* Clients always start the data communication.
* The servers are always listening for new connections from clients to start a new communcation.

## Master-Slave

It implies a single channel of communication between two parties. Instead of having one centralized hub for the business logic and heavy processing of data, you have a one-way controlled communication between a controlling node (the master) and many decentralized nodes (the slaves). The heavy processing and expensive tasks are usually performed in the slaves, while the master merely funnels the requests from outside into them. 

* Any behavior-affecting message are one-way, from the master to the slaves. Slaves don't have the ability to affect the master.
* Not all slaves need to work on the same tasks.
* Some versions of this partern allow slaves to elect one of their own as a new master, if the current master is no longer working.

It can be used for database architecture, increased parallel processing capacity, and so on.

## Event-Bus or Event-Driven Architectures

The relationships between components are usually many-to-many. The components can be defined as follows:

* Event sources: these are the components that generate events and publish them into the event bus.
* Event consumers: the consumers are the components that are expecting a particular set of events and are ready to react to them once received.
* Event bus: the channel through which the events will be districuted.
* The actual event: the data cummunicated between different components.

A classic example of this approach consists of using a message queue as the event bus. There are lots of solutions like RabbitMQ, Kafka, ZeroMQ. The event bus and event-driven reactions are all asynchronous. So you platform must be able to function asynchronously.

## Microservices Architecture

The core behind this pattern is your understanding of the different features your platform is supposed to have (that is, the different services it needs to provide). If you properly understand your platform, you can probably split the services into a set of smaller services that, when used together by the client app, yield the same result you would get from a single block of code with all features bundle together. With a microservice-based architecture, we get control of our services in a fine granularity level.

* Gain total control over which component of your application to scale.
* Improve the development process.
* Add the ability to switch versions of your components.
* Gain the ability to reuse components or modules among applications.

Below are some of the most common issues you might run into which developing microservices:

* Communications between difference micro-services need to be planned and defined carefully and clearly, otherwise, the whole performance of the system will be affected, especially when you get the high traffic.
* Too many microservices might create a chaotic architecture.
* Deployments of microservices-based architecture can be quite a pain, especially if you are not properly automating the process.

## The Broker Pattern

One of the pain points for the latter was that given a high enough number of microservices, you begin to need a form of orchestration; otherwise, your clients start to lose the ability to communicate easily with your platform.

The purpose of the broken node is to centralize and redistribute requests among different services. Another key characteristic of this pattern is that by default it is not the broken that "knows" about its servers; instead, it's the servers that register with the borker once they come online, and provide all the information it needs to understand the services they provide.

This pattern has a few setbacks:
* The broker becomes the single point of failure.
* It's hard to scale your platform unless you also scale up your broker
* It adds an extra layer of indirection between client and services; thus extra latency is added to the request time.

## Lambda Architectures

Lambda architecutres are a special pattern designed to provide a high-throughput platform that is able to process very large quantities of data both in real time and in batches.

This is a solution that has a very high maintenance cost associated with it since you basically are maintaining two parallel architecture at once, which in ture need to keep a centralized repository of data in a synchronized matter.