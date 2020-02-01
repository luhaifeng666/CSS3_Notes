---
title: Typescript 中其他常见类型
description: Typescript 中其他常见类型
---

# Typescript 中其他常见类型
#### any大法好
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。<br />这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用any类型来标记这些变量。
```javascript
let notSure: any = 4;
notSure = "maybe a string instead";
```
注意：不可滥用！！

#### unknown
`unknown` 是 TypeScript 3.0 引入了新类型,是 `any` 类型对应的安全类型。与`any`有相似之处，也有不同之处。

- 同：它跟 `any` 一样,可以是任何类型：
```javascript
let any_value: any;
any_value = true;             // OK
any_value = 1;                // OK
any_value = "Hello World";    // OK

let unknown_value: unknown;
unknown_value = true;             // OK
unknown_value = 1;                // OK
unknown_value = "Hello World";    // OK
```

- 异：`unknown` 类型会更加严格:在对`unknown`类型的值执行大多数操作之前,我们必须进行某种形式的检查,而在对 `any` 类型的值执行操作之前,我们不必进行任何检查。
```javascript
let value: any;
value.foo.bar;  // OK
value();        // OK
new value();    // OK
value[0][1];    // OK

let value: unknown;
value.foo.bar;  // ERROR
value();        // ERROR
new value();    // ERROR
value[0][1];    // ERROR
```
我们看到,这就是 `unknown` 与 `any` 的不同之处,虽然它们都可以是任何类型,但是当 `unknown` 类型被确定是某个类型之前,它不能被进行任何操作比如实例化、getter、函数执行等等。<br />所以在忍不住想用any的时候，尝试使用unknown替代它吧~

:::tip Object
你可能认为 Object有相似的作用，就像它在其它语言中那样。Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：
```js
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```
:::


#### object
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
使用object类型，就可以更好的表示像Object.create这样的API。例如：
```js
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

#### never
never 类型表示的是那些永不存在的值的类型，never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了never本身之外）。即便是any大法也不行！<br />never的使用场景也不是特别普遍，有个场景可以使用：
```javascript
// 抛出异常的函数永远不会有返回值
function error(message: string): never {
    throw new Error(message);
}
```
补充：也有人提出一个场景，暂时我没想到有啥应用场景：
```javascript
// 空数组，而且永远是空的
const empty: never[] = []
```
有大佬知道的话，欢迎补充~

#### 数组
数组主要有两种定义方式，凭个人喜好而定：
```javascript
// 泛型
const list: Array<number> = [1, 2, 3]
// 直接定义
const list: number[] = [1, 2, 3]
```

#### 元组（Tuple）
元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。举个🌰：
```javascript
let x: [string, number];
x = ['hello', 10]; 

// 此时需要注意的是：
// 元组的类型如果多出或者少于规定的类型是会报错的，必须严格跟事先声明的类型一致才不会报错。
// 这是跟数组最大的区别
x = [10, 'hello']; // Error，顺序与定义的不一致
x = ['hello', 10, false] // Error，数目与定义的不一致
x = ['hello'] // Error，数目与定义的不一致
```
由此可以把元组看成是严格版的数组。

```javascript
const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok

console.log(tuple); // ["a", 1, 2]
console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'
```
<a name="3jHZK"></a>
#### Object
object表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。

<a name="XcIJT"></a>
#### 枚举类型

- 数字枚举

当我们声明一个枚举类型的时候，如果不赋值，那么它们的值默认从0开始：
```javascript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true
```
如果把其中一个值赋值，则后面的值会依次累加，前面的值规则不变：
```javascript
enum Direction {
  Up = 2,
  Down,
  Left = 9,
  Right
}

console.log(Direction.Up === 2); // true
console.log(Direction.Down === 3); // true
console.log(Direction.Left === 9); // true
console.log(Direction.Right === 10); // true
```

- 字符串枚举

即枚举类型的值是字符串。
```javascript
enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

console.log(Direction['Right'], Direction.Up); // Right Up
```
注意：字符串枚举必须给定明确的值，否则会报错。与数字枚举不同，它无法自增。

- 异构枚举

即字符串枚举与数字枚举的混用。
```javascript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

- 反向映射

通常我们通过枚举的key来获取对应的value，反向映射的作用就是通过value来获取对应的key：
```javascript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction[0]); // 'Up'
```

- 常量枚举

枚举其实可以被 `const` 声明为常量的,这样有什么好处?我们看以下例子:
```javascript
const enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

const a = Direction.Up;
```
上面的这段在编译之后会变成如下代码：
```javascript
var a = "Up";
```
如果是非常量枚举，在编译过后，枚举类型会编译成对象，例如上栗中的字符串枚举会被编译成如下内容：
```javascript
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
```
而常量枚举则会删除这段代码，这就是常量枚举的作用,因为下面的变量 `a` 已经使用过了枚举类型,之后就没有用了,也没有必要存在与 JavaScript 中了, TypeScript 在这一步就把 `Direction` 去掉了,我们直接使用 `Direction` 的值即可,这是性能提升的一个方案。<br />当然，如果你一定要保留对象，也可以在tsconfig.json文件中增加编译选项配置： `--preserveConstEnums。`

- 枚举成员类型

当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义，即枚举成员成为了类型。<br />例如我们声明一个数字枚举类型：
```javascript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

type c = 0 // 定义一个类型c，类型为0
declare let b: c // 声明b是c类型

b = 1 // 不能将类型“1”分配给类型“0”
b = Direction.Up // ok
```

- 联合枚举类型

由于联合枚举，类型系统可以知道枚举里的值的集合。
```javascript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

declare let a: Direction

enum Animal {
    Dog,
    Cat
}

a = Direction.Up // ok
a = Animal.Dog // 不能将类型“Animal.Dog”分配给类型“Direction”
```
我们把 `a` 声明为 `Direction` 类型，可以看成我们声明了一个联合类型 `Direction.Up | Direction.Down | Direction.Left | Direction.Right`，只有这四个类型其中的成员才符合要求。

- 枚举合并

同名枚举会自动合并。
```javascript
enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

enum Direction {
    Center = 1
}
```

- 为枚举添加静态方法

举个🌰, 假设我们有12个月份，需要找出夏天的月份：
```javascript
enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}
    
function isSummer(month: Month) {
    switch (month) {
        case Month.June:
        case Month.July:
        case Month.August:
            return true;
        default:
            return false
    }
}
  
console.log(isSummer(6)) // true
```