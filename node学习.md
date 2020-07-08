# node.js学习

## 初步了解

- node.js是一个JavaScript运行环境

  可以解析和执行JavaScript代码

- 浏览器也是JavaScript运行环境，但是浏览器的js包括
  - ECMAscript
  - BOM
  - DOM
- node.js不包括BOM，DOM

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
//
server.on("request",function(request,reponse){
    
})；

server.listen（3000，function(){
    console.log("服务器启动成功")
}）
```

