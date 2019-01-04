---
title: Building Asynchronized HTTP Services With Sanic
date: 2019-01-03 13:06:56
categories: CS
tags:
    - Python
    - Async
    - HTTP
---

Python introduced async/await syntax from Python3.5. it makes your code non-blocking and speedy. Developers can use it to build a high-performance / NIO web services like NodeJS. Most of the Python web developers are familiar with Flask. But unfortunately flask has no plan to support the async request headers. [Sanic](https://sanicframework.org/) is a Flask-like webserver that's written to go fast. It was inspired by [uvloop](https://magic.io/blog/uvloop-blazing-fast-python-networking/). 


I set up a [sanic boilerplate](https://github.com/blessdyb/sanicboilerplate) to show how to set up a sanic application. Inside of this project:

* `Dockerfile` and `docker-compose.yml` are used to set up the python environments
* `gunicorn` is the application server
* `Blueprint` is used to build different parts of the applications (health-check / docs / business logic samples)
* Eventloop is based on `asyncio` and `uvloop`









