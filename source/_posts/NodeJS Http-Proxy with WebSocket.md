---
title: NodeJS Http-Proxy with WebSocket
date: 2023-07-17 23:15:24
categories: CS
tags:
    - NodeJS
    - WebSocket
    - HttpProxy
---

WebSocket has been supported widely in the past few years. More and more applications are embracing this and using it to replace AJAX / Commit / LongPooling. Set up a NodeJS server with WebSocket is easier, but how to do it correctly especially when your application is behind web proxies? Here I'm going to use a simple http server and websocket native implementaion [`ws`](https://github.com/websockets/ws), a http proxy based on [`http-proxy`](https://github.com/http-party/node-http-proxy) .

1. Run below commands to start a small project

```
mkdir nodejs-proxy-websocket && cd nodejs-proxy-websocket && npm init -y
npm i --save ws http-proxy
```

2. Create a file `index.html` with code below. So we set up a websocket connection which will display the message pushed from server and send it back

```
<div id="message"></div>
<script>
    // Init a websocket object
    let ws = new WebSocket(location.href.replace('http', 'ws'));
    // Open the connection
    ws.onopen = (event)=>{
        ws.send("Init the server connection")
    }
    // Receive / Send messages
    ws.onmessage = (message)=>{
        document.querySelector('#message').innerHTML = new Date(+message.data).toISOString().substr(0, 19);
        ws.send(message.data);
    }
</script>

```

3. Create a file `server.js` with code below. We share the same server between websocket server and http application server.

```
const http = require("http");
const fs = require("fs");
const ws = require("ws");

// Render index.html as content for all requests
const server = http.createServer((req, res) => {
  fs.readFile("index.html", "utf8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

// Handle websocket requests
const wss = new ws.WebSocketServer({ noServer: true });
wss.on("connection", (websocket, req) => {
  setInterval(
    () => websocket.send(+new Date()),
    1000
  );
  websocket.on("message", (data) => {
    console.log(data.toString());
  });
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (websocket) => {
    wss.emit("connection", websocket, req);
  });
});

server.listen(3001);

```

4. Now if you run `node server.js` and open `http://localhost:3001` you will see a clock string displaying on the page and refreshing every second

5. Let's continue our journey, create a file named `proxy.js` with content below

```
const http = require("http");
const httpProxy = require('http-proxy');
// Set up a proxy
var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 3001
  }
});

// Create a proxy server
var proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});

proxyServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

proxyServer.listen(8001)
```

Here we use `http-proxy` to set up a simple proxy server which proxying all requests (including websocket) to our application server (server.js http://localhost:3001). 

6. Now if you open `http://localhost:8001` you will see the same page as #4. We successfully make websocket requests pass through a proxy in nodejs.

