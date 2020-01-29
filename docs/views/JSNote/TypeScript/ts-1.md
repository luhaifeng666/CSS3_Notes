---
title: 开始使用TypeScript
description: 开始使用TypeScript
---

# 开始使用TypeScript
#### 安装
```javascript
npm install -g typescript
```
#### 初始化
```javascript
tsc --init
```
此时，在目录下会新增一个[tsconfig.json](https://www.tslang.cn/docs/handbook/compiler-options.html)文件，包含官方初始化的一些配置以及注释。
```json
//以下是比较常用的配置项
{
  "compilerOptions": {
    "target": "es5",                            // 指定 ECMAScript 目标版本: 'ES5'
    "module": "commonjs",                       // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "sourceMap": true,                          // 把 ts 文件编译成 js 文件的时候，同时生成对应的 map 文件
    "strict": true,                             // 启用所有严格类型检查选项
    "noImplicitAny": true,                      // 在表达式和声明上有隐含的 any类型时报错
    "alwaysStrict": true,                       // 以严格模式检查模块，并在每个文件里加入 'use strict'
    "declaration": true,                        // 生成相应的.d.ts文件
    "removeComments": true,                     // 删除编译后的所有的注释
    "lib": ["es6", "dom"],                      // 指定要包含在编译中的库文件
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [                                  // 需要编译的ts文件 一个*表示文件匹配**表示忽略文件的深度问题
    "./src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
  ]
}
```
之后，在src目录下编写.ts文件，然后运行tsc -W命令，可以实时监测src目录下文件的变化，并将编译后的文件输出到outDir指定的目录下。