---
title: 半透明边框
---
我们在想实现一个透明边框的时候，通常想到的可能是以下代码：
```
  border: 3px solid rgba(255,255,255,0.6);
```
可是如果这时候给元素添加一个背景色或者背景图片，背景图片与背景色会透过透明边框显示出来。这是因为
**在默认情况下,背景会延伸到边框所在区域的下层。**
例如：

<demo-1-1/>

通过这个例子我们可以看到，元素的背景色被设置为蓝色，背景色设置为rgba(255,255,255,.6),此时，透过透明边框可以看到元素的背景色。

---
### 解决办法

通过添加background-clip可以解决。
```
  border: 3px solid rgba(255,255,255,0.6);
  background-clip: padding-box;
```
background-clip属性是用来设置背景裁剪区域的，该属性接受三个参数：content-box | padding-box | border-box | text，裁剪区域如下：
- content-box: content部分，背景被裁剪至内容区（content box）外沿。
- padding-box: content + padding部分，背景延伸至内边距（padding）外沿。不会绘制到边框处。
- border-box: content + padding + border部分，背景延伸至边框外沿（但是在边框下层）。
- text: 裁剪为text前景色
具体用法可以参考MDN文档：[background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)