# Koa学习笔记

中文官网教程：<https://www.itying.com/koa/article-index-id-79.html>

## 1.Koa介绍&环境搭建

### 1.1 koa介绍

koa是比express 更小，更富有表现力，更健壮的Web框架，使用koa编写web应用，通过组合不同的generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写web应用变得得心应手。

koa开发思路和express差不多，最大的特点就是可以**避免异步嵌套**

### 1.2 环境搭建

#### 1.2.1 安装

新建文件—`npm init -y`， 初始化`package.json`和`package-lock.json`

安装`koa`包：

```shell
npm install koa
```

#### 1.2.2 使用

新建app.js文件后，输入代码：

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
    ctx.body = "hello koa"
})

app.listen(3000, () => {
    console.log("server is running")
})
```

#### 1.2.3 启动

在当前目录下，输入命令`nodemon app.js`，nodemon是之前安装的自动更新app.js的包

在浏览器中输入`127.0.0.1:3000` 就可以访问到页面了

## 2.Koa路由

### 2.1 koa路由的概念

路由的概念：根据不同的URL地址，加载不同的页面实现不同的功能

koa中的路由和Express有所不同，在Express中直接引入就可以配置路由，但在koa中我们需要安装对应的koa-router路由模块来实现

### 2.2 koa路由安装与使用

安装第三方包：

```shell
npm install -S koa-router
```

使用：

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')(); //注意：引入方式

router.get('/news', (ctx, next) => {
    ctx.body = "news page"
});

//启动路由
app.use(router.routes());
//这是官方文档的推荐用法，我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后
// 所以在当所有路由中间件最后调用，
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})
```

### 2.3 koa路由get传值

在koa中GET传值通过request接收，接收方式有两种：`query`和`querystring`

`query`:返回的是格式化好的参数对象

`querystring`：返回的是请求字符串

GET请求可以从request中获得，也可以从上下文直接获取

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')(); //注意：引入方式

router.get('/news', (ctx, next) => {
    ctx.body = "news page"
});
router.get('/newsContent', (ctx, next) => {
    let url = ctx.url;
    // 从上下文ctx直接获取
    // query:返回的是格式化好的参数对象
    // querystring:返回的是请求字符串
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    let request = ctx.request;
    // 从request中获得GET请求
    let req_query = request.query;
    let req_querystring = require.querystring;
    ctx.body = {
        url,
        ctx_query,
        ctx_querystring,
        req_query,
        req_querystring
    }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})
```

### 2.4 koa动态路由

有的时候我们需要判断我们某个链子的子路由的类型是啥，这个时候就用到了动态路由

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')(); //注意：引入方式

// 请求方式 http://127.0.0.1:3000/news/123 或者http://127.0.0.1:3000/news/456
/* 打印出来的是
{ aid: '123' }
{ aid: '456' }
*/
router.get('/news/:aid', (ctx) => {
    console.log(ctx.params);
    ctx.body = "news page";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})
```

## 3.Koa中间件

### 3.1 koa中间件概念

中间件就是匹配路由之前或者匹配路由完成做的一系列的操作

在express中间件是一个函数，它可以访问 请求对象(req)，响应对象（res），和web应用中 处理请求-响应循环流程中的中间件，一般被命名为next的变量。

在koa中 中间件和express有点类似

中间件的功能：

- 执行任何代码
- 修改请求和响应对象
- 终结请求-响应循环
- 调用堆栈中的下一个中间件

如果我的get post 回调函数中，没有next参数，那么就匹配第一个路由，就不会往下匹配了。如果想往下匹配，那么需要些next()

### 3.2 中间件类别

koa应用可使用如下几种中间件：

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 第三方中间件

#### 3.2.1 应用级中间件

万能匹配（不关心任何请求路径和请求方法）：

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')(); //注意：引入方式

// 应用级中间件用在 进入首页前，判断是否登录，登录后进入next(),执行完next()后，返回执行应用级路由
// 这就是洋葱圈模型，一级一级next()后，再一级一级返回执行next()后面的操作
// 应用级中间件
app.use(async(ctx, next) => {
    // 第一步执行，处理操作
    console.log("hello I'm middleware");
    ctx.body = "aaaa"

    // 第二步执行，会覆盖前面的aaa
    // 等待next()完成，完成后再执行下一步
    await next();

    // 第三步执行
    // 这里的dddd会覆盖路径/news 中的"news page"
    ctx.body = "dddd";
    console.log("I'm the last one")
})
router.get('/news', (ctx) => {
    ctx.body = "news page";

});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})
```

#### 3.2.2 路由级中间件

路径对了才进去

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')(); //注意：引入方式

// 最终显示：hello 2 覆盖掉前面的1
router.get('/', (ctx, next) => {
    console.log("111")
    ctx.body = "1";
    next();
});
router.get('/', ctx => {
    ctx.body = "hello 2"
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})
```

#### 3.2.3 错误处理中间件

```javascript
app.use(async(ctx, next) => {
    next();
    if (ctx.status == 404) {
        ctx.status = 400;
        ctx.body = "这是一个404页面";
    };
});

```

