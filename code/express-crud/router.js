/**
 * router.js路由模块
 * 职责：
 *    处理路由
 *    根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 划分模块的目的，就是为了增强代码的可维护性，提高开发效率
 */

var express = require("express");
var Student = require('./student')

// 1.创建一个路由器
var router = express.Router();


// 2.把路由都挂载在 router 路由器中

router.get('/students', function(req, res) {
    console.log("router 加载了吗")
    Student.find(function(err, data) {
        if (err) {
            return res.status(500).send("server error");
        };

        let students = data;
        res.render("index.html", {
            "fruits": ["apple", "pear", "peach"],
            students
        });
    });
});
// router.get('/students/new', function(req, res) {});
// router.post('/students/new', function(req, res) {});
// router.get('/students/edit', function(req, res) {});
// router.post('/students/edit', function(req, res) {});
// router.get('/students/delete', function(req, res) {});

// 3. 把router导出
module.exports = router