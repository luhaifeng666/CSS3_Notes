---
title: TypeScript的类型断言与类型守卫
description: TypeScript的类型断言与类型守卫
---

# TypeScript的类型断言与类型守卫
在TS中直接给对象直接赋值，会产生报错。如下例：
```js
const person = {}

person.name = 'Black'
person.age = 20
```

此时报错信息如下：

此时，因为TS内部的类型推断 ，person的类型为{}，不存在name以及age属性。因为一开始没有声明person中存在这两种属性。此时可以使用类型断言：
```js
interface Person {
    name: string,
    age: number
}

const person = {} as Person
person.name = 'black'
person.age = 20
```

但是类型断言存在一个问题，同上例，如果我们只传入name属性，不传入age属性，IDE不会提示错误。正确做法如下：
```js
const person: Person = {}
person.name = 'black'
```

此时IDE就会有报错提示，漏写age属性。注意，按照这种写法，上面的interface的定义中，两个属性需要改成可选属性，不然就算给name跟age都赋值了，依旧会报错。
类型断言还有一种尖括号语法：
```js
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

类型守卫
主要分三种，instanceof、in以及字面量类型守卫。
-- instanceof:
```js
class Person {
	name = 'black';
	age = 20;
}

class Animal {
	name = 'petty';
	color = 'pink';
}

function getSometing(arg: Person | Animal) {
	if (arg instanceof Animal) {
		console.log(arg.color); // ok
		console.log(arg.age); // Error
	}
	if (arg instanceof Person) {
		console.log(arg.age); // ok
		console.log(arg.color); // Error
	}
}
```

in:
```js
class Person {
	name = 'black';
	age = 20;
}

class Animal {
	name = 'petty';
	color = 'pink';
}

function getSometing(arg: Person | Animal) {
	if ('age' in arg) {
		console.log(arg.color); // Error
		console.log(arg.age); // ok
	}
	if ('color' in arg) {
		console.log(arg.age); // Error
		console.log(arg.color); // ok
	}
}
```

字面量类型守卫
```js
type Foo = {
  kind: 'foo'; // 字面量类型
  foo: number;
};

type Bar = {
  kind: 'bar'; // 字面量类型
  bar: number;
};

function doStuff(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}
```
