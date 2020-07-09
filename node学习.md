# node.js学习

## 01-初步了解

- node.js是一个JavaScript运行环境

  可以解析和执行JavaScript代码

- 浏览器也是JavaScript运行环境，但是浏览器的js包括
  - ECMAscript
  - BOM
  - DOM
- node.js不包括BOM，DOM
- **node中的JavaScript**
  - ECMAscript
  - 核心模块
  - 第三方模块
  - 用户自定义模块

- node.js在Node这个JavaScript执行环境中为JavaScript提供了一些服务器级别操作API
  - 文件读写
  - 网络服务器的搭建
  - 网络通信

### node.js特性

- 事件驱动
- 异步
- 轻量和高效

**npm** 是绝大多数JavaScript的包

### fs模块

fs是file-system的简写，在node中可以使用fs核心模块调用文件

fs提供了文件操作相关的API，例如fs.readFile() 用来读取文件

```js
//1.使用require方法加载fs核心模块
var fs = require('fs');

//2.读取文件，readFile()接受两个参数，文件路径和回调函数
fs.readFile("./test.txt",function(error,data){
    console.log(data.toString())
});

//3.写文件，writeFile()接受三个参数，文件路径，文件内容，回调函数
fs.writeFile("./test.txt","hello word",function(error){
    console.log("文件写入成功")
});

```

### http模块

使用node构建一个web服务器

在Node中专门提供了一个核心模块：http

http的职责就是帮你创建编写服务器的

```js
//1.加载http模块
var http = require("http");

//2.使用http.createServer()方法创建一个web服务器，返回一个server实例
var server = http.createServer();

//3.服务器的作用：发请求，接受请求，处理请求，返回结果
// 注册request请求事件
// 当客户端请求过来，就会自动触发request请求事件，然后执行第二个参数：回调函数处理
server.on("request",function(){
    console.log("接收到客户端的请求了")
});

//4.绑定端口号，启动服务器
server.listen(3000,function(){
    console.log("服务器启动成功了，可以通过http:127.0.0.1:3000/来进行访问")
})
```

#### 请求数据和响应数据

```js
var http = require("http");
var server = http.createServer();
//request 请求事件处理函数，需要接收两个参数：
//  1.request 请求对象
//  请求对象可以用来获取客户端的一些请求信息，例如请求路径
//  2.reponse 响应对象
//  响应对象可以用来给客户端发送响应消息
server.on("request",function(request,reponse){
    console.log("收到客户端请求，请求路径为："+request.url);
    
    //response对象有一个方法：write可以用来给客户端发送响应数据
    //write可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待
    reponse.write("hello word i'm reponse.write");
    //告诉客户端，已经回应结束
    reponse.end();
});

server.listen(3000,function(){
    console.log("服务器启动成功")
});
```

进一步处理请求数据和响应数据，根据不同的url返回不同的信息

```js
var http = require("http");
var server = http.createrServer();
//根据不同的请求路径发送不同的响应结果
//1.获取请求路径
//	req.url获取到的是端口号之后的那一部分路径
//  也就是说所有的url都是以“/”开头的
//2.判断路径处理响应
server.on("request",function(req,res){
    var url = req.url;
    if(url === '/products'){
       //数组类型的数据
      var products = [
          {
              name:"apple",
              price:20,
          },
          {
              name:"banna",
              price:13,
          },
          {
              name:"peach",
              price:144444,
          },
          {
              name:"purple",
              price:34323,
          }
      ]  
    };
    //响应内容只能是二进制数据或者字符串，数字，对象，数组，布尔值都要通过JSON.stringify()转换成字符串
    res.end(JSON.stringify(products))
    
    //一般用这种方式直接结束，不必先写再end
    //res.end("hello word")
});
server.listen(3000,function(){
    console.log("服务器已经启动了")
});
```

###  核心模块

Node为JavaScript提供了很多服务器级别的API，这些API绝大多数都被包装到了一个具名的核心模块

例如：文件操作的`fs`核心模块，http服务构建的 `http`核心模块，`path`路径操作模块，`os`操作系统信息模块 

核心模块需要`require`调用

### 第三方模块

art-template，ejs等等

必须通过npm来下载才可以使用

###  用户自定义模块

用户自己编写的文件模块

- 相对路径必须加./  ，其中 “./”省略会报错
- 可以省略后缀名

在Node中，没有全局作用域，只有模块作用域，即外部访问不到内部，内部访问不到外部

