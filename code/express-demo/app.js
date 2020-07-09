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
// 公开指定目录
// 只要这样做了，你就可以直接通过 /public/xx 的方式访问public目录中的所有资源了
app.use('/public/', express.static('./public/'));

app.listen(3000, function() {
    console.log('服务器启动啦')
});