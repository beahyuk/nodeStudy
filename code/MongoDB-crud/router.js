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
router.get('/students/new', function(req, res) {
    res.render('new.html');
});
router.post('/students/new', function(req, res) {
    // 1.获取获取表单数据
    let newStudent = req.body;
    console.log(newStudent)
        // 2.将数据放在文件中
    new Student(newStudent).save(function(err, data) {
        if (err) {
            return res.status(500).send("server error");
        };
        // 3.重定向
        res.redirect('/students')
    });
});
router.get('/students/edit', function(req, res) {
    // 1.获取表单数据的id
    let Id = req.query.id;
    console.log("id为", Id)
        // 2.将修改的数据放回数组中
    Student.findById(Id, function(err, student) {
        if (err) {
            return res.status(500).send("server error");
        };
        // 3.渲染页面
        res.render("edit.html", { student: student })
    });
});
router.post('/students/edit', function(req, res) {
    // 1.获取表单提交的数据
    let editStudent = req.body;
    // 2.修改数组中的数据，splice方法
    Student.findByIdAndUpdate(req.query.id, editStudent, function(err, data) {
        if (err) {
            return res.status(500).send("server  wrong");
        };
        // 3.重定向
        res.redirect('/students')
    });
});
router.get('/students/delete', function(req, res) {
    // 1.得到目标id
    let id = req.query.id;
    // 2.数据操作，删除id
    Student.findByIdAndRemove(id, function(err, data) {
        if (err) {
            return res.status(500).send("can't delete");
        };
        // 3.重定向
        res.redirect("/students");
    });
});

// 3. 把router导出
module.exports = router