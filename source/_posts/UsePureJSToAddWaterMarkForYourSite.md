---
title: Add WaterMark with JavaScript to Your Website
date: 2020-10-02 11:14:22
tags: JavaScript
categories: CS
---

If you are an enterprise application developer, you may want to add watermark to your application. You can use below JS to applications like Confluence, Jira and so on. Just need to paste below JS code.

```
(function(txt1, txt2){
    var canvas = document.createElement('canvas');
    var waterMark = document.createElement('div');
    var body = document.body;
    canvas.width = 250;
    canvas.height = 280;
    canvas.style.display = 'none';
    body.appendChild(canvas);

    var context = canvas.getContext('2d');
    context.rotate(-20 * Math.PI/180);
    context.font = '16px'; 
    context.fillStyle = 'rgba(17, 17, 17, 0.20)';
    context.textAlign = 'left'; 
    context.textBaseline = 'Middle';
    context.fillText(txt1, canvas.width / 3 - 40, canvas.height / 2, 200);
    context.fillText(txt2, canvas.width / 3 - 40, canvas.height / 2 + 30, 200);
    waterMark.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
    waterMark.style.zIndex = 9999;
    waterMark.style.height = '100vh';
    waterMark.style.width = '100vw';
    waterMark.style.pointerEvents = 'none';
    waterMark.style.position = 'fixed';
    body.prepend(waterMark);
})('© Copyright 2020', 'All Rights Reserved');
```
