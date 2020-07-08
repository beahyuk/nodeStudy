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

**node.js特性**：事件驱动，异步，轻量和高效

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

可以这么理解，如果说Express中的路由控制方法是MVC中的控制器的话，那么模板就是MVC的视图

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

#### 留言渲染在首页思路：

要用apt-template模板引擎，通过读HTML页面，进行数据替换comments数组

#### 表单提交

表单提交的url设定没看清楚

+ 获取表单提交的数据：parseObj。query
+ 生成日期到数据对象中，然后存储到数组中
+ 让用户重定向跳转到首页/
  + 当用户重新请求/的时候，数组中的数据发生变化，所以用户看到的是新数据