#### 3.2.4 第三方中间件

```javascript
// 静态资源中间件
const static = require("koa-static");
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));
// post表单数据中间件
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

```

#### 3.2.5 koa中间件执行顺序

Koa 的中间件和 Express 不同，Koa 选择了洋葱圈模型。

先从外到里，然后从里到外

## 4.Koa-bodyparse 

### 4.1 原理

对于post请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

### 4.2 安装与使用

1. 安装第三方包:

```shell
npm install -S koa-parser
```

2. 配置中间件

```javascript
var Koa = require('koa');
var bodyParser = require("koa-parser");
var app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
    ctx.body = ctx.request.body;
})
```

3. 通过ctx.request.body获取post提交的数据

## 5.Koa 静态资源

### 5.1 静态资源中间件的功能

一个http请求访问web服务静态资源，一般响应结果有三种情况

- 访问文本，例如：js，css，png，jpg，gif
- 访问静态目录
- 找不到资源，抛出404错误

koa-static主要用于访问静态资源

### 5.2 koa-static的使用

1. 安装

   ```shell
   npm install -S koa-static
   ```

2. 配置

   ```java
   const static = require('koa-static');
   // 127.0.0.1:3000//css/basic.css 文件目录是目录名/publc/css/basic.css
   // 首先去public文件找， 如果找到返回对应的文件，找不到就next()
   // koa-static第三方中间件里面有自动调用next()
   app.use(static(
       path.join(__dirname,'./public')
   ))
   ```

3. 这个时候你的静态资源就可以被koa中间件解析了

## 6.Koa脚手架

koa-generator学习网址：<https://www.itying.com/koa/start-generator.html>

### 6.1 介绍koa-generator

通过应用koa脚手架生成工具，可以快速生成创建一个基于koa2的应用的骨架

koa-generator提供的功能如下：

- 生成项目的骨架，集成必要的中间件
- 约定目录结构（类似与vue 脚手架）

项目骨架描述：

- app.js 为入口
- bin/www为启动入口
- 支持静态服务器，即public目录
- 支持routes目录
- 支持views视图目录
- 默认将Pug(之前的名字是Jade)作为模板引擎

### 6.2 安装与使用

#### 1. 安装

```shell
npm install -g koa-generator
```

#### 2. 创建项目

koa-generator 支持v1和v2，安装后分别使用koa 和koa2 命令创建koa项目模板，以koa2为例

```shell
koa2 koa_demo (创建名称为koa_demo的项目)
```

#### 3. 安装依赖包

```shell
npm install
```

#### 4. 启动项目

```shell
npm start
```

然后在浏览器打开<http://127.0.0.1:3000/> 网址就可以看到这个应用了

### 6.3 目录解析

```kotlin
.
├── app.js
├── bin
|  └── www
├── directoryList.md
├── out.txt
├── package.json
├── public
|  ├── images
|  ├── javascripts
|  └── stylesheets
├── routes
|  ├── index.js
|  └── users.js
└── views
   ├── error.pug
   ├── index.pug
   └── layout.pug
```

#### 6.3.1 入口文件bin/www

入口文件的核心代码如下：

```javascript
const server = http.createServer(app.callback())
server.listen(port)
server.on('error', onError);
server.on('listening', onListening);
```

#### 6.3.2 核心文件app.js

app.js是koa的核心文件，主要包括4个部分，分别如下

- 中间件（按加载顺序执行）

- 路由

- 静态服务

- 视图

  这里注意，中间件按照加载顺序执行，下面是app.js里包含的中间件的名称，用途（按照加载顺序排列）

  | 中间件名称           | 用途                                                         | 加载顺序 |
  | -------------------- | ------------------------------------------------------------ | -------- |
  | bodyparser           | 解析post类HTTP动词的body内容，加上bodyparser后就可以处理所有请求了 | 1        |
  | json                 | 更好的支持json                                               | 2        |
  | logger               | 开发阶段的日志                                               | 3        |
  | koa-static           | 提供HTTP静态托管服务                                         | 4        |
  | koa-views            | 视图渲染，支持模块引擎                                       | 5        |
  | 自定义的logger中间件 | 记录日志                                                     | 6        |

  

## 7.Koa路由模块化

## 8.Koa与MongoDB

1. 安装mongodb

   ```shell
   npm install mongodb --save
   ```

2. 引入MongoDB下面的MongoClient

   ```javascript
   var MongoClient = require('mongodb').MongoClient;
   ```

3. 定义数据库连接的地址以及配置数据库

   ```javascript
   // koa 数据库的名称
   var url = 'mongodb://loalhost:27017/';
   var dbName = 'koa'
   ```

4. nodejs连接数据库

   ```javascript
   MongoClient.connect(url,function(err,client){
       const db = client.db(dbName)；//数据库db对象
   })
   ```

5. 操作数据库

   ```javascript
   MongoClient.connect(url,function(err,db){
       db.collection('user').insertOne({"name":"zzs"},function(err,result){
           
           db.close()//关闭连接
       })
   })
   ```

   