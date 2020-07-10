// 0. 安装
// 1. 引入包
var express = require('express');
// 2. 创建你服务器应用程序
//    也就是原来的http.createServer
var app = express();

app.get('/', function(req, res) {
    res.send("hello world!")
});
app.get('/post', function(req, res) {
    res.send("i'm post")
});

/**
 *  只要这样做了，你就可以直接通过 /public/xx 的方式访问public目录中的所有资源了
 *  当以/public/ 开头的时候，去 ./public/目录中找到对应的资源
 * 浏览器输入路径：http://127.0.0.1:3000/public/js/main.js  就可以访问到
 */

app.use('/public/', express.static('./public/'));

// 当省略第一个参数时，可以通过省略/public 的方式去访问
// 浏览器输入路径：http://127.0.0.1:3000/js/main.js  就可以访问到
app.use(express.static('./public'))

app.listen(3000, function() {
    console.log('服务器启动啦')
});