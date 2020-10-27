---
title: Understand X-Forwarded-Proto
date: 2020-10-26 17:13:24
tags: 
    - NodeJS
    - HTTP
    - AWS
---

HTTP requests and HTTP responses use header fields to send information about the HTTP messages. Header fields are colon-separated name-value pairs that are separated by a carriage return (CR) and a line feed (LF). A standard set of HTTP header fields is defined in RFC 2616. There are also non-standard HTTP headers available that are widely used by the applications. Some of the non-standard HTTP headers have an X-Forwarded prefix. 

The `X-Forwarded-Proto` request header helps you identify the protocol (HTTP or HTTPS) that a client used to connect to your servers. For example, if you host your website application behind a proxy server, let's say AWS Loadbalancer. If there's only one layer in front of the AWS load balancer, then the `X-Forwarded-Proto` value could be either `http` or `https` (it depends on how client connect to the load balancer). 

Usually it won't be an issue. But if you have multiple proxy servers in front of your application, for instance, user will have to go through CDN, WAF, Load balancer to hit your application, then the value of `X-Forwarded-Proto` depends on how the last two layers connect to each other instead of the protocal from client. Which means if user open the website with HTTPS mode, then you will have issue to set up the `secured cookie` in your HTTP response. 

Here is an example, you set up an applicatio with ExpressJS under HTTPS model. In front your application, you have `Fastly`, `Imperva` and `AWS ALB`. Now if you are using `express-session` to set up your user session with below configuration:
```
proxy: true,
cookie: {
  secure: true,
  httpOnly: true,
}
```
Then if you rely on the default value of `X-Forwarded-Proto` from `AWS ALB`, you are not able to set up the session cookie. You have to either force `AWS ALB` to pass `X-Forwarded-Proto` as `HTTPS` or you can write a simple middleware to ignore the value from load balancer like below:

```
/* eslint-disable no-param-reassign */
app.use((req, res, next) => {
  req.headers['x-forwarded-proto'] = 'https';
  return next();
});
```


