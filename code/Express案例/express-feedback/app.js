var express = require('express');
var moment = require('moment');
var bodyParser = require("body-parser")

// 创建服务器
var app = express();

var comments = [{
    name: "12",
    content: 'aaaaa',
    time: "2020.07.08"
}, {
    name: "13",
    content: 'bbbbbb',
    time: "2020.07.08"
}, {
    name: "14",
    content: 'cccccc',
    time: "2020.07.08"
}, {
    name: "15",
    content: 'dddddd',
    time: "2020.07.08"
}, ];

// 静态资源引用
app.use('/public/', express.static('./public'));
// art-template引用
app.engine('html', require('express-art-template'));


app.get('/', function(req, res) {
    res.render('index.html', { comments });
});
app.get('/post', function(req, res) {
    res.render('post.html');
});
//法一： 一般表单提交方式为post，这里使用的是get，法二修改
// app.get('/comments', function(req, res) {
//     let comment = req.query;
//     let current_time = moment(Date.now()).format('YYYY-MM-DD, HH:mm:ss');
//     comment.time = current_time;
//     comments.unshift(comment);
//     // redirect重定向
//     res.redirect('/')
// });

// 法二： 更改post.html文件表单提交方式为post，action去掉
// 当以post请求 /post的时候，执行指定的函数
// 这样可以利用不同的请求方法 让一个请求路径使用多次

//  配置bodyParse中间件(插件，专门用来解析表单POST请求体)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/post', function(req, res) {
    // 1.获取表单 POST 请求体数据
    let comment = req.body;
    let current_time = moment(Date.now()).format("YYYY-MM-DD,HH:MM:SS");
    // 2.处理
    comment.time = current_time;
    comments.unshift(comment);
    // 3.发送响应
    res.redirect('/');
});

app.listen(3000, function(req, res) {
    console.log('server is running ')
});