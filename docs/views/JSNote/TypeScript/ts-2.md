---
title: TypeScript的原始类型
description: TypeScript的原始类型
---

# TypeScript的原始类型
TypeScript的原始类型包括: boolean、number、string、void、undefined、null、symbol、bigint。类型声明只需要在变量后添加 : + 对应的类型即可。<br />注意：在TypeScript中，所有的类型声明需要小写！

#### 布尔类型
```javascript
const isLoading: boolean = false
```

#### 数字
JavaScript中的二进制、十进制、十六进制等数都可以用 `number` 类型表示。
```javascript
const decLiteral: number = 6
const hexLiteral: number = 0xf00d
const binaryLiteral: number = 0b1010
const octalLiteral: number = 0o744
```

#### 字符串
```javascript
const book: string = 'Hello World'
```

#### 空值
表示没有任何类型，当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```javascript
function warnUser(): void {
    alert("This is my warning message");
}
```
实际上只有`null`和`undefined`可以赋给`void`:
```javascript
const a: void = undefined
```

#### Null和Undefined
TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null，和void相似，它们的本身的类型用处不是很大。在默认情况下，null 和 undefined 是所有类型的子类型，例如你可以把 null 和 undefined 赋值给 number 类型的变量。<br />但是在正式项目中一般都是开启 `--strictNullChecks` 检测的，即 null 和 undefined 只能赋值给 void 和它们各自，可以规避非常多的问题。

#### Symbol
Symbol 是在ES2015之后成为新的原始类型,它通过 `Symbol` 构造函数创建:
```javascript
const sym1: symbol = Symbol('key1');
```
注意：这个基本类型在tsconfig.json的target设置为'es5'时不可使用，会报错。

#### BinInt
`BigInt` 类型在 TypeScript3.2 版本被内置，使用 `BigInt` 可以安全地存储和操作大整数，即使这个数已经超出了JavaScript构造函数 `Number` 能够表示的安全整数范围。在 JavaScript 中采用双精度浮点数,这导致精度有限，比如 `Number.MAX_SAFE_INTEGER` 给出了可以安全递增的最大可能整数，即`2**53-1`,我们看一下案例:
```javascript
const max = Number.MAX_SAFE_INTEGER;
const max1 = max + 1
const max2 = max + 2
max1 === max2 //true
```
这就是超过精读范围造成的问题，而`BigInt`正是解决这类问题而生的:
```javascript
const max: bigint = BigInt(Number.MAX_SAFE_INTEGER);
const max1: bigint = max + 1n
const max2: bigint = max + 2n
max1 === max2 // false
```
注意: 当我们需要用 `BigInt(number)` 把 Number 转化为 `BigInt`,同时如果类型是 `BigInt` ,那么数字后面需要加 `n` ,就如同上面例子的 `const max1 = max + 1n` 中的 `1n`。