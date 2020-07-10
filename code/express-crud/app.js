var express = require('express');
var fs = require("fs");

var app = express();

app.engine('html', require('express-art-template'));

app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'));

app.get('/', function(req, res) {
    // readFile第二个参数'utf-8',可选的，传入utf-8 就是告诉它把
    // 除了这样的转换外，可以通过data.toString()的方式
    fs.readFile('./db.json', 'utf-8', function(err, data) {
        if (err) {
            return res.status(500).send("db.json is failed")
        };
        // 从文件中读取到的数据一定是字符串
        // 所以这里一定要手动转成对象
        let students = JSON.parse(data).students;
        res.render('index.html', {
            "fruits": ["apple", "pear", "peach"],
            students
        });
    });

});

app.listen(3000, function(req, res) {
    console.log("server 3000 is running ")
});