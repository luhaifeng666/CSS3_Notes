---
title: Nodejs入门篇（二）
description: 创建第一个服务
---

# Nodejs入门篇（二）
::: danger Tips
由于是个人笔记，所以我会忽略一部分基础内容，而且是建立在对JS有了解的前提之下，
所以关于Nodejs的安装以及Js部分的一些基础知识不会在其中做过多赘述。如果这些文章
有幸被您看到，请不要介意~在此附上传送门，请看官择门而入~<br>
<p>[Nodejs](http://nodejs.cn/)</p>
<p>[Javascript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)</p>
:::

### 什么是Nodejs
<p>在开始写第一个服务之前，先简单说一下Nodejs。</p>

**Nodejs是运行在服务端的JS**

<p>Nodejs也是JS，在一开始，JS运行在浏览器中，它定义了使用JS可以做什么，却没有说太多JS本身可以做什么。</p>

**Node.js 事实上就是另外一种上下文，它允许在后端(脱离浏览器环境) 运行 JavaScript 代码。**

<p>要实现在后台运行JS代码，首先JS要被解释，然后正确的执行。Nodejs的原理就是如此，它基于Google的V8引擎来解释执行JS代码。</p>
<p>
  除此之外，Nodejs还包括诸多模块可以使用，例如我们接下来将要使用的
  <span style="color:red">http</span>模块。因此，
  <span style="color:red">Nodejs既是一个环境，又是一个库</span>。
</p>

### 创建第一个服务
