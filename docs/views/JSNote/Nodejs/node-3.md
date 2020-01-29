---
title: Nodejs入门篇（三）
description: Nodejs路由
---
# Nodejs路由
我们需要根据不同的URL以及POST或者GET参数，做不同的处理。我们所需要的数据都包含在**request**对象中。但是为了解析这些数据，我们需要额外的Nodejs模块，它们分别是[url](http://nodejs.cn/api/url.html)和[querystring](http://nodejs.cn/api/querystring.html)模块。
<p>我们先在index.js中引入url模块：</p>

```js
var http = require('http');
var url = require('url');

function onRequest(request, response) {
  var pathname = url.parse(request.url).pathname; // 这里可以打印出请求URL的pathname
  response.writeHead('200', {
    'Content-Type': 'text/plain'
  });
  response.write('hello world');
  response.end();
}

http.createServer(onRequest).listen(8080);
```
现在我们可以通过pathname来区分不同的请求了。为了处理方便，我们在根路径下创建一个router.js来处理不同的请求。然后在route.js中输入以下内容：
```js
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
```

::: tip 暴露API
Nodejs中，可用通过module以及exports的方式暴露API：
- **exports.XXX:** 模块在默认情况下会暴露一个空对象，如果要在空对象上添加属性，可以用这种方式。
- **module.exports = XXXXX:** 这种方式相当于重写exports，例如：
<p>A.js</p>

```js
function Person(name) = {
  this.name = name;
}
Person.prototype.getName = function() {
  return this.name;
}
module.exports = Person;
```

<p>B.js</p>

```js
var person = require('A.js');

var Jack = new person('Jack');
Jack.getName();
```
:::

然后，我们在index.js中引入route.js:
```js
var route = require('route');

function onRequest(request, response) {
  ...
  var pathname = url.parse(request.url).pathname;
  route(pathname);
  ...
}
```
这样，我们就有了可以处理不同请求的地方。
