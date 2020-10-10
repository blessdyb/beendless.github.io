---
title: Serving Files on S3 through NodeJS
date: 2020-10-09 20:06:56
categories: CS
tags:
    - NodeJS
    - Async
    - AWS
---

NodeJS `stream` is one of the most powerful modules built-in. If you need to serve files on S3 through NodeJS service, a good idea is to leverage the compatibility of stream, especially if you want to serve big files.


One small trick here is you need to set up correct `Content-Type` before sending response back to the browser. Based on AWS's documentation, https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html,  we can listen the event `httpHeaders` and set up the correct response header information.

```
const mime = require('mime');
const express = require('express');
const AWS = require('aws-sdk');
const AWSConfig = require('aws-config');
const S3 = new AWS.S3(AWSConfig({ region: AWS_REGION, accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY }));

router.get('/*', (req, res, next) => {
  const { path } = req;
  const contentType = mime.getType(path);
  return S3.getObject({
    Bucket: AWS_BUCKET,
    Key: path,
  }).on('httpHeaders', (code, headers) => {
    if (code < 300) {
      res.set({
        'Content-Type': contentType,
        'Content-Length': headers['content-length'],
        'Last-Modified': headers['last-modified'],
      });
    }
  })
    .createReadStream()
    .on('error', () => next())
    .pipe(res);
});
```