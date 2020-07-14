/*
 * @Author: Xue Qing
 * @Date: 2020-07-11 11:07:06
 * @LastEditTime: 2020-07-11 22:33:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\express-crud\student.js
 */
/**
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
var fs = require("fs");
const { json } = require("body-parser");


var dbPath = './db.json';

/**
 * @description: 获取所有学生的列表
 * @param {函数} 
 * @return: 失败，传给callback(err)
 * ·····成功，callback的第一个参数err为空，第二个参数为读出来的数据data
 */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        };
        callback(null, JSON.parse(data).students)
    });
};

/**
 * @description:  保存添加学生信息，
 * @param {函数} 
 * @return: 
 */
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        };
        let students = JSON.parse(data).students;
        let length = students.length;
        if (length === 0) {
            student.id = 1;
        } else {
            student.id = parseInt(students[length - 1].id) + 1;
        };
        students.push(student);
        // 把数据保存到文件中
        let dataStr = JSON.stringify({ students });
        fs.writeFile(dbPath, dataStr, function(err) {
            if (err) { return callback(err) };
            callback(null)
        });
    });
};
/**
 * @description: 寻找目标id的学生信息
 * @param {id，函数} 
 * @return: 目标id的学生信息
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        };
        console.log("id:", id)
        let students = JSON.parse(data).students;
        let ret = students.find(function(item) {
            return item.id == id
        });
        callback(null, ret);
    });
};

/**
 * @description: 更新学生信息并保存
 * @param {学生信息，函数} 
 * @return: 
 */
exports.update = function(student, callback) {
    fs.readFile(dbPath, "utf-8", function(err, data) {
        if (err) {
            return callback(err);
        };
        let students = JSON.parse(data).students;
        console.log('student.id:', "\n student", student);
        let oriData = students.find(function(item) {
            return item.id == student.id
        });
        console.log("原始信息", oriData);
        // 遍历新修改的学生信息对象，修改对应的学生信息
        for (const key in student) {
            oriData[key] = student[key];
        };
        let dataStr = JSON.stringify({ students: students });
        fs.writeFile(dbPath, dataStr, function(err, data) {
            if (err) {
                return callback(err);
            };
            callback(null)
        });
    });
};
/**
 * @description: 删除学生信息
 * @param {id，函数} 
 * @return: 
 */

exports.delete = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        };
        // 删除操作
        let students = JSON.parse(data).students;
        // findeIndex 寻找数组中的下标
        let index = students.findIndex(item => {
            return item.id == id
        });
        console.log(index);
        students.splice(index, 1);
        // 重新调整剩余学生的id，防止id不连续
        // forEach方法对students数组进行遍历，从而进行操作，没有返回值
        students.forEach((item, index) => {
            item.id = index + 1
        });
        let dataStr = JSON.stringify({ students });
        fs.writeFile(dbPath, dataStr, function(err, data) {
            if (err) {
                return callback(err);
            };
            callback(null)
        });
    });
};