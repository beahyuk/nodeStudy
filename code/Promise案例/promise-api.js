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