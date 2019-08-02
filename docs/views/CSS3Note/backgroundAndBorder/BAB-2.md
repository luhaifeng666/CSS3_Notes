---
title: 多重边框
---

# 多重边框
多重边框主要分为两种情况，一种是两层边框，还有一种是2层以上的边框。针对这两种情况，分别对应有不同的处理方案。

### 1、[outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)
某些情况下，如果你只需要两层边框，那么可以使用outline来实现。
```css
background: #409EFF;
border: 10px solid #67C23A;
outline: 5px solid #E6A23C;
```
效果图如下所示：
<demo-1-2 :show="'demo1'"/>
其中，绿色的是border，黄色的是outline。

::: tip 优点
- 比较灵活，可以自由设置边框的样式；
- 也可以通过[outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset)来设置跟元素边缘之间的距离，这个属性可以接受负值。设置负值时则是显示的内边框，类似于box-shadow的inset。
:::

::: danger 缺点
- 只适用于双边框的样式，多边框的样式不能用；
- 产生的边框不能贴合设置了圆角的元素，需要配合box-shadow来优化这个问题（后面会提到）;
- 根据CSS基本UI特性(第三版)规范，**描边可以不是矩形**，使用时要测试各个浏览器的表现情况。
:::

### 2、[box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
常规的box-shadow是用来设置阴影的，但是这个属性可以设置多值，通过它的偏移特性，我们可以生成多重边框。
```css
margin: 50px auto;
box-shadow: 0 0 0 10px #67C23A, 0 0 0 20px #F56C6C, 0 0 0 30px #E6A23C;
```

<demo-1-2 :show="'demo2'"/>

::: tip 优点
- 相比较于outline，这种方式可以设置多重边框；
- 除了边框，box-shadow的偏移还能实现其他更多神奇的效果（[后面会有一章介绍利用box-shaodw制作天气图标](/views/CSS3Note/201907/15.html)）。
:::

::: danger 缺点
- 相比较outline边框的自由设置，box-shadow不能实现类似边框虚线的效果；
- 不会影响布局，也不会受到[box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)属性的影响。上述例子中，我使用了50px的上偏移就是这个原因；
- 不会影响鼠标的事件，比如hover还有click，使用的时候要注意。
:::
