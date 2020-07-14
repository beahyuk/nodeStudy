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
    //响应内容只能是二进制数据或者字符串，
    //数字，对象，数组，布尔值都要通过JSON.stringify()转换成字符串
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

**服务端渲染和客户端渲染的区别**

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

4. form提交地址与写留言地址是不同的

   form提交地址是`/comments`  主要是对这个地址进行url的解析，pathname主要是为了它成立

   写留言地址是 首页点写留言后 需要跳转的地址，在a标签`href`的地址

   一开始没搞清楚，全写一个，无法判断提交后的地址

   **补充：** 如果form提交的方法是POST，那么表单可以不用设置提交地址，与写留言地址一样

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

## 03-模块系统

### 1. 模块化概念

- 文件作用域
- 通信规则
  - 加载 require
  - 导出 exports

### 2. commonJS 模块规范

在Node中的JavaScript还有一个很重要的概念，模块系统

- 模块作用域
- 使用require方法用来加载模块
- 使用exports接口对象用来导出模块中的成员

如果一个模块需要直接导出一个成员，而非挂载的方式，则直接导出

#### 2.1 加载`require`

语法：

```javascript
var 自定义变量 = require("模块")
```

两个作用：

- 执行被加载模块中的代码
- 得到被加载模块中`exports`导出接口对象

`require`模块查找机制

**1. 优先从缓存加载规则：**

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

**2. 核心模块**

核心模块的本质也是文件

核心模块文件已经被编译到了二进制文件中了，只需要按照名字来加载就可以了

```javascript
require ('fs')
```

**3. 路径形式的文件模块**

`./` 当前目录，不可省略

`../ `上一级目录，不可省略

`.js`后缀名可以省略

`/xxx` 几乎不用

**4. 第三方模块**

- 凡是第三方模块都必须通过 npm 来下载

