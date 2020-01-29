---
title: TypeScript的接口
description: TypeScript的接口
---

# TypeScript的接口
TypeScript 的核心原则之一是对值所具有的结构进行类型检查,它有时被称做“鸭式辨型法”或“结构性子类型化”。<br />在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

#### 接口的使用
比如我们有一个函数，这个函数接受一个 `User` 对象，然后返回这个 `User` 对象的 `name` 属性:
```javascript
const getUserName = (user) => user.name
```
此时会报错：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/379592/1577981113339-cbe10c9c-0f3d-412e-a765-eca02122f323.png#align=left&display=inline&height=129&name=image.png&originHeight=258&originWidth=1214&size=55886&status=done&style=none&width=607)<br />我们必须用一种类型描述这个 `user` 参数，但是这个类型又不属于上一节介绍到的各种基本类型。此时，就需要用到interface：
```javascript
interface User {
    name: string
    age: number
    isMale: boolean
}

const getUserName = (user: User) => user.name
```
只要相应的属性存在并且类型也是对的就可以。

#### 可选属性
当有些属性可能不存在时，我们可以定义可选属性：
```javascript
interface User {
    name: string
    age?: number
    isMale: boolean
}
```
当我们看到代码提示的时候，这个 `age` 属性既可能是number类型也可能是 `undefined` 。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/379592/1577981086899-2057bd9b-4852-4512-93d4-a2dfb462b6e1.png#align=left&display=inline&height=163&name=image.png&originHeight=326&originWidth=1586&size=56309&status=done&style=none&width=793)

#### 只读属性
当我们需要规定一个属性不可以再对其进行修改时，可以通过设置readonly把属性变成只读属性：

```javascript
interface User {
    name: string
    age?: number
    readonly isMale: boolean
}
```
一旦我们要修改只读属性，就会出现警告⚠️。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/379592/1577981052629-fb2d41b4-0ee2-495d-8b16-59c67514f8a4.png#align=left&display=inline&height=167&name=image.png&originHeight=334&originWidth=1292&size=64993&status=done&style=none&width=646)

#### 函数类型
沿用上栗，如果这个入参user中包含一个函数，比如：
```javascript
user.say = function(words: string) {
    return 'hello world'
}
```
此时应该怎么去定义呢？
```javascript
interface User {
    name: string
    age?: number
    readonly isMale: boolean
    say: (words: string) => string
}

```
当然，我们也可以先定义一个接口，然后去内部使用：
```javascript
interface Say {
    (words: string) : string
}

interface User {
    name: string
    age?: number
    readonly isMale: boolean
    say: Say
}
```

#### 可索引类型
此时如果我们继续扩展user，当user中存在一个邮箱字段，邮箱字段中包含多个邮箱地址，且数目不定，名称不定，此时需要怎么去定义interface呢？<br />例如有以下甲乙的信息：<br />甲：
```javascript
{
    name: 'jia',
    age: 18,
    isMale: false,
    say: Function,
    mail: {
        NetEase: 'jia@163.com',
        qq: '1009037002@qq.com',
    }
}
```
乙：
```javascript
{
    name: 'yi',
    age: 16,
    isMale: true,
    say: Function,
    mail: {
        NetEase: 'yi@163.com',
        qq: '1009037002@qq.com',
        sina: 'jiangdoufujing@sina.com',
    }
}
```
我们可以看到，甲乙信息的mail字段中，key与value均为string，此时，我们可以通过索引类型来表示：
```javascript
interface Mail {
    [name: string]: string
}

interface User {
    name: string
    age?: number
    readonly isMale: boolean
    say: () => string
    mail: Mail
}

```

#### 接口继承
此时如果我们又双叒叕接到个需求，比如F6的用户需要在此基础上新增Vip用户，与普通用户相比，Vip多了一些额外属性，此时又要怎么定义呢？<br />答案就是接口继承：
```javascript
interface VIPUser extends User {
    broadcast: () => void
}
```
甚至可以同时继承多个接口：
```javascript
interface VIPUser extends User, SupperUser {
    broadcast: () => void
}
```