const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/index'); //引入路由

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 设置跨越请求
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
console.log("dd");
// 使用路由 /是路由指向名称
app.use(`/`, router);



app.listen(3001, () => {
    console.log("server is running")
})