```javascript

//require方法有两个作用：
//	1.加载文件模块并执行里面的代码
//  在a.js中调用b.js
require(./b.js);
//	2.拿到被加载文件模块导出的接口对象 
// 	在每个文件模块中都提供了一个对象：exports
//	exports默认是一个空对象，你要做的就是把所有需要被外部访问的成员
// main.js代码
var devExports = require("./dev.js");
console.log(devExports.add(2, 9), devExports.foo)；

//dev.js代码
var foo = "hello word";
exports.foo = foo;
exports.add = function(x, y) {
    return x + y
};

```

### IP地址和端口号

**ip地址用来定位计算机**

**端口号用来定位具体的应用程序**

所有需要联网通信的应用程序都会占用一个端口号

打比方：一栋楼的每个门牌号就是端口号， 其中 家 = 应用程序

端口号在开发中一般使用3000，5000这种没意义的端口号

计算机会有默认的端口号，例如：80

### 响应内容类型 Content-type

在http协议中，Content-type就是用来告知对方我给你发送的数据内容是什么类型

不同的资源对应的Content-type是不一样的，具体参照：http://tool.oschina.net/commons

对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题

```javascript
//设置Content-type
res.setHeader("Content-type","text/plain;charset=utf-8");
res.end("你好世界"); //中文能被正常显示

//  text/html类型
res.setHeader("Content-type","text/html;charset=utf-8");
```

### 通过网络发送文件

发送的并不是文件，而是通过读取，发送的是文件内容

当浏览器收到服务器响应内容之后，就会根据你的Content-type进行对应的解析处理

## 02-进一步学习

### 模仿Apache生成目录

也不是很懂模仿这个意义在哪

### 模板引擎

模板引擎是一个将页面模块和要显示的数据结合生成HTML页面的工具，例如：art-template ，ejs

**ejs**是模板引擎的一种，使用起来简单，而且与express集成良好

可以这么理解，如果说Express中的路由控制方法是MVC中的控制器的话，那么模板就是MVC的视图（类似于vue中的template吧）

（MVC：model模型，view视图，control控制器）

art-template模板引擎类似于vue样式，通过挂载id，进行值传递，mustache八字胡{{}}数据绑定

```javascript
var fs = require('fs');
var template = require("art-template");
fs.readFile("./index.html",function(err,data){
   if(err){
      return console.log("读取文件失败") 
   } ;
    // 渲染模板
    // template.render("模板字符串"，替换对象)
    //	默认读到的data是二进制数据,render需要的是字符串，所以把data转化为字符串
    var ret = template.render(data.toString(),{
        name:"Jack",
        age:18,
        hobbies:['sing','dance','play']
    });
    console.log(ret)
});
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>hello,{{name}}</div>
    <div>my age is {{age}}</div>
    <div>my hobbies are {{hobbies}}</div>
</body>

</html>
```

### 服务端渲染

* 服务端渲染其实就是在服务端使用模板引擎
* 模板引擎最早诞生于服务端，后来才发展到了前端 

服务端渲染和客户端渲染的区别

### 静态资源存放

为了方便统一处理静态资源，所以约定把所有的静态资源都存放在public文件夹里

哪些资源用户可以访问，哪些资源用户不可以访问，可以通过代码进行非常灵活的处理

### 留言小项目

#### 1. 留言渲染在首页思路：

要用apt-template模板引擎，通过读HTML页面，进行数据替换comments数组

#### 2. 表单提交

表单提交的url设定是在表单form中`action`属性设定

```html
<form action="/comments">
```

利用`url`核心模块 对提交url(带有？参数)进行解析

```javascript
// 第二个参数为true表示直接将查询字符串（？后面的字符串）转为一个对象
var parseObj = url.parse(req.url,true)
var pathName = parseObj.pathName
var query = parseObj.query
```

+ 获取表单提交的数据：parseObj.query
+ 将日期添加到数据对象中，然后存储到数组中
+ 让用户重定向跳转到首页/
  + 当用户重新请求/的时候，数组中的数据发生变化，所以用户看到的是新数据

```javascript
 // 1.获取表单提交的数据：parseObj.query
var comment = parseObj.query;
// 2.将日期添加到数据对象中，然后存储在数组中
comment.time = "2020.07.09";
comments.unshift(comment);
// 3.让用户重定向跳转到首页。通过服务器让客户端重定向
// 3.1  设置状态码，状态码设置为302临时重定向
res.statusCode = 302;
// 3.2  在响应头通过location告诉客户端往哪儿重定向
// 如果客户端发现收到服务器响应的状态码为302，就会自动去响应头找Location
res.setHeader('Location', '/');
res.end();
```

#### 3. 项目注意点

1. bootstrap.css的引用

   一开始引用了不起效

   后来发现是app.js中没有进行public的静态资源引入

