---
title: TypeScript的函数
description: TypeScript的函数
---

# TypeScript的函数
#### 定义函数类型
函数的定义不需要太刻意，比如我们实现一个加法函数：
```javascript
const add = (a: number, b: number) => a + b
```
虽然我们只声明了参数的类型，没有显示定义函数，但是实际上编译器可以“感知”这个函数的类型:<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/379592/1577983076240-2327856f-f9a8-4e76-be4b-57f85262558e.png#align=left&display=inline&height=48&name=image.png&originHeight=96&originWidth=778&size=20205&status=done&style=none&width=389)<br />这个就是所谓的类型推断。<br />当然显示定义也可以：
```javascript
const add: (a:number, b:number) => number = (a:number, b:number) => a + b
```

#### 可选参数
与interface的定义类似，通过？来表示参数为可选参数：
```javascript
const add = (a: number, b?: number) => a + (b ? b : 0)
```

#### 默认参数
直接赋值即可：
```javascript
const add = (a: number, b = 10) => a + b
```

#### 剩余参数
剩余参数与JavaScript种的语法类似，需要用 `...` 来表示剩余参数，而剩余参数 `rest` 则是一个由number组成的数组，在本函数中用 reduce 进行了累加求和。

```javascript
const add = (a: number, ...rest: number[]) => rest.reduce(((a, b) => a + b), a)
```

#### 函数重载
下面的函数实际上只接受1、2、4个参数，但是如果我传入三个，是不会报错的，这就是类型的不安全。如果我不看代码的实现是不知道这个问题的。
```javascript
function assigned (a: number, b?: number, c?: number, d?: any) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  }
}
```

此时加入重载可以规避这个问题：
```javascript
// 重载部分
interface Direction {
  top: number
  right: number
  bottom: number
  left: number
}

function assigned(all: number): Direction
function assigned(topAndBottom: number, leftAndRight: number): Direction
function assigned(top: number, right: number, bottom: number, left: number): Direction

function assigned (a: number, b?: number, c?: number, d?: any) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  }
}
```
此时传入三个参数会报错：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/379592/1577983751067-28cc12d8-84a0-4edd-a04f-486ea035495c.png#align=left&display=inline&height=113&name=image.png&originHeight=226&originWidth=1540&size=58618&status=done&style=none&width=770)