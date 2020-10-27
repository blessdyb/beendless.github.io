---
title: JavaScript Async Ready Looping
date: 2020-10-26 17:38:38
tags:
    - Async
    - Functional Programming
    - JavaScript
---

When you are following functional programming style guide to write JavaScript, you may find that it's hard to deal with asynchronous since `async` function always return promises. So code like below will resolve the promises at same time instead of waiting for them. 

```
(() => {
    [1, 2, 3, 4].forEach(async (x) => {
        await AsyncFunction(x);
    });
    console.log('Done'); // Run before the promises are resolved.
})();
```

There are several different approaches to solve this problem. 

### `Promise.all`

You can simply take advantage of `Promise.all()` to create a promise out of an array of promises. 

```
(() => {
    await Promise.all([1, 2, 3, 4].map(async (x) => AsyncFunction(x)));
    console.log('Done'); // Run after all promises are resolved.
})();
```

### Use `Reduce` to loop over async calls [promise chain]

Since `async` calls return promises, we can emulate `forEach` with `reduce` by starting with a resolved promise and chaining ot it the promise for each value in the array. 

```
(async () => {
    await [1, 2, 3, 4].reduce((acc, item) => acc.then(() => AsyncFunction(item)), Promise.resolve());
    console.log('Done'); // Run after all promises are resolved.
})();
```