- 使用的时候就可以通过require('包名‘) 的方式来进行加载才可以使用

- 第三方包和核心模块的名字不一样

- 既不是核心模块，也不是路径形式的模块

  - 先找到当前文件所处目录中的 node_modules 目录
  - 找到node_modules/art-template/package.json文件 中的main属性
  - main属性中就记录了 art-template的入口模块，有时候是index.js
  - 然后加载使用这个第三方包。实际上最终加载的还是文件
  - 如果package.json文件不存在或者main指定的入口模块有没有，则node会自动查找该目录下的index.js
  - 也就是说index.js会作为一个默认备选项

  如果以上所有任何条件都不成立，就会进入上一级目录中的node_modules目录查找，如果上一级还没有，则继续往上上一级查找……如果直到当前磁盘根目录还找不到，最后报错：can not find module xxx

  一般一个项目有且只有一个	node_modules，放在项目根目录中

#### 2.2 导出`exports`

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

#### 2.3 原理解析

```javascript
console.log(exports === module.exports) // =>true

exports.foo = "abc"

//等价于
module.exports.foo = "abc"
```

**exports 和 module.exports两者的关系：**

1. module.exports 才是真正的接口，在每个js文件中，默认了var exports = module.exports,最终返回给调用的是module.exports而不是exports。 module.exports初始值为一个空对象，而exports为指向module.exports的引用

2. 在其他文件加载require()的时候，返回的是module.exports而不是exports，因此，直接赋值exports常常会出现错误，而赋值为module.exports常常是解决这一问题的折中方法。

   exports直接赋值相当于 重新定义了

   - 一开始是 var exports = module.exports
   - 直接复制 exports = "abc"
   - 这样exports指向的就不是module.exports了，而是指向’abc‘的地址，所以exports不可以直接赋值

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

### 3. npm

**npm**：node package manager

#### 3.1 npm网站

> npmjs.com

#### 3.2 npm 命令行工具

npm的第二层含义就是一个命令行工具，只要你安装了node就已经安装了npm

可以查看npm版本

```shell
npm --version
```

升级npm（自己升级自己）

```shell
npm install --global npm
```

#### 3.3 常用命令

- npm init（新建项目后用）
  - npm init -y 可以跳过向导，快速生成
- npm install
  - 一次性把dependencies选项中的依赖项全部安装
  - npm i
- npm install 包名
  - 只下载
  - npm i 包名
- npm install --save 包名
  - 下载并保存依赖项（package.json文件中的dependencies选项）
  - npm i -S 包名
- npm uninstall 包名
  - 只删除，如果有依赖项会依然保存
- npm uninstall --save 包名
  - 删除的同时也会把依赖信息删掉
  - npm un -S 包名
- npm help
  - 查看使用帮助
- npm 命令 --help
  - 查看指定命令的使用帮助
  - 例如忘记uninstall命令的简写了，这个时候，可以输入`npm uninstall --help`来查看使用帮助

### 4. packag.json

建议每一个项目都要有一个`package.json`文件（包描述文件，就像产品的说明书一样）

这个文件可以通过`npm init` 的方式来自动初始化出来

package.json中目前来看，最有用的是`dependencies`选项，可以用来帮我们保存第三方包的依赖信息

如果`node_modules`被误删，只需要：`npm install`就会自动把`package.json`中的`dependencies`中所有的依赖项都下载下来

- 建议每个项目的根目录下都有一个`package.json`文件
- 建议执行`npm install包名` 的时候都加上 `--save` 这个选项，目的是用来保存依赖项信息

#### 4.1 package.json和package-lock.json

npm  5以前是不会有`package-lock.json`这个文件的，npm 5 之后才有

当你安装包的时候，npm都会生成或更新`package-lock.json`这个文件。

- npm 5 以后的版本安装包不需要加`--save`参数，它会自动保存依赖信息
- 当你安装包的时候，会自动创建或者是更新`package-lock.json`这个文件
- `package-lock.json`这个文件会保存`node-modules`中所有包的信息（版本，下载地址）
  - 这样的话，重新`npm install`的时候速度就可以提升
- 从文件来看，有一个`lock`称之为锁
  - 这个`lock`是用来锁定版本的
  - 如果项目依赖了`1.1.1`版本，如果你重新install 其实会下载最新版本，而不是1.1.1
  - 我们的目的就是希望可以锁定1.1.1这个版本
  - 所以这个`package-lock.json`这个文件的另一个作用就是锁定版本号，防止自动升级新版

## 04-path路径操作模块

官方文档：<https://nodejs.org/dist/latest-v14.x/docs/api/path.html>

- `path.basename`

  - 获取一个路径的文件名（默认包含扩展名）

- `path.extname`

  - 获取一个路径中的扩展名部分

- `path.parse`

  - 把一个路径转为对象
    - root 根路径
    - dir 目录
    - base包含后缀名的文件名
    - ext 后缀名
    - name 不包含后缀名的文件名

- `path.join`

  - 当你需要进行路径拼接的时候，推荐使用这个方法

    ```javascript
    fs.readFile(path.join(__dirname,'./a.txt'),'utf-8',function(){})
    ```

- `path.isAbsolute`

  - 判断一个路径是否是绝对路径

## 05-Node中其他成员

在每个模块中，除了`require`，`exports`等模块相关API之外，还有两个特殊的成员：

- `__dirname` **动态获取** 可以用来获取当前文件模块所属目录的绝对路径（不包含文件名）
- `__filename`**动态获取** 可以用来获取当前文件的绝对路径(包含文件名)
- `__dirname`和`__filename`是不受执行node命令所属路径影响的

在文件操作中，使用相对路径是不可靠的，因为在Node中文件操作的路径被设计为相对于执行node命令所处的路径（不是bug，这样设计是有使用场景的）

为了解决这个问题，很简单，只需要把相对路径变为绝对路径就可以了

那这里我们就可以使用`__dirname`或者`__filename`来帮我们解决这个问题

在拼接路径的过程中，为了避免手动拼接带来的一些低级错误，所以推荐多使用`path.join()`来辅助拼接

所以为了避免刚才所描述这个问题，大家以后在文件操作中使用的相对路径都统一转换为 **动态的绝对路径**

> 补充：模块中的路径标识和这里的路径没有关系，不受影响（相对于文件模块）

## 06-Express框架

### 0. 修改完代码自动重启

可以使用一个第三方命名航工具，`nodemon`来帮我们解决频繁修改代码重启服务器问题

`nodemon`是一个基于Node.js开发的一个第三方命令行工具，我们使用的时候需要独立安装

```shell
npm install --global nodemon
```

安装完毕后，使用:

```shell
# 之前命令
node app.js
# 使用nodemon后命令
nodemon app.js
```

只要通过`nodemon app.js`启动服务，则它会监视你的文件变化，当文件发生变化时，自动帮你重启服务器

**遇到问题：**

使用nodemon时，出现nodemon不是内部或外部命令，也不是可运行的程序

```shell
E:\workspace\node_study\code\express-demo>npm install nodemon -g
# 显示安装成功，但是查询代码查不到
E:\workspace\node_study\code\express-demo>nodemon --version
'nodemon' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

解决方法：配置变量

1. 找到nodemon插件，复制路径C:\Users\xueqing\AppData\Roaming\npm
2. 右击-我的电脑-单击属性-高级系统设置-环境变量
3. 选择用户变量的path-编辑-将复制的路径添加到path配置

### 1. 起步

#### 1. 安装Express

```shell
npm install express --save
```

#### 2. hello word

```js
var app = require("express");
app.get("/",function(req,res){
    res.send("hello world")
});
app.listen(3000,function(){
    console.log("server is running ")
});
```

#### 3. 基本路由

路由器

- 请求方法
- 请求路径
- 请求处理的函数

get：

```javascript
// 当你以get方法请求/时，执行对应的函数       
app.get("/",function(req,res){
    res.send("hello world")
});
```

post:

```javascript
// 当你以post方法请求/时，执行对应的处理函数
app.post("/",function(req,res){
    rers.send("get a post request")
})
```

#### 4. 静态服务

在express中引入静态资源：

```javascript
/**
 *  只要这样做了，你就可以直接通过 /public/xx 的方式访问public目录中的所有资源了
 *  当以/public/ 开头的时候，去 ./public/目录中找到对应的资源
 * 浏览器输入路径：http://127.0.0.1:3000/public/js/main.js  就可以访问到
 */
app.use('/public/', express.static('./public/'));

// 当省略第一个参数时，可以通过省略/public 的方式去访问
// 浏览器输入路径：http://127.0.0.1:3000/js/main.js  就可以访问到
app.use(express.static('./public'))

// 后面的'./public'是文件路径，前面'/public'是浏览器地址路径添加

```

### 2. Express与art-template

- [art-template-Github仓库](<https://github.com/aui/art-template>)
- [art-template官方文档与express](<https://aui.github.io/art-template/express/>)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```shell
# 官方是'art'，意思是引入.art文件
app.engine('art', require('express-art-template'));
# 正式使用时，一般是html，方便引入html文件
app.engine('html', require('express-art-template'));
```

使用：

```javascript
app.get('/',function(req,res){
    // express默认会去项目中的views目录找index.html文件
    res.render('index.html',{
        user:{
            name:"lindaG",
            tags:['art','express']
        }
    })
});
```

如果希望修改默认的`views`视图渲染存储目录，可以

```javascript
//注意：第一个参数views千万别写错
app.set('views',目录路径);
```

### 3. Express获取表单GET请求参数

Express内置了一个API，可以直接通过`req.query`来获取

```javascript
var query = req.query
```

### 4. Express获取表单POST请求体数据

在Express里没有内置获取表单POST请求体的API，这里需要使用一个第三方包：`body-parser`

安装：

```shell
npm install --save body-parser
```

配置：

```javascript
var express = require("express");
//0.引包
var bodyParser = require("body-parser");

var app = express();

// 配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说你就可以直接通过req.body 来获取表单 POST 请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());
```

使用：

```javascript
app.use(function(req,res){
    res.setHeader("Content-type","text/plain");
    res.write('you posted:\n');
    //可以通过req.body来获取表单POST请求体数据
    res.send(Json.stringify(req.body,null,2))
});
```

### 5. CRUD案例

#### 1. 起步

- 初始化
- 安装依赖
- 模板处理

#### 2. 路由设计

| 请求方法 | 请求路径         | get参数 | post参数            | 备注             |
| -------- | ---------------- | ------- | ------------------- | ---------------- |
| GET      | /students        |         |                     | 渲染首页         |
| GET      | /students/new    |         |                     | 渲染添加学生页面 |
| POST     | /students/new    |         | name,sex,hobbies    | 处理添加学生请求 |
| GET      | /students/edit   | id      |                     | 渲染编辑页面     |
| POST     | /students/edit   |         | id,name,sex,hobbies | 处理编辑请求     |
| GET      | /students/delete | id      |                     | 处理删除请求     |

#### 3. 提取路由模块

router.js

```javascript
/**
 * router.js路由模块
 * 职责：
 *    处理路由
 *    根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 划分模块的目的，就是为了增强代码的可维护性，提高开发效率
 */
var express = require("express");

// 1.创建一个路由器
var router = express.Router();

// 2.把路由都挂载在 router 路由器中
router.get('/students', function(req, res) {});
router.get('/students/new', function(req, res) {});
router.post('/students/new', function(req, res) {});
router.get('/students/edit', function(req, res) {});
router.post('/students/edit', function(req, res) {});
router.get('/students/delete', function(req, res) {});

// 3. 把router导出
module.exports = router
```

app.js

```javascript
var router = require("./router");
// 挂载路由
app.use(router)
```

#### 4. 设计操作数据的API文件模块

```javascript
/**
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
var fs = require("fs");

var dbPath = './db.json';
/**
 * 获取所有学生的列表
 */
exports.find = function(callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err);
        };
        callback(null, JSON.parse(data).students)
    });
};
/**
 * 添加保存学生
 */
