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

// 也可以写成如下形式
// 名称不同没关系，只要类型一致就可以，命名是为了增加可读性
const add: (firstNum:number, secondNum:number) => number = (a:number, b:number) => a + b
```

#### 可选参数
与interface的定义类似，通过？来表示参数为可选参数：
```javascript
const add = (a: number, b?: number) => a + (b ? b : 0)
```
:::danger 注意
可选参数必须放在最后！！！
:::

#### 默认参数
直接赋值即可：
```javascript
const add = (a: number, b = 10) => a + b
```
默认参数与可选参数一样，在传值时是可选的，可以不传。但是在定义时，不一定要放在最后。

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

#### this
JavaScript里，this的值在函数被调用的时候才会指定。如下例：
```js
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

此时会报错：因为此时的this指向window。
即便此时我们将`createCardPicker`中返回的函数改成箭头函数，虽然不会报错了，但是在TypeScript中，如果你给编译器设置了--noImplicitThis标记。 它会指出 `this.suits[pickedSuit]`里的`this`的类型为`any`。这是因为 `this`来自对象字面量里的函数表达式。
修改的方法是，提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面：
```js
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
```

此时，我们改写下上栗：
```js
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
现在TypeScript知道`createCardPicker`期望在`Deck`对象上调用。 也就是说 `this`是`Deck`类型的，而非`any`，因此`--noImplicitThis`不会报错了。

#### 回调函数中的this
当你将一个函数传递到某个库函数里稍后会被调用时。 因为当回调被调用的时候，它们会被当成一个普通函数调用， this将为undefined。 稍做改动，你就可以通过 this参数来避免错误。 首先，库函数的作者要指定 this的类型：
```js
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

这里的`this: void`意味着`addClickListener`这个方法的`onclick`参数接受一个方法，这个方法不需要指定是哪个对象的 `this`。然后：
```js
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```

指定了`this`类型后，你显式声明`onClickBad`必须在`Handler`的实例上调用。 然后TypeScript会检测到 `addClickListener`要求函数带有`this: void`。 改变 `this`类型来修复这个错误：
```js
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

因为`onClickGood`指定了`this`类型为`void`，因此传递`addClickListener`是合法的。 当然了，`这也意味着不能使用 this.info`. 如果你两者都想要，你不得不使用箭头函数了：
```js
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```

这是可行的因为箭头函数不会捕获`this`，所以你总是可以把它们传给期望`this: void`的函数。 缺点是每个 `Handler`对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到 `Handler`的原型链上。 它们在不同 `Handler`对象间是共享的。