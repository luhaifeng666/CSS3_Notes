---
title: 背景定位
---
# 背景定位

CSS2.1中，使用background-position属性进行背景定位，可以通过设置top,left,right,bottom来实现，也可以设置具体的数值或者百分比来实现，但是在不固定宽高的容器中，想要跟容器的边框保留固定的边距，就只能通过百分比实现大概的间距，不能精确到具体位置。而在CSS3中，则存在两种方案，可以实现背景定位的位置。

### 1、background-position的扩展语法
在CSS3中，可以指定背景图片**距离任意角的偏移量**，只要我们在**偏移量前指定关键字即可。**
```css
background: url(../public/images/orange.jpeg) no-repeat top 10px left 10px / 30%;
background-color: #409EFF;
```
效果如下图所示：

<demo-1-3 :type="'demo1'">demo1</demo-1-3>
此时，图中的喵酱距离上边10px，距离左边10px。这样就可以实现精确定位。

### 2、[background-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin)
在日常开发过程中，有这样一个场景，我需要图片的偏移量与内边距一致。如果继续使用上述方法的话，可能会出现如下代码：
#### 代码一
```css
padding: 10px;
background: url(../public/images/orange.jpeg) no-repeat top 10px left 10px / 30%;
background-color: #409EFF;
```
这样写确实实现了我们想要的效果，可是如果此时我的需求发生变化，内边距需要改为20px，这样一来，就导致我们需要改三个地方的数值。如果只是少数几个地方还好，如果改动的地方比较多，那么久增加了日常维护的成本。此时，我们需要用到**background-origin**这个属性。<br/>
日常开发中，下面的这行代码我们经常会使用到:
```css
background-position: left bottom;
```
而每个元素是由三个矩形框组成的：

<demo-1-3 :type="'demo2'">demo2</demo-1-3>

而上述的left和bottom，以及另外的top和right，它们的定位都是依据padding-box来的，此时，我们可以通过background-origin来修改默认的参照：
#### 代码二
```css
padding: 10px;
background: url(../public/images/orange.jpeg) no-repeat top 10px left 10px / 30%;
background-origin: content-box;
```
此时，我们只需要修改padding一个值，就可以实现与[代码一](/views/CSS3Note/backgroundAndBorder/BAB-3.html#代码一)一样的效果了。