exports.save = function() {

};
/**
 * 更新学生
 */
exports.update = function() {

};
/**
 * 删除学生
 */
exports.delete = function() {

};
```

#### 5.项目的坑

- 写完第一个find方法后，不加载页面
  - 因为我在student.js里复制了好多exports.find()方法，其他的改了方法名，还剩下最后一个find方法没改
  - 因为js没有函数重载的概念，所以最后一个会覆盖第一个，一直为空。
  - 找了好久的bug…… 发现是这个坑，无语

- 点击其中一个编辑后，获取不到点击的id值，页面空白

  ```shell
  id: undefined
  undefined
  ```

  - index.html 中需要对编辑和删除增加?id=，以便获得query值

    ```html
    <tbody>
        {{each students}}
        <tr>
            <td>{{$value.id}}</td>
            <td>{{$value.name}}</td>
            <td>{{$value.sex}}</td>
            <td>{{$value.hobbies}}</td>
            <td>
                <a class="btn btn-info" href="/students/edit?id={{$value.id}}">编辑</a>
                <a class="btn btn-danger" href="/students/delete?id={{$value.id}}">删除</a>
            </td>
        </tr>
        {{/each}}
    </tbody>
    ```

- 点击 编辑后，获取id后,render出来循环四个表单,获得的信息是一个人的

  - ```shell
    router访问到的 1
    id: 1
    学生信息为： { id: 1, name: 'linda', sex: 0, hobbies: 'sing,dance,game' }
    ```

  - 将edit.html里的each循环删掉，直接引用{{student.name}}，{{student.sex}}，{{student.hobbies}}

- 进入编辑页面后，性别无法呈现原信息

  - 在edit.html添加一段script脚本，用来判断性别，从而给单选radio一个checked状态

  - ```html
        <script>
            var sex = "{{student.sex}}";
            var check = function() {
                var xb = document.getElementsByName("sex");
                if (sex === "男") {
                    xb[0].checked = "checked"
                } else if (sex === "女") {
                    xb[1].checked = "checked"
                }
            }
            check()
        </script>
    ```

- db.json数据总是出错，导致执行方法时，数组找不到报错

  - 因为对splice()方法不熟悉，所以不小心把数据全删除了 

  - 还有一个是，把所有学生转成字符串，最后保存到数据文件中时，总是忽略{}，导致db.json文件中的数据格式出错，不再是对象 形式

    ```javascript
     let dataStr = JSON.stringify({students});
    ```


## 07-MongoDB

### 1. 关系型数据库和非关系型数据库

表就是关系，或者说表与表之间存在关系

- 所有的关系型数据库都需要通过`sql`语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的，主键，默认值，非空
- 非关系型数据库就是key-value对儿
- 但是MOngoDB是最像关系型数据库的非关系型数据库
  - 数据库 -》 数据库
  - 数据表 -》 集合（数组）
  - 表记录 -》（文档对象）
- MongoDB不需要设计表结构

### 2.  安装

- 下载（菜鸟网站有地址）

- 安装

  安装步骤：<https://www.runoob.com/mongodb/mongodb-window-install.html>

- 配置环境变量

- 最后输入`mongo --version`测试是否安装成功

### 3. 启动和关闭数据库

启动：

```shell
# mongodb 默认使用执行 mongod 命令所处盘符根目录下的/data/db 作为自己的数据存储目录
# 所以在第一次执行该命令之前先自己手动新建一个 /data/db
# 新版本好像会在安装软件时自动创建了data/db文件夹
mongo
```

如果想要修改默认的数据存储目录，可以：

```shell
mongo --dbpath = 数据存储目录路径
```

停止：

```shell
在开启服务的控制台，直接 ctrl+c 即可停止
或者直接关闭开启服务的控制台也可以
```

### 4. 连接和退出数据库

连接：

```shell
# 该命令默认连接本机的 MongoDB 服务
mongo
```

退出：

```shell
# 在连接状态输入 exit 退出连接
exit
```

### 5. 基本命令

- `show dbs`
  - 查看显示所有数据库
- `use 数据库名称`
  - 切换到指定的数据（如果没有会新建）
- 插入数据
- `show collections`或 `show tables`命令
  - 查看已有集合
- `db.user.find() `user是集合名
  - 查看已插入文档

### 6. 在Node中如何操作MongoDB数据

使用第三方包 mongoose

- 官网：https://mongoosejs.com/
- 官方指南：https://mongoosejs.com/docs/guide.html
- 官方API文档：https://mongoosejs.com/docs/api.html
- 官方操作方法：<https://mongoosejs.com/docs/api/model.html>
  - 增查删改等方法

#### 1. MongoDB数据库的基本概念

- 可以有多个数据库

- 一个数据库中可以有多个集合（表）

- 一个集合中可以有多个文档（表记录）

- 文档结构很灵活，没有任何限制

- MongoDB非常灵活，不需要像MySQL一样先创建数据库，表，设计表结构

  - 在这里只需要：当你需要插入数据的时候，只需要指定哪个数据库的哪个集合操作就可以
  - 一切都由MongoDB来帮你完成建库建表事

  ```json
  {
      qq:{
          user:[
              {name:"zs",age:12},
              {name:"zs",age:12},
              {name:"zs",age:12}
          ],
          products:[
          
          ],
          ……
      },
      taobao:{},
      baidu:{}
  }
  ```

#### 2. 起步

安装：

```shell
npm i mongoose
```

hello world:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

#### 3. 官方指南

##### 3.1 设计Schema发布Model

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 1.连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动创建
mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true, useUnifiedTopology: true });

// 2.设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});
// 3.将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//            mongoose会自动将大写名词的字符串生成 小写复数  的集合名称
//            例如这里的 User 最终会变成 users 集合名称
// 第二个参数：架构Schema
// 返回值：模型架构函数
var User = mongoose.model('User', userSchema);
// 4.当我们有了模型构造函数之后，就可以使用这个构造函数对users集中的数据增删改查了
```