2. url路径判断不对

   因为`pathName = parseObj.pathname` 后面的pathname 写成了pathName，被自动补充了，找了好久的bug。

3. 评论提交后不重定向

   评论提交后网页一直转啊转，是因为写完location重定向后，缺少了`res.end()`结束条件

4. form提交地址与写留言地址不同

   form提交地址是`/comments`  主要是对这个地址进行url的解析，pathname主要是为了它成立

   写留言地址是 首页点写留言后 需要跳转的地址，在a标签`href`的地址

   一开始没搞清楚，全写一个，无法判断提交后的地址

5. node获取当前时间

   ```javascript
   // 1，安装 moment模块
   npm i moment --save
   // 2，引入
   var moment = require('moment');
   // 3，获取当前时间并格式化
   var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
   console.log(current_time)
   ```

6. url的判断其实是api

   对url判断，返回不同的响应，其实就是获取不同的API有不一样的接口
   
7. art-template的模板语法

   ```html
   {{each 数组}}
   
   <li>{{$value }}</li>
   
   {{/each}}
   ```

   这是art-template模板引擎支持的语法，只能在模板字符串中使用

   

### node的console

在任意目录的cmd中，输入node回车，就是node的console

类似于Python的console

### 状态码301和302

301：永久重定向，浏览器会记住，一般不用

302：临时重定向

## 03-进步一点点学习

### 1 模块系统

#### 1.1 模块化概念

- 文件作用域
- 通信规则
  - 加载 require
  - 导出 exports

#### 1.2 commonJS 模块规范

在Node中的JavaScript还有一个很重要的概念，模块系统

- 模块作用域
- 使用require方法用来加载模块
- 使用exports接口对象用来导出模块中的成员

如果一个模块需要直接导出一个成员，而非挂载的方式，则直接导出

##### 1.2.1 加载`require`

语法：

```javascript
var 自定义变量 = require("模块")
```

两个作用：

- 执行被加载模块中的代码
- 得到被加载模块中`exports`导出接口对象

`require`加载规则

优先从缓存加载规则

文件main.js        加载a.js和b.js

```javascript
require('./a.js')
require('./b.js')

// 打印结果显示，b只被加载一次
/**
 * a被加载了
 * b被加载了
 */
// mian.js中加载b.js时，会看缓存中有无，有的话就不加载了
```

文件a.js     加载b.js  

```javascript
console.log("a被加载了")
require('./b.js')
```

文件b.js

```javascript
console.log("b被加载了")
```



##### 1.2.2 导出`exports`

- Node中是模块作用域，默认文件中所有的成员只在当前文件模块生效
- 对于希望可以被其它模块访问的成员，可以把这些公开的成员都挂载到`exports`接口对象中

导出多个成员（必须在对象中）：

```javascript
exports.a = 22; //数值
exports.b = "addff"; //字符串
exports.c = function(x, y) { //函数
    return x + y
};
exports.d = { foo: "lindG" }; //对象
```

module.exports=... 是直接赋值

导出单个成员（拿到的就是：函数、字符串）：

```javascript
module.exports = "hello word";
```

以下情况会覆盖：

```javascript
module.exports = "hello word";
//以这个为准，后会覆盖前
module.exports = function(x, y) {
    return x + y
};
```

也可以导出多个消息：

```javascript
module.exports = {
    add: function(x, y) {
        return x + y
    },
    str: "hello lindG"
}
```

##### 1.2.3 原理解析

```javascript
console.log(exports === module.exports) // =>true

exports.foo = "abc"

//等价于
module.exports.foo = "abc"
```

**exports 和 module.exports两者的关系：**

1. module.exports 才是真正的接口，在每个js文件中，默认了var exports = module.exports,最终返回给调用的是module.exports而不是exports。 module.exports初始值为一个空对象，而exports为指向module.exports的引用

2. 在其他文件加载require()的时候，返回的是module.exports而不是exports，因此，直接赋值exports常常会出现错误，而赋值为module.exports常常是解决这一问题的折中方法

   ```javascript
   exports = "abc" // 错误，不可以直接赋值
   module.exports = 'abc' // 正确
   ```

3. 所有的exports收集到的属性和方法，都赋值给了module.exports。当然，这个有前提，就是module.exports本身不具备任何属性和方法

   如果，module.exports已经具备了一些属性和方法，那么exports收集来的信息将来会被忽略

```javascript
//以下输出add和str。忽略exports收集来的信息
module.exports = {
    add: function(x, y) {
        return x + y
    },
    str: "hello lindG"
}
exports.foo = foo;
exports.add = function(x, y) {
    return x + y
};
```

