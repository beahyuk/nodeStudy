/**
 * app.js 入门模块
 * 职责：
 *    1.创建服务
 *    2.做一些服务相关配置：
 *      模板引擎，body-parser解析表单post请求体，提供静态服务资源
 *    3.挂载路由
 *    4.监听端口启动服务
 */

var express = require('express');
var router = require("./router");
var bodyParser = require("body-parser");

// 1.创建服务
var app = express();

// 2.做一些服务相关配置：
// 2.1 模板引擎
app.engine('html', require('express-art-template'));
// 2.2 body-parser解析表单POST请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 2.3 提供静态服务资源
app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'));

// 配置模板引擎和body-parser要在app.use(router)之前
// 3.挂载路由
app.use(router);

// 4.监听端口启动服务
app.listen(3000, function(req, res) {
    console.log("server 3000 is running ")
});
// module.exports = app;