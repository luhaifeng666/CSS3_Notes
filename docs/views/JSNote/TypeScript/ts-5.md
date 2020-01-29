---
title: TypeScript的类
description: TypeScript的类
---

# TypeScript的类
#### 抽象类
抽象类做为其它派生类的基类使用,它们一般不会直接被实例化,不同于接口,抽象类可以包含成员的实现细节。abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。<br />例如：我们创建一个Animal的抽象类
```javascript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```
直接实例化时会报错，因为抽象类无法被直接实例化，通常需要通过子类继承，然后来实例化子类：
```javascript
class Cat extends Animal {
    makeSound() {
        console.log('miao miao')
    }
}

const cat = new Cat()

cat.makeSound() // miao miao
cat.move() // roaming the earch...
```

#### 访问限定符
访问限定符主要分三种：public，private，protected。

- public

在 TypeScript 的类中，成员都默认为 public, 被此限定符修饰的成员是可以被外部访问。
```javascript
class Car {
    public run() {
        console.log('启动...')
    }
}

const car = new Car()

car.run() // 启动...

```

- private

当成员被设置为 private 之后, 被此限定符修饰的成员是只可以被类的内部访问。

- protected<br />

当成员被设置为 protected 之后, 被此限定符修饰的成员是只可以被类的内部以及类的子类访问。
```javascript
class Car {
    protected run() {
        console.log('启动...')
    }
}

class GTR extends Car {
    init() {
        this.run()
    }
}

const car = new Car()
const gtr = new GTR()

car.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
gtr.init() // 启动...
gtr.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
```