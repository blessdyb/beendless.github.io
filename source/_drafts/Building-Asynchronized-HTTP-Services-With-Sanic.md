---
title: Building Asynchronized HTTP Services With Sanic
date: 2018-12-27 13:06:56
categories: CS
tags:
    - Python
    - Async
    - HTTP
---

Python introduced async/await syntax from Python3.5. it makes your code non-blocking and speedy. It means that developers can use this to build a high-performance / NIO web services like NodeJS. Most of the Python web developers are familiar with Flask. But unfortunately flask has no plan to support the async request headers. [Sanic](https://sanicframework.org/) is a Flask-like webserver that's written to go fast. It was inspired by [uvloop](https://magic.io/blog/uvloop-blazing-fast-python-networking/). Let's try to use Sanic to build a simple async web application.