##### 3.2 增加数据

```javascript
// 增加数据
var admin = new User({
    username: 'admin',
    password: '12324',
    email: 'admin@admin.com'
});

admin.save(function(err, ret) {
    if (err) {
        console.log(err);
    };
    console.log("添加成功");
    console.log(ret)
});
```

##### 3.3 查询数据

查询所有:

```javascript
// 查询数据
User.find( function(err, ret) {
    if (err) {
        console.log("查询失败", err)
    } else {
        console.log("查询成功", ret)
    };
});
```

按条件查询所有：

```javascript
// 查询数据
User.find({
    username: 'zs'
}, function(err, ret) {
    if (err) {
        console.log("查询失败", err)
    } else {
        console.log("查询成功", ret)
    };
});
```

按条件查询单个：结果为对象

```javascript
// 查出的是对象，find()查出的是数组
User.findOne({ username: 'admin' }, function(err, ret) {
    if (err) {
        console.log("查询失败");
    };
    console.log("查询成功", ret)
});
```

##### 3.4 更新数据

根据条件更新所有：

```javascript
Model.update(conditons,doc,[options],[callback])
```

根据指定条件更新一个：

``` javas
Model.findOneAndUpdate([conditions],[update],[options],[callback])
```

根据id更新一个：

```javascript
// 更新数据
User.findByIdAndUpdate('5f0b031985a5a2101c0b0b42', { password: '1111' }, function(err, ret) {
    if (err) {
        console.log('update fail', err);
    };
    console.log('update success ', ret)
});
```

