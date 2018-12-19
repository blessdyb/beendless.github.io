---
title: Set up SSL for website with Nginx and StartSSL
categories:
  - CS
date: 2015-09-26 07:04:47
tags:
    - DevOps
---

If you enable HTTPS and set up the certifications correctly, which means data will not be decrypted or modified during the transportation. Today I try to enable SSL to my website. Here is what I did to make it happen: 

First, you should make sure your website hosted with a dedicated IP address. Like me buy a VPS from linode. Also you should make sure your HTTP web server support SSL when you set up it. If you are using nginx, just add --with-http\_ssl\_module when you built it yourself (http://nginx.org/en/docs/http/ngx\_http\_ssl_module.html). 

Secondly, you need to buy a certification. As we know all modern browsers will check CA, in order to recognized by the root authorities, you need to purchase one certificated through them.  Even you can self-signed one to testing which will show warning to users by browser.  Fortunately, there're some authorities who supply free CA to users like startssl. It's easy to get a free CA from them. Just sign up and follow the guidance from startssl, then you can get

* Your private key file  domain.key
* Your issued certificate file domain.crt
* StartSSL Root CA Certificate and StartSSL Intermediate CA Certificate for your server (ca.pem and sub.class1.server.ca.pem)

* Now, you can do the below things to contact the certifications to one:

```
cat sub.class1.server.ca.pem >> ca.pem

cat domain.crt ca.pem > server.crt
```

* Then, upload your private key and generated certification server.crt to your server.  Open nginx.conf.

```
# HTTPS server
#
server {
    listen       443 ssl;
    server_name  server name here;

    ssl_certificate      server.crt;
    ssl\_certificate\_key  domain.key;

    ssl\_session\_cache shared:SSL:10m;
    ssl\_session\_timeout  5m;
    ssl_ciphers  "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !EXPORT !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";
    ssl\_prefer\_server_ciphers   on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

After that, restart your nginx and revisit your website, you will find your website support HTTPS now. Make sure you open 443 port in your firewall configuration.  If you want to forward all HTTP request to HTTPS, just add the configurations below:

```
server {
    listen       443 ssl;
    listen       80;
    error_page   497  https://$host$uri?$args;
    ...
}
```

Here is some useful links I followed:

* [http://nginx.org/en/docs/http/ngx\_http\_ssl_module.html](http://nginx.org/en/docs/http/ngx_http_ssl_module.html)
*   [https://www.linode.com/docs/websites/nginx/how-to-install-nginx-and-a-startssl-certificate-on-debian-7-wheezy](https://www.linode.com/docs/websites/nginx/how-to-install-nginx-and-a-startssl-certificate-on-debian-7-wheezy)
* [https://www.ssllabs.com/ssltest/analyze.html](https://www.ssllabs.com/ssltest/analyze.html)
*  [https://imququ.com/post/my-nginx-conf-for-security.html](https://imququ.com/post/my-nginx-conf-for-security.html)