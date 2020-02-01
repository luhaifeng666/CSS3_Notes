---
title: TypeScript的泛型
description: TypeScript的泛型
---

# TypeScript的泛型
在静态编写的时候不确定传入的参数是什么类型，只有在运行时传入参数后才能确定。此时，我们需要一个变量，这个变量代表传入的类型，然后再返回这个变量，这个变量只用于表示类型，而不是值。此类变量就是`类型变量`。
```js
function returnItem<T>(para: T): T {
    return para
}
```

上例中函数后声明类型变量`<T>`，用于捕获开发者传入的参数类型，比如string，然后就可以使用T（此时为string）做参数类型和返回值类型了。以这种方式定义的函数我们称作`泛型`。

#### 多个类型参数
定义泛型时，可以一次定义多个类型参数，比如同时定义泛型T跟泛型U：
```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
swap([7, 'seven']) // ['seven', 7]
```

#### 泛型变量
需求：函数接受一个数组，要求先打印数组的长度，然后返回数组
```js
function getArrayLength<T>(arg: T): T {
    console.log(arg.length)
    return arg
}
```

此时会报错：
因为arg是泛型，无法确定其是否存在length属性。因为需求中可以明确arg是个数组，此时，我们可以显示声明：
```js
function getArrayLength<T>(arg: Array<T>) {
  console.log((arg as Array<any>).length)
  return arg
}
```

#### 泛型接口
泛型也可用于接口定义：
```js
interface ReturnItemFn<T> {
    (para: T): T
}
```

当希望传入number作为参数时：
```js
const returnItem: ReturnItemFn<number> = para => para
```

#### 泛型类
有如下类定义：
```js
class Stack {
    private arr: number[] = []
    
    public push(item: number) {
        this.arr.push(item)
    }
    
    public pop() {
        this.arr.pop()
    }
}
```

对其进行改写：
```js
class Stack<T> {
    private arr: T[] = []
    
    public push(item: T) {
        this.arr.push(item)
    }
    
    public pop() {
        this.arr.pop()
    }
}
```

#### 泛型约束
如果我们可以确定传入的泛型属于哪一类，例如number或string其中之一，此时可以添加约束，还以上例为例：
```js
type Params = number | string

class Stack<T extends Params> {
    private arr: T[] = []
    
    public push(item: T) {
        this.arr.push(item)
    }
    
    public pop() {
        this.arr.pop()
    }
}
```

当传入非约束类型的时候，会报错：


#### 泛型约束与索引类型
需求：方法接受两个参数，分别为对象，以及对象的key，要求返回key对应的值。
```js
function getVal(obj: object, key: string) {
    return obj[key] // error
}
```

此时会报错

我们给obj定义的类型是object，此时，obj参数实际上是{}, 因此后面的key取不到值。我们可以用泛型来表示传入的obj参数
```js
function getVal<T extends object>(obj: T, key: string) {
    return obj[key] // error
}
```

此时依旧报上述错误，因为无法确定key是否存在于obj上，需要对key加上约束：
```js
function getVal<T extends object, U extends keyof T>(obj T, key U) {
    return obj[key]
}
```

此时key的类型相当于被约束成一个联合类型，即将它限定为key的属性之一。在调用这个函数的时候需要注意，此时不能传入空数组。
多重类型进行泛型约束
多重类型约束的情况下，需要先继承接口，然后再去约束。
```js
interface FirstInterface {
    doSomething(): number
}

interface SecondInterface {
    doSomethingElse(): string
}

// 先继承上述两个接口
interface childInterface extends FirstInterface, SecondInterface { /**/}

// 然后进行约束
class Demo<T extends childInterface> {
    private genericProperty: T
    
    useT() {
        this.genericProperty.doSomething()
        this.genericProperty.doSomethingElse()
    }
}
```

#### 泛型与new
假设需要声明一个泛型，拥有构造函数
```js
function factory<T>(type: T): T {
    return new type()
}
```

此时会报错，因为我们没有声明泛型T是构造函数
```js
function factory<T>(type: {new(): T}): T {
    return new type()
}
```