##### 3.5 删除数据

根据条件删除所有：

```javascript
// 删除数据
User.remove({ username: 'admin' }, function(err, ret) {
    if (err) {
        console.log('fail', err);
    };
    console.log("delete success", ret)
})
```

根据条件删除一个：

```javascript
Model.findOneAndRemove(conditions, options, callback) 
```

根据id删除一个

```javascript
Model.findByIdAndRemove(id, options, callback)
```

## 08-异步编程

### 回调函数

不成立的情况：

```javascript
function add(x, y) {
    console.log(1);
    setTimeout(() => {
        console.log(2);
        var ret = x + y;
        return ret;
    }, 100);
    console.log(3);
    // 到这里执行结束，不会等到前面的定时器，所以直接就返回了默认值undefined
}
console.log(add(4, 2)) //undefined
```

回调函数

```javascript
function add(x, y, callback) {
    console.log(1);
    setTimeout(() => {
        console.log(2);
        var ret = x + y;
        callback(ret)
    }, 1000);
    console.log(3);
};
add(2, 4, function(ret) {
    console.log(ret)
})
```

#### 封装ajax

[XMLHttpRequest方法使用](https://zh.javascript.info/xmlhttprequest)

基于原生XMLHTTPRequest封装get方法：

```javascript
function get(url, callback) {
    // 1.创建一个new XMLHttpRequest对象
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    // 2.配置，请求方法，URL
    xhr.open("GET", url, true);
    // 3.通过网络发送请求
    xhr.send();
    // 4.当接收到响应后，将调用此函数
    xhr.onload(function() {
        callback(xhr.response)
    });
};
get('./db.json', function(ret) {
    console.log(ret)
})
```

### Promise

callback hell 回调地狱，一层一层嵌套

无法保证顺序的代码：

```javascript
var fs = require('fs');

fs.readFile('a.txt', 'utf-8', function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log(data)
});
fs.readFile('b.txt', 'utf-8', function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log(data)
});
fs.readFile('c.txt', 'utf-8', function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log(data)
});
```

通过回调嵌套的方式来保证顺序：

```javascript
var fs = require('fs');

fs.readFile('a.txt', 'utf-8', function(err, data) {
    if (err) {
        // return console.log(err);
        throw err
    };
    console.log(data);
    fs.readFile('b.txt', 'utf-8', function(err, data) {
        if (err) {
            return console.log(err);
        };
        console.log(data);
        fs.readFile('c.txt', 'utf-8', function(err, data) {
            if (err) {
                return console.log(err);
            };
            console.log(data)
        });
    });
});
```

Promise相当于一个容器，里面放了一个异步任务

使用Promise保证顺序：

```javascript
var fs = require('fs');

// 在EcmaScript 6中新增了一个API Promise
// Promise 是一个构造函数
// 创建Promise 容器
//   Promise 容器一旦创建，就开始执行里面的代码
var p1 = new Promise(function(resolve, reject) {
    // 读文件是承诺容器里的任务
    fs.readFile('./callback-hell/a.txt', 'utf-8', function(err, data) {
        if (err) {
            // 承诺容器中的任务失败
            // 调用reject 就相当于调用了then方法里的第二个参数函数
            reject(err);
        };
        // 承诺容器中的任务成功
        // 调用rresolve 就相当于调用了then方法里的第一个参数函数
        resolve(data)
    });
});

var p2 = new Promise(function(resolve, reject) {
    fs.readFile('./callback-hell/b.txt', 'utf-8', function(err, data) {
        if (err) {
            reject(err);
        };
        resolve(data)
    });
});
var p3 = new Promise(function(resolve, reject) {
    fs.readFile('./callback-hell/c.txt', 'utf-8', function(err, data) {
        if (err) {
            reject(err);
        };
        resolve(data)
    });
});

// P1就是那个承诺
// 当P1执行完后,就开始执行(then)里的操作
// then(function(data){},function(err){}) 里面接收的是两个函数
// then方法接收的function是容器中的resolve函数和reject函数
p1.
then(function(data) {
        console.log(data);
        return p2
    }, function(err) {
        console.log(err);
    })
    .then(function(data) {
        console.log(data);
        return p3
    }, function(err) {
        console.log(err)
    })
    .then(function(data) {
        console.log(data)
    })
```

封装Promise版本的`readFile`

```javascript
var fs = require('fs');
const { resolve } = require('path');
const { cpuUsage } = require('process');

function pReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            };
            resolve(data);
        });
    });
};

pReadFile('./callback-hell/a.txt')
    .then(function(data) {
        console.log(data);
        return pReadFile('./callback-hell/b.txt');
    }, function(err) {
        console.log(err)
    })
    .then(function(data) {
        console.log(data);
        return pReadFile('./callback-hell/c.txt');
    }, function(err) { console.log(err) })
    .then(function(data) {
        console.log(data)
    }, function(err) {
        console.log(err)
    })
```



## 09-中间件

### 1. 中间件

express中的中间件：http://expressjs.com/en/guide/using-middleware.html

中间件的本质就是一个请求处理方法，我们把用户从请求到响应的整个过程分发到多个中间件去处理，这样做的目的是提高代码的灵活性，动态可扩展的

#### 1.1 应用程序级别中间件

万能匹配（不关心任何请求路径和请求方法）：

````javascript
app.use(function(req,res,next){
    console.log('Time',Date.now())
    next()
})
````

只要是以'/xxx/'开头的：

```javascript
app.use('/a',function(req,res,next){
    console.log('Time:',Date.now())
    next()
})
```

#### 1.2 路由级别中间件

get:

```javascript
app.get('/',function(req,res){
    req.send('hello world')
})
```

post:

```javascript
app.post('/',function(req,res){
    res.send('Got a POST request')
})
```

put:

```javascript
app.put('/user',function(req,res){
    res.send('Got a PUT request at /user')
})
```

delete:

```javascript
app.delete('/user',function(req,res){
    res.send('Got a Delete request at /user')
})
```

#### 1.3 错误处理中间件

```javascript
app.use(function(err,req,res,next){
    console.error(err.stack)
    res.status(500).send("something broke!")
})
```

#### 1.4 内置中间件

- express.static
- express.json
- express.urlencoded

#### 1.5 第三方中间件

> http://expressjs.com/en/resources/middleware.html

- body-parser
- compression
- cookie-parser
- response-time
- session

## 案例总结

model 文件夹里存放数据模型，schema

## 其他

### AMD，CMD，CommonJS

- JavaScript天生不支持模块化
  - require，exports这些是node.js才有的
- 在Node这个环境中对JavaScript进行了特殊的模块化支持 CommonJS
- 在浏览器中也可以像在Node中的模块一样来进行编程
  - `<script>`标签来引用加载，而且还必须考虑加载的顺序问题
  - require.js 第三方库      AMD
  - sea.js        第三方库      CMD

- 无论是CommonJS，AMD，CMD ES6 modules (官方规范)
  - 都是为了解决JavaScript的模块化问题
  - CommonJS，AMD，CMD都是民间
  - EcmaScript是官方规范定义

### 接受返回数据类型总结

接收类型：

- res.end()  响应内容只能是二进制数据或者字符串
- template.render() 渲染数据格式是字符串
- callback() 返回的是对象类型或数组类型，是需要的类型
  - 这里的data是读文件读出来的二进制数据
  - callback（null，JSON.parse(data).student）

- fs.readFile() 接受到的数据data是二进制数据

  - ```javascript
    fs.readFile('path',function(err,data){})
    ```

- fs.writeFile() 接受到的数据是字符串形式

  - 把数据保存到文件，得用字符串形式

  - ```javascript
    let dataStr = JSON.stringify({ students });
    fs.writeFile(dbPath, dataStr, function(err) {});
    ```

- 对于文件来说，写入的是字符串形式，读出的是二进制数据

### Promise以及async/await

Promise学习地址：<https://zh.javascript.info/promise-basics>

Async/await学习地址：<https://zh.javascript.info/async-await>

#### 1. 基本使用

```javascript
// 1.基本使用
async function fn1() {
    // 原先的promise使用
    // new Promise((resolve, reject) => {
    //     // 如果出错，就执行reject回调函数，或者throw err
    //     if (err) {
    //         reject("err");
    //         // throw err;
    //     } else {
    //         // 如果成功，就会执行resolve回调函数,把异步函数里的结果放在resolve里
    //         setTimeout(() => {
    //             let time = "2020-07-14";
    //             resolve(time)
    //         }, 1000);
    //     };
    // });
    // name 是 获得后面promise的resolve的结果
    let name = await new Promise(resolve => {
        // await是等待后面promise的异步函数执行后的结果，然后赋值给name
        // 这里的异步函数是setTimeout，name得到的是LindaG
        setTimeout(() => {
            let Pname = "lindaG";
            resolve(Pname);
        }, 1000);
    });
    // gender 是 获得后面promise的resolve的结果
    let gender = await new Promise(resolve => {
        resolve("male")
    });
    console.log(name, gender);
};
fn1()
```

#### 2. 调用前一个promise结果

promise中的.then .then的应用

```javascript
// 2.promise调用前一个 promise的结果
async function fn2() {
    let name = await new Promise(resolve => {
        setTimeout(() => {
            let Pname = "u-dragon";
            resolve(Pname)
        }, 2000);
    })

    let gender = await new Promise(resolve => {
        setTimeout(() => {
            // 调用前面promise的结果name，如果name是符合的，那么返回性别；否则，返回"unknow"
            if (name === "dragon") {
                let sex = "male";
                resolve(sex)
            } else {
                resolve("unknow")
            }
        }, 1000);
    });
    console.log(gender)
};
fn2()
```

#### 3. async/await和Promise.all 一起使用

需要同时等待多个promise时，我们可以使用promise.all把它们包装起来，然后用await

```javascript
// 3.async/await 可以好Promise.all 一起使用
// 需要同时等待多个promise时，我们可以使用promise.all把它们包装起来，然后使用await：
async function fn3() {
    let results = await Promise.all([
        new Promise(resolve => {
            setTimeout(() => {
                let Pname = "lindaG";
                resolve(Pname);
            }, 1000);
        }),
        new Promise(resolve => {
            setTimeout(() => {
                let gender = "male";
                resolve(gender)
            }, 2000);
        })
    ])
    console.log(results);
};
```

#### 4. 总结

函数前面的关键字`async`有两个作用：

1. 让这个函数总是返回一个promise
2. 允许在该函数内使用await

Promise前的关键字`await`使JavaScript引擎等待该promise settle，然后：

1. 如果有error，就会抛出异常——就像那里调用了`throw error`一样
2. 否则，就返回结果

这两个关键字一起提供了一个很好的用来编写异步代码的框架，这种代码易于阅读也易于编写

`async/await`可以和`Promise.all`一起使用

当我们需要同时等待多个promise时，可以用`Promise.all`把它们包装起来，然后使用`await`:



- async函数
  - 函数的返回值为promise对象
  - promise对象的结果由async函数执行的返回值决定
- await表达式
  - await右侧的表达式一般为promise对象，但也可以是其他的值
  - 如果表达式是promise对象，await返回的是promise成功的值
  - 如果表达式是其他的值，直接将此值作为await的返回值
- 注意
  - await必须写在async函数中，但async函数中可以没有await
  - 如果await的promise失败了，就会抛出异常，需要通过try……catch来捕获处理



### json-server

官方文档：<https://www.npmjs.com/package/json-server>

JsonServer主要的作用就是搭建本地的数据接口，创建json文件，便于调试调用

- 安装：

```shell
npm install -g json-server
```

- 创建json文件

- 启动：

```shell
json-server --watch db.json
```

- 结果：
  - 浏览器输入 <http://localhost:3000/posts/1就可以得到